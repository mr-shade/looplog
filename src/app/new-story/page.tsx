"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import MainLayout from "@/components/layout/MainLayout";
import MarkdownEditor from "@/components/editor/MarkdownEditor";

export default function NewStoryPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState("");
  const [contentHtml, setContentHtml] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [tags, setTags] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Handle markdown content change
  const handleContentChange = (markdown: string, html: string) => {
    setContent(markdown);
    setContentHtml(html);
  };

  // Generate a slug from the title
  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  // Calculate reading time
  const calculateReadingTime = (text: string) => {
    const wordsPerMinute = 200;
    const words = text.trim().split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

  // Handle form submission
  const handleSubmit = async (publish: boolean) => {
    if (!title) {
      alert("Please enter a title for your story");
      return;
    }

    if (!content) {
      alert("Please enter content for your story");
      return;
    }

    try {
      if (publish) {
        setIsPublishing(true);
      } else {
        setIsSaving(true);
      }

      // In a real app, you would send this data to your API
      const postData = {
        title,
        subtitle: subtitle || null,
        slug: generateSlug(title),
        content,
        content_html: contentHtml,
        excerpt: content.substring(0, 150) + (content.length > 150 ? "..." : ""),
        cover_image_url: coverImage || null,
        reading_time_minutes: calculateReadingTime(content),
        is_published: publish,
        tags: tags.split(",").map(tag => tag.trim()).filter(Boolean),
      };

      console.log("Saving post:", postData);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Redirect to the post or dashboard
      if (publish) {
        router.push(`/posts/${postData.slug}`);
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Error saving post:", error);
      alert("Failed to save your story. Please try again.");
    } finally {
      setIsPublishing(false);
      setIsSaving(false);
    }
  };

  return (
    <MainLayout hideFooter>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Title Input */}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full text-3xl md:text-4xl font-bold mb-4 p-2 bg-transparent border-none focus:outline-none focus:ring-0 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600"
          />

          {/* Subtitle Input */}
          <input
            type="text"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            placeholder="Subtitle (optional)"
            className="w-full text-xl md:text-2xl mb-6 p-2 bg-transparent border-none focus:outline-none focus:ring-0 text-gray-700 dark:text-gray-300 placeholder-gray-400 dark:placeholder-gray-600"
          />

          {/* Cover Image URL Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Cover Image URL (optional)
            </label>
            <input
              type="text"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
            {coverImage && (
              <div className="mt-2 aspect-[16/9] max-h-64 rounded-lg overflow-hidden">
                <img
                  src={coverImage}
                  alt="Cover preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://via.placeholder.com/1200x630?text=Invalid+Image+URL";
                  }}
                />
              </div>
            )}
          </div>

          {/* Tags Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Tags (comma separated)
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="javascript, react, webdev"
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
          </div>

          {/* Markdown Editor */}
          <div className="mb-8">
            <MarkdownEditor
              initialValue={content}
              onChange={handleContentChange}
              placeholder="Tell your story..."
              minHeight="400px"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => handleSubmit(false)}
              disabled={isSaving || isPublishing}
              className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {isSaving ? "Saving..." : "Save Draft"}
            </button>
            <button
              type="button"
              onClick={() => handleSubmit(true)}
              disabled={isSaving || isPublishing}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors"
            >
              {isPublishing ? "Publishing..." : "Publish"}
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
