
import { createClient } from '@supabase/supabase-js';
import { Exam, Subject, ExamTopic } from '@/components/question/types';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

// Fetch all exams with their subjects and topics
export const fetchExams = async (): Promise<Exam[]> => {
  try {
    // Fetch exams
    const { data: exams, error: examsError } = await supabase
      .from('Exam')
      .select('*');
    
    if (examsError) throw examsError;
    
    // For each exam, fetch subjects
    const examsWithSubjects = await Promise.all(
      exams.map(async (exam) => {
        const { data: subjects, error: subjectsError } = await supabase
          .from('Exam')
          .select('subjects:Subject(*)')
          .eq('id', exam.id)
          .single();
        
        if (subjectsError) throw subjectsError;
        
        // For each subject, fetch topics
        const subjectsWithTopics = await Promise.all(
          subjects.subjects.map(async (subject: Subject) => {
            const { data: topics, error: topicsError } = await supabase
              .from('Exam')
              .select('topics:ExamTopic(*)')
              .eq('id', subject.id)
              .single();
            
            if (topicsError) throw topicsError;
            
            return {
              ...subject,
              topics: topics.topics
            };
          })
        );
        
        return {
          ...exam,
          subjects: subjectsWithTopics
        };
      })
    );
    
    return examsWithSubjects;
  } catch (error) {
    console.error('Error fetching exams:', error);
    return [];
  }
};
