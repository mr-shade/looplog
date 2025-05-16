import Link from "next/link";
import { notFound } from "next/navigation";
import MainLayout from "@/components/layout/MainLayout";
import PostCard from "@/components/posts/PostCard";
import { getUserByUsername, getPostsByUser } from "@/db";

// Set edge runtime for Cloudflare Pages
export const runtime = 'edge';

export default async function UserProfilePage({ params }: { params: { username: string } }) {
  const user = await getUserByUsername(params.username);
  
  if (!user) {
    return notFound();
  }
  
  const posts = await getPostsByUser(params.username);

  // Format the date
  const joinedDate = new Date(user.joined_at).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        {/* Cover Image */}
        <div className="relative h-48 md:h-64 lg:h-80 w-full rounded-lg overflow-hidden mb-8">
          {user.cover_image_url ? (
            <img
              src={user.cover_image_url}
              alt={`${user.name}'s cover`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-indigo-500 to-purple-600" />
          )}
        </div>
        
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row md:items-end -mt-20 mb-8 relative">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white dark:border-gray-900 overflow-hidden bg-white dark:bg-gray-800 flex items-center justify-center z-10">
              {user.avatar_url ? (
                <img
                  src={user.avatar_url}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-5xl font-bold text-indigo-600 dark:text-indigo-400">
                  {user.name.charAt(0)}
                </span>
              )}
            </div>
            
            <div className="md:ml-6 mt-4 md:mt-0 flex-1">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {user.name}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                @{user.username}
              </p>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                <span>Joined {joinedDate}</span>
                {user.location && (
                  <>
                    <span className="mx-2">·</span>
                    <span>{user.location}</span>
                  </>
                )}
              </div>
            </div>
            
            <div className="mt-4 md:mt-0">
              <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full">
                Follow
              </button>
            </div>
          </div>
          
          {/* Bio */}
          {user.bio && (
            <div className="mb-8">
              <p className="text-gray-700 dark:text-gray-300">
                {user.bio}
              </p>
            </div>
          )}
          
          {/* Stats */}
          <div className="flex space-x-8 mb-8">
            <div className="text-center">
              <span className="block text-2xl font-bold text-gray-900 dark:text-white">
                {user.post_count || 0}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Posts
              </span>
            </div>
            <div className="text-center">
              <span className="block text-2xl font-bold text-gray-900 dark:text-white">
                {user.follower_count || 0}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Followers
              </span>
            </div>
            <div className="text-center">
              <span className="block text-2xl font-bold text-gray-900 dark:text-white">
                {user.following_count || 0}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Following
              </span>
            </div>
          </div>
          
          {/* Social Links */}
          <div className="flex space-x-4 mb-8">
            {user.website_url && (
              <a
                href={user.website_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </a>
            )}
            {user.twitter_username && (
              <a
                href={`https://twitter.com/${user.twitter_username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
            )}
            {user.github_username && (
              <a
                href={`https://github.com/${user.github_username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            )}
          </div>
          
          {/* Posts */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              Posts
            </h2>
            
            <div className="space-y-8">
              {posts.length > 0 ? (
                posts.map((post: any) => (
                  <PostCard key={post.id} post={post as any} />
                ))
              ) : (
                <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                  <h3 className="text-xl font-medium mb-2">No posts yet</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-6">
                    {user.name} hasn't published any posts yet.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
