-- Drop tables if they exist
DROP TABLE IF EXISTS user_follows;
DROP TABLE IF EXISTS post_bookmarks;
DROP TABLE IF EXISTS post_likes;
DROP TABLE IF EXISTS post_views;
DROP TABLE IF EXISTS post_tags;
DROP TABLE IF EXISTS tags;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS users;

-- Create users table
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT,
  bio TEXT,
  avatar_url TEXT,
  cover_image_url TEXT,
  website_url TEXT,
  twitter_username TEXT,
  github_username TEXT,
  location TEXT,
  joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_seen_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create posts table
CREATE TABLE posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  content TEXT NOT NULL, -- Markdown content
  content_html TEXT, -- Rendered HTML content
  excerpt TEXT, -- Short preview of the content
  cover_image_url TEXT,
  reading_time_minutes INTEGER,
  is_published INTEGER DEFAULT 0,
  is_featured INTEGER DEFAULT 0,
  user_id INTEGER NOT NULL,
  published_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create comments table
CREATE TABLE comments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  content TEXT NOT NULL,
  post_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  parent_id INTEGER, -- For nested comments
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (parent_id) REFERENCES comments(id) ON DELETE CASCADE
);

-- Create tags table
CREATE TABLE tags (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  color TEXT, -- Hex color code
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create post_tags table (many-to-many relationship)
CREATE TABLE post_tags (
  post_id INTEGER NOT NULL,
  tag_id INTEGER NOT NULL,
  PRIMARY KEY (post_id, tag_id),
  FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
  FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);

-- Create post_views table for analytics
CREATE TABLE post_views (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  post_id INTEGER NOT NULL,
  user_id INTEGER, -- NULL for anonymous views
  ip_address TEXT,
  user_agent TEXT,
  referrer TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Create post_likes table
CREATE TABLE post_likes (
  post_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (post_id, user_id),
  FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create post_bookmarks table
CREATE TABLE post_bookmarks (
  post_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (post_id, user_id),
  FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create user_follows table
CREATE TABLE user_follows (
  follower_id INTEGER NOT NULL,
  following_id INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (follower_id, following_id),
  FOREIGN KEY (follower_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (following_id) REFERENCES users(id) ON DELETE CASCADE,
  CHECK (follower_id != following_id) -- Prevent self-following
);

-- Insert sample data: Users
INSERT INTO users (name, username, email, bio, avatar_url) VALUES
  ('John Doe', 'johndoe', 'john@example.com', 'Full-stack developer passionate about JavaScript and React.', 'https://i.pravatar.cc/150?u=john'),
  ('Jane Smith', 'janesmith', 'jane@example.com', 'Frontend developer and UI/UX enthusiast.', 'https://i.pravatar.cc/150?u=jane'),
  ('Bob Johnson', 'bobjohnson', 'bob@example.com', 'DevOps engineer with a love for automation and cloud technologies.', 'https://i.pravatar.cc/150?u=bob'),
  ('Alice Williams', 'alicewilliams', 'alice@example.com', 'Data scientist and machine learning researcher.', 'https://i.pravatar.cc/150?u=alice');

-- Insert sample data: Tags
INSERT INTO tags (name, slug, description, color) VALUES
  ('JavaScript', 'javascript', 'All things JavaScript, from basics to advanced topics.', '#F7DF1E'),
  ('React', 'react', 'React.js framework and ecosystem.', '#61DAFB'),
  ('Web Development', 'webdev', 'General web development topics and best practices.', '#4A90E2'),
  ('Beginners', 'beginners', 'Content suitable for those new to programming.', '#2ECC71'),
  ('Tutorial', 'tutorial', 'Step-by-step guides and how-tos.', '#9B59B6'),
  ('CSS', 'css', 'Styling, layouts, and CSS frameworks.', '#FF73FA'),
  ('Node.js', 'nodejs', 'Server-side JavaScript with Node.js.', '#68A063'),
  ('TypeScript', 'typescript', 'Strongly typed programming with TypeScript.', '#3178C6'),
  ('DevOps', 'devops', 'Development operations, CI/CD, and deployment.', '#FF6B6B'),
  ('AI', 'ai', 'Artificial intelligence and machine learning.', '#8E44AD');

-- Insert sample data: Posts
INSERT INTO posts (slug, title, subtitle, content, excerpt, cover_image_url, reading_time_minutes, is_published, is_featured, user_id, published_at, created_at) VALUES
  (
    'getting-started-with-react-hooks',
    'Getting Started with React Hooks',
    'A comprehensive guide to React hooks',
    'This is a sample post about React Hooks.',
    'React Hooks are a powerful feature introduced in React 16.8.',
    'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2',
    5,
    1,
    1,
    1,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  (
    'understanding-javascript-promises',
    'Understanding JavaScript Promises',
    'A deep dive into asynchronous JavaScript',
    'This is a sample post about JavaScript Promises.',
    'Promises are a pattern for handling asynchronous operations in JavaScript.',
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c',
    7,
    1,
    0,
    1,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  (
    'css-grid-layout-complete-guide',
    'CSS Grid Layout: A Complete Guide',
    'Master the two-dimensional layout system for the web',
    'This is a sample post about CSS Grid Layout.',
    'CSS Grid Layout is a two-dimensional layout system designed specifically for the web.',
    'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2',
    8,
    1,
    0,
    2,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  );

-- Connect posts to tags
INSERT INTO post_tags (post_id, tag_id) VALUES
  (1, 2), -- React Hooks post with React tag
  (1, 1), -- React Hooks post with JavaScript tag
  (1, 3), -- React Hooks post with Web Development tag
  (1, 5), -- React Hooks post with Tutorial tag
  (2, 1), -- JavaScript Promises post with JavaScript tag
  (2, 4), -- JavaScript Promises post with Beginners tag
  (2, 5), -- JavaScript Promises post with Tutorial tag
  (3, 6), -- CSS Grid post with CSS tag
  (3, 3); -- CSS Grid post with Web Development tag

-- Insert sample comments
INSERT INTO comments (content, post_id, user_id, created_at) VALUES
  ('Great explanation of hooks! I especially liked the useEffect examples.', 1, 2, CURRENT_TIMESTAMP),
  ('This helped me understand hooks much better. Thanks for sharing!', 1, 3, CURRENT_TIMESTAMP),
  ('I''ve been struggling with Promises for a while. This cleared things up!', 2, 3, CURRENT_TIMESTAMP),
  ('CSS Grid has been a game-changer for my layouts. Great guide!', 3, 1, CURRENT_TIMESTAMP);

-- Insert sample post likes
INSERT INTO post_likes (post_id, user_id) VALUES
  (1, 2), (1, 3), -- React Hooks post liked by users 2, 3
  (2, 1), (2, 3), -- JavaScript Promises post liked by users 1, 3
  (3, 1), (3, 4); -- CSS Grid post liked by users 1, 4

-- Insert sample post bookmarks
INSERT INTO post_bookmarks (post_id, user_id) VALUES
  (1, 3), (1, 4), -- React Hooks post bookmarked by users 3, 4
  (2, 1), (2, 4), -- JavaScript Promises post bookmarked by users 1, 4
  (3, 2); -- CSS Grid post bookmarked by user 2

-- Insert sample user follows
INSERT INTO user_follows (follower_id, following_id) VALUES
  (2, 1), (3, 1), (4, 1), -- Users 2, 3, 4 follow user 1
  (1, 2), (3, 2), -- Users 1, 3 follow user 2
  (1, 3), (2, 3); -- Users 1, 2 follow user 3
