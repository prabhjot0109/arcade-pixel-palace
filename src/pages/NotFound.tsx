
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Layout from "../components/layout/Layout";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
    
    document.title = "Page Not Found - Pixel Palace";
  }, [location.pathname]);

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <h1 className="text-6xl md:text-8xl text-retro-primary mb-8 animate-glow">404</h1>
        
        <h2 className="text-2xl md:text-4xl text-retro-accent mb-8">
          GAME OVER
        </h2>
        
        <div className="mb-8 px-4">
          <p className="text-xl md:text-2xl text-retro-light">
            The level you're looking for doesn't exist.
          </p>
          <p className="text-xl md:text-2xl text-retro-light mt-2">
            Insert coin to continue or return to the main menu.
          </p>
        </div>
        
        <div className="w-16 h-16 bg-retro-dark border-4 border-retro-primary rounded-full flex items-center justify-center mb-8 animate-float">
          <span className="text-4xl">🪙</span>
        </div>
        
        <Link to="/" className="pixel-btn flex items-center gap-2">
          <Home className="h-5 w-5" />
          RETURN HOME
        </Link>
      </div>
    </Layout>
  );
};

export default NotFound;
