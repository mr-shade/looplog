import Link from "next/link";
import Image from "next/image";

interface PostCardProps {
  post: {
    id: number;
    slug: string;
    title: string;
    subtitle?: string;
    excerpt?: string;
    cover_image_url?: string;
    reading_time_minutes?: number;
    published_at: string;
    user_id: number;
    user_name: string;
    user_username: string;
    user_avatar_url?: string;
    like_count?: number;
    comment_count?: number;
  };
  featured?: boolean;
}

export default function PostCard({ post, featured = false }: PostCardProps) {
  const formattedDate = new Date(post.published_at).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  if (featured) {
    return (
      <article className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="relative aspect-[16/9] rounded-lg overflow-hidden">
          {post.cover_image_url ? (
            <Link href={`/posts/${post.slug}`}>
              <img
                src={post.cover_image_url}
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </Link>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-indigo-100 to-violet-100 dark:from-indigo-900 dark:to-violet-900" />
          )}
        </div>
        <div className="flex flex-col justify-center">
          <div className="mb-4">
            <Link
              href={`/@${post.user_username}`}
              className="flex items-center space-x-2 mb-2 group"
            >
              <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center overflow-hidden">
                {post.user_avatar_url ? (
                  <img
                    src={post.user_avatar_url}
                    alt={post.user_name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-indigo-600 dark:text-indigo-400 font-medium">
                    {post.user_name.charAt(0)}
                  </span>
                )}
              </div>
              <span className="text-gray-700 dark:text-gray-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {post.user_name}
              </span>
            </Link>
            <Link href={`/posts/${post.slug}`} className="block group">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {post.title}
              </h2>
              {post.subtitle && (
                <p className="text-xl text-gray-700 dark:text-gray-300 mb-3">
                  {post.subtitle}
                </p>
              )}
              {post.excerpt && (
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
              )}
            </Link>
          </div>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <span>{formattedDate}</span>
            <span className="mx-2">·</span>
            <span>{post.reading_time_minutes || 5} min read</span>
            {(post.like_count || post.comment_count) && (
              <>
                <span className="mx-2">·</span>
                <div className="flex items-center space-x-4">
                  {post.like_count !== undefined && (
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                      <span>{post.like_count}</span>
                    </div>
                  )}
                  {post.comment_count !== undefined && (
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                      </svg>
                      <span>{post.comment_count}</span>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="border-b border-gray-200 dark:border-gray-800 pb-8 mb-8 last:border-0">
      <div className="flex flex-col md:flex-row md:items-start gap-6">
        <div className="md:flex-1">
          <div className="mb-4">
            <Link
              href={`/@${post.user_username}`}
              className="flex items-center space-x-2 mb-2 group"
            >
              <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center overflow-hidden">
                {post.user_avatar_url ? (
                  <img
                    src={post.user_avatar_url}
                    alt={post.user_name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-indigo-600 dark:text-indigo-400 font-medium text-xs">
                    {post.user_name.charAt(0)}
                  </span>
                )}
              </div>
              <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {post.user_name}
              </span>
            </Link>
            <Link href={`/posts/${post.slug}`} className="block group">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {post.title}
              </h2>
              {post.excerpt && (
                <p className="text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                  {post.excerpt}
                </p>
              )}
            </Link>
          </div>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <span>{formattedDate}</span>
            <span className="mx-2">·</span>
            <span>{post.reading_time_minutes || 5} min read</span>
            {(post.like_count || post.comment_count) && (
              <>
                <span className="mx-2">·</span>
                <div className="flex items-center space-x-4">
                  {post.like_count !== undefined && (
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                      <span>{post.like_count}</span>
                    </div>
                  )}
                  {post.comment_count !== undefined && (
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                      </svg>
                      <span>{post.comment_count}</span>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
        {post.cover_image_url && (
          <div className="md:w-48 md:h-32 rounded-lg overflow-hidden">
            <Link href={`/posts/${post.slug}`}>
              <img
                src={post.cover_image_url}
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </Link>
          </div>
        )}
      </div>
    </article>
  );
}
