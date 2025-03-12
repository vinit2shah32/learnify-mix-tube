
import React from 'react';
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Check, X } from "lucide-react";

interface MultipleChoiceProps {
  choices: string[];
  selectedAnswers: string[];
  correctAnswer: string[];
  isSubmitted: boolean;
  onValueChange: (value: string) => void;
  getChoiceLabel: (index: number) => string;
}

export const MultipleChoice = ({
  choices,
  selectedAnswers,
  correctAnswer,
  isSubmitted,
  onValueChange,
  getChoiceLabel
}: MultipleChoiceProps) => {
  return (
    <div className="space-y-4">
      {choices.map((choice, index) => (
        <div 
          key={index} 
          className={cn(
            "flex items-center space-x-3 p-3 rounded-md border-2",
            selectedAnswers.includes(choice) ? "border-[#9747FF]" : "border-transparent",
            isSubmitted && correctAnswer.includes(choice) ? "border-[#00C853]" : "",
            isSubmitted && selectedAnswers.includes(choice) && !correctAnswer.includes(choice) ? "border-[#FF3B30]" : ""
          )}
        >
          <div className="flex items-center h-5">
            <Checkbox
              id={`choice-${index}`}
              checked={selectedAnswers.includes(choice)}
              onCheckedChange={() => !isSubmitted && onValueChange(choice)}
              className={cn(
                isSubmitted && correctAnswer.includes(choice) ? "text-[#00C853] border-[#00C853]" : "",
                isSubmitted && selectedAnswers.includes(choice) && !correctAnswer.includes(choice) ? "text-[#FF3B30] border-[#FF3B30]" : ""
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
            {isSubmitted && correctAnswer.includes(choice) && (
              <Check className="h-5 w-5 text-[#00C853]" />
            )}
            {isSubmitted && selectedAnswers.includes(choice) && !correctAnswer.includes(choice) && (
              <X className="h-5 w-5 text-[#FF3B30]" />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
