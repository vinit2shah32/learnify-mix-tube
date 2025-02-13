
import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { Progress } from "./ui/progress";

interface MicroQuestion {
  id: number;
  question: string;
  answer: string;
  solution: string;
  topic: string;
}

interface Question {
  id: number;
  question: string;
  type: 'single' | 'multiple' | 'input';
  choices?: string[];
  correctAnswer: string | string[];
  microQuestions: MicroQuestion[];
}

interface QuestionInterfaceProps {
  question: Question;
}

export const QuestionInterface = ({ question }: QuestionInterfaceProps) => {
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [inputAnswer, setInputAnswer] = useState('');
  const [showSolution, setShowSolution] = useState(false);
  const [currentMicroQuestion, setCurrentMicroQuestion] = useState(0);

  const handleSingleAnswerSelect = (value: string) => {
    setSelectedAnswers([value]);
  };

  const handleMultipleAnswerSelect = (value: string) => {
    if (selectedAnswers.includes(value)) {
      setSelectedAnswers(selectedAnswers.filter(answer => answer !== value));
    } else {
      setSelectedAnswers([...selectedAnswers, value]);
    }
  };

  const handleSubmit = () => {
    setShowSolution(true);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-spotify-card rounded-lg p-6"
      >
        <h2 className="text-2xl font-bold text-white mb-6">{question.question}</h2>

        {/* Answer Section */}
        <div className="space-y-6">
          {question.type === 'single' && question.choices && (
            <RadioGroup
              onValueChange={handleSingleAnswerSelect}
              className="space-y-4"
            >
              {question.choices.map((choice, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={choice} id={`choice-${index}`} />
                  <label
                    htmlFor={`choice-${index}`}
                    className="text-white cursor-pointer"
                  >
                    {choice}
                  </label>
                </div>
              ))}
            </RadioGroup>
          )}

          {question.type === 'multiple' && question.choices && (
            <div className="space-y-4">
              {question.choices.map((choice, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Checkbox
                    id={`choice-${index}`}
                    checked={selectedAnswers.includes(choice)}
                    onCheckedChange={() => handleMultipleAnswerSelect(choice)}
                  />
                  <label
                    htmlFor={`choice-${index}`}
                    className="text-white cursor-pointer"
                  >
                    {choice}
                  </label>
                </div>
              ))}
            </div>
          )}

          {question.type === 'input' && (
            <Input
              type="text"
              value={inputAnswer}
              onChange={(e) => setInputAnswer(e.target.value)}
              placeholder="Enter your answer"
              className="bg-spotify-dark text-white"
            />
          )}

          <Button onClick={handleSubmit} className="mt-4">
            Submit Answer
          </Button>
        </div>
      </motion.div>

      {/* Solution Guide */}
      {showSolution && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-spotify-card rounded-lg p-6 mt-8"
        >
          <h3 className="text-xl font-bold text-white mb-4">Solution Guide</h3>
          <Progress
            value={(currentMicroQuestion / question.microQuestions.length) * 100}
            className="mb-6"
          />

          <div className="space-y-6">
            <div className="bg-spotify-dark rounded-lg p-4">
              <h4 className="text-lg font-semibold text-white mb-2">
                {question.microQuestions[currentMicroQuestion].question}
              </h4>
              <p className="text-spotify-text mb-4">
                Topic: {question.microQuestions[currentMicroQuestion].topic}
              </p>
              <div className="bg-spotify-hover rounded p-4 text-white">
                {question.microQuestions[currentMicroQuestion].solution}
              </div>
            </div>

            <div className="flex justify-between">
              <Button
                onClick={() => setCurrentMicroQuestion(prev => Math.max(0, prev - 1))}
                disabled={currentMicroQuestion === 0}
              >
                Previous Step
              </Button>
              <Button
                onClick={() => setCurrentMicroQuestion(prev => Math.min(question.microQuestions.length - 1, prev + 1))}
                disabled={currentMicroQuestion === question.microQuestions.length - 1}
              >
                Next Step
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
