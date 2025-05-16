import { handlers } from "@/auth";

export const { GET, POST } = handlers;

// Set edge runtime for Cloudflare Pages
export const runtime = 'edge';
