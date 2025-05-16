"use client";

import { useState, useRef, useEffect } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";

interface MarkdownEditorProps {
  initialValue?: string;
  onChange: (markdown: string, html: string) => void;
  placeholder?: string;
  minHeight?: string;
}

export default function MarkdownEditor({
  initialValue = "",
  onChange,
  placeholder = "Write your story...",
  minHeight = "300px",
}: MarkdownEditorProps) {
  const [markdown, setMarkdown] = useState(initialValue);
  const [isPreview, setIsPreview] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Convert markdown to HTML
  const getHtml = (md: string) => {
    const html = marked(md);
    return DOMPurify.sanitize(html);
  };

  // Handle textarea changes
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newMarkdown = e.target.value;
    setMarkdown(newMarkdown);
    onChange(newMarkdown, getHtml(newMarkdown));
  };

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = minHeight;
      textarea.style.height = `${Math.max(textarea.scrollHeight, parseInt(minHeight))}px`;
    }
  }, [markdown, minHeight]);

  // Toolbar button click handlers
  const insertText = (before: string, after: string = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = markdown.substring(start, end);
    const newText =
      markdown.substring(0, start) +
      before +
      selectedText +
      after +
      markdown.substring(end);

    setMarkdown(newText);
    onChange(newText, getHtml(newText));

    // Set cursor position after the inserted text
    setTimeout(() => {
      textarea.focus();
      textarea.selectionStart = start + before.length;
      textarea.selectionEnd = end + before.length;
    }, 0);
  };

  const handleHeading = () => insertText("## ", "\n");
  const handleBold = () => insertText("**", "**");
  const handleItalic = () => insertText("*", "*");
  const handleLink = () => insertText("[", "](url)");
  const handleImage = () => insertText("![alt text](", ")");
  const handleCode = () => insertText("```\n", "\n```");
  const handleQuote = () => insertText("> ", "\n");
  const handleList = () => insertText("- ", "\n");
  const handleNumberedList = () => insertText("1. ", "\n");

  return (
    <div className="border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700">
        <div className="flex items-center space-x-1">
          <button
            type="button"
            onClick={handleHeading}
            className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
            title="Heading"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-700 dark:text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={handleBold}
            className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
            title="Bold"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-700 dark:text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 12h8a4 4 0 100-8H6v8zm0 0h8a4 4 0 110 8H6v-8z"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={handleItalic}
            className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
            title="Italic"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-700 dark:text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={handleLink}
            className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
            title="Link"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-700 dark:text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.172 13.828a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.102 1.101"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={handleImage}
            className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
            title="Image"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-700 dark:text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={handleCode}
            className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
            title="Code"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-700 dark:text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={handleQuote}
            className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
            title="Quote"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-700 dark:text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={handleList}
            className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
            title="Bulleted List"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-700 dark:text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={handleNumberedList}
            className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
            title="Numbered List"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-700 dark:text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </button>
        </div>
        <div>
          <button
            type="button"
            onClick={() => setIsPreview(!isPreview)}
            className={`px-3 py-1 rounded text-sm font-medium ${
              isPreview
                ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300"
                : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
            }`}
          >
            {isPreview ? "Edit" : "Preview"}
          </button>
        </div>
      </div>

      {/* Editor/Preview */}
      <div className="relative">
        {isPreview ? (
          <div
            className="prose dark:prose-invert max-w-none p-4 min-h-[300px] bg-white dark:bg-gray-900"
            dangerouslySetInnerHTML={{ __html: getHtml(markdown) }}
          />
        ) : (
          <textarea
            ref={textareaRef}
            value={markdown}
            onChange={handleChange}
            placeholder={placeholder}
            className="w-full p-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 resize-none focus:outline-none"
            style={{ minHeight }}
          />
        )}
      </div>
    </div>
  );
}
