
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { Topic, Mix } from '@/components/question/types';

// Mock data - replace with actual data from your backend
const mockTopics: Topic[] = [
  { id: 1, name: 'Probability', subject: 'Mathematics', exam: 'GMAT' },
  { id: 2, name: 'Permutations and Combinations', subject: 'Mathematics', exam: 'GMAT' },
  { id: 3, name: 'Statistics', subject: 'Mathematics', exam: 'GMAT' },
];

// Initialize global mixes data if not already set
if (!window.mixesData) {
  window.mixesData = [
    {
      id: 1,
      title: "Statistics Mix",
      topics: ["Median", "Standard Deviation", "Average"],
      subject: "Mathematics",
      isCustom: false
    },
    {
      id: 2,
      title: "Linear relationship Word problems mix",
      topics: ["Linear equations", "Word Problems", "Slopes"],
      subject: "Mathematics",
      isCustom: false
    },
    {
      id: 3,
      title: "Quadratic functions mix",
      topics: ["Quadratic equations", "Graphs", "Vertex"],
      subject: "Mathematics",
      isCustom: false
    }
  ];
}

const MixPractice = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Get the selected mix based on the ID from the global storage
  const selectedMix = window.mixesData.find(mix => mix.id === parseInt(id || '1'));
  
  if (!selectedMix) {
    return <div className="text-center py-10">Mix not found</div>;
  }
  
  const handleStartPractice = () => {
    navigate(`/practice/${id}`);
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
          <h1 className="text-4xl font-bold mb-2">{selectedMix.title}</h1>
          <p className="text-spotify-text">Review topics and start practice</p>
        </motion.div>
        
        <div className="grid gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-spotify-card rounded-lg p-6"
          >
            <h2 className="text-2xl font-semibold mb-4">Topics in this Mix</h2>
            <div className="space-y-4">
              {selectedMix.topics.map((topic, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-spotify-hover rounded-lg">
                  <span className="text-lg">{topic}</span>
                  <a 
                    href={`/topic-reading/${topic.toLowerCase().replace(/\s+/g, '-')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-spotify-accent hover:underline"
                  >
                    Read about this topic <ExternalLink className="ml-2 w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center"
        >
          <Button 
            onClick={handleStartPractice}
            className="bg-[#9747FF] hover:bg-[#8035E8] px-10 py-6 text-lg font-semibold"
          >
            Start Practice
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default MixPractice;
