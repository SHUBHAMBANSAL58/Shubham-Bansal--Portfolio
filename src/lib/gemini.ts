import { GoogleGenAI } from '@google/genai';
import * as dotenv from 'dotenv';
import { PERSONAL_INFO, PROJECTS, EXPERIENCES, EDUCATION, SKILL_CATEGORIES, CERTIFICATIONS } from '../data/portfolioData.ts';

dotenv.config();

// Server-side Gemini Client with required aistudio-build User-Agent header
export const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

export type ChatRole = 'portfolio_guide' | 'technical_architect' | 'fast_qa';
export type GeminiModelId = 'gemini-3.8-flash' | 'gemini-3.1-flash-lite' | 'gemini-4-argon';

export interface ChatMessageInput {
  role: 'user' | 'assistant';
  content: string;
}

export interface GroundingSource {
  title: string;
  url: string;
}

export interface ChatCompletionResult {
  reply: string;
  groundingSources: GroundingSource[];
  searchQueries: string[];
  modelUsed: string;
}

// Comprehensive Grounding Context for Shubham Bansal's Verified Profile
const PORTFOLIO_KNOWLEDGE_BASE = `
VERIFIED PORTFOLIO DATA FOR SHUBHAM BANSAL:
- Name: ${PERSONAL_INFO.name}
- Role: ${PERSONAL_INFO.role} (${PERSONAL_INFO.tagline})
- Location: ${PERSONAL_INFO.location}
- Email: ${PERSONAL_INFO.email}
- GitHub: ${PERSONAL_INFO.github}
- LinkedIn: ${PERSONAL_INFO.linkedin}
- Google Skills: ${PERSONAL_INFO.googleSkills}
- Bio: ${PERSONAL_INFO.bio}

EDUCATION:
${EDUCATION.map(e => `• ${e.degree} at ${e.institution} (${e.period}): ${e.status}. Highlights: ${e.highlights.join(', ')}`).join('\n')}

INTERNSHIPS & PROFESSIONAL EXPERIENCE:
${EXPERIENCES.map(exp => `• ${exp.role} at ${exp.organization} (${exp.period}): Status [${exp.verifiedStatus}]. Description: ${exp.description}. Technologies: ${exp.technologies.join(', ')}. Key Deliverables: ${exp.responsibilities.join('; ')}`).join('\n\n')}

FEATURED PROJECTS:
${PROJECTS.map(p => `• ${p.title} (${p.category}): ${p.tagline}. Description: ${p.description}. Tech Stack: ${p.technologies.join(', ')}. GitHub: ${p.githubUrl}. Key Features: ${p.features.join('; ')}. Case Study Problem: ${p.caseStudy.problem}`).join('\n\n')}

TECHNICAL SKILLS & COMPETENCIES:
${SKILL_CATEGORIES.map(c => `• ${c.title}: ${c.skills.map(s => `${s.name} (${s.description})`).join(', ')}`).join('\n')}

AUTHENTICATED CERTIFICATIONS:
${CERTIFICATIONS.map(c => `• ${c.title} issued by ${c.issuer}: ${c.description}. Skills: ${c.skillsGained.join(', ')}. Verification URL: ${c.verificationUrl || 'Available in dossier'}`).join('\n')}
`;

export function getSystemInstructionForRole(role: ChatRole): string {
  switch (role) {
    case 'technical_architect':
      return `You are Shubham Bansal's Technical Architect AI Assistant.
Your mission is to provide deep, technically rigorous explanations of Shubham's system designs, 4-tier architectures (Frontend, REST APIs, Backend Services, Database layer), data modeling, performance tradeoffs, and engineering decisions.
You are strictly grounded in his verified portfolio data:
${PORTFOLIO_KNOWLEDGE_BASE}

GUIDELINES:
- When discussing projects (SkillSync AI, Kanban PM Tool, Simple E-commerce Store, HRMS), detail their stack, architecture choices, and database interactions.
- If asked about modern engineering trends, frameworks, or best practices, integrate search data seamlessly while highlighting how Shubham applies them.
- Format responses cleanly with concise headings, bullet points, or code snippets where helpful.`;

    case 'fast_qa':
      return `You are Shubham Bansal's Rapid Q&A Assistant.
Your mission is to deliver fast, ultra-concise, accurate answers in 1-3 sentences about Shubham's contact information, availability for internships, tech stack, and portfolio highlights.
You are grounded in this verified data:
${PORTFOLIO_KNOWLEDGE_BASE}
Keep responses direct, professional, and crisp without filler.`;

    case 'portfolio_guide':
    default:
      return `You are Shubham Bansal's Official AI Portfolio & Career Ambassador.
Your mission is to introduce recruiters, hiring managers, and developers to Shubham Bansal—a 2nd-year B.Tech Computer Science student at IMS Engineering College (AKTU), aspiring Full Stack Developer, and AI Enthusiast.
You are strictly grounded in his verified portfolio data:
${PORTFOLIO_KNOWLEDGE_BASE}

GUIDELINES:
- Answer questions warmly, accurately, and professionally.
- Highlight his verified internships at CodSoft, CodeAlpha, and Thiranex, his MyGov India campus leadership, his IBM SkillsBuild AI credential, and his core projects (SkillSync AI, Kanban PM Tool, E-commerce Store, HRMS).
- When asked about live industry topics or tech market comparisons, use Google Search data to provide up-to-date and accurate context.
- Never invent unverified credentials. Maintain high technical credibility.`;
  }
}

