import Link from "next/link";
import { notFound } from "next/navigation";
import MainLayout from "@/components/layout/MainLayout";
import TagBadge from "@/components/tags/TagBadge";
import { getPostBySlug, getCommentsForPost } from "@/db";

// Set edge runtime for Cloudflare Pages
export const runtime = 'edge';

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  
  if (!post) {
    return notFound();
  }

  const comments = await getCommentsForPost(post.id);

  // Format the date
  const formattedDate = new Date(post.published_at).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <MainLayout>
      <article className="pt-10">
        {/* Post Header */}
        <header className="container mx-auto px-4 mb-12">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {post.title}
            </h1>
            
            {post.subtitle && (
              <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-6">
                {post.subtitle}
              </p>
            )}
            
            <div className="flex items-center mb-6">
              <Link href={`/@${post.user_username}`} className="flex items-center group">
                <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center overflow-hidden mr-4">
                  {post.user_avatar_url ? (
                    <img
                      src={post.user_avatar_url}
                      alt={post.user_name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-indigo-600 dark:text-indigo-400 font-medium text-lg">
                      {post.user_name.charAt(0)}
                    </span>
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {post.user_name}
                  </p>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <span>{formattedDate}</span>
                    <span className="mx-2">·</span>
                    <span>{post.reading_time_minutes || 5} min read</span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
          
          {/* Cover Image */}
          {post.cover_image_url && (
            <div className="max-w-4xl mx-auto mt-8">
              <div className="aspect-[16/9] rounded-lg overflow-hidden">
                <img
                  src={post.cover_image_url}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}
        </header>
        
        {/* Post Content */}
        <div className="container mx-auto px-4 mb-16">
          <div className="max-w-3xl mx-auto">
            <div 
              className="prose dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content_html || '' }}
            />
            
            {/* Tags */}
            <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-800">
              <div className="flex flex-wrap gap-2">
                {/* In a real app, you would fetch and display tags for this post */}
                <TagBadge tag={{ name: "JavaScript", slug: "javascript" }} />
                <TagBadge tag={{ name: "React", slug: "react" }} />
                <TagBadge tag={{ name: "Web Development", slug: "webdev" }} />
              </div>
            </div>
            
            {/* Author Bio */}
            <div className="mt-12 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-start">
                <Link href={`/@${post.user_username}`} className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center overflow-hidden mr-4">
                    {post.user_avatar_url ? (
                      <img
                        src={post.user_avatar_url}
                        alt={post.user_name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-indigo-600 dark:text-indigo-400 font-medium text-xl">
                        {post.user_name.charAt(0)}
                      </span>
                    )}
                  </div>
                </Link>
                <div>
                  <Link 
                    href={`/@${post.user_username}`}
                    className="font-medium text-lg text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    {post.user_name}
                  </Link>
                  <p className="text-gray-600 dark:text-gray-400 mt-1 mb-3">
                    {post.user_bio || "Writer at Loop Log"}
                  </p>
                  <button className="text-sm px-4 py-1 border border-gray-300 dark:border-gray-700 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    Follow
                  </button>
                </div>
              </div>
            </div>
            
            {/* Post Actions */}
            <div className="mt-12 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
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
                  <span>{post.like_count || 0}</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
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
                  <span>{comments.length}</span>
                </button>
              </div>
              <div className="flex items-center space-x-4">
                <button className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                    />
                  </svg>
                </button>
                <button className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                    />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Comments Section */}
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                Comments ({comments.length})
              </h2>
              
              {/* Comment Form */}
              <div className="mb-12">
                <textarea
                  placeholder="Add to the discussion"
                  className="w-full p-4 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  rows={4}
                />
                <div className="mt-2 flex justify-end">
                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md">
                    Submit
                  </button>
                </div>
              </div>
              
              {/* Comments List */}
              <div className="space-y-8">
                {comments.length > 0 ? (
                  comments.map((comment: any) => (
                    <div key={comment.id} className="flex space-x-4">
                      <div className="flex-shrink-0">
                        <Link href={`/@${comment.user_username}`}>
                          <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center overflow-hidden">
                            {comment.user_avatar_url ? (
                              <img
                                src={comment.user_avatar_url}
                                alt={comment.user_name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <span className="text-indigo-600 dark:text-indigo-400 font-medium">
                                {comment.user_name.charAt(0)}
                              </span>
                            )}
                          </div>
                        </Link>
                      </div>
                      <div className="flex-1">
                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <Link
                              href={`/@${comment.user_username}`}
                              className="font-medium text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                            >
                              {comment.user_name}
                            </Link>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {new Date(comment.created_at).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300">{comment.content}</p>
                          <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                            <button className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                              Like
                            </button>
                            <button className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                              Reply
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500 dark:text-gray-400">
                      No comments yet. Be the first to share your thoughts!
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </article>
    </MainLayout>
  );
}
