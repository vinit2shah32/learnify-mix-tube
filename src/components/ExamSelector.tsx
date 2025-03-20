
import React, { useState, useEffect } from 'react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Exam } from '@/components/question/types';
import { fetchExams } from '@/services/supabaseService';
import { useToast } from '@/hooks/use-toast';

interface ExamSelectorProps {
  className?: string;
}

export const ExamSelector = ({ className }: ExamSelectorProps) => {
  const [exams, setExams] = useState<Exam[]>([]);
  const [selectedExam, setSelectedExam] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const { toast } = useToast();

  useEffect(() => {
    const getExams = async () => {
      try {
        setLoading(true);
        const fetchedExams = await fetchExams();
        setExams(fetchedExams);
        
        // Set default selection if exams exist
        if (fetchedExams.length > 0) {
          setSelectedExam(fetchedExams[0].id.toString());
        }
      } catch (error) {
        console.error('Failed to fetch exams:', error);
        toast({
          title: "Error",
          description: "Failed to load exams. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    getExams();
  }, [toast]);

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
        disabled={loading}
      >
        <SelectTrigger className="w-[180px] bg-spotify-card text-white border-spotify-hover">
          {loading ? (
            <span className="text-spotify-text">Loading...</span>
          ) : (
            <SelectValue placeholder="Select an exam" />
          )}
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
