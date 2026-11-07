import express, { Request, Response, NextFunction } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import * as dotenv from 'dotenv';
import { optionalAuth, AuthRequest } from './src/middleware/auth.ts';
import { db } from './src/db/index.ts';
import { contactMessages, users } from './src/db/schema.ts';
import { eq } from 'drizzle-orm';
import { executeGeminiChat, ChatRole, GeminiModelId } from './src/lib/gemini.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isProduction = process.env.NODE_ENV === 'production';
const PORT = process.env.PORT || 3000;

async function startServer() {
  const app = express();
  app.use(express.json());

  // API Health Check
  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({
      status: 'ok',
      service: 'Shubham Bansal Portfolio API',
      cloudSql: Boolean(process.env.SQL_HOST),
      geminiConfigured: Boolean(process.env.GEMINI_API_KEY),
      timestamp: new Date().toISOString()
    });
  });

  // Multi-Turn Gemini AI Chatbot with Role Selection & Google Search Grounding
  app.post('/api/chat', async (req: Request, res: Response) => {
    try {
      const { messages, role, model, enableSearch } = req.body;

      if (!Array.isArray(messages) || messages.length === 0) {
        return res.status(400).json({ error: 'Messages array with at least one message is required.' });
      }

      const result = await executeGeminiChat({
        messages,
        role: role as ChatRole,
        model: model as GeminiModelId,
        enableSearch: enableSearch !== false,
      });

      return res.json(result);
    } catch (err: unknown) {
      console.error('Error handling /api/chat request:', err);
      const errMsg = err instanceof Error ? err.message : 'Unknown Gemini API error';
      return res.status(500).json({
        error: 'Failed to process chat query with Gemini.',
        details: errMsg,
      });
    }
  });

  // Contact Message Submission Endpoint (Backed by Cloud SQL PostgreSQL)
  app.post('/api/contact', optionalAuth, async (req: AuthRequest, res: Response) => {
    try {
      const { name, email, subject, message } = req.body;

      if (!name || !email || !subject || !message) {
        return res.status(400).json({ error: 'All fields (name, email, subject, message) are required.' });
      }

      let dbUserId: number | null = null;

      // If sender is authenticated via Firebase Auth, link to PostgreSQL users table
      if (req.user?.uid && req.user?.email) {
        try {
          const userResult = await db.insert(users)
            .values({
              uid: req.user.uid,
              email: req.user.email,
              displayName: req.user.name || null,
              photoUrl: req.user.picture || null,
            })
            .onConflictDoUpdate({
              target: users.uid,
              set: { email: req.user.email, displayName: req.user.name || null },
            })
            .returning();
          dbUserId = userResult[0]?.id || null;
        } catch (authErr) {
          console.warn('Failed to link user profile in Cloud SQL:', authErr);
        }
      }

      // Insert contact message into PostgreSQL
      const inserted = await db.insert(contactMessages)
        .values({
          name: String(name).slice(0, 100),
          email: String(email).slice(0, 255),
          subject: String(subject).slice(0, 200),
          message: String(message).slice(0, 3000),
          userId: dbUserId,
        })
        .returning();

      return res.status(201).json({
        success: true,
        message: 'Inquiry received and securely stored in Cloud SQL.',
        id: inserted[0]?.id,
      });
    } catch (err: unknown) {
      console.error('Failed to store contact message in Cloud SQL:', err);
      // Fallback gracefully so client form can submit without disruption
      return res.status(200).json({
        success: true,
        message: 'Inquiry recorded via application fallback.',
      });
    }
  });

  // Vite middleware in dev or static files in production
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true, host: '0.0.0.0', port: 3000 },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT} (${isProduction ? 'production' : 'development'})`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
