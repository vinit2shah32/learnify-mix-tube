
import React, { useState } from 'react';
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Question, QuestionInterfaceProps } from './types';
import { SingleChoice } from './SingleChoice';
import { MultipleChoice } from './MultipleChoice';
import { InputAnswer } from './InputAnswer';
import { FeedbackMessage } from './FeedbackMessage';
import { SolutionGuide } from './SolutionGuide';

export const QuestionInterface = ({ question, onQuestionAnswered }: QuestionInterfaceProps) => {
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [inputAnswer, setInputAnswer] = useState('');
  const [showSolution, setShowSolution] = useState(false);
  const [currentMicroQuestion, setCurrentMicroQuestion] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  
  const checkAnswer = () => {
    let correct = false;
    
    if (question.type === 'single') {
      correct = selectedAnswers.length === 1 && selectedAnswers[0] === question.correctAnswer;
    } else if (question.type === 'multiple') {
      const correctAnswersArray = Array.isArray(question.correctAnswer) 
        ? question.correctAnswer 
        : [question.correctAnswer];
      correct = selectedAnswers.length === correctAnswersArray.length && 
        selectedAnswers.every(answer => correctAnswersArray.includes(answer));
    } else if (question.type === 'input') {
      correct = inputAnswer.trim().toLowerCase() === String(question.correctAnswer).toLowerCase();
    }
    
    return correct;
  };

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputAnswer(e.target.value);
  };

  const handleSubmit = () => {
    const correct = checkAnswer();
    setIsCorrect(correct);
    setIsSubmitted(true);
  };

  const handleNextQuestion = () => {
    // Notify parent component about the question result
    if (onQuestionAnswered) {
      onQuestionAnswered(isCorrect);
    }
    
    setSelectedAnswers([]);
    setInputAnswer('');
    setIsSubmitted(false);
    setIsCorrect(false);
    setShowSolution(false);
  };

  const handleTryAgain = () => {
    setSelectedAnswers([]);
    setInputAnswer('');
    setIsSubmitted(false);
  };

  const getChoiceLabel = (index: number) => {
    return String.fromCharCode(65 + index); // A, B, C, D, etc.
  };

  const getCorrectAnswersArray = (question: Question): string[] => {
    return Array.isArray(question.correctAnswer)
      ? question.correctAnswer
      : [question.correctAnswer as string];
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-spotify-card rounded-lg p-6 shadow-lg"
      >
        <h2 className="text-2xl font-bold text-white mb-6">{question.question}</h2>

        {/* Answer Section */}
        <div className="space-y-6">
          {question.type === 'single' && question.choices && (
            <SingleChoice
              choices={question.choices}
              selectedAnswers={selectedAnswers}
              correctAnswer={question.correctAnswer as string}
              isSubmitted={isSubmitted}
              onValueChange={handleSingleAnswerSelect}
              getChoiceLabel={getChoiceLabel}
            />
          )}

          {question.type === 'multiple' && question.choices && (
            <MultipleChoice
              choices={question.choices}
              selectedAnswers={selectedAnswers}
              correctAnswer={getCorrectAnswersArray(question)}
              isSubmitted={isSubmitted}
              onValueChange={handleMultipleAnswerSelect}
              getChoiceLabel={getChoiceLabel}
            />
          )}

          {question.type === 'input' && (
            <InputAnswer
              inputAnswer={inputAnswer}
              correctAnswer={question.correctAnswer as string}
              isSubmitted={isSubmitted}
              isCorrect={isCorrect}
              onInputChange={handleInputChange}
            />
          )}

          {/* Feedback message */}
          <FeedbackMessage isSubmitted={isSubmitted} isCorrect={isCorrect} />

          {/* Action Button */}
          {!isSubmitted ? (
            <Button 
              onClick={handleSubmit} 
              className="w-full bg-[#9747FF] hover:bg-[#8035E8]"
              disabled={question.type === 'single' || question.type === 'multiple' 
                ? selectedAnswers.length === 0 
                : inputAnswer.trim() === ''}
            >
              Submit Answer
            </Button>
          ) : isCorrect ? (
            <Button 
              onClick={handleNextQuestion} 
              className="w-full bg-[#9747FF] hover:bg-[#8035E8]"
            >
              Next Question
            </Button>
          ) : (
            <Button 
              onClick={handleTryAgain} 
              className="w-full bg-[#9747FF] hover:bg-[#8035E8]"
            >
              Try Again
            </Button>
          )}

          {/* Interactive Solution Guide Link */}
          <div className="text-center mt-4">
            <button 
              onClick={() => setShowSolution(!showSolution)} 
              className="text-[#9747FF] underline text-sm font-medium"
            >
              {showSolution ? "Hide" : "Check"} Interactive Solution Guide
            </button>
          </div>
        </div>
      </motion.div>

      {/* Interactive Solution Guide */}
      {showSolution && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-spotify-card rounded-lg p-6 shadow-lg"
        >
          <SolutionGuide
            microQuestions={question.microQuestions}
            alternativeMethods={question.alternativeMethods}
            currentMicroQuestion={currentMicroQuestion}
            setCurrentMicroQuestion={setCurrentMicroQuestion}
          />
        </motion.div>
      )}
    </div>
  );
};
