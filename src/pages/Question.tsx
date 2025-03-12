import React from 'react';
import { useParams } from 'react-router-dom';
import { QuestionInterface } from '@/components/question';

// Mock data - replace with actual data from your backend
const mockQuestions = {
  1: {
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
  },
  2: {
    id: 2,
    question: "Which of Newton's laws states that for every action, there is an equal and opposite reaction?",
    type: 'single' as const,
    choices: ['First Law', 'Second Law', 'Third Law', 'Fourth Law'],
    correctAnswer: 'Third Law',
    microQuestions: [
      {
        id: 1,
        question: "What is Newton's First Law?",
        answer: "An object at rest stays at rest, and an object in motion stays in motion",
        solution: "Also known as the law of inertia, it states that an object will remain at rest or in uniform motion in a straight line unless acted upon by an external force.",
        topic: "Newton's Laws"
      },
      {
        id: 2,
        question: "What is Newton's Third Law?",
        answer: "For every action, there is an equal and opposite reaction",
        solution: "When one body exerts a force on a second body, the second body simultaneously exerts a force equal in magnitude and opposite in direction on the first body.",
        topic: "Action-Reaction Pairs"
      }
    ]
  },
  3: {
    id: 3,
    question: "Which of the following is NOT a part of a eukaryotic cell?",
    type: 'single' as const,
    choices: ['Nucleus', 'Mitochondria', 'Nucleoid', 'Golgi Apparatus'],
    correctAnswer: 'Nucleoid',
    microQuestions: [
      {
        id: 1,
        question: "What is the difference between prokaryotic and eukaryotic cells?",
        answer: "Eukaryotic cells have membrane-bound organelles while prokaryotic cells don't",
        solution: "Eukaryotic cells have a true nucleus and other membrane-bound organelles, while prokaryotic cells lack these structures and have a nucleoid region instead.",
        topic: "Cell Types"
      },
      {
        id: 2,
        question: "What is a nucleoid?",
        answer: "The region in a prokaryotic cell that contains the genetic material",
        solution: "Unlike the nucleus in eukaryotes, the nucleoid is not membrane-bound. It's simply a region where the DNA is concentrated in prokaryotic cells.",
        topic: "Prokaryotic Structures"
      }
    ]
  }
};

const Question = () => {
  const { id } = useParams();
  const questionId = id ? parseInt(id) : 1;
  const question = mockQuestions[questionId as keyof typeof mockQuestions] || mockQuestions[1];
  
  return (
    <div className="min-h-screen bg-spotify-dark py-8">
      <QuestionInterface question={question} />
    </div>
  );
};

export default Question;
