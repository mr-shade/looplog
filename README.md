# 🔄 Loop Log — A Medium-style Blogging Platform for Developers

Loop Log is a modern, open-source blogging platform for developers — inspired by [Medium](https://medium.com) and [DEV.TO](https://dev.to), built with a clean, minimalist design and powerful features.

## 🚀 Features

- 📝 Write and publish articles with a rich markdown editor
- 🏷️ Organize content with tags
- 👍 Like, comment, and bookmark posts
- 👥 User profiles and following system
- 📊 Analytics for your posts
- 🔍 Search functionality
- 📱 Responsive design with Tailwind CSS
- 🌙 Dark mode support
- 🚀 Deployed on Cloudflare Pages
- 💾 Data stored in Cloudflare D1

## 🛠️ Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Next.js API routes, Cloudflare Workers
- **Database**: Cloudflare D1 (SQLite)
- **ORM**: Drizzle ORM
- **Authentication**: NextAuth.js
- **Markdown**: Marked, DOMPurify

## 📦 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Wrangler CLI (`npm install -g wrangler`)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/looplog.git
   cd looplog
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create a D1 database (if you don't have one already)
   ```bash
   npx wrangler d1 create looplog
   ```

4. Update your `wrangler.toml` file with your database details

5. Run the database migrations
   ```bash
   # For local development
   npx wrangler d1 execute looplog --local --file=./schema.sql

   # For production
   npx wrangler d1 execute looplog --file=./schema.sql
   ```

6. Start the development server
   ```bash
   npm run dev
   ```

7. Open [http://localhost:3000](http://localhost:3000) in your browser

## 💾 Database Schema

The application uses a relational database with the following main tables:

- `users`: User accounts and profiles
- `posts`: Blog posts with markdown content
- `comments`: Post comments with threading support
- `tags`: Content categorization
- `post_tags`: Many-to-many relationship between posts and tags
- `post_likes`: Track post likes
- `post_bookmarks`: Track post bookmarks
- `user_follows`: Track user follows
- `post_views`: Analytics for post views

## 🚀 Deployment

### Deploying to Cloudflare Pages

1. Create a Cloudflare Pages project
   ```bash
   npx wrangler pages project create looplog
   ```

2. Build the project
   ```bash
   npm run build
   ```

3. Deploy to Cloudflare Pages
   ```bash
   npx wrangler pages deploy .next
   ```

4. Bind your D1 database to your Pages project
   ```bash
   npx wrangler pages deployment environment update --branch main --binding DB=YOUR_DATABASE_BINDING
   ```

## 💡 Inspiration

Inspired by:

* [Medium](https://medium.com)
* [dev.to](https://dev.to)
* [Hashnode](https://hashnode.com)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgements

- [Next.js](https://nextjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Cloudflare](https://www.cloudflare.com/)
- [Marked](https://marked.js.org/)
- [DOMPurify](https://github.com/cure53/DOMPurify)
