import { drizzle } from 'drizzle-orm/d1';
import { getRequestContext } from '@cloudflare/next-on-pages';
import * as schema from './schema';

// Create a Drizzle client for D1
export function getDB() {
  const { env } = getRequestContext();
  return drizzle(env.DB, { schema });
}

// Helper function to get all users
export async function getAllUsers() {
  const { env } = getRequestContext();
  const result = await env.DB.prepare(`
    SELECT * FROM users ORDER BY id DESC
  `).all();
  return result.results;
}

// Helper function to get a user by ID
export async function getUserById(id: number) {
  const { env } = getRequestContext();
  const result = await env.DB.prepare(`
    SELECT * FROM users WHERE id = ?
  `).bind(id).first();
  return result || null;
}

// Helper function to get a user by email
export async function getUserByEmail(email: string) {
  const { env } = getRequestContext();
  const result = await env.DB.prepare(`
    SELECT * FROM users WHERE email = ?
  `).bind(email).first();
  return result || null;
}

// Helper function to create a new user
export async function createUser(user: schema.NewUser) {
  const { env } = getRequestContext();
  // Insert the new user
  await env.DB.prepare(`
    INSERT INTO users (name, username, email, bio, avatar_url, password_hash)
    VALUES (?, ?, ?, ?, ?, ?)
  `).bind(
    user.name,
    user.username,
    user.email,
    user.bio || null,
    user.avatar_url || null,
    user.password_hash || null
  ).run();

  // Fetch the newly created user
  const newUser = await env.DB.prepare(`
    SELECT * FROM users WHERE email = ?
  `).bind(user.email).first();

  return newUser;
}

// Helper function to get all posts with user info
export async function getAllPosts() {
  // Use the D1 specific .all() method with a prepared statement
  const { env } = getRequestContext();
  const result = await env.DB.prepare(`
    SELECT
      p.id,
      p.slug,
      p.title,
      p.subtitle,
      p.content,
      p.content_html,
      p.excerpt,
      p.cover_image_url,
      p.reading_time_minutes,
      p.is_published,
      p.is_featured,
      p.published_at,
      p.created_at,
      p.updated_at,
      p.user_id,
      u.name as user_name,
      u.username as user_username,
      u.email as user_email,
      u.avatar_url as user_avatar_url,
      (SELECT COUNT(*) FROM post_likes WHERE post_id = p.id) as like_count,
      (SELECT COUNT(*) FROM comments WHERE post_id = p.id) as comment_count
    FROM posts p
    JOIN users u ON p.user_id = u.id
    WHERE p.is_published = 1
    ORDER BY p.published_at DESC
  `).all();

  return result.results;
}

// Helper function to get featured posts
export async function getFeaturedPosts() {
  const { env } = getRequestContext();
  const result = await env.DB.prepare(`
    SELECT
      p.id,
      p.slug,
      p.title,
      p.subtitle,
      p.excerpt,
      p.cover_image_url,
      p.reading_time_minutes,
      p.published_at,
      p.user_id,
      u.name as user_name,
      u.username as user_username,
      u.avatar_url as user_avatar_url
    FROM posts p
    JOIN users u ON p.user_id = u.id
    WHERE p.is_published = 1 AND p.is_featured = 1
    ORDER BY p.published_at DESC
    LIMIT 5
  `).all();

  return result.results;
}

