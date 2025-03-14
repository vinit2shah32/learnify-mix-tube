
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Book, Video, Check, X, Clock } from 'lucide-react';
import { TopicPerformance, RootCauseItem, Mix } from '@/components/question/types';

// Mock data - replace with actual data from your backend
const mockMixes: Mix[] = [
  { id: 1, title: 'Statistics Mix', topics: ['Median', 'Standard Deviation', 'Average'], subject: 'Mathematics' },
  { id: 2, title: 'Linear relationship Word problems mix', topics: ['Linear equations', 'Word Problems', 'Slopes'], subject: 'Mathematics' },
  { id: 3, title: 'Quadratic functions mix', topics: ['Quadratic equations', 'Graphs', 'Vertex'], subject: 'Mathematics' },
];

const mockReport = {
  topicPerformance: [
    {
      topic: 'Median',
      mainQuestions: [
        { id: 101, question: "What is the median of the following numbers: 5, 7, 12, 9, 8?", status: 'Right' as const },
        { id: 102, question: "If two more values 10 and 11 are added to the set {5, 7, 12, 9, 8}, what is the new median?", status: 'Wrong' as const }
      ],
      qas: 75
    },
    {
      topic: 'Standard Deviation',
      mainQuestions: [
        { id: 201, question: "What is the standard deviation of 2, 4, 6, 8, 10?", status: 'Right' as const },
        { id: 202, question: "How does adding a constant to each value affect the standard deviation?", status: 'Unattempted' as const }
      ],
      qas: 50
    },
    {
      topic: 'Average',
      mainQuestions: [
        { id: 301, question: "What is the average of 15, 25, 35, 45, 55?", status: 'Right' as const },
        { id: 302, question: "If the average of five numbers is 27, and the average of three of them is 25, what is the average of the remaining two numbers?", status: 'Right' as const }
      ],
      qas: 90
    }
  ],
  rootCauseDetection: [
    {
      microTopic: 'Middle Values For Even Sets',
      videoResources: ['https://example.com/video1', 'https://example.com/video2'],
      readingResources: ['https://example.com/reading1', 'https://example.com/reading2']
    },
    {
      microTopic: 'Standard Deviation Calculation',
      videoResources: ['https://example.com/video3'],
      readingResources: ['https://example.com/reading3', 'https://example.com/reading4']
    }
  ]
};

const MixPracticeReport = () => {
  const { id } = useParams<{ id: string }>();
  const selectedMix = mockMixes.find(mix => mix.id === parseInt(id || '1'));
  
  if (!selectedMix) {
    return <div className="text-center py-10">Mix not found</div>;
  }
  
  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'Right':
        return <Check className="w-5 h-5 text-green-500" />;
      case 'Wrong':
        return <X className="w-5 h-5 text-red-500" />;
      case 'Unattempted':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen bg-spotify-dark text-white">
      <div className="container py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link to="/" className="flex items-center text-spotify-text hover:text-white mb-4">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </Link>
          
          <h1 className="text-4xl font-bold mb-2">{selectedMix.title} - Practice Report</h1>
          <p className="text-spotify-text">Your performance analysis and recommendations</p>
        </motion.div>
        
        <div className="grid gap-10">
          {/* Topic Performance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="text-2xl font-semibold mb-4">Topic Performance</h2>
            <div className="bg-spotify-card rounded-lg overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-spotify-hover">
                    <th className="px-6 py-3 text-left">Exam Topics</th>
                    <th className="px-6 py-3 text-left">Main Questions</th>
                    <th className="px-6 py-3 text-center">Report</th>
                    <th className="px-6 py-3 text-center">QAS</th>
                  </tr>
                </thead>
                <tbody>
                  {mockReport.topicPerformance.map((item, topicIndex) => (
                    <React.Fragment key={topicIndex}>
                      {item.mainQuestions.map((question, qIndex) => (
                        <tr key={`${topicIndex}-${qIndex}`} className="border-t border-spotify-hover">
                          {qIndex === 0 && (
                            <td 
                              className="px-6 py-4 align-top" 
                              rowSpan={item.mainQuestions.length}
                            >
                              <a 
                                href={`/topic-reading/${item.topic.toLowerCase().replace(/\s+/g, '-')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-spotify-accent hover:underline"
                              >
                                {item.topic}
                              </a>
                            </td>
                          )}
                          <td className="px-6 py-4">{question.question}</td>
                          <td className="px-6 py-4 text-center">
                            <div className="flex items-center justify-center">
                              {getStatusIcon(question.status)}
                              <span className="ml-2">{question.status}</span>
                            </div>
                          </td>
                          {qIndex === 0 && (
                            <td 
                              className="px-6 py-4 text-center" 
                              rowSpan={item.mainQuestions.length}
                            >
                              <div className="inline-block px-3 py-1 rounded-full bg-spotify-hover">
                                {item.qas}/100
                              </div>
                            </td>
                          )}
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
          
          {/* Root Cause Detection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl font-semibold mb-4">Root Cause Detection</h2>
            <div className="bg-spotify-card rounded-lg overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-spotify-hover">
                    <th className="px-6 py-3 text-left">Micro Topics</th>
                    <th className="px-6 py-3 text-left">Video Resources</th>
                    <th className="px-6 py-3 text-left">Reading Resources</th>
                  </tr>
                </thead>
                <tbody>
                  {mockReport.rootCauseDetection.map((item, index) => (
                    <tr key={index} className={index > 0 ? "border-t border-spotify-hover" : ""}>
                      <td className="px-6 py-4">
                        <a 
                          href={`/topic-reading/${item.microTopic.toLowerCase().replace(/\s+/g, '-')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-spotify-accent hover:underline"
                        >
                          {item.microTopic}
                        </a>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-2">
                          {item.videoResources.map((resource, i) => (
                            <a 
                              key={i}
                              href={resource}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center text-spotify-text hover:text-white"
                            >
                              <Video className="w-4 h-4 mr-2" />
                              Video Resource {i + 1}
                            </a>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-2">
                          {item.readingResources.map((resource, i) => (
                            <a 
                              key={i}
                              href={resource}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center text-spotify-text hover:text-white"
                            >
                              <Book className="w-4 h-4 mr-2" />
                              Reading Resource {i + 1}
                            </a>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MixPracticeReport;
