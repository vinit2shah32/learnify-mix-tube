
export interface MicroQuestion {
  id: number;
  question: string;
  answer: string;
  solution: string;
  topic: string;
  choices?: string[]; // Added choices for micro questions
  attempted?: boolean; // Track if attempted
}

export interface SolutionMethod {
  name: string;
  description: string;
  microQuestions: MicroQuestion[];
}

export interface Question {
  id: number;
  question: string;
  type: 'single' | 'multiple' | 'input';
  choices?: string[];
  correctAnswer: string | string[];
  microQuestions: MicroQuestion[];
  alternativeMethods?: SolutionMethod[]; // Add alternative methods
}

export interface QuestionInterfaceProps {
  question: Question;
}
