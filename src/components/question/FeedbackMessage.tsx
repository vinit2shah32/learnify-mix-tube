
import React from 'react';
import { cn } from "@/lib/utils";

interface FeedbackMessageProps {
  isSubmitted: boolean;
  isCorrect: boolean;
}

export const FeedbackMessage = ({ isSubmitted, isCorrect }: FeedbackMessageProps) => {
  if (!isSubmitted) return null;
  
  return (
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
  );
};
