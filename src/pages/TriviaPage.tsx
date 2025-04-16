
import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import PixelDivider from "../components/ui/PixelDivider";
import CollectibleItem from "../components/collectibles/CollectibleItem";
import { ArrowRight, Check, X } from "lucide-react";

interface TriviaQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

const TriviaPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  
  useEffect(() => {
    document.title = "Trivia - Pixel Palace";
  }, []);

  const triviaQuestions: TriviaQuestion[] = [
    {
      question: "Which video game console was released first?",
      options: ["Nintendo Entertainment System", "Sega Genesis", "Atari 2600", "ColecoVision"],
      correctAnswer: 2
    },
    {
      question: "What year was Pac-Man released in arcades?",
      options: ["1978", "1980", "1982", "1985"],
      correctAnswer: 1
    },
    {
      question: "Who is the main protagonist in The Legend of Zelda series?",
      options: ["Zelda", "Link", "Ganon", "Mario"],
      correctAnswer: 1
    },
    {
      question: "Which of these games was NOT created by Nintendo?",
      options: ["Donkey Kong", "Mario Bros", "Sonic the Hedgehog", "Metroid"],
      correctAnswer: 2
    },
    {
      question: "What was the first video game to feature a high score table?",
      options: ["Space Invaders", "Pong", "Asteroids", "Breakout"],
      correctAnswer: 0
    }
  ];

  const handleOptionSelect = (optionIndex: number) => {
    if (isAnswered) return;
    
    setSelectedOption(optionIndex);
    setIsAnswered(true);
    
    if (optionIndex === triviaQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setIsAnswered(false);
    
    if (currentQuestion < triviaQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResults(false);
    setSelectedOption(null);
    setIsAnswered(false);
  };

  return (
    <Layout>
      <div className="relative">
        <h1 className="text-3xl md:text-4xl text-retro-primary mb-6">
          RETRO GAMING TRIVIA
        </h1>
        
        <div className="absolute top-0 right-0">
          <CollectibleItem id="key" />
        </div>
        
        <div className="mb-8">
          <p className="text-xl text-retro-light mb-6">
            Test your knowledge of retro games with our trivia challenge!
            Answer questions correctly to earn a high score.
          </p>
        </div>
        
        <div className="bg-retro-dark border-4 border-retro-primary p-6 rounded-lg mb-8">
          {!showResults ? (
            <div>
              <div className="flex justify-between items-center mb-6">
                <span className="text-retro-light text-lg">
                  Question {currentQuestion + 1} of {triviaQuestions.length}
                </span>
                <span className="text-retro-primary text-lg">
                  Score: {score}
                </span>
              </div>
              
              <h2 className="text-2xl text-retro-accent mb-6">
                {triviaQuestions[currentQuestion].question}
              </h2>
              
              <div className="space-y-4 mb-8">
                {triviaQuestions[currentQuestion].options.map((option, index) => (
                  <div 
                    key={index}
                    onClick={() => handleOptionSelect(index)}
                    className={`
                      p-4 border-2 cursor-pointer transition-all
                      ${selectedOption === index 
                        ? (index === triviaQuestions[currentQuestion].correctAnswer 
                          ? "border-green-500 bg-green-500 bg-opacity-20" 
                          : "border-red-500 bg-red-500 bg-opacity-20") 
                        : "border-retro-secondary hover:border-retro-primary"
                      }
                      ${isAnswered && index === triviaQuestions[currentQuestion].correctAnswer 
                        ? "border-green-500 bg-green-500 bg-opacity-20" 
                        : ""
                      }
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-lg text-retro-light">{option}</span>
                      {isAnswered && index === selectedOption && (
                        index === triviaQuestions[currentQuestion].correctAnswer 
                          ? <Check className="text-green-500 h-6 w-6" /> 
                          : <X className="text-red-500 h-6 w-6" />
                      )}
                      {isAnswered && index !== selectedOption && index === triviaQuestions[currentQuestion].correctAnswer && (
                        <Check className="text-green-500 h-6 w-6" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-end">
                {isAnswered && (
                  <button 
                    onClick={handleNextQuestion} 
                    className="pixel-btn flex items-center"
                  >
                    {currentQuestion < triviaQuestions.length - 1 ? "NEXT QUESTION" : "VIEW RESULTS"}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center">
              <h2 className="text-3xl text-retro-accent mb-6">
                Quiz Complete!
              </h2>
              
              <p className="text-2xl text-retro-light mb-4">
                Your score: {score}/{triviaQuestions.length}
              </p>
              
              <p className="text-xl text-retro-light mb-8">
                {score === triviaQuestions.length 
                  ? "Perfect score! You're a retro gaming master!" 
                  : score >= 3 
                    ? "Great job! You know your retro games well!" 
                    : "Not bad! Try again to improve your retro gaming knowledge!"}
              </p>
              
              <button onClick={resetQuiz} className="pixel-btn">
                PLAY AGAIN
              </button>
              
              <div className="mt-12 relative">
                <CollectibleItem id="sword" className="absolute -top-12 right-4" />
              </div>
            </div>
          )}
        </div>
        
        <PixelDivider text="DID YOU KNOW?" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-retro-dark border-4 border-retro-secondary p-4 rounded-lg">
            <h3 className="text-lg text-retro-primary mb-2">Space Invaders Shortage</h3>
            <p className="text-retro-light">
              In Japan, Space Invaders was so popular that it caused a national coin shortage, 
              forcing the government to triple the production of 100-yen coins!
            </p>
          </div>
          
          <div className="bg-retro-dark border-4 border-retro-secondary p-4 rounded-lg">
            <h3 className="text-lg text-retro-primary mb-2">Tetris Mind Effect</h3>
            <p className="text-retro-light">
              The Tetris Effect is a real phenomenon where people who play Tetris for extended periods 
              start seeing falling shapes in real life or when they close their eyes!
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TriviaPage;
