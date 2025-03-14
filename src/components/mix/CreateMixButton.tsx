
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface CreateMixButtonProps {
  onClick: () => void;
  disabled: boolean;
}

const CreateMixButton: React.FC<CreateMixButtonProps> = ({ onClick, disabled }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="flex justify-center mt-6"
    >
      <Button 
        onClick={onClick}
        disabled={disabled}
        className="bg-[#9747FF] hover:bg-[#8035E8] px-10 py-6 text-lg font-semibold"
      >
        Create Your Mix
      </Button>
    </motion.div>
  );
};

export default CreateMixButton;
