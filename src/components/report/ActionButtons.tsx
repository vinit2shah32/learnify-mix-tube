
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface ActionButtonsProps {
  isFinalReport: boolean;
  backPath: string;
  mixId: string;
  round: string;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({ 
  isFinalReport, 
  backPath, 
  mixId, 
  round 
}) => {
  const navigate = useNavigate();
  
  const handleContinuePractice = () => {
    const nextRound = parseInt(round) + 1;
    navigate(`/practice/${mixId}?round=${nextRound}`);
  };
  
  const handleBackToDashboard = () => {
    navigate('/');
  };

  return (
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
  );
};
