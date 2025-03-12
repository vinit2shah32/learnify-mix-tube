
import React from 'react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { LinkIcon } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MicroQuestion } from './types';

interface SolutionGuideProps {
  microQuestions: MicroQuestion[];
  currentMicroQuestion: number;
  setCurrentMicroQuestion: (index: number) => void;
}

export const SolutionGuide = ({ 
  microQuestions, 
  currentMicroQuestion, 
  setCurrentMicroQuestion 
}: SolutionGuideProps) => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-white mb-4">Interactive Solution Guide</h3>
      <Progress
        value={(currentMicroQuestion / (microQuestions.length - 1)) * 100}
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
          {microQuestions.map((microQuestion, index) => (
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
          onClick={() => setCurrentMicroQuestion(prev => Math.min(microQuestions.length - 1, prev + 1))}
          disabled={currentMicroQuestion === microQuestions.length - 1}
          className="bg-[#9747FF] hover:bg-[#8035E8]"
        >
          Next Step
        </Button>
      </div>
    </div>
  );
};
