
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
  onQuestionAnswered?: (isCorrect: boolean) => void;
}

// New interfaces for Mixes feature
export interface Topic {
  id: number;
  name: string;
  subject: string;
  exam: string;
}

export interface Mix {
  id: number;
  title: string;
  topics: string[];
  subject?: string;
  isCustom?: boolean;
}

export interface TopicPerformance {
  topic: string;
  mainQuestions: {
    id: number;
    question: string;
    status: 'Right' | 'Wrong' | 'Unattempted';
  }[];
  qas: number;
}

export interface RootCauseItem {
  microTopic: string;
  videoResources: string[];
  readingResources: string[];
}

export interface MixPracticeReport {
  topicPerformance: TopicPerformance[];
  rootCauseDetection: RootCauseItem[];
}
