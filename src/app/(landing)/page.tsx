
import Link from "next/link";
import MainLayout from "@/components/layout/MainLayout";
import PostCard from "@/components/posts/PostCard";
import TagBadge from "@/components/tags/TagBadge";
import { getFeaturedPosts, getAllPosts, getAllTags } from "@/db";

export const runtime = 'edge';

export default async function LandingPage() {
  // Fetch featured posts, recent posts, and popular tags
  const featuredPosts = await getFeaturedPosts();
  const recentPosts = await getAllPosts();
  const tags = await getAllTags();

  // Get the first featured post
  const mainFeaturedPost = featuredPosts[0] || null;
  // Get the rest of the featured posts
  const secondaryFeaturedPosts = featuredPosts.slice(1, 3);

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-white dark:bg-gray-900 pt-16 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">
              Loop Log
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
              A place to share knowledge and ideas with the world.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {tags.slice(0, 8).map((tag: any) => (
                <TagBadge key={tag.id} tag={{
                  name: tag.name,
                  slug: tag.slug,
                  color: tag.color
                }} />
              ))}
              {tags.length > 8 && (
                <Link
                  href="/tags"
                  className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  More tags...
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {mainFeaturedPost && (
        <section className="bg-gray-50 dark:bg-gray-800 py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">
              Featured Stories
            </h2>
            <PostCard post={mainFeaturedPost as any} featured />

            {secondaryFeaturedPosts.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                {secondaryFeaturedPosts.map((post: any) => (
                  <PostCard key={post.id} post={post as any} />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Recent Posts */}
      <section className="bg-white dark:bg-gray-900 py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Recent Stories
            </h2>
            <Link
              href="/latest"
              className="text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              View all
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {recentPosts.slice(0, 5).map((post: any) => (
              <PostCard key={post.id} post={post as any} />
            ))}
          </div>

          {recentPosts.length > 5 && (
            <div className="text-center mt-12">
              <Link
                href="/latest"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Load more stories
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-indigo-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to share your story?
          </h2>
          <p className="text-indigo-100 mb-8 max-w-2xl mx-auto">
            Join our community of writers and readers. Share your knowledge, experiences, and ideas with the world.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
          >
            Get started
          </Link>
        </div>
      </section>
    </MainLayout>
  );
}