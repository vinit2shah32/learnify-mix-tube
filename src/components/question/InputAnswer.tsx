
import React from 'react';
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, X } from "lucide-react";

interface InputAnswerProps {
  inputAnswer: string;
  correctAnswer: string;
  isSubmitted: boolean;
  isCorrect: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputAnswer = ({
  inputAnswer,
  correctAnswer,
  isSubmitted,
  isCorrect,
  onInputChange
}: InputAnswerProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="answer-input" className="text-white">Your Answer:</Label>
      <Input
        id="answer-input"
        type="text"
        value={inputAnswer}
        onChange={onInputChange}
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
            <><X className="h-5 w-5 mr-2" /> Incorrect. The correct answer is: {correctAnswer}</>
          )}
        </div>
      )}
    </div>
  );
};
