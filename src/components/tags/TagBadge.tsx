import Link from "next/link";

interface TagBadgeProps {
  tag: {
    name: string;
    slug: string;
    color?: string;
  };
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function TagBadge({ tag, size = "md", className = "" }: TagBadgeProps) {
  const sizeClasses = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-3 py-1",
    lg: "text-base px-4 py-1.5",
  };

  // Default color if none is provided
  const defaultColor = "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
  
  // Use the tag's color if provided, otherwise use default
  const colorClass = tag.color 
    ? `bg-${tag.color}-100 text-${tag.color}-800 dark:bg-${tag.color}-900 dark:text-${tag.color}-300`
    : defaultColor;

  return (
    <Link href={`/tags/${tag.slug}`}>
      <span
        className={`inline-flex items-center rounded-full font-medium hover:bg-opacity-80 transition-colors ${sizeClasses[size]} ${colorClass} ${className}`}
      >
        #{tag.name}
      </span>
    </Link>
  );
}
