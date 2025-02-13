
import React from 'react';
import { useParams } from 'react-router-dom';
import { QuestionInterface } from '@/components/QuestionInterface';

// Mock data - replace with actual data from your backend
const mockQuestion = {
  id: 1,
  question: "What is the derivative of x²?",
  type: 'single' as const,
  choices: ['x', '2x', '2', 'x²'],
  correctAnswer: '2x',
  microQuestions: [
    {
      id: 1,
      question: "What is the power rule for derivatives?",
      answer: "Multiply by the power and reduce the power by 1",
      solution: "For x^n, the derivative is nx^(n-1)",
      topic: "Power Rule"
    },
    {
      id: 2,
      question: "How do we apply the power rule to x²?",
      answer: "2x",
      solution: "x² = x^2, so we multiply by 2 and reduce the power by 1: 2x^(2-1) = 2x",
      topic: "Polynomial Derivatives"
    }
  ]
};

const Question = () => {
  const { id } = useParams();
  // In a real application, you would fetch the question data based on the ID
  
  return (
    <div className="min-h-screen bg-spotify-dark py-8">
      <QuestionInterface question={mockQuestion} />
    </div>
  );
};

export default Question;
