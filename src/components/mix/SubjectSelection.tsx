
import React from 'react';
import { motion } from 'framer-motion';

interface SubjectSelectionProps {
  subjects: string[];
  selectedSubject: string | null;
  onSubjectSelect: (subject: string) => void;
}

const SubjectSelection: React.FC<SubjectSelectionProps> = ({
  subjects,
  selectedSubject,
  onSubjectSelect,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <h2 className="text-2xl font-semibold mb-4">Select a Subject</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {subjects.map((subject) => (
          <motion.div
            key={subject}
            whileHover={{ scale: 1.02 }}
            className={`p-4 rounded-lg cursor-pointer border-2 transition-colors ${
              selectedSubject === subject
                ? 'border-[#9747FF] bg-spotify-hover'
                : 'border-spotify-hover bg-spotify-card'
            }`}
            onClick={() => onSubjectSelect(subject)}
          >
            <span className="text-lg font-medium">{subject}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default SubjectSelection;
