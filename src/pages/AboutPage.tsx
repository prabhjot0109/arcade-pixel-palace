
import React, { useEffect } from "react";
import Layout from "../components/layout/Layout";
import PixelDivider from "../components/ui/PixelDivider";

const AboutPage = () => {
  useEffect(() => {
    document.title = "About - Pixel Palace";
  }, []);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-5xl text-retro-primary mb-8 text-center">ABOUT PIXEL PALACE</h1>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-retro-dark border-4 border-retro-primary p-6 rounded-lg">
            <h2 className="text-2xl text-retro-primary mb-4">OUR MISSION</h2>
            <p className="text-xl text-retro-light">
              Pixel Palace is dedicated to preserving and celebrating the golden age of video gaming.
              We aim to create a space where both newcomers and veterans can explore, learn about,
              and experience the magic of classic games.
            </p>
          </div>
          
          <div className="bg-retro-dark border-4 border-retro-primary p-6 rounded-lg">
            <h2 className="text-2xl text-retro-primary mb-4">THE COLLECTION</h2>
            <p className="text-xl text-retro-light">
              Our carefully curated collection spans the most iconic games from the 1980s and 1990s.
              From platformers to RPGs, we showcase the titles that defined generations and inspired
              millions.
            </p>
          </div>
        </div>

        <PixelDivider text="TIMELINE" />
        
        <div className="space-y-6 mb-12">
          <div className="flex items-start gap-4">
            <div className="text-retro-primary text-xl font-bold min-w-[100px]">1980s</div>
            <div className="bg-retro-dark border-4 border-retro-secondary p-4 rounded-lg flex-1">
              <p className="text-xl text-retro-light">
                The era that saw the birth of iconic franchises like Super Mario Bros,
                The Legend of Zelda, and Mega Man. The decade that established the
                foundations of modern gaming.
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="text-retro-primary text-xl font-bold min-w-[100px]">1990s</div>
            <div className="bg-retro-dark border-4 border-retro-secondary p-4 rounded-lg flex-1">
              <p className="text-xl text-retro-light">
                The golden age of 16-bit gaming, bringing us masterpieces like
                Chrono Trigger, Final Fantasy VII, and Super Mario World. An era of
                innovation and artistic achievement.
              </p>
            </div>
          </div>
        </div>

        <PixelDivider text="CONTACT" />
        
        <div className="bg-retro-dark border-4 border-retro-primary p-6 rounded-lg text-center mb-12">
          <h2 className="text-2xl text-retro-primary mb-4">GET IN TOUCH</h2>
          <p className="text-xl text-retro-light mb-4">
            Have questions, suggestions, or want to contribute? We'd love to hear from you!
          </p>
          <a href="mailto:contact@pixelpalace.com" className="pixel-btn inline-block">
            EMAIL US
          </a>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
