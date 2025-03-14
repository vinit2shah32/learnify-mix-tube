
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { QuestionInterface } from '@/components/question';
import { Question, Mix } from '@/components/question/types';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

// Mock data - replace with actual backend data
const mockMixes: Mix[] = [
  { id: 1, title: 'Statistics Mix', topics: ['Median', 'Standard Deviation', 'Average'], subject: 'Mathematics' },
  { id: 2, title: 'Linear relationship Word problems mix', topics: ['Linear equations', 'Word Problems', 'Slopes'], subject: 'Mathematics' },
  { id: 3, title: 'Quadratic functions mix', topics: ['Quadratic equations', 'Graphs', 'Vertex'], subject: 'Mathematics' },
];

// Mock questions for each topic
const mockQuestions: Record<string, Question[]> = {
  'Median': [
    {
      id: 101,
      question: "What is the median of the following numbers: 5, 7, 12, 9, 8?",
      type: 'single',
      choices: ['5', '7', '8', '9'],
      correctAnswer: '8',
      microQuestions: [
        {
          id: 1,
          question: "What is the first step to find the median?",
          answer: "Arrange the numbers in ascending order",
          solution: "To find the median, we first arrange the numbers in ascending order: 5, 7, 8, 9, 12",
          topic: "Median Computation",
          choices: ["Add all numbers", "Arrange the numbers in ascending order", "Find the average", "Count the numbers"]
        },
        {
          id: 2,
          question: "What is the middle value in the ordered list?",
          answer: "8",
          solution: "After ordering (5, 7, 8, 9, 12), the middle value is the 3rd value, which is 8",
          topic: "Middle Value Identification",
          choices: ["5", "7", "8", "9"]
        }
      ]
    },
    {
      id: 102,
      question: "If two more values 10 and 11 are added to the set {5, 7, 12, 9, 8}, what is the new median?",
      type: 'single',
      choices: ['8', '8.5', '9', '9.5'],
      correctAnswer: '8.5',
      microQuestions: [
        {
          id: 1,
          question: "How many values are in the new set?",
          answer: "7",
          solution: "The original set had 5 values, and we added 2 more, making it 7 values in total",
          topic: "Set Size",
          choices: ["5", "6", "7", "8"]
        },
        {
          id: 2,
          question: "What are the middle values in the ordered list?",
          answer: "8 and 9",
          solution: "After ordering (5, 7, 8, 9, 10, 11, 12), the middle is between the 3rd and 4th values: 8 and 9",
          topic: "Middle Values For Even Sets",
          choices: ["7 and 8", "8 and 9", "9 and 10", "5 and 12"]
        }
      ]
    }
  ],
  // ... mock data for other topics
};

