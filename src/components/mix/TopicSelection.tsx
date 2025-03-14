
import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Topic } from '@/components/question/types';

interface TopicSelectionProps {
  topics: Topic[];
  selectedTopics: number[];
  onTopicToggle: (topicId: number) => void;
}

const TopicSelection: React.FC<TopicSelectionProps> = ({
  topics,
  selectedTopics,
  onTopicToggle,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Select Topics (Max 3)</h2>
        <span className="text-spotify-text">
          {selectedTopics.length}/3 selected
        </span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {topics.map((topic) => (
          <motion.div
            key={topic.id}
            whileHover={{ scale: 1.02 }}
            className={`relative p-4 rounded-lg cursor-pointer border transition-colors ${
              selectedTopics.includes(topic.id)
                ? 'border-[#9747FF] bg-spotify-hover'
                : 'border-spotify-hover bg-spotify-card'
            }`}
            onClick={() => onTopicToggle(topic.id)}
          >
            <span className="text-lg font-medium">{topic.name}</span>
            
            {selectedTopics.includes(topic.id) && (
              <div className="absolute top-2 right-2 bg-[#9747FF] rounded-full p-1">
                <Check className="w-4 h-4" />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default TopicSelection;
