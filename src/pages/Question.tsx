
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
        topic: "Power Rule",
        choices: ["Add the power", "Multiply by the power and reduce the power by 1", "Square the variable", "Divide by the power"]
      },
      {
        id: 2,
        question: "How do we apply the power rule to x²?",
        answer: "2x",
        solution: "x² = x^2, so we multiply by 2 and reduce the power by 1: 2x^(2-1) = 2x",
        topic: "Polynomial Derivatives",
        choices: ["x", "2x", "2x²", "x/2"]
      }
    ],
    alternativeMethods: [
      {
        name: "Limit Definition",
        description: "Using the limit definition of the derivative to find the derivative of x²",
        microQuestions: [
          {
            id: 3,
            question: "What is the limit definition of the derivative?",
            answer: "lim(h→0) [f(x+h) - f(x)]/h",
            solution: "The derivative is defined as the limit as h approaches 0 of [f(x+h) - f(x)]/h",
            topic: "Limit Definition",
            choices: ["lim(h→0) [f(x+h) + f(x)]/h", "lim(h→0) [f(x+h) - f(x)]/h", "lim(h→0) [f(x+h) × f(x)]/h", "lim(h→0) [f(x+h) / f(x)]/h"]
          },
          {
            id: 4,
            question: "What is f(x+h) when f(x) = x²?",
            answer: "(x+h)²",
            solution: "When f(x) = x², then f(x+h) = (x+h)² = x² + 2xh + h²",
            topic: "Function Evaluation",
            choices: ["x² + h", "(x+h)²", "x² + h²", "2(x+h)"]
          },
          {
            id: 5,
            question: "What is [f(x+h) - f(x)]/h for f(x) = x²?",
            answer: "2x + h",
            solution: "[f(x+h) - f(x)]/h = [(x+h)² - x²]/h = [x² + 2xh + h² - x²]/h = [2xh + h²]/h = 2x + h",
            topic: "Limit Computation",
            choices: ["2x - h", "2x + h", "2x", "x + h"]
          }
        ]
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
        topic: "Newton's Laws",
        choices: [
          "An object at rest stays at rest, and an object in motion stays in motion",
          "Force equals mass times acceleration",
          "For every action, there is an equal and opposite reaction",
          "Energy cannot be created or destroyed"
        ]
      },
      {
        id: 2,
        question: "What is Newton's Third Law?",
        answer: "For every action, there is an equal and opposite reaction",
        solution: "When one body exerts a force on a second body, the second body simultaneously exerts a force equal in magnitude and opposite in direction on the first body.",
        topic: "Action-Reaction Pairs",
        choices: [
          "An object at rest stays at rest, and an object in motion stays in motion",
          "Force equals mass times acceleration",
          "For every action, there is an equal and opposite reaction",
          "Energy can neither be created nor destroyed"
        ]
      }
    ],
    alternativeMethods: [
      {
        name: "Examples",
        description: "Understanding Newton's Third Law through everyday examples",
        microQuestions: [
          {
            id: 3,
            question: "Which is an example of Newton's Third Law?",
            answer: "A swimmer pushing water backwards to move forward",
            solution: "When the swimmer pushes water backwards (action), the water pushes the swimmer forwards (reaction) with equal force.",
            topic: "Practical Applications",
            choices: [
              "A ball rolling down a hill due to gravity",
              "A car accelerating when more gas is applied",
              "A swimmer pushing water backwards to move forward", 
              "A box remaining at rest on a table"
            ]
          },
          {
            id: 4,
            question: "Why do rockets work in space according to Newton's Third Law?",
            answer: "The rocket pushes exhaust gases backward, and the gases push the rocket forward",
            solution: "Rockets eject mass (exhaust gases) at high velocity in one direction, and experience an equal force in the opposite direction, allowing them to accelerate in space even without air.",
            topic: "Space Propulsion",
            choices: [
              "They have special motors that work in vacuum",
              "The rocket pushes exhaust gases backward, and the gases push the rocket forward",
              "They use solar energy to move",
              "They push against cosmic radiation"
            ]
          }
        ]
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
