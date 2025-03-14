
import React from 'react';
import { Book, Video } from 'lucide-react';
import { RootCauseItem } from '@/components/question/types';
import { motion } from 'framer-motion';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface RootCauseDetectionSectionProps {
  rootCauseDetection: RootCauseItem[];
}

export const RootCauseDetectionSection: React.FC<RootCauseDetectionSectionProps> = ({ rootCauseDetection }) => {
  return (
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
            {rootCauseDetection.map((item, index) => (
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
  );
};
