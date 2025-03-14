
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Check, ArrowLeft } from 'lucide-react';
import { Topic } from '@/components/question/types';
import { toast } from '@/hooks/use-toast';

// Mock data - replace with actual data from your backend
const mockSubjects = ['Mathematics', 'Verbal', 'Quantitative', 'Reasoning'];

const mockTopics: Topic[] = [
  { id: 1, name: 'Probability', subject: 'Mathematics', exam: 'GMAT' },
  { id: 2, name: 'Permutations and Combinations', subject: 'Mathematics', exam: 'GMAT' },
  { id: 3, name: 'Statistics', subject: 'Mathematics', exam: 'GMAT' },
  { id: 4, name: 'Algebra', subject: 'Mathematics', exam: 'GMAT' },
  { id: 5, name: 'Geometry', subject: 'Mathematics', exam: 'GMAT' },
  { id: 6, name: 'Number Properties', subject: 'Mathematics', exam: 'GMAT' },
  { id: 7, name: 'Reading Comprehension', subject: 'Verbal', exam: 'GMAT' },
  { id: 8, name: 'Critical Reasoning', subject: 'Verbal', exam: 'GMAT' },
  { id: 9, name: 'Sentence Correction', subject: 'Verbal', exam: 'GMAT' },
];

const CreateMix = () => {
  const navigate = useNavigate();
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedTopics, setSelectedTopics] = useState<number[]>([]);
  
  const filteredTopics = selectedSubject 
    ? mockTopics.filter(topic => topic.subject === selectedSubject)
    : [];
  
  const handleSubjectSelect = (subject: string) => {
    setSelectedSubject(subject);
    setSelectedTopics([]);
  };
  
  const handleTopicToggle = (topicId: number) => {
    if (selectedTopics.includes(topicId)) {
      setSelectedTopics(selectedTopics.filter(id => id !== topicId));
    } else {
      if (selectedTopics.length < 3) {
        setSelectedTopics([...selectedTopics, topicId]);
      } else {
        toast({
          title: "Maximum topics selected",
          description: "You can select a maximum of 3 topics for your mix.",
          variant: "destructive",
        });
      }
    }
  };
  
  const handleCreateMix = () => {
    if (selectedTopics.length === 0) {
      toast({
        title: "No topics selected",
        description: "Please select at least one topic for your mix.",
        variant: "destructive",
      });
      return;
    }
    
    // Get selected topic names
    const topicNames = selectedTopics.map(id => {
      const topic = mockTopics.find(t => t.id === id);
      return topic ? topic.name : '';
    }).filter(Boolean);
    
    // Create a title for the mix
    const mixTitle = topicNames.join(' & ');
    
    // Here you would normally save this to your backend
    toast({
      title: "Mix Created!",
      description: `Your mix "${mixTitle}" has been created successfully.`,
    });
    
    // Navigate back to dashboard
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
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="mb-4 text-spotify-text hover:text-white p-0"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </Button>
          
          <h1 className="text-4xl font-bold mb-2">Create Your Own Mix</h1>
          <p className="text-spotify-text">Select up to 3 topics to create a personalized practice mix</p>
        </motion.div>
        
        <div className="grid gap-10">
          {/* Subject Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="text-2xl font-semibold mb-4">Select a Subject</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {mockSubjects.map((subject) => (
                <motion.div
                  key={subject}
                  whileHover={{ scale: 1.02 }}
                  className={`p-4 rounded-lg cursor-pointer border-2 transition-colors ${
                    selectedSubject === subject
                      ? 'border-[#9747FF] bg-spotify-hover'
                      : 'border-spotify-hover bg-spotify-card'
                  }`}
                  onClick={() => handleSubjectSelect(subject)}
                >
                  <span className="text-lg font-medium">{subject}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Topic Selection */}
          {selectedSubject && (
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
                {filteredTopics.map((topic) => (
                  <motion.div
                    key={topic.id}
                    whileHover={{ scale: 1.02 }}
                    className={`relative p-4 rounded-lg cursor-pointer border transition-colors ${
                      selectedTopics.includes(topic.id)
                        ? 'border-[#9747FF] bg-spotify-hover'
                        : 'border-spotify-hover bg-spotify-card'
                    }`}
                    onClick={() => handleTopicToggle(topic.id)}
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
          )}
          
          {/* Create Button */}
          {selectedSubject && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex justify-center mt-6"
            >
              <Button 
                onClick={handleCreateMix}
                disabled={selectedTopics.length === 0}
                className="bg-[#9747FF] hover:bg-[#8035E8] px-10 py-6 text-lg font-semibold"
              >
                Create Your Mix
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateMix;
