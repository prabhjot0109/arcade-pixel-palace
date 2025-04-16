import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CollectiblesProvider } from "./hooks/use-collectibles";
import { AchievementsProvider } from "./hooks/use-achievements";
import { UserProfileProvider } from "./hooks/use-user-profile";
import PageTransition from "./components/ui/PageTransition";
import SoundPreloader from "./components/audio/SoundPreloader";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import GamesPage from "./pages/GamesPage";
import CollectiblesPage from "./pages/CollectiblesPage";
import TriviaPage from "./pages/TriviaPage";
import AboutPage from "./pages/AboutPage";
import GameDetailPage from "./pages/GameDetailPage";
import InventoryPage from "./pages/InventoryPage";
import ProfilePage from "./pages/ProfilePage";
import LeaderboardsPage from "./pages/LeaderboardsPage";
import { useEffect } from "react";
import { initAudio } from "./utils/audio";

const queryClient = new QueryClient();

const App = () => {
  // Initialize audio system when the app loads
  useEffect(() => {
    // Initialize the audio system
    initAudio();
    
    // Create dummy audio elements for iOS/mobile browsers
    const enableAudio = () => {
      // Create and play a silent audio element to unlock audio on iOS
      const audioElement = new Audio();
      audioElement.autoplay = true;
      audioElement.muted = true;
      audioElement.src = '/sounds/silent.mp3';
      audioElement.load();
      audioElement.play().catch(err => console.log('Audio initialization failed:', err));
      
      // Remove event listeners after first interaction
      document.removeEventListener('click', enableAudio);
      document.removeEventListener('touchstart', enableAudio);
    };
    
    // Add event listeners for first user interaction
    document.addEventListener('click', enableAudio);
    document.addEventListener('touchstart', enableAudio);
    
    return () => {
      // Clean up event listeners
      document.removeEventListener('click', enableAudio);
      document.removeEventListener('touchstart', enableAudio);
    };
  }, []);
  
  return (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CollectiblesProvider>
        <AchievementsProvider>
          <UserProfileProvider>
            <Toaster />
            <Sonner />
            <SoundPreloader />
            <BrowserRouter>
              <PageTransition />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/games" element={<GamesPage />} />
                <Route path="/games/:slug" element={<GameDetailPage />} />
                <Route path="/collectibles" element={<CollectiblesPage />} />
                <Route path="/trivia" element={<TriviaPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/inventory" element={<InventoryPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/leaderboards" element={<LeaderboardsPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </UserProfileProvider>
        </AchievementsProvider>
      </CollectiblesProvider>
    </TooltipProvider>
  </QueryClientProvider>
  );
};

export default App;
