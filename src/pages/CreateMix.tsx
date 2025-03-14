
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Topic, Mix } from '@/components/question/types';
import { toast } from '@/hooks/use-toast';
import SubjectSelection from '@/components/mix/SubjectSelection';
import TopicSelection from '@/components/mix/TopicSelection';
import CreateMixButton from '@/components/mix/CreateMixButton';

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

// In a real application, this would be handled through a context or global state management
// For demo purposes, we'll use a global variable that's accessible across components
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
    
    // Generate a new ID for the mix
    const newId = window.mixesData.length > 0 
      ? Math.max(...window.mixesData.map(mix => mix.id)) + 1 
      : 1;
    
    // Create the new mix
    const newMix = {
      id: newId,
      title: mixTitle,
      topics: topicNames,
      subject: selectedSubject,
      isCustom: true
    };
    
    // Add the new mix to the global mixes data
    window.mixesData.push(newMix);
    
    // Log the updated mixes for debugging
    console.log('Updated mixes after creation:', window.mixesData);
    
    // Dispatch a custom event to notify other components that mixes have been updated
    window.dispatchEvent(new CustomEvent('mixesUpdated'));
    
    toast({
      title: "Mix Created!",
      description: `Your mix "${mixTitle}" has been created successfully.`,
    });
    
    // Navigate to the new mix's practice page
    navigate(`/mix-practice/${newId}`);
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
          <SubjectSelection 
            subjects={mockSubjects}
            selectedSubject={selectedSubject}
            onSubjectSelect={handleSubjectSelect}
          />
          
          {/* Topic Selection */}
          {selectedSubject && (
            <TopicSelection
              topics={filteredTopics}
              selectedTopics={selectedTopics}
              onTopicToggle={handleTopicToggle}
            />
          )}
          
          {/* Create Button */}
          {selectedSubject && (
            <CreateMixButton
              onClick={handleCreateMix}
              disabled={selectedTopics.length === 0}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateMix;
