
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { QuestionInterface } from '@/components/question';
import { Question, Mix } from '@/components/question/types';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

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
  'Standard Deviation': [
    {
      id: 201,
      question: "What is the standard deviation of the data set {2, 4, 6, 8, 10}?",
      type: 'single',
      choices: ['2.83', '3.16', '8', '10'],
      correctAnswer: '3.16',
      microQuestions: [
        {
          id: 1,
          question: "What is the mean of this data set?",
          answer: "6",
          solution: "The mean is (2+4+6+8+10)/5 = 30/5 = 6",
          topic: "Mean Calculation",
          choices: ["2", "4", "6", "8"]
        },
        {
          id: 2,
          question: "What is the variance of this data set?",
          answer: "10",
          solution: "The variance is calculated as the average of squared deviations: [(2-6)² + (4-6)² + (6-6)² + (8-6)² + (10-6)²]/5 = (16+4+0+4+16)/5 = 40/5 = 8",
          topic: "Variance Calculation",
          choices: ["5", "8", "10", "16"]
        }
      ]
    },
    {
      id: 202,
      question: "If a constant value of 5 is added to each observation in a data set, what happens to the standard deviation?",
      type: 'single',
      choices: ['It increases by 5', 'It remains the same', 'It decreases by 5', 'It is multiplied by 5'],
      correctAnswer: 'It remains the same',
      microQuestions: [
        {
          id: 1,
          question: "What happens to the mean when a constant is added to all values?",
          answer: "The mean increases by the same constant",
          solution: "When a constant c is added to all values, the mean increases by c",
          topic: "Effect on Mean",
          choices: ["The mean doesn't change", "The mean increases by the same constant", "The mean is multiplied by the constant", "The mean becomes undefined"]
        },
        {
          id: 2,
          question: "How does adding a constant affect the deviations from the mean?",
          answer: "The deviations remain unchanged",
          solution: "If the mean increases by c, and each value increases by c, the deviations (value - mean) remain unchanged",
          topic: "Effect on Deviations",
          choices: ["The deviations increase", "The deviations decrease", "The deviations remain unchanged", "The deviations become zero"]
        }
      ]
    }
  ],
  'Average': [
    {
      id: 301,
      question: "The average of five numbers is 27. If one number is excluded, the average becomes 25. What is the excluded number?",
      type: 'single',
      choices: ['27', '35', '40', '45'],
      correctAnswer: '35',
      microQuestions: [
        {
          id: 1,
          question: "What is the sum of all five numbers?",
          answer: "135",
          solution: "Sum = Average × Count = 27 × 5 = 135",
          topic: "Sum from Average",
          choices: ["27", "54", "108", "135"]
        },
        {
          id: 2,
          question: "What is the sum of the remaining four numbers?",
          answer: "100",
          solution: "Sum of four numbers = Average × Count = 25 × 4 = 100",
          topic: "Partial Sum Calculation",
          choices: ["75", "100", "125", "135"]
        }
      ]
    },
    {
      id: 302,
      question: "If the average of 11 numbers is 10, and the average of 6 of these numbers is 8, what is the average of the remaining numbers?",
      type: 'single',
      choices: ['8', '12', '11', '15'],
      correctAnswer: '12',
      microQuestions: [
        {
          id: 1,
          question: "What is the sum of all 11 numbers?",
          answer: "110",
          solution: "Sum of all 11 numbers = 11 × 10 = 110",
          topic: "Total Sum",
          choices: ["88", "100", "110", "120"]
        },
        {
          id: 2,
          question: "What is the sum of the 6 numbers with average 8?",
          answer: "48",
          solution: "Sum of 6 numbers = 6 × 8 = 48",
          topic: "Partial Sum",
          choices: ["40", "48", "54", "60"]
        }
      ]
    }
  ],
  // Add mock questions for other common topics to prevent errors
  'Linear equations': [
    {
      id: 401,
      question: "Solve for x: 3x + 5 = 14",
      type: 'single',
      choices: ['2', '3', '4', '5'],
      correctAnswer: '3',
      microQuestions: [
        {
          id: 1,
          question: "What is the first step to solve this equation?",
          answer: "Subtract 5 from both sides",
          solution: "To isolate the variable term, we subtract 5 from both sides: 3x + 5 - 5 = 14 - 5, which gives us 3x = 9",
          topic: "Equation Solving",
          choices: ["Add 5 to both sides", "Subtract 5 from both sides", "Divide by 3", "Multiply by 3"]
        },
        {
          id: 2,
          question: "What is the final step to find x?",
          answer: "Divide both sides by 3",
          solution: "After getting 3x = 9, we divide both sides by 3 to isolate x: x = 9/3 = 3",
          topic: "Equation Solving",
          choices: ["Multiply both sides by 3", "Divide both sides by 3", "Add 9 to both sides", "Subtract 9 from both sides"]
        }
      ]
    },
    {
      id: 402,
      question: "If 2x - 3y = 7 and 3x + 2y = 8, what is the value of x?",
      type: 'single',
      choices: ['2', '3', '4', '5'],
      correctAnswer: '3',
      microQuestions: [
        {
          id: 1,
          question: "How can you eliminate y from these equations?",
          answer: "Multiply the first equation by 2 and the second by 3, then add them",
          solution: "Multiply first equation by 2: 4x - 6y = 14. Multiply second equation by 3: 9x + 6y = 24. Adding these: 13x = 38",
          topic: "System of Equations",
          choices: ["Add the equations directly", "Subtract the equations", "Multiply the first equation by 2 and the second by 3, then add them", "Divide both equations by 2"]
        },
        {
          id: 2,
          question: "What is the value of x?",
          answer: "3",
          solution: "From 13x = 38, we get x = 38/13 = 2.92, which rounds to 3",
          topic: "System of Equations",
          choices: ["2", "3", "4", "5"]
        }
      ]
    }
  ],
  'Word Problems': [
    {
      id: 501,
      question: "A train travels at a speed of 60 km/h. How long will it take to travel 150 km?",
      type: 'single',
      choices: ['1.5 hours', '2 hours', '2.5 hours', '3 hours'],
      correctAnswer: '2.5 hours',
      microQuestions: [
        {
          id: 1,
          question: "What formula relates distance, speed, and time?",
          answer: "Time = Distance ÷ Speed",
          solution: "The formula to find time when distance and speed are given is: Time = Distance ÷ Speed",
          topic: "Distance-Speed-Time",
          choices: ["Time = Speed × Distance", "Time = Distance ÷ Speed", "Time = Speed ÷ Distance", "Distance = Speed × Time"]
        },
        {
          id: 2,
          question: "What is the time taken by the train?",
          answer: "2.5 hours",
          solution: "Time = 150 km ÷ 60 km/h = 2.5 hours",
          topic: "Distance-Speed-Time",
          choices: ["1.5 hours", "2 hours", "2.5 hours", "3 hours"]
        }
      ]
    },
    {
      id: 502,
      question: "John can complete a task in 4 hours, while Mary can complete the same task in 6 hours. How long will it take them to complete the task working together?",
      type: 'single',
      choices: ['2 hours', '2.4 hours', '5 hours', '10 hours'],
      correctAnswer: '2.4 hours',
      microQuestions: [
        {
          id: 1,
          question: "What is John's work rate per hour?",
          answer: "1/4 of the task",
          solution: "John completes the task in 4 hours, so his rate is 1/4 of the task per hour",
          topic: "Work Rate Problems",
          choices: ["1/2 of the task", "1/3 of the task", "1/4 of the task", "4 tasks"]
        },
        {
          id: 2,
          question: "What is the combined work rate per hour?",
          answer: "5/12 of the task",
          solution: "John's rate: 1/4 task/hour. Mary's rate: 1/6 task/hour. Combined: 1/4 + 1/6 = 3/12 + 2/12 = 5/12 task/hour",
          topic: "Work Rate Problems",
          choices: ["1/10 of the task", "2/10 of the task", "5/12 of the task", "10 tasks"]
        }
      ]
    }
  ],
  'Slopes': [
    {
      id: 601,
      question: "What is the slope of the line passing through the points (3, 7) and (5, 11)?",
      type: 'single',
      choices: ['1', '2', '3', '4'],
      correctAnswer: '2',
      microQuestions: [
        {
          id: 1,
          question: "What is the formula for calculating slope?",
          answer: "Slope = (y₂ - y₁) / (x₂ - x₁)",
          solution: "The slope formula is: Slope = (y₂ - y₁) / (x₂ - x₁)",
          topic: "Slope Formula",
          choices: ["Slope = (x₂ - x₁) / (y₂ - y₁)", "Slope = (y₂ - y₁) / (x₂ - x₁)", "Slope = (x₂ + x₁) / (y₂ + y₁)", "Slope = (y₂ + y₁) / (x₂ + x₁)"]
        },
        {
          id: 2,
          question: "What is the slope of the line?",
          answer: "2",
          solution: "Slope = (11 - 7) / (5 - 3) = 4 / 2 = 2",
          topic: "Slope Calculation",
          choices: ["1", "2", "3", "4"]
        }
      ]
    },
    {
      id: 602,
      question: "What is the slope of a horizontal line?",
      type: 'single',
      choices: ['0', '1', 'Undefined', 'Infinity'],
      correctAnswer: '0',
      microQuestions: [
        {
          id: 1,
          question: "What are the coordinates of two points on a horizontal line?",
          answer: "They have the same y-coordinate but different x-coordinates",
          solution: "A horizontal line has the form y = c (a constant). Any two points have the same y-value but different x-values",
          topic: "Horizontal Lines",
          choices: ["They have the same x-coordinate", "They have the same y-coordinate but different x-coordinates", "They have different x and y coordinates", "They are always (0,0) and (1,1)"]
        },
        {
          id: 2,
          question: "What happens when you apply the slope formula to a horizontal line?",
          answer: "The numerator becomes 0",
          solution: "For points (x₁, y) and (x₂, y) on a horizontal line, the slope is (y - y) / (x₂ - x₁) = 0 / (x₂ - x₁) = 0",
          topic: "Horizontal Lines",
          choices: ["The denominator becomes 0", "The numerator becomes 0", "Both numerator and denominator become 0", "The result is always 1"]
        }
      ]
    }
  ],
  'Quadratic equations': [
    {
      id: 701,
      question: "Solve the quadratic equation: x² - 5x + 6 = 0",
      type: 'multiple',
      choices: ['x = 2', 'x = 3', 'x = -2', 'x = -3'],
      correctAnswer: ['x = 2', 'x = 3'],
      microQuestions: [
        {
          id: 1,
          question: "What method can you use to solve this equation?",
          answer: "Factoring",
          solution: "Since this is a simple quadratic equation, we can use factoring to solve it",
          topic: "Quadratic Equations",
          choices: ["Factoring", "Quadratic formula", "Completing the square", "Graphing"]
        },
        {
          id: 2,
          question: "What is the factored form of x² - 5x + 6?",
          answer: "(x - 2)(x - 3)",
          solution: "We need to find two numbers that multiply to give 6 and add to give -5. Those numbers are -2 and -3, so x² - 5x + 6 = (x - 2)(x - 3)",
          topic: "Factoring Quadratics",
          choices: ["(x + 2)(x + 3)", "(x - 2)(x - 3)", "(x + 2)(x - 3)", "(x - 2)(x + 3)"]
        }
      ]
    },
    {
      id: 702,
      question: "Using the quadratic formula, solve: 2x² - 7x + 3 = 0",
      type: 'multiple',
      choices: ['x = 0.5', 'x = 3', 'x = 1.5', 'x = 4'],
      correctAnswer: ['x = 0.5', 'x = 3'],
      microQuestions: [
        {
          id: 1,
          question: "What is the quadratic formula?",
          answer: "x = (-b ± √(b² - 4ac)) / 2a",
          solution: "For a quadratic equation ax² + bx + c = 0, the quadratic formula is x = (-b ± √(b² - 4ac)) / 2a",
          topic: "Quadratic Formula",
          choices: ["x = (b ± √(b² - 4ac)) / 2a", "x = (-b ± √(b² - 4ac)) / 2a", "x = (-b ± √(b² + 4ac)) / 2a", "x = (-b ± √(b² - 4ac)) / 2c"]
        },
        {
          id: 2,
          question: "What is the discriminant for this equation?",
          answer: "25",
          solution: "The discriminant is b² - 4ac = (-7)² - 4(2)(3) = 49 - 24 = 25",
          topic: "Discriminant",
          choices: ["7", "14", "25", "49"]
        }
      ]
    }
  ],
  'Graphs': [
    {
      id: 801,
      question: "What is the y-intercept of the line 3x - 2y = 6?",
      type: 'single',
      choices: ['-3', '-2', '3', '6'],
      correctAnswer: '-3',
      microQuestions: [
        {
          id: 1,
          question: "What does the y-intercept represent?",
          answer: "The point where the line crosses the y-axis",
          solution: "The y-intercept is the y-coordinate of the point where the line crosses the y-axis (where x = 0)",
          topic: "Y-intercept",
          choices: ["The point where the line crosses the x-axis", "The point where the line crosses the y-axis", "The slope of the line", "The equation of the line"]
        },
        {
          id: 2,
          question: "How do you find the y-intercept from the equation 3x - 2y = 6?",
          answer: "Set x = 0 and solve for y",
          solution: "To find the y-intercept, set x = 0: 3(0) - 2y = 6, which gives -2y = 6, so y = -3",
          topic: "Finding Y-intercept",
          choices: ["Set y = 0 and solve for x", "Set x = 0 and solve for y", "Divide 6 by 2", "Divide 6 by 3"]
        }
      ]
    },
    {
      id: 802,
      question: "What is the center of the circle with equation (x - 3)² + (y + 2)² = 16?",
      type: 'single',
      choices: ['(3, 2)', '(3, -2)', '(-3, 2)', '(-3, -2)'],
      correctAnswer: '(3, -2)',
      microQuestions: [
        {
          id: 1,
          question: "What is the standard form of the equation of a circle?",
          answer: "(x - h)² + (y - k)² = r²",
          solution: "The standard form of the equation of a circle with center (h, k) and radius r is (x - h)² + (y - k)² = r²",
          topic: "Circle Equation",
          choices: ["(x + h)² + (y + k)² = r²", "(x - h)² + (y - k)² = r²", "x² + y² = r²", "(h - x)² + (k - y)² = r²"]
        },
        {
          id: 2,
          question: "What are the coordinates of the center?",
          answer: "(3, -2)",
          solution: "Given (x - 3)² + (y + 2)² = 16, comparing with standard form, we have h = 3 and k = -2 (note the + sign before 2 means k = -2), so the center is (3, -2)",
          topic: "Circle Center",
          choices: ["(3, 2)", "(3, -2)", "(-3, 2)", "(-3, -2)"]
        }
      ]
    }
  ],
  'Vertex': [
    {
      id: 901,
      question: "What is the vertex of the parabola with equation y = x² - 6x + 8?",
      type: 'single',
      choices: ['(3, -1)', '(3, 1)', '(-3, -1)', '(-3, 1)'],
      correctAnswer: '(3, -1)',
      microQuestions: [
        {
          id: 1,
          question: "How do you find the x-coordinate of the vertex?",
          answer: "x = -b / (2a)",
          solution: "For a quadratic function y = ax² + bx + c, the x-coordinate of the vertex is given by x = -b / (2a)",
          topic: "Vertex Formula",
          choices: ["x = b / 2a", "x = -b / (2a)", "x = -b / a", "x = -c / b"]
        },
        {
          id: 2,
          question: "What is the y-coordinate of the vertex?",
          answer: "-1",
          solution: "After finding x = 3, substitute into the original equation: y = 3² - 6(3) + 8 = 9 - 18 + 8 = -1",
          topic: "Vertex Calculation",
          choices: ["1", "-1", "3", "-3"]
        }
      ]
    },
    {
      id: 902,
      question: "What is the vertex form of the quadratic function f(x) = x² + 4x - 5?",
      type: 'single',
      choices: ['f(x) = (x + 2)² - 9', 'f(x) = (x - 2)² - 9', 'f(x) = (x + 2)² + 9', 'f(x) = (x - 2)² + 9'],
      correctAnswer: 'f(x) = (x + 2)² - 9',
      microQuestions: [
        {
          id: 1,
          question: "What is the general form of the vertex form?",
          answer: "f(x) = a(x - h)² + k",
          solution: "The vertex form of a quadratic function is f(x) = a(x - h)² + k, where (h, k) is the vertex",
          topic: "Vertex Form",
          choices: ["f(x) = a(x + h)² + k", "f(x) = a(x - h)² + k", "f(x) = (x - a)² + h", "f(x) = (x - h)² + a"]
        },
        {
          id: 2,
          question: "How do you convert to vertex form by completing the square?",
          answer: "Group the x terms and complete the square",
          solution: "f(x) = x² + 4x - 5 = (x² + 4x + 4) - 4 - 5 = (x + 2)² - 9",
          topic: "Completing the Square",
          choices: ["Factor the quadratic", "Use the quadratic formula", "Group the x terms and complete the square", "Divide by the coefficient of x²"]
        }
      ]
    }
  ]
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
  const [questionResults, setQuestionResults] = useState<Record<number, 'Right' | 'Wrong' | 'Unattempted'>>({});
  
  // Get the selected mix based on the ID from the global storage
  const selectedMix = window.mixesData.find(mix => mix.id === parseInt(id || '1'));
  
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
      
      // Debug log
      console.log("Practice initialized with mix:", selectedMix);
      console.log("Available topics in mockQuestions:", Object.keys(mockQuestions));
    } else {
      console.error("No mix found with ID:", id);
    }
  }, [selectedMix, id]);
  
  const loadQuestion = (tIndex: number, qIndex: number) => {
    if (!selectedMix) {
      console.error("No mix selected");
      return;
    }
    
    // Check if we've gone through all topics in this round
    if (tIndex >= selectedMix.topics.length) {
      console.log("All topics completed for this round");
      setRoundComplete(true);
      return;
    }
    
    const currentTopic = selectedMix.topics[tIndex];
    console.log(`Loading question for topic: ${currentTopic}, index: ${tIndex}, qIndex: ${qIndex}`);
    
    // Verify topic exists in mock data
    if (!mockQuestions[currentTopic]) {
      console.warn(`No questions found for topic: ${currentTopic}. Moving to next topic.`);
      // Skip to next topic
      loadQuestion(tIndex + 1, 0);
      return;
    }
    
    const topicQuestions = mockQuestions[currentTopic];
    
    // Check if we've gone through all questions for this topic
    if (qIndex >= topicQuestions.length) {
      console.log(`All questions for topic ${currentTopic} completed. Moving to next topic.`);
      // Move to next topic
      loadQuestion(tIndex + 1, 0);
      return;
    }
    
    console.log(`Setting current question to: ${currentTopic}, question ${qIndex}`);
    setTopicIndex(tIndex);
    setQuestionIndex(qIndex);
    setCurrentQuestion(topicQuestions[qIndex]);
  };
  
  const handleQuestionAnswered = (isCorrect: boolean) => {
    if (!currentQuestion || !selectedMix) return;
    
    console.log(`Question answered - isCorrect: ${isCorrect}`);
    
    // Mark question as answered
    setAnsweredQuestions([...answeredQuestions, currentQuestion.id]);
    
    // Track question result
    setQuestionResults(prev => ({
      ...prev,
      [currentQuestion.id]: isCorrect ? 'Right' : 'Wrong'
    }));
    
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
    
    // Navigate to report page after each round
    navigate(`/mix-practice-report/${id}?round=${currentRound}&back=practice`);
  };
  
  const finishPractice = () => {
    navigate(`/mix-practice-report/${id}?round=final`);
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
  
  if (!selectedMix) {
    return <div className="text-center py-10">Mix not found. Please select a valid mix.</div>;
  }
  
  if (!currentQuestion && !roundComplete) {
    return <div className="text-center py-10">
      Loading practice session...
      <p className="mt-4 text-sm text-spotify-text">
        Unable to find practice questions for the selected topics: {selectedMix.topics.join(', ')}
      </p>
    </div>;
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
              Progress: {answeredQuestions.length} / {selectedMix.topics.reduce((total, topic) => {
                return total + (mockQuestions[topic]?.length || 0);
              }, 0)}
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
                <p className="mb-6">Ready to see how you did?</p>
                <Button 
                  onClick={startNextRound}
                  className="bg-[#9747FF] hover:bg-[#8035E8] px-8 py-3 text-lg"
                >
                  View Round Report
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
            {currentQuestion && (
              <QuestionInterface 
                question={currentQuestion}
                onQuestionAnswered={handleQuestionAnswered}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Practice;
