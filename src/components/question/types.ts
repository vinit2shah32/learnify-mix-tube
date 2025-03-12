
export interface MicroQuestion {
  id: number;
  question: string;
  answer: string;
  solution: string;
  topic: string;
}

export interface Question {
  id: number;
  question: string;
  type: 'single' | 'multiple' | 'input';
  choices?: string[];
  correctAnswer: string | string[];
  microQuestions: MicroQuestion[];
}

export interface QuestionInterfaceProps {
  question: Question;
}
