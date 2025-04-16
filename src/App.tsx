import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CollectiblesProvider } from "./hooks/use-collectibles";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import GamesPage from "./pages/GamesPage";
import CollectiblesPage from "./pages/CollectiblesPage";
import TriviaPage from "./pages/TriviaPage";
import AboutPage from "./pages/AboutPage";
import GameDetailPage from "./pages/GameDetailPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CollectiblesProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/games" element={<GamesPage />} />
            <Route path="/games/:slug" element={<GameDetailPage />} />
            <Route path="/collectibles" element={<CollectiblesPage />} />
            <Route path="/trivia" element={<TriviaPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CollectiblesProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