// Helper function to create a new post
export async function createPost(post: schema.NewPost) {
  const { env } = getRequestContext();
  // Insert the new post
  await env.DB.prepare(`
    INSERT INTO posts (
      slug,
      title,
      subtitle,
      content,
      content_html,
      excerpt,
      cover_image_url,
      reading_time_minutes,
      is_published,
      is_featured,
      user_id,
      published_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).bind(
    post.slug,
    post.title,
    post.subtitle || null,
    post.content,
    post.content_html || null,
    post.excerpt || null,
    post.cover_image_url || null,
    post.reading_time_minutes || null,
    post.is_published || 0,
    post.is_featured || 0,
    post.user_id,
    post.is_published ? (post.published_at || new Date().toISOString()) : null
  ).run();

  // Fetch the newly created post
  const newPost = await env.DB.prepare(`
    SELECT * FROM posts
    WHERE slug = ?
    LIMIT 1
  `).bind(post.slug).first();

  return newPost;
}

// Helper function to get a post by slug
export async function getPostBySlug(slug: string) {
  const { env } = getRequestContext();
  const result = await env.DB.prepare(`
    SELECT
      p.id,
      p.slug,
      p.title,
      p.subtitle,
      p.content,
      p.content_html,
      p.excerpt,
      p.cover_image_url,
      p.reading_time_minutes,
      p.is_published,
      p.is_featured,
      p.published_at,
      p.created_at,
      p.updated_at,
      p.user_id,
      u.name as user_name,
      u.username as user_username,
      u.email as user_email,
      u.avatar_url as user_avatar_url,
      u.bio as user_bio,
      (SELECT COUNT(*) FROM post_likes WHERE post_id = p.id) as like_count,
      (SELECT COUNT(*) FROM comments WHERE post_id = p.id) as comment_count
    FROM posts p
    JOIN users u ON p.user_id = u.id
    WHERE p.slug = ? AND p.is_published = 1
  `).bind(slug).first();

  return result || null;
}

// Helper function to get posts by tag
export async function getPostsByTag(tagSlug: string) {
  const { env } = getRequestContext();
  const result = await env.DB.prepare(`
    SELECT
      p.id,
      p.slug,
      p.title,
      p.subtitle,
      p.excerpt,
      p.cover_image_url,
      p.reading_time_minutes,
      p.published_at,
      p.user_id,
      u.name as user_name,
      u.username as user_username,
      u.avatar_url as user_avatar_url,
      (SELECT COUNT(*) FROM post_likes WHERE post_id = p.id) as like_count,
      (SELECT COUNT(*) FROM comments WHERE post_id = p.id) as comment_count
    FROM posts p
    JOIN users u ON p.user_id = u.id
    JOIN post_tags pt ON p.id = pt.post_id
    JOIN tags t ON pt.tag_id = t.id
    WHERE t.slug = ? AND p.is_published = 1
    ORDER BY p.published_at DESC
  `).bind(tagSlug).all();

  return result.results;
}

// Helper function to get all tags with post counts
export async function getAllTags() {
  const { env } = getRequestContext();
  const result = await env.DB.prepare(`
    SELECT
      t.id,
      t.name,
      t.slug,
      t.description,
      t.color,
      COUNT(pt.post_id) as post_count
    FROM tags t
    LEFT JOIN post_tags pt ON t.id = pt.tag_id
    LEFT JOIN posts p ON pt.post_id = p.id AND p.is_published = 1
    GROUP BY t.id
    HAVING post_count > 0
    ORDER BY post_count DESC
  `).all();

  return result.results;
}

// Helper function to get posts by user
export async function getPostsByUser(username: string) {
  const { env } = getRequestContext();
  const result = await env.DB.prepare(`
    SELECT
      p.id,
      p.slug,
      p.title,
      p.subtitle,
      p.excerpt,
      p.cover_image_url,
      p.reading_time_minutes,
      p.published_at,
      p.user_id,
      u.name as user_name,
      u.username as user_username,
      u.avatar_url as user_avatar_url,
      (SELECT COUNT(*) FROM post_likes WHERE post_id = p.id) as like_count,
      (SELECT COUNT(*) FROM comments WHERE post_id = p.id) as comment_count
    FROM posts p
    JOIN users u ON p.user_id = u.id
    WHERE u.username = ? AND p.is_published = 1
    ORDER BY p.published_at DESC
  `).bind(username).all();

  return result.results;
}

// Helper function to get a user by username
export async function getUserByUsername(username: string) {
  const { env } = getRequestContext();
  const result = await env.DB.prepare(`
    SELECT
      u.id,
      u.name,
      u.username,
      u.email,
      u.bio,
      u.avatar_url,
      u.cover_image_url,
      u.website_url,
      u.twitter_username,
      u.github_username,
      u.location,
      u.joined_at,
      (SELECT COUNT(*) FROM posts WHERE user_id = u.id AND is_published = 1) as post_count,
      (SELECT COUNT(*) FROM user_follows WHERE following_id = u.id) as follower_count,
      (SELECT COUNT(*) FROM user_follows WHERE follower_id = u.id) as following_count
    FROM users u
    WHERE u.username = ?
  `).bind(username).first();

  return result || null;
}

// Helper function to get comments for a post
export async function getCommentsForPost(postId: number) {
  const { env } = getRequestContext();
  const result = await env.DB.prepare(`
    SELECT
      c.id,
      c.content,
      c.post_id,
      c.user_id,
      c.parent_id,
      c.created_at,
      c.updated_at,
      u.name as user_name,
      u.username as user_username,
      u.avatar_url as user_avatar_url
    FROM comments c
    JOIN users u ON c.user_id = u.id
    WHERE c.post_id = ?
    ORDER BY c.created_at ASC
  `).bind(postId).all();

  return result.results;
}

// Helper function to add a comment to a post
export async function addComment(comment: schema.NewComment) {
  const { env } = getRequestContext();
  await env.DB.prepare(`
    INSERT INTO comments (content, post_id, user_id, parent_id)
    VALUES (?, ?, ?, ?)
  `).bind(
    comment.content,
    comment.post_id,
    comment.user_id,
    comment.parent_id || null
  ).run();

  // Fetch the newly created comment
  const result = await env.DB.prepare(`
    SELECT
      c.id,
      c.content,
      c.post_id,
      c.user_id,
      c.parent_id,
      c.created_at,
      c.updated_at,
      u.name as user_name,
      u.username as user_username,
      u.avatar_url as user_avatar_url
    FROM comments c
    JOIN users u ON c.user_id = u.id
    WHERE c.post_id = ? AND c.user_id = ?
    ORDER BY c.id DESC
    LIMIT 1
  `).bind(comment.post_id, comment.user_id).first();

  return result;
}

// Helper function to like a post
export async function likePost(postId: number, userId: number) {
  const { env } = getRequestContext();
  try {
    await env.DB.prepare(`
      INSERT INTO post_likes (post_id, user_id)
      VALUES (?, ?)
    `).bind(postId, userId).run();
    return true;
  } catch (error) {
    // If the user has already liked the post, this will fail due to the unique constraint
    return false;
  }
}

// Helper function to unlike a post
export async function unlikePost(postId: number, userId: number) {
  const { env } = getRequestContext();
  const result = await env.DB.prepare(`
    DELETE FROM post_likes
    WHERE post_id = ? AND user_id = ?
  `).bind(postId, userId).run();

  return result.success;
}

// Helper function to check if a user has liked a post
export async function hasUserLikedPost(postId: number, userId: number) {
  const { env } = getRequestContext();
  const result = await env.DB.prepare(`
    SELECT 1 FROM post_likes
    WHERE post_id = ? AND user_id = ?
  `).bind(postId, userId).first();

  return !!result;
}

// Helper function to bookmark a post
export async function bookmarkPost(postId: number, userId: number) {
  const { env } = getRequestContext();
  try {
    await env.DB.prepare(`
      INSERT INTO post_bookmarks (post_id, user_id)
      VALUES (?, ?)
    `).bind(postId, userId).run();
    return true;
  } catch (error) {
    // If the user has already bookmarked the post, this will fail due to the unique constraint
    return false;
  }
}

// Helper function to remove a bookmark
export async function removeBookmark(postId: number, userId: number) {
  const { env } = getRequestContext();
  const result = await env.DB.prepare(`
    DELETE FROM post_bookmarks
    WHERE post_id = ? AND user_id = ?
  `).bind(postId, userId).run();

  return result.success;
}

// Helper function to check if a user has bookmarked a post
export async function hasUserBookmarkedPost(postId: number, userId: number) {
  const { env } = getRequestContext();
  const result = await env.DB.prepare(`
    SELECT 1 FROM post_bookmarks
    WHERE post_id = ? AND user_id = ?
  `).bind(postId, userId).first();

  return !!result;
}

// Helper function to get bookmarked posts for a user
export async function getBookmarkedPosts(userId: number) {
  const { env } = getRequestContext();
  const result = await env.DB.prepare(`
    SELECT
      p.id,
      p.slug,
      p.title,
      p.subtitle,
      p.excerpt,
      p.cover_image_url,
      p.reading_time_minutes,
      p.published_at,
      p.user_id,
      u.name as user_name,
      u.username as user_username,
      u.avatar_url as user_avatar_url,
      (SELECT COUNT(*) FROM post_likes WHERE post_id = p.id) as like_count,
      (SELECT COUNT(*) FROM comments WHERE post_id = p.id) as comment_count,
      pb.created_at as bookmarked_at
    FROM post_bookmarks pb
    JOIN posts p ON pb.post_id = p.id
    JOIN users u ON p.user_id = u.id
    WHERE pb.user_id = ? AND p.is_published = 1
    ORDER BY pb.created_at DESC
  `).bind(userId).all();

  return result.results;
}

// Helper function to follow a user
export async function followUser(followerId: number, followingId: number) {
  const { env } = getRequestContext();
  try {
    await env.DB.prepare(`
      INSERT INTO user_follows (follower_id, following_id)
      VALUES (?, ?)
    `).bind(followerId, followingId).run();
    return true;
  } catch (error) {
    // If the user is already following, this will fail due to the unique constraint
    return false;
  }
}

// Helper function to unfollow a user
export async function unfollowUser(followerId: number, followingId: number) {
  const { env } = getRequestContext();
  const result = await env.DB.prepare(`
    DELETE FROM user_follows
    WHERE follower_id = ? AND following_id = ?
  `).bind(followerId, followingId).run();

  return result.success;
}

// Helper function to check if a user is following another user
export async function isFollowing(followerId: number, followingId: number) {
  const { env } = getRequestContext();
  const result = await env.DB.prepare(`
    SELECT 1 FROM user_follows
    WHERE follower_id = ? AND following_id = ?
  `).bind(followerId, followingId).first();

  return !!result;
}

// Helper function to get followers of a user
export async function getFollowers(userId: number) {
  const { env } = getRequestContext();
  const result = await env.DB.prepare(`
    SELECT
      u.id,
      u.name,
      u.username,
      u.avatar_url,
      u.bio,
      uf.created_at as followed_at
    FROM user_follows uf
    JOIN users u ON uf.follower_id = u.id
    WHERE uf.following_id = ?
    ORDER BY uf.created_at DESC
  `).bind(userId).all();

  return result.results;
}

// Helper function to get users followed by a user
export async function getFollowing(userId: number) {
  const { env } = getRequestContext();
  const result = await env.DB.prepare(`
    SELECT
      u.id,
      u.name,
      u.username,
      u.avatar_url,
      u.bio,
      uf.created_at as followed_at
    FROM user_follows uf
    JOIN users u ON uf.following_id = u.id
    WHERE uf.follower_id = ?
    ORDER BY uf.created_at DESC
  `).bind(userId).all();

  return result.results;
}

// Helper function to record a post view
export async function recordPostView(postId: number, userId: number | null, ipAddress: string, userAgent: string, referrer: string) {
  const { env } = getRequestContext();
  await env.DB.prepare(`
    INSERT INTO post_views (post_id, user_id, ip_address, user_agent, referrer)
    VALUES (?, ?, ?, ?, ?)
  `).bind(
    postId,
    userId,
    ipAddress,
    userAgent,
    referrer
  ).run();

  // Update the post's view count
  await env.DB.prepare(`
    UPDATE posts
    SET views = views + 1
    WHERE id = ?
  `).bind(postId).run();
}
