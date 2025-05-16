-- Drop tables if they exist
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS posts;

-- Create users table
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  bio TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create posts table
CREATE TABLE posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  user_id INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Insert sample data
INSERT INTO users (name, username, email, bio) VALUES 
  ('John Doe', 'johndoe', 'john@example.com', 'Full-stack developer'),
  ('Jane Smith', 'janesmith', 'jane@example.com', 'Frontend developer');

INSERT INTO posts (slug, title, content, user_id) VALUES
  ('first-post', 'First Post', 'This is my first post content', 1),
  ('second-post', 'Second Post', 'This is another post by John', 1),
  ('hello-world', 'Hello World', 'Jane''s first blog post', 2);
