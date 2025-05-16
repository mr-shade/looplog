import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

// Define the users table
export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  username: text('username').notNull().unique(),
  email: text('email').notNull().unique(),
  password_hash: text('password_hash'),
  bio: text('bio'),
  avatar_url: text('avatar_url'),
  cover_image_url: text('cover_image_url'),
  website_url: text('website_url'),
  twitter_username: text('twitter_username'),
  github_username: text('github_username'),
  location: text('location'),
  joined_at: text('joined_at').default(sql`CURRENT_TIMESTAMP`),
  last_seen_at: text('last_seen_at').default(sql`CURRENT_TIMESTAMP`),
});

// Define the posts table
export const posts = sqliteTable('posts', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  subtitle: text('subtitle'),
  content: text('content').notNull(),
  content_html: text('content_html'),
  excerpt: text('excerpt'),
  cover_image_url: text('cover_image_url'),
  reading_time_minutes: integer('reading_time_minutes'),
  is_published: integer('is_published', { mode: 'boolean' }).default(false),
  is_featured: integer('is_featured', { mode: 'boolean' }).default(false),
  user_id: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  published_at: text('published_at'),
  created_at: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  updated_at: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

// Define the comments table
export const comments = sqliteTable('comments', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  content: text('content').notNull(),
  post_id: integer('post_id').notNull().references(() => posts.id, { onDelete: 'cascade' }),
  user_id: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  parent_id: integer('parent_id').references(() => comments.id, { onDelete: 'cascade' }),
  created_at: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  updated_at: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

// Define the tags table
export const tags = sqliteTable('tags', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull().unique(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
  color: text('color'),
  created_at: text('created_at').default(sql`CURRENT_TIMESTAMP`),
});

// Define the post_tags table
export const postTags = sqliteTable('post_tags', {
  post_id: integer('post_id').notNull().references(() => posts.id, { onDelete: 'cascade' }),
  tag_id: integer('tag_id').notNull().references(() => tags.id, { onDelete: 'cascade' }),
});

// Define the post_views table
export const postViews = sqliteTable('post_views', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  post_id: integer('post_id').notNull().references(() => posts.id, { onDelete: 'cascade' }),
  user_id: integer('user_id').references(() => users.id, { onDelete: 'set null' }),
  ip_address: text('ip_address'),
  user_agent: text('user_agent'),
  referrer: text('referrer'),
  created_at: text('created_at').default(sql`CURRENT_TIMESTAMP`),
});

// Define the post_likes table
export const postLikes = sqliteTable('post_likes', {
  post_id: integer('post_id').notNull().references(() => posts.id, { onDelete: 'cascade' }),
  user_id: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  created_at: text('created_at').default(sql`CURRENT_TIMESTAMP`),
});

// Define the post_bookmarks table
export const postBookmarks = sqliteTable('post_bookmarks', {
  post_id: integer('post_id').notNull().references(() => posts.id, { onDelete: 'cascade' }),
  user_id: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  created_at: text('created_at').default(sql`CURRENT_TIMESTAMP`),
});

// Define the user_follows table
export const userFollows = sqliteTable('user_follows', {
  follower_id: integer('follower_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  following_id: integer('following_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  created_at: text('created_at').default(sql`CURRENT_TIMESTAMP`),
});

// Define TypeScript types based on the schema
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Post = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert;

export type Comment = typeof comments.$inferSelect;
export type NewComment = typeof comments.$inferInsert;

export type Tag = typeof tags.$inferSelect;
export type NewTag = typeof tags.$inferInsert;

export type PostTag = typeof postTags.$inferSelect;
export type NewPostTag = typeof postTags.$inferInsert;

export type PostView = typeof postViews.$inferSelect;
export type NewPostView = typeof postViews.$inferInsert;

export type PostLike = typeof postLikes.$inferSelect;
export type NewPostLike = typeof postLikes.$inferInsert;

export type PostBookmark = typeof postBookmarks.$inferSelect;
export type NewPostBookmark = typeof postBookmarks.$inferInsert;

export type UserFollow = typeof userFollows.$inferSelect;
export type NewUserFollow = typeof userFollows.$inferInsert;
