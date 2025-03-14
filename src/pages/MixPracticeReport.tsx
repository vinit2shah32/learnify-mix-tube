
import React, { useEffect } from 'react';
import { useParams, Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Book, Video, Check, X, Clock } from 'lucide-react';
import { TopicPerformance, RootCauseItem, Mix } from '@/components/question/types';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock data - replace with actual data from your backend - only show micro topics for questions answered incorrectly
const mockMixes = window.mixesData || [];

// Mock report data based on incorrect answers
const getMockReport = (mixId: string) => {
  // Get the selected mix
  const selectedMix = mockMixes.find(mix => mix.id === parseInt(mixId || '1'));
  
  if (!selectedMix) return null;
  
  // Create topic performance data for each topic in the mix
  const topicPerformance = selectedMix.topics.map(topic => {
    return {
      topic,
      mainQuestions: [
        { 
          id: Math.floor(Math.random() * 1000), 
          question: `${topic} question 1: What is the primary concept in ${topic}?`, 
          status: Math.random() > 0.5 ? 'Right' : 'Wrong' as const 
        },
        { 
          id: Math.floor(Math.random() * 1000), 
          question: `${topic} question 2: How do you apply ${topic} in this scenario?`, 
          status: Math.random() > 0.5 ? 'Right' : 'Wrong' as const 
        }
      ],
      qas: Math.floor(Math.random() * 40) + 60 // Random QAS between 60-100
    }
  });
  
  // Only include root cause items for topics that have wrong answers
  const rootCauseDetection = [];
  
  for (const performance of topicPerformance) {
    const hasWrongAnswers = performance.mainQuestions.some(q => q.status === 'Wrong');
    
    if (hasWrongAnswers) {
      rootCauseDetection.push({
        microTopic: `${performance.topic} - Core Concepts`,
        videoResources: [`https://example.com/video/${performance.topic.toLowerCase().replace(/\s+/g, '-')}`],
        readingResources: [`https://example.com/reading/${performance.topic.toLowerCase().replace(/\s+/g, '-')}`]
      });
    }
  }
  
  return {
    topicPerformance,
    rootCauseDetection
  };
};

const MixPracticeReport = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const selectedMix = mockMixes.find(mix => mix.id === parseInt(id || '1'));
  
  const round = searchParams.get('round') || 'final';
  const backPath = searchParams.get('back') || '';
  const isFinalReport = round === 'final';
  
  const mockReport = getMockReport(id || '1');
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  if (!selectedMix || !mockReport) {
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
  
  const handleContinuePractice = () => {
    const nextRound = parseInt(round) + 1;
    navigate(`/practice/${id}?round=${nextRound}`);
  };
  
  const handleBackToDashboard = () => {
    navigate('/');
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
          
          <h1 className="text-4xl font-bold mb-2">
            {selectedMix.title} - {isFinalReport ? 'Final' : `Round ${round}`} Report
          </h1>
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
            <div className="rounded-lg overflow-hidden">
              <Table>
                <TableHeader className="bg-spotify-hover">
                  <TableRow>
                    <TableHead className="text-white">Exam Topics</TableHead>
                    <TableHead className="text-white">Main Questions</TableHead>
                    <TableHead className="text-white text-center">Report</TableHead>
                    <TableHead className="text-white text-center">QAS</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockReport.topicPerformance.map((item, topicIndex) => (
                    <React.Fragment key={topicIndex}>
                      {item.mainQuestions.map((question, qIndex) => (
                        <TableRow key={`${topicIndex}-${qIndex}`} className="border-t border-spotify-hover">
                          {qIndex === 0 && (
                            <TableCell 
                              className="align-top" 
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
                            </TableCell>
                          )}
                          <TableCell>{question.question}</TableCell>
                          <TableCell className="text-center">
                            <div className="flex items-center justify-center">
                              {getStatusIcon(question.status)}
                              <span className="ml-2">{question.status}</span>
                            </div>
                          </TableCell>
                          {qIndex === 0 && (
                            <TableCell 
                              className="text-center" 
                              rowSpan={item.mainQuestions.length}
                            >
                              <div className="inline-block px-3 py-1 rounded-full bg-spotify-hover">
                                {item.qas}/100
                              </div>
                            </TableCell>
                          )}
                        </TableRow>
                      ))}
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </div>
          </motion.div>
          
          {/* Root Cause Detection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl font-semibold mb-4">Root Cause Detection</h2>
            <div className="rounded-lg overflow-hidden">
              <Table>
                <TableHeader className="bg-spotify-hover">
                  <TableRow>
                    <TableHead className="text-white">Micro Topics</TableHead>
                    <TableHead className="text-white">Video Resources</TableHead>
                    <TableHead className="text-white">Reading Resources</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockReport.rootCauseDetection.map((item, index) => (
                    <TableRow key={index} className={index > 0 ? "border-t border-spotify-hover" : ""}>
                      <TableCell>
                        <a 
                          href={`/topic-reading/${item.microTopic.toLowerCase().replace(/\s+/g, '-')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-spotify-accent hover:underline"
                        >
                          {item.microTopic}
                        </a>
                      </TableCell>
                      <TableCell>
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
                      </TableCell>
                      <TableCell>
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
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </motion.div>
          
          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex justify-center mt-6 gap-4"
          >
            {!isFinalReport && backPath === 'practice' ? (
              <Button 
                onClick={handleContinuePractice}
                className="bg-[#9747FF] hover:bg-[#8035E8] px-8 py-3 text-lg"
              >
                Continue to Next Round
              </Button>
            ) : (
              <Button 
                onClick={handleBackToDashboard}
                className="bg-[#9747FF] hover:bg-[#8035E8] px-8 py-3 text-lg"
              >
                Back to Dashboard
              </Button>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MixPracticeReport;
