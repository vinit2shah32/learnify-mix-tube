
import React, { useState } from 'react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Exam } from '@/components/question/types';

interface ExamSelectorProps {
  className?: string;
}

// Mock exam data
const mockExams: Exam[] = [
  { id: 1, name: 'SAT', subjects: [] },
  { id: 2, name: 'ACT', subjects: [] },
  { id: 3, name: 'GRE', subjects: [] },
  { id: 4, name: 'GMAT', subjects: [] }
];

export const ExamSelector = ({ className }: ExamSelectorProps) => {
  const [selectedExam, setSelectedExam] = useState<string>(mockExams[0].id.toString());

  const handleExamChange = (value: string) => {
    setSelectedExam(value);
    
    // Dispatch event for other components that need to know about the exam change
    const event = new CustomEvent('examSelected', { 
      detail: { examId: parseInt(value) } 
    });
    window.dispatchEvent(event);
  };

  return (
    <div className={className}>
      <Select 
        value={selectedExam} 
        onValueChange={handleExamChange}
      >
        <SelectTrigger className="w-[180px] bg-spotify-card text-white border-spotify-hover">
          <SelectValue placeholder="Select an exam" />
        </SelectTrigger>
        <SelectContent className="bg-spotify-card text-white border-spotify-hover">
          {mockExams.map((exam) => (
            <SelectItem 
              key={exam.id} 
              value={exam.id.toString()}
              className="focus:bg-spotify-hover focus:text-white"
            >
              {exam.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
