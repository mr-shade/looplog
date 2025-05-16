import Link from "next/link";
import MainLayout from "@/components/layout/MainLayout";
import { getAllTags } from "@/db";

// Set edge runtime for Cloudflare Pages
export const runtime = 'edge';

export default async function TagsPage() {
  const tags = await getAllTags();

  // Sort tags by post count (descending)
  const sortedTags = [...tags].sort((a: any, b: any) => b.post_count - a.post_count);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
            Tags
          </h1>
          
          {/* Search bar */}
          <div className="mb-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search tags..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md leading-5 bg-white dark:bg-gray-800 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 dark:text-gray-100"
              />
            </div>
          </div>
          
          {/* Tags grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {sortedTags.map((tag: any) => (
              <Link 
                key={tag.id}
                href={`/tags/${tag.slug}`}
                className="group block bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span 
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
                      style={{
                        backgroundColor: `${tag.color}20` || '#f3f4f6',
                        color: tag.color || '#4b5563'
                      }}
                    >
                      #{tag.name}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400 text-sm">{tag.post_count} posts</span>
                  </div>
                  {tag.description && (
                    <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
                      {tag.description}
                    </p>
                  )}
                  <p className="text-gray-600 dark:text-gray-300 text-sm mt-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    View all posts tagged with #{tag.name}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          
          {/* Empty state */}
          {sortedTags.length === 0 && (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <h3 className="text-xl font-medium mb-2">No tags found</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Tags will appear here as content is added to the platform.
              </p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