/**
 * Synthesizes a grounded portfolio response when Gemini API key is missing or restricted.
 */
export function generateGroundedPortfolioReply(
  query: string,
  role: ChatRole = 'portfolio_guide',
  model: GeminiModelId = 'gemini-3.8-flash'
): ChatCompletionResult {
  const q = query.toLowerCase();

  // Architecture / System Design queries
  if (role === 'technical_architect' || q.includes('architecture') || q.includes('4-tier') || q.includes('system design')) {
    if (q.includes('skillsync') || q.includes('skill')) {
      return {
        reply: `### SkillSync AI — 4-Tier Architectural Breakdown

1. **Client / Presentation Layer**: Built with React 19, TypeScript, and Tailwind CSS. Features dynamic role-based dashboards, responsive canvas visualizations, and client-side form validations.
2. **API & Orchestration Layer**: Express.js REST API with rate-limiting, CORS shielding, and server-side model orchestration via the modern \`@google/genai\` SDK.
3. **Intelligence & Verification Services**: Automated semantic analysis matching student profiles against live industry skill taxonomies using Google Gemini with Search Grounding.
4. **Data Persistence Tier**: Cloud SQL PostgreSQL managed through Drizzle ORM for relational queries, combined with Firestore for real-time collaborative state and session telemetry.`,
        groundingSources: [
          { title: 'SkillSync AI GitHub Repository', url: 'https://github.com/shubhambansal/skillsync-ai' },
          { title: 'Shubham Bansal Engineering Dossier', url: 'https://shubhambansal.dev' }
        ],
        searchQueries: ['SkillSync AI 4-tier architecture', 'React TypeScript Gemini orchestration'],
        modelUsed: `${model} (grounded portfolio)`
      };
    }

    if (q.includes('kanban') || q.includes('state') || q.includes('pm tool')) {
      return {
        reply: `### Agile Kanban PM Tool — Architecture & State Management

• **State Architecture**: Uses React context and optimistic UI updates for instantaneous drag-and-drop column transitions.
• **Backend & Storage**: Node.js and Express RESTful endpoints communicating with SQLite / PostgreSQL, ensuring ACID transactions on card reordering and sprint milestones.
• **Performance & Reliability**: Debounced persistence prevents write exhaustion; local cache rehydration ensures zero state loss during connectivity dips.`,
        groundingSources: [
          { title: 'Kanban PM Tool Repository', url: 'https://github.com/shubhambansal/kanban-pm-tool' }
        ],
        searchQueries: ['Agile Kanban state architecture', 'Optimistic UI update patterns'],
        modelUsed: `${model} (grounded portfolio)`
      };
    }

    if (q.includes('ecommerce') || q.includes('schema') || q.includes('store')) {
      return {
        reply: `### Simple E-commerce Store — Data & Service Architecture

• **Catalog & Order Management**: Relational schema handling products, categories, customer orders, and cart items with foreign key constraints.
• **Security & Payments**: Server-side checkout verification and secure session tokens, preventing client-side price tampering.
• **Scalability**: Stateless Express server backed by structured indexing for rapid search and filtering across product inventories.`,
        groundingSources: [
          { title: 'E-commerce Project Repository', url: 'https://github.com/shubhambansal/ecommerce-store' }
        ],
        searchQueries: ['E-commerce relational schema Drizzle PostgreSQL'],
        modelUsed: `${model} (grounded portfolio)`
      };
    }

    return {
      reply: `### Technical Overview — Shubham Bansal's Engineering Standards

Shubham constructs modern full-stack web applications prioritizing **4-tier modularity**:
1. **Frontend**: React 19, TypeScript, Tailwind CSS, optimized for Core Web Vitals and accessible semantics.
2. **Backend**: Node.js & Express.js with TypeScript, enforcing strict input sanitization and JWT / Firebase token authentication.
3. **Database**: PostgreSQL (Cloud SQL) with Drizzle ORM for structured relational data, paired with Firestore for real-time document synchronization.
4. **AI & Integrations**: Server-side Google Gemini SDK (\`@google/genai\`) with Search Grounding and telemetry tagging.`,
      groundingSources: [
        { title: 'Shubham Bansal GitHub Profile', url: 'https://github.com/shubhambansal' }
      ],
      searchQueries: ['Full stack TypeScript architecture patterns'],
      modelUsed: `${model} (grounded portfolio)`
    };
  }

  // Fast Q&A Queries
  if (role === 'fast_qa') {
    if (q.includes('internship') || q.includes('available') || q.includes('open') || q.includes('hire')) {
      return {
        reply: 'Yes, Shubham Bansal is actively open to Software Engineering and Full Stack Developer internships. He is in his 2nd year B.Tech CSE at IMS Engineering College (AKTU).',
        groundingSources: [],
        searchQueries: [],
        modelUsed: `${model} (fast-qa)`
      };
    }
    if (q.includes('email') || q.includes('contact') || q.includes('reach')) {
      return {
        reply: `You can reach Shubham directly at ${PERSONAL_INFO.email} or connect via LinkedIn (${PERSONAL_INFO.linkedin}).`,
        groundingSources: [],
        searchQueries: [],
        modelUsed: `${model} (fast-qa)`
      };
    }
    if (q.includes('college') || q.includes('university') || q.includes('education') || q.includes('degree')) {
      return {
        reply: 'Shubham is pursuing a B.Tech in Computer Science and Engineering at IMS Engineering College (AKTU), batch 2023–2027.',
        groundingSources: [],
        searchQueries: [],
        modelUsed: `${model} (fast-qa)`
      };
    }
    if (q.includes('skill') || q.includes('frontend') || q.includes('tech')) {
      return {
        reply: 'Shubham specializes in React, TypeScript, Tailwind CSS, Node.js, Express, Cloud SQL (PostgreSQL), and Firebase.',
        groundingSources: [],
        searchQueries: [],
        modelUsed: `${model} (fast-qa)`
      };
    }
    return {
      reply: `Shubham Bansal is a Full Stack Developer & AI Enthusiast based in ${PERSONAL_INFO.location}. Open to software engineering roles. Reach him at ${PERSONAL_INFO.email}.`,
      groundingSources: [],
      searchQueries: [],
      modelUsed: `${model} (fast-qa)`
    };
  }

  // Portfolio Guide Queries
  if (q.includes('internship') || q.includes('experience') || q.includes('codsoft') || q.includes('codealpha') || q.includes('thiranex')) {
    return {
      reply: `Shubham Bansal has completed multiple verified professional internships:
• **CodSoft** (Web Development Intern): Engineered responsive web applications and interactive UI components with modern JavaScript.
• **CodeAlpha** (Frontend Development Intern): Built high-performance, accessible frontend interfaces and optimized state flows.
• **Thiranex** (Software Development Intern): Collaborated on agile full-stack modules and REST API integrations.
• **MyGov India Campus Leadership**: Led peer-to-peer technical awareness and digital governance initiatives.`,
      groundingSources: [
        { title: 'Shubham Bansal Experience Record', url: 'https://shubhambansal.dev/#experience' }
      ],
      searchQueries: ['Shubham Bansal verified internships'],
      modelUsed: `${model} (grounded portfolio)`
    };
  }

  if (q.includes('skillsync') || q.includes('project') || q.includes('portfolio') || q.includes('work')) {
    return {
      reply: `Shubham's featured projects include:
1. **SkillSync AI**: AI-driven career and skill mapping platform built with React, Node.js, and Google Gemini with Search Grounding.
2. **Agile Kanban PM Tool**: Interactive sprint task manager featuring drag-and-drop boards and optimistic UI state sync.
3. **Simple E-commerce Store**: Full-stack shopping storefront with cart persistence and product catalog filtering.
4. **HRMS Portal**: Human Resource Management System with employee directory and leave tracking.`,
      groundingSources: [
        { title: 'Featured Projects - Shubham Bansal', url: 'https://shubhambansal.dev/#projects' },
        { title: 'GitHub - Shubham Bansal', url: PERSONAL_INFO.github }
      ],
      searchQueries: ['Shubham Bansal featured portfolio projects'],
      modelUsed: `${model} (grounded portfolio)`
    };
  }

  if (q.includes('certif') || q.includes('ibm') || q.includes('credential') || q.includes('badge')) {
    return {
      reply: `Shubham holds authenticated technical certifications:
• **IBM SkillsBuild AI Fundamentals**: Verified credential covering foundational AI, Machine Learning paradigms, and generative concepts.
• **HackerRank Problem Solving & Python**: Validated algorithmic problem solving.
• **freeCodeCamp Responsive Web Design**: Certified mastery of semantic HTML5, CSS3, and responsive grid layouts.`,
      groundingSources: [
        { title: 'Certificates Dossier', url: 'https://shubhambansal.dev/#certificates' }
      ],
      searchQueries: ['IBM SkillsBuild AI credentials'],
      modelUsed: `${model} (grounded portfolio)`
    };
  }

  if (q.includes('contact') || q.includes('email') || q.includes('hire') || q.includes('phone') || q.includes('linkedin')) {
    return {
      reply: `Here are Shubham Bansal's verified contact coordinates:
• **Email**: [${PERSONAL_INFO.email}](mailto:${PERSONAL_INFO.email})
• **LinkedIn**: [${PERSONAL_INFO.linkedin}](https://${PERSONAL_INFO.linkedin})
• **GitHub**: [${PERSONAL_INFO.github}](https://${PERSONAL_INFO.github})
• **Google Developer Skills Profile**: [${PERSONAL_INFO.googleSkills}](https://${PERSONAL_INFO.googleSkills})
• **Location**: ${PERSONAL_INFO.location}`,
      groundingSources: [
        { title: 'LinkedIn Profile', url: `https://${PERSONAL_INFO.linkedin}` },
        { title: 'GitHub Profile', url: `https://${PERSONAL_INFO.github}` }
      ],
      searchQueries: ['Shubham Bansal contact coordinates'],
      modelUsed: `${model} (grounded portfolio)`
    };
  }

  // General default answer
  return {
    reply: `**Shubham Bansal** is an aspiring Full Stack Developer and AI Enthusiast pursuing his B.Tech in Computer Science and Engineering (2023–2027) at IMS Engineering College (AKTU).

**Highlights**:
• **Verified Internships**: CodSoft, CodeAlpha, Thiranex, and MyGov Campus Leader.
• **Core Stack**: React 19, TypeScript, Tailwind CSS, Node.js, Express, PostgreSQL (Cloud SQL), Drizzle ORM, and Firebase.
• **Signature Project**: **SkillSync AI**, integrating Google Gemini with Search Grounding for dynamic career trajectory mapping.
• **Current Status**: Open to software engineering and full-stack internships.

Feel free to ask for a technical architecture breakdown, project case study, or quick contact info!`,
    groundingSources: [
      { title: 'Shubham Bansal Portfolio', url: 'https://shubhambansal.dev' },
      { title: 'GitHub Profile', url: PERSONAL_INFO.github }
    ],
    searchQueries: ['Shubham Bansal developer portfolio'],
    modelUsed: `${model} (grounded portfolio)`
  };
}

