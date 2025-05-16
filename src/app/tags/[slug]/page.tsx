import Link from "next/link";
import { notFound } from "next/navigation";
import MainLayout from "@/components/layout/MainLayout";
import PostCard from "@/components/posts/PostCard";
import { getPostsByTag, getAllTags } from "@/db";

// Set edge runtime for Cloudflare Pages
export const runtime = 'edge';

export default async function TagPage({ params }: { params: { slug: string } }) {
  // Fetch all tags to find the current one
  const allTags = await getAllTags();
  const tag = allTags.find((t: any) => t.slug === params.slug);
  
  if (!tag) {
    return notFound();
  }
  
  // Fetch posts for this tag
  const posts = await getPostsByTag(params.slug);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-2">
            <Link 
              href="/tags" 
              className="text-indigo-600 dark:text-indigo-400 hover:underline mr-2"
            >
              Tags
            </Link>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
          
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold flex items-center text-gray-900 dark:text-white">
              <span 
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mr-3"
                style={{
                  backgroundColor: `${tag.color}20` || '#f3f4f6',
                  color: tag.color || '#4b5563'
                }}
              >
                #{tag.name}
              </span>
              <span>Posts</span>
            </h1>
            <button className="text-indigo-600 dark:text-indigo-400 hover:underline flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              Follow Tag
            </button>
          </div>
          
          {tag.description && (
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-8 shadow-md">
              <p className="text-gray-700 dark:text-gray-300">
                {tag.description}
              </p>
            </div>
          )}
          
          {/* Posts list */}
          <div className="space-y-8">
            {posts.length > 0 ? (
              posts.map((post: any) => (
                <PostCard key={post.id} post={post as any} />
              ))
            ) : (
              <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                <h3 className="text-xl font-medium mb-2">No posts found with tag #{tag.name}</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">Be the first to write about this topic!</p>
                <Link
                  href="/new-story"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md inline-flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 00-1 1v5H4a1 1 0 100 2h5v5a1 1 0 102 0v-5h5a1 1 0 100-2h-5V4a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  Write a Story
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
