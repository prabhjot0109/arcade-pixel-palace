
import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Toaster } from "sonner";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="scanline"></div>
      <div className="crt relative z-0 min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-6 z-10 relative">
          {children}
        </main>
        <Footer />
      </div>

    </div>
  );
};

export default Layout;
