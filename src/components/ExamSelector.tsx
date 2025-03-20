
import React, { useState, useEffect } from 'react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Exam } from '@/components/question/types';

// Mock data for exams until we integrate with a real database
const mockExams: Exam[] = [
  {
    id: 1,
    name: 'SAT',
    subjects: [
      {
        id: 1,
        name: 'Mathematics',
        exam_id: 1,
        topics: [
          { id: 1, name: 'Algebra', subject_id: 1 },
          { id: 2, name: 'Geometry', subject_id: 1 },
          { id: 3, name: 'Statistics', subject_id: 1 }
        ]
      },
      {
        id: 2,
        name: 'English',
        exam_id: 1,
        topics: [
          { id: 4, name: 'Reading', subject_id: 2 },
          { id: 5, name: 'Writing', subject_id: 2 }
        ]
      }
    ]
  },
  {
    id: 2,
    name: 'GMAT',
    subjects: [
      {
        id: 3,
        name: 'Quantitative',
        exam_id: 2,
        topics: [
          { id: 6, name: 'Problem Solving', subject_id: 3 },
          { id: 7, name: 'Data Sufficiency', subject_id: 3 }
        ]
      },
      {
        id: 4,
        name: 'Verbal',
        exam_id: 2,
        topics: [
          { id: 8, name: 'Reading Comprehension', subject_id: 4 },
          { id: 9, name: 'Critical Reasoning', subject_id: 4 }
        ]
      }
    ]
  }
];

interface ExamSelectorProps {
  className?: string;
}

export const ExamSelector = ({ className }: ExamSelectorProps) => {
  const [exams, setExams] = useState<Exam[]>([]);
  const [selectedExam, setSelectedExam] = useState<string>('');

  useEffect(() => {
    // In a real implementation, this would fetch from your database
    setExams(mockExams);
    
    // Set a default selection
    if (mockExams.length > 0) {
      setSelectedExam(mockExams[0].id.toString());
    }
  }, []);

  const handleExamChange = (value: string) => {
    setSelectedExam(value);
    // In a real implementation, this would trigger other data updates
    console.log(`Selected exam: ${value}`);
    
    // We could dispatch an event or call a callback function here
    const event = new CustomEvent('examSelected', { 
      detail: { examId: parseInt(value) } 
    });
    window.dispatchEvent(event);
  };

  return (
    <div className={className}>
      <Select value={selectedExam} onValueChange={handleExamChange}>
        <SelectTrigger className="w-[180px] bg-spotify-card text-white border-spotify-hover">
          <SelectValue placeholder="Select an exam" />
        </SelectTrigger>
        <SelectContent className="bg-spotify-card text-white border-spotify-hover">
          {exams.map((exam) => (
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
