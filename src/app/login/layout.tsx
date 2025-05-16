import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - Looplog",
  description: "Sign in to your Looplog account",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