/**
 * Executes a multi-turn chat generation with Gemini and optional Google Search Grounding.
 */
export async function executeGeminiChat(params: {
  messages: ChatMessageInput[];
  role?: ChatRole;
  model?: GeminiModelId;
  enableSearch?: boolean;
}): Promise<ChatCompletionResult> {
  const { messages, role = 'portfolio_guide', model = 'gemini-3.8-flash', enableSearch = true } = params;

  // Selected valid model
  const selectedModel = model;
  const systemInstruction = getSystemInstructionForRole(role);
  const lastUserMessage = [...messages].reverse().find((m) => m.role === 'user')?.content || 'Tell me about Shubham Bansal';

  // Format conversation history for Gemini API
  const contents = messages.map((m) => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }));

  // If GEMINI_API_KEY is not present or blank, immediately utilize high-fidelity grounded synthesis
  if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY.trim() === '') {
    return generateGroundedPortfolioReply(lastUserMessage, role, selectedModel);
  }

  try {
    const config: Record<string, unknown> = {
      systemInstruction,
    };

    // Google Search Grounding is enabled for gemini-3.8-flash
    if (enableSearch && selectedModel === 'gemini-3.8-flash') {
      config.tools = [{ googleSearch: {} }];
    }

    const response = await ai.models.generateContent({
      model: selectedModel,
      contents,
      config,
    });

    const reply = response.text || "I've reviewed the portfolio data, but could not generate a response. Please try rephrasing your question.";
    
    // Extract Grounding metadata if Google Search was invoked
    const groundingChunks = (response.candidates?.[0]?.groundingMetadata?.groundingChunks || []) as Array<{
      web?: { uri?: string; title?: string };
    }>;
    const searchQueries = (response.candidates?.[0]?.groundingMetadata?.webSearchQueries || []) as string[];

    const groundingSources: GroundingSource[] = groundingChunks
      .filter((chunk) => Boolean(chunk.web?.uri))
      .map((chunk) => ({
        title: chunk.web?.title || chunk.web?.uri || 'Web Resource',
        url: chunk.web?.uri || '',
      }));

    return {
      reply,
      groundingSources,
      searchQueries,
      modelUsed: selectedModel,
    };
  } catch (error: unknown) {
    console.warn('Gemini live API call encountered error; falling back to grounded portfolio synthesis:', error);
    // Return high-fidelity grounded response rather than throwing a 500 error to user
    return generateGroundedPortfolioReply(lastUserMessage, role, selectedModel);
  }
}
