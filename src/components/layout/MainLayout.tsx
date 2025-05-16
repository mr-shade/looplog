import Header from "./Header";
import Footer from "./Footer";
import { User } from "@/db/schema";

interface MainLayoutProps {
  children: React.ReactNode;
  user?: User | null;
  hideFooter?: boolean;
}

export default function MainLayout({ children, user, hideFooter = false }: MainLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header user={user} />
      <main className="flex-grow pt-16">{children}</main>
      {!hideFooter && <Footer />}
    </div>
  );
}
