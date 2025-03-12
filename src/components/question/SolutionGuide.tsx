
import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { LinkIcon } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MicroQuestion, SolutionMethod } from './types';
import { Check, X } from "lucide-react";

interface SolutionGuideProps {
  microQuestions: MicroQuestion[];
  alternativeMethods?: SolutionMethod[];
  currentMicroQuestion: number;
  setCurrentMicroQuestion: (index: number) => void;
}

export const SolutionGuide = ({ 
  microQuestions, 
  alternativeMethods,
  currentMicroQuestion, 
  setCurrentMicroQuestion 
}: SolutionGuideProps) => {
  // Track state for each micro question
  const [microAnswers, setMicroAnswers] = useState<{[key: number]: string}>({});
  const [showSolutions, setShowSolutions] = useState<{[key: number]: boolean}>({});
  const [attemptedQuestions, setAttemptedQuestions] = useState<{[key: number]: boolean}>({});
  const [activeMethod, setActiveMethod] = useState<string>("standard");
  
  // Get the current set of micro questions based on active method
  const getCurrentMicroQuestions = () => {
    if (activeMethod === "standard") {
      return microQuestions;
    } else if (alternativeMethods && alternativeMethods.length > 0) {
      const methodIndex = alternativeMethods.findIndex(m => m.name.toLowerCase() === activeMethod.toLowerCase());
      if (methodIndex >= 0) {
        return alternativeMethods[methodIndex].microQuestions;
      }
    }
    return microQuestions;
  };
  
  const currentQuestions = getCurrentMicroQuestions();
  
  // Handle radio answer selection
  const handleAnswerSelect = (questionId: number, value: string) => {
    setMicroAnswers({...microAnswers, [questionId]: value});
  };
  
  // Mark question as attempted when user submits or views solution
  const markQuestionAttempted = (questionId: number) => {
    setAttemptedQuestions({...attemptedQuestions, [questionId]: true});
  };
  
  // Check if next question should be available
  const canAccessQuestion = (index: number) => {
    if (index === 0) return true;
    
    // Ensure previous questions have been attempted
    for (let i = 0; i < index; i++) {
      const questionId = currentQuestions[i].id;
      if (!attemptedQuestions[questionId]) {
        return false;
      }
    }
    return true;
  };
  
  // Toggle solution visibility
  const toggleSolution = (questionId: number) => {
    markQuestionAttempted(questionId);
    setShowSolutions({...showSolutions, [questionId]: !showSolutions[questionId]});
  };
  
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-white mb-4">Interactive Solution Guide</h3>
      
      {/* Method Tabs */}
      <Tabs 
        defaultValue="standard" 
        onValueChange={setActiveMethod}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="standard">Standard Method</TabsTrigger>
          {alternativeMethods && alternativeMethods.length > 0 && (
            <TabsTrigger value={alternativeMethods[0].name.toLowerCase()}>
              Alternative Method
            </TabsTrigger>
          )}
        </TabsList>
        
        <TabsContent value="standard" className="mt-0">
          <div className="mb-4">
            <Progress
              value={(currentMicroQuestion / Math.max(1, currentQuestions.length - 1)) * 100}
              className="h-1"
            />
          </div>
          
          <div className="space-y-1">
            <Accordion 
              type="single" 
              value={`item-${currentMicroQuestion}`} 
              onValueChange={(value) => {
                const index = parseInt(value.split('-')[1]);
                if (canAccessQuestion(index)) {
                  setCurrentMicroQuestion(index);
                }
              }}
              className="border-none"
            >
              {currentQuestions.map((microQuestion, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  disabled={!canAccessQuestion(index)}
                  className={cn(
                    "border-l-4 pl-4 py-2 mb-4 rounded-sm",
                    !canAccessQuestion(index) ? "opacity-50" : "",
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
                      
                      {/* Answer choices with radio buttons */}
                      {microQuestion.choices && microQuestion.choices.length > 0 && (
                        <div className="mt-4 space-y-3">
                          <h4 className="text-white font-medium">Select your answer:</h4>
                          <RadioGroup
                            value={microAnswers[microQuestion.id] || ""}
                            onValueChange={(value) => handleAnswerSelect(microQuestion.id, value)}
                            className="space-y-2"
                          >
                            {microQuestion.choices.map((choice, choiceIndex) => (
                              <div key={choiceIndex} className="flex items-start space-x-2 p-2 rounded-md hover:bg-spotify-hover">
                                <RadioGroupItem
                                  value={choice}
                                  id={`choice-${microQuestion.id}-${choiceIndex}`}
                                  className="mt-1"
                                />
                                <Label
                                  htmlFor={`choice-${microQuestion.id}-${choiceIndex}`}
                                  className="text-white cursor-pointer"
                                >
                                  {choice}
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>
                          
                          {/* Answer feedback */}
                          {microAnswers[microQuestion.id] && (
                            <div className="mt-2">
                              {microAnswers[microQuestion.id] === microQuestion.answer ? (
                                <div className="flex items-center text-[#00C853]">
                                  <Check size={18} className="mr-2" />
                                  <span>Correct!</span>
                                </div>
                              ) : (
                                <div className="flex items-center text-[#FF3B30]">
                                  <X size={18} className="mr-2" />
                                  <span>Incorrect. Try again or check the solution.</span>
                                </div>
                              )}
                              
                              {microAnswers[microQuestion.id] && !attemptedQuestions[microQuestion.id] && (
                                <Button 
                                  variant="ghost" 
                                  onClick={() => markQuestionAttempted(microQuestion.id)}
                                  className="mt-2 text-[#9747FF]"
                                >
                                  Continue
                                </Button>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                      
                      <Collapsible className="w-full">
                        <CollapsibleTrigger className="w-full">
                          <Button 
                            variant="outline" 
                            className="w-full border-[#9747FF] text-[#9747FF] hover:bg-[#9747FF] hover:text-white flex items-center justify-center"
                            onClick={() => toggleSolution(microQuestion.id)}
                          >
                            {showSolutions[microQuestion.id] ? "Hide Solution" : "Get Solution"}
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
              onClick={() => {
                const newIndex = Math.max(0, currentMicroQuestion - 1);
                setCurrentMicroQuestion(newIndex);
              }}
              disabled={currentMicroQuestion === 0}
              variant="outline"
              className="border-[#9747FF] text-[#9747FF]"
            >
              Previous Step
            </Button>
            <Button
              onClick={() => {
                const newIndex = Math.min(currentQuestions.length - 1, currentMicroQuestion + 1);
                if (canAccessQuestion(newIndex)) {
                  setCurrentMicroQuestion(newIndex);
                }
              }}
              disabled={
                currentMicroQuestion === currentQuestions.length - 1 || 
                !canAccessQuestion(currentMicroQuestion + 1)
              }
              className="bg-[#9747FF] hover:bg-[#8035E8]"
            >
              Next Step
            </Button>
          </div>
        </TabsContent>
        
        {/* Alternative Method Tab */}
        {alternativeMethods && alternativeMethods.map((method, methodIndex) => (
          <TabsContent key={methodIndex} value={method.name.toLowerCase()} className="mt-0">
            <div className="mb-4">
              <p className="text-white mb-2">{method.description}</p>
              <Progress
                value={(currentMicroQuestion / Math.max(1, method.microQuestions.length - 1)) * 100}
                className="h-1"
              />
            </div>
            
            <div className="space-y-1">
              <Accordion 
                type="single" 
                value={`alt-${currentMicroQuestion}`} 
                onValueChange={(value) => {
                  const index = parseInt(value.split('-')[1]);
                  if (canAccessQuestion(index)) {
                    setCurrentMicroQuestion(index);
                  }
                }}
                className="border-none"
              >
                {method.microQuestions.map((microQuestion, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`alt-${index}`}
                    disabled={!canAccessQuestion(index)}
                    className={cn(
                      "border-l-4 pl-4 py-2 mb-4 rounded-sm",
                      !canAccessQuestion(index) ? "opacity-50" : "",
                      currentMicroQuestion === index ? "border-[#9747FF]" : "border-gray-300"
                    )}
                  >
                    {/* Similar accordion content as standard method */}
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
                        
                        {/* Answer choices with radio buttons */}
                        {microQuestion.choices && microQuestion.choices.length > 0 && (
                          <div className="mt-4 space-y-3">
                            <h4 className="text-white font-medium">Select your answer:</h4>
                            <RadioGroup
                              value={microAnswers[microQuestion.id] || ""}
                              onValueChange={(value) => handleAnswerSelect(microQuestion.id, value)}
                              className="space-y-2"
                            >
                              {microQuestion.choices.map((choice, choiceIndex) => (
                                <div key={choiceIndex} className="flex items-start space-x-2 p-2 rounded-md hover:bg-spotify-hover">
                                  <RadioGroupItem
                                    value={choice}
                                    id={`alt-choice-${microQuestion.id}-${choiceIndex}`}
                                    className="mt-1"
                                  />
                                  <Label
                                    htmlFor={`alt-choice-${microQuestion.id}-${choiceIndex}`}
                                    className="text-white cursor-pointer"
                                  >
                                    {choice}
                                  </Label>
                                </div>
                              ))}
                            </RadioGroup>
                            
                            {/* Answer feedback */}
                            {microAnswers[microQuestion.id] && (
                              <div className="mt-2">
                                {microAnswers[microQuestion.id] === microQuestion.answer ? (
                                  <div className="flex items-center text-[#00C853]">
                                    <Check size={18} className="mr-2" />
                                    <span>Correct!</span>
                                  </div>
                                ) : (
                                  <div className="flex items-center text-[#FF3B30]">
                                    <X size={18} className="mr-2" />
                                    <span>Incorrect. Try again or check the solution.</span>
                                  </div>
                                )}
                                
                                {microAnswers[microQuestion.id] && !attemptedQuestions[microQuestion.id] && (
                                  <Button 
                                    variant="ghost" 
                                    onClick={() => markQuestionAttempted(microQuestion.id)}
                                    className="mt-2 text-[#9747FF]"
                                  >
                                    Continue
                                  </Button>
                                )}
                              </div>
                            )}
                          </div>
                        )}
                        
                        <Collapsible className="w-full">
                          <CollapsibleTrigger className="w-full">
                            <Button 
                              variant="outline" 
                              className="w-full border-[#9747FF] text-[#9747FF] hover:bg-[#9747FF] hover:text-white flex items-center justify-center"
                              onClick={() => toggleSolution(microQuestion.id)}
                            >
                              {showSolutions[microQuestion.id] ? "Hide Solution" : "Get Solution"}
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
                onClick={() => {
                  const newIndex = Math.max(0, currentMicroQuestion - 1);
                  setCurrentMicroQuestion(newIndex);
                }}
                disabled={currentMicroQuestion === 0}
                variant="outline"
                className="border-[#9747FF] text-[#9747FF]"
              >
                Previous Step
              </Button>
              <Button
                onClick={() => {
                  const newIndex = Math.min(method.microQuestions.length - 1, currentMicroQuestion + 1);
                  if (canAccessQuestion(newIndex)) {
                    setCurrentMicroQuestion(newIndex);
                  }
                }}
                disabled={
                  currentMicroQuestion === method.microQuestions.length - 1 || 
                  !canAccessQuestion(currentMicroQuestion + 1)
                }
                className="bg-[#9747FF] hover:bg-[#8035E8]"
              >
                Next Step
              </Button>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
