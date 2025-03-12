
import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { Progress } from "./ui/progress";
import { Check, X, ChevronDown, ChevronUp, Plus, Minus, Link as LinkIcon } from "lucide-react";
import { Label } from "./ui/label";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { Link } from "react-router-dom";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";

interface MicroQuestion {
  id: number;
  question: string;
  answer: string;
  solution: string;
  topic: string;
}

interface Question {
  id: number;
  question: string;
  type: 'single' | 'multiple' | 'input';
  choices?: string[];
  correctAnswer: string | string[];
  microQuestions: MicroQuestion[];
}

interface QuestionInterfaceProps {
  question: Question;
}

export const QuestionInterface = ({ question }: QuestionInterfaceProps) => {
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [inputAnswer, setInputAnswer] = useState('');
  const [showSolution, setShowSolution] = useState(false);
  const [currentMicroQuestion, setCurrentMicroQuestion] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  
  // Function to check if the answer is correct
  const checkAnswer = () => {
    let correct = false;
    
    if (question.type === 'single') {
      correct = selectedAnswers.length === 1 && selectedAnswers[0] === question.correctAnswer;
    } else if (question.type === 'multiple') {
      const correctAnswersArray = Array.isArray(question.correctAnswer) 
        ? question.correctAnswer 
        : [question.correctAnswer];
      correct = selectedAnswers.length === correctAnswersArray.length && 
        selectedAnswers.every(answer => correctAnswersArray.includes(answer));
    } else if (question.type === 'input') {
      // For input type, we'll do a simple string comparison
      // In a real app, you might want more sophisticated matching
      correct = inputAnswer.trim().toLowerCase() === String(question.correctAnswer).toLowerCase();
    }
    
    return correct;
  };

  const handleSingleAnswerSelect = (value: string) => {
    setSelectedAnswers([value]);
  };

  const handleMultipleAnswerSelect = (value: string) => {
    if (selectedAnswers.includes(value)) {
      setSelectedAnswers(selectedAnswers.filter(answer => answer !== value));
    } else {
      setSelectedAnswers([...selectedAnswers, value]);
    }
  };

  const handleSubmit = () => {
    const correct = checkAnswer();
    setIsCorrect(correct);
    setIsSubmitted(true);
  };

  const handleNextQuestion = () => {
    // Here you would navigate to the next question
    // For now, we'll just reset the current state
    setSelectedAnswers([]);
    setInputAnswer('');
    setIsSubmitted(false);
    setIsCorrect(false);
    setShowSolution(false);
  };

  const handleTryAgain = () => {
    setSelectedAnswers([]);
    setInputAnswer('');
    setIsSubmitted(false);
  };

  const getChoiceLabel = (index: number) => {
    return String.fromCharCode(65 + index); // A, B, C, D, etc.
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-spotify-card rounded-lg p-6 shadow-lg"
      >
        <h2 className="text-2xl font-bold text-white mb-6">{question.question}</h2>

        {/* Answer Section */}
        <div className="space-y-6">
          {question.type === 'single' && question.choices && (
            <RadioGroup
              onValueChange={handleSingleAnswerSelect}
              value={selectedAnswers[0]}
              className="space-y-4"
              disabled={isSubmitted}
            >
              {question.choices.map((choice, index) => (
                <div 
                  key={index} 
                  className={cn(
                    "flex items-center space-x-3 p-3 rounded-md border-2",
                    selectedAnswers[0] === choice ? "border-[#9747FF]" : "border-transparent",
                    isSubmitted && choice === question.correctAnswer ? "border-[#00C853]" : "",
                    isSubmitted && selectedAnswers[0] === choice && choice !== question.correctAnswer ? "border-[#FF3B30]" : ""
                  )}
                >
                  <div className="flex items-center h-5">
                    <RadioGroupItem 
                      value={choice} 
                      id={`choice-${index}`} 
                      className={cn(
                        isSubmitted && choice === question.correctAnswer ? "text-[#00C853] border-[#00C853]" : "",
                        isSubmitted && selectedAnswers[0] === choice && choice !== question.correctAnswer ? "text-[#FF3B30] border-[#FF3B30]" : ""
                      )}
                    />
                  </div>
                  <div className="flex items-center justify-between w-full">
                    <Label
                      htmlFor={`choice-${index}`}
                      className="text-white cursor-pointer flex items-center text-base"
                    >
                      <span className="font-semibold mr-2">{getChoiceLabel(index)}.</span> {choice}
                    </Label>
                    {isSubmitted && choice === question.correctAnswer && (
                      <Check className="h-5 w-5 text-[#00C853]" />
                    )}
                    {isSubmitted && selectedAnswers[0] === choice && choice !== question.correctAnswer && (
                      <X className="h-5 w-5 text-[#FF3B30]" />
                    )}
                  </div>
                </div>
              ))}
            </RadioGroup>
          )}

          {question.type === 'multiple' && question.choices && (
            <div className="space-y-4">
              {question.choices.map((choice, index) => (
                <div 
                  key={index} 
                  className={cn(
                    "flex items-center space-x-3 p-3 rounded-md border-2",
                    selectedAnswers.includes(choice) ? "border-[#9747FF]" : "border-transparent",
                    isSubmitted && Array.isArray(question.correctAnswer) && question.correctAnswer.includes(choice) ? "border-[#00C853]" : "",
                    isSubmitted && selectedAnswers.includes(choice) && 
                    (Array.isArray(question.correctAnswer) ? !question.correctAnswer.includes(choice) : choice !== question.correctAnswer) 
                      ? "border-[#FF3B30]" : ""
                  )}
                >
                  <div className="flex items-center h-5">
                    <Checkbox
                      id={`choice-${index}`}
                      checked={selectedAnswers.includes(choice)}
                      onCheckedChange={() => !isSubmitted && handleMultipleAnswerSelect(choice)}
                      className={cn(
                        isSubmitted && Array.isArray(question.correctAnswer) && question.correctAnswer.includes(choice) ? "text-[#00C853] border-[#00C853]" : "",
                        isSubmitted && selectedAnswers.includes(choice) && 
                        (Array.isArray(question.correctAnswer) ? !question.correctAnswer.includes(choice) : choice !== question.correctAnswer) 
                          ? "text-[#FF3B30] border-[#FF3B30]" : ""
                      )}
                    />
                  </div>
                  <div className="flex items-center justify-between w-full">
                    <Label
                      htmlFor={`choice-${index}`}
                      className="text-white cursor-pointer flex items-center text-base"
                    >
                      <span className="font-semibold mr-2">{getChoiceLabel(index)}.</span> {choice}
                    </Label>
                    {isSubmitted && Array.isArray(question.correctAnswer) && question.correctAnswer.includes(choice) && (
                      <Check className="h-5 w-5 text-[#00C853]" />
                    )}
                    {isSubmitted && selectedAnswers.includes(choice) && 
                    (Array.isArray(question.correctAnswer) ? !question.correctAnswer.includes(choice) : choice !== question.correctAnswer) && (
                      <X className="h-5 w-5 text-[#FF3B30]" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {question.type === 'input' && (
            <div className="space-y-2">
              <Label htmlFor="answer-input" className="text-white">Your Answer:</Label>
              <Input
                id="answer-input"
                type="text"
                value={inputAnswer}
                onChange={(e) => setInputAnswer(e.target.value)}
                placeholder="Enter your answer"
                className="bg-spotify-dark text-white"
                disabled={isSubmitted}
              />
              {isSubmitted && (
                <div className={cn(
                  "flex items-center mt-2",
                  isCorrect ? "text-[#00C853]" : "text-[#FF3B30]"
                )}>
                  {isCorrect ? (
                    <><Check className="h-5 w-5 mr-2" /> Correct</>
                  ) : (
                    <><X className="h-5 w-5 mr-2" /> Incorrect. The correct answer is: {question.correctAnswer}</>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Feedback message based on submission */}
          {isSubmitted && (
            <div 
              className={cn(
                "p-3 rounded-md text-center font-medium",
                isCorrect ? "bg-green-100 text-[#00C853]" : "bg-red-100 text-[#FF3B30]"
              )}
            >
              {isCorrect 
                ? "Correct Answer! Move to next question." 
                : "The answer is wrong! Try again."}
            </div>
          )}

          {/* Action Button */}
          {!isSubmitted ? (
            <Button 
              onClick={handleSubmit} 
              className="w-full bg-[#9747FF] hover:bg-[#8035E8]"
              disabled={question.type === 'single' || question.type === 'multiple' 
                ? selectedAnswers.length === 0 
                : inputAnswer.trim() === ''}
            >
              Submit Answer
            </Button>
          ) : isCorrect ? (
            <Button 
              onClick={handleNextQuestion} 
              className="w-full bg-[#9747FF] hover:bg-[#8035E8]"
            >
              Next Question
            </Button>
          ) : (
            <Button 
              onClick={handleTryAgain} 
              className="w-full bg-[#9747FF] hover:bg-[#8035E8]"
            >
              Try Again
            </Button>
          )}

          {/* Interactive Solution Guide Link */}
          <div className="text-center mt-4">
            <button 
              onClick={() => setShowSolution(!showSolution)} 
              className="text-[#9747FF] underline text-sm font-medium"
            >
              {showSolution ? "Hide" : "Check"} Interactive Solution Guide
            </button>
          </div>
        </div>
      </motion.div>

      {/* Interactive Solution Guide */}
      {showSolution && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-spotify-card rounded-lg p-6 shadow-lg"
        >
          <h3 className="text-xl font-bold text-white mb-4">Interactive Solution Guide</h3>
          <Progress
            value={(currentMicroQuestion / (question.microQuestions.length - 1)) * 100}
            className="mb-6 h-1"
          />

          <div className="space-y-1">
            <Accordion 
              type="single" 
              value={`item-${currentMicroQuestion}`} 
              onValueChange={(value) => {
                const index = parseInt(value.split('-')[1]);
                setCurrentMicroQuestion(index);
              }}
              className="border-none"
            >
              {question.microQuestions.map((microQuestion, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className={cn(
                    "border-l-4 pl-4 py-2 mb-4 rounded-sm",
                    currentMicroQuestion === index ? "border-[#9747FF]" : "border-gray-300"
                  )}
                >
                  <AccordionTrigger className="text-left hover:no-underline">
                    <div className="flex items-center">
                      <div className={cn(
                        "w-6 h-6 rounded-full flex items-center justify-center mr-3 text-white text-sm",
                        currentMicroQuestion === index ? "bg-[#9747FF]" : "bg-gray-400"
                      )}>
                        {index + 1}
                      </div>
                      <span className="text-white font-medium">{microQuestion.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pl-9">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2 text-spotify-text">
                        <LinkIcon size={16} className="text-[#9747FF]" />
                        <a href="#" className="text-[#9747FF] hover:underline">
                          {microQuestion.topic}
                        </a>
                      </div>
                      
                      <Collapsible className="w-full">
                        <CollapsibleTrigger className="w-full">
                          <Button 
                            variant="outline" 
                            className="w-full border-[#9747FF] text-[#9747FF] hover:bg-[#9747FF] hover:text-white flex items-center justify-center"
                          >
                            Get Solution
                          </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="bg-spotify-hover rounded p-4 mt-3 text-white">
                          {microQuestion.solution}
                        </CollapsibleContent>
                      </Collapsible>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="flex justify-between mt-6">
            <Button
              onClick={() => setCurrentMicroQuestion(prev => Math.max(0, prev - 1))}
              disabled={currentMicroQuestion === 0}
              variant="outline"
              className="border-[#9747FF] text-[#9747FF]"
            >
              Previous Step
            </Button>
            <Button
              onClick={() => setCurrentMicroQuestion(prev => Math.min(question.microQuestions.length - 1, prev + 1))}
              disabled={currentMicroQuestion === question.microQuestions.length - 1}
              className="bg-[#9747FF] hover:bg-[#8035E8]"
            >
              Next Step
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
};