const Practice = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentRound, setCurrentRound] = useState(1);
  const [topicIndex, setTopicIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);
  const [topicQAS, setTopicQAS] = useState<Record<string, number>>({});
  const [roundComplete, setRoundComplete] = useState(false);
  const [practiceComplete, setPracticeComplete] = useState(false);
  
  const selectedMix = mockMixes.find(mix => mix.id === parseInt(id || '1'));
  
  // Initialize
  useEffect(() => {
    if (selectedMix) {
      // Initialize QAS scores for each topic
      const initialQAS: Record<string, number> = {};
      selectedMix.topics.forEach(topic => {
        initialQAS[topic] = 0;
      });
      setTopicQAS(initialQAS);
      
      // Load first question
      loadQuestion(0, 0);
    }
  }, [selectedMix]);
  
  const loadQuestion = (tIndex: number, qIndex: number) => {
    if (!selectedMix) return;
    
    // Check if we've gone through all topics in this round
    if (tIndex >= selectedMix.topics.length) {
      setRoundComplete(true);
      return;
    }
    
    const currentTopic = selectedMix.topics[tIndex];
    const topicQuestions = mockQuestions[currentTopic] || [];
    
    // Check if we've gone through all questions for this topic
    if (qIndex >= topicQuestions.length) {
      // Move to next topic
      loadQuestion(tIndex + 1, 0);
      return;
    }
    
    setTopicIndex(tIndex);
    setQuestionIndex(qIndex);
    setCurrentQuestion(topicQuestions[qIndex]);
  };
  
  const handleQuestionAnswered = (isCorrect: boolean) => {
    if (!currentQuestion || !selectedMix) return;
    
    // Mark question as answered
    setAnsweredQuestions([...answeredQuestions, currentQuestion.id]);
    
    // Update QAS score if answered correctly
    if (isCorrect) {
      const currentTopic = selectedMix.topics[topicIndex];
      setTopicQAS(prev => ({
        ...prev,
        [currentTopic]: prev[currentTopic] + 10
      }));
    }
    
    // Move to next question
    loadQuestion(topicIndex, questionIndex + 1);
  };
  
  const startNextRound = () => {
    if (currentRound >= 5) {
      // Max rounds reached, complete practice
      setPracticeComplete(true);
      return;
    }
    
    // Filter out topics that have reached QAS threshold (80)
    const remainingTopics: string[] = [];
    selectedMix?.topics.forEach(topic => {
      if ((topicQAS[topic] || 0) < 80) {
        remainingTopics.push(topic);
      }
    });
    
    if (remainingTopics.length === 0) {
      // All topics have reached threshold, complete practice
      setPracticeComplete(true);
      return;
    }
    
    // Start next round
    setCurrentRound(currentRound + 1);
    setRoundComplete(false);
    setTopicIndex(0);
    setQuestionIndex(0);
    
    // Load first question of next round
    const nextTopicIndex = selectedMix?.topics.findIndex(topic => remainingTopics.includes(topic)) || 0;
    loadQuestion(nextTopicIndex, 0);
  };
  
  const finishPractice = () => {
    navigate(`/mix-practice-report/${id}`);
  };
  
  // Show fortune cookie at completion
  useEffect(() => {
    if (practiceComplete) {
      const fortunes = [
        "Your future success is closer than you think!",
        "Knowledge comes from practice and patience.",
        "A problem shared is a problem halved.",
        "The best way to predict your future is to create it.",
        "You will master all challenges with your dedication!"
      ];
      const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
      toast({
        title: "Fortune Cookie 🥠",
        description: randomFortune,
        duration: 5000,
      });
    }
  }, [practiceComplete]);
  
  if (!selectedMix || !currentQuestion) {
    return <div className="text-center py-10">Loading practice session...</div>;
  }
  
  return (
    <div className="min-h-screen bg-spotify-dark text-white pb-10">
      <div className="container py-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold">{selectedMix.title} - Round {currentRound}</h1>
            <div className="bg-spotify-card px-4 py-2 rounded-full">
              Progress: {answeredQuestions.length} / {Object.values(mockQuestions).flat().length}
            </div>
          </div>
          
          <div className="grid gap-4 mb-6">
            {selectedMix.topics.map((topic, index) => (
              <div key={index} className="bg-spotify-card rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">{topic}</span>
                  <span className="text-sm">{topicQAS[topic] || 0}/100 QAS</span>
                </div>
                <Progress value={topicQAS[topic] || 0} className="h-2" />
              </div>
            ))}
          </div>
        </motion.div>
        
        {roundComplete ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-spotify-card rounded-lg p-8 text-center"
          >
            <h2 className="text-2xl font-bold mb-4">Round {currentRound} Complete!</h2>
            {practiceComplete ? (
              <>
                <p className="mb-6">Congratulations! You've completed all practice rounds.</p>
                <Button 
                  onClick={finishPractice}
                  className="bg-[#9747FF] hover:bg-[#8035E8] px-8 py-3 text-lg"
                >
                  View Your Results
                </Button>
              </>
            ) : (
              <>
                <p className="mb-6">Ready for the next round?</p>
                <Button 
                  onClick={startNextRound}
                  className="bg-[#9747FF] hover:bg-[#8035E8] px-8 py-3 text-lg"
                >
                  Start Round {currentRound + 1}
                </Button>
              </>
            )}
          </motion.div>
        ) : (
          <div className="mb-6">
            <div className="mb-4 text-center">
              <span className="px-4 py-2 bg-spotify-hover rounded-full text-sm">
                Topic: {selectedMix.topics[topicIndex]}
              </span>
            </div>
            <QuestionInterface 
              question={currentQuestion}
              // This would need to be extended to support tracking answers
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Practice;
