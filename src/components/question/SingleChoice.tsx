
import React from 'react';
import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Check, X } from "lucide-react";

interface SingleChoiceProps {
  choices: string[];
  selectedAnswers: string[];
  correctAnswer: string;
  isSubmitted: boolean;
  onValueChange: (value: string) => void;
  getChoiceLabel: (index: number) => string;
}

export const SingleChoice = ({
  choices,
  selectedAnswers,
  correctAnswer,
  isSubmitted,
  onValueChange,
  getChoiceLabel
}: SingleChoiceProps) => {
  return (
    <RadioGroup
      onValueChange={onValueChange}
      value={selectedAnswers[0]}
      className="space-y-4"
      disabled={isSubmitted}
    >
      {choices.map((choice, index) => (
        <div 
          key={index} 
          className={cn(
            "flex items-center space-x-3 p-3 rounded-md border-2",
            selectedAnswers[0] === choice ? "border-[#9747FF]" : "border-transparent",
            isSubmitted && choice === correctAnswer ? "border-[#00C853]" : "",
            isSubmitted && selectedAnswers[0] === choice && choice !== correctAnswer ? "border-[#FF3B30]" : ""
          )}
        >
          <div className="flex items-center h-5">
            <RadioGroupItem 
              value={choice} 
              id={`choice-${index}`} 
              className={cn(
                isSubmitted && choice === correctAnswer ? "text-[#00C853] border-[#00C853]" : "",
                isSubmitted && selectedAnswers[0] === choice && choice !== correctAnswer ? "text-[#FF3B30] border-[#FF3B30]" : ""
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
            {isSubmitted && choice === correctAnswer && (
              <Check className="h-5 w-5 text-[#00C853]" />
            )}
            {isSubmitted && selectedAnswers[0] === choice && choice !== correctAnswer && (
              <X className="h-5 w-5 text-[#FF3B30]" />
            )}
          </div>
        </div>
      ))}
    </RadioGroup>
  );
};
