import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

// Authenticated users (recruiters, peers, visitors) via Firebase Auth
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  uid: text('uid').notNull().unique(), // Firebase Auth UID
  email: text('email').notNull(),
  displayName: text('display_name'),
  photoUrl: text('photo_url'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Contact inquiries and recruiter communications submitted to Shubham Bansal
export const contactMessages = pgTable('contact_messages', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  subject: text('subject').notNull(),
  message: text('message').notNull(),
  userId: integer('user_id').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow(),
});

// Relational definitions
export const usersRelations = relations(users, ({ many }) => ({
  contactMessages: many(contactMessages),
}));

export const contactMessagesRelations = relations(contactMessages, ({ one }) => ({
  sender: one(users, {
    fields: [contactMessages.userId],
    references: [users.id],
  }),
}));
