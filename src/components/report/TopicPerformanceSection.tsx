
import React from 'react';
import { Check, X, Clock } from 'lucide-react';
import { TopicPerformance } from '@/components/question/types';
import { motion } from 'framer-motion';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TopicPerformanceSectionProps {
  topicPerformance: TopicPerformance[];
}

export const TopicPerformanceSection: React.FC<TopicPerformanceSectionProps> = ({ topicPerformance }) => {
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
            {topicPerformance.map((item, topicIndex) => (
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
  );
};
