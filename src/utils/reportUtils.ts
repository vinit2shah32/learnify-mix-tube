
import { TopicPerformance, RootCauseItem, Mix } from '@/components/question/types';

// Generate mock report data based on incorrect answers
export const getMockReport = (mixId: string) => {
  // Get the selected mix
  const mixesData = window.mixesData || [];
  const selectedMix = mixesData.find(mix => mix.id === parseInt(mixId || '1'));
  
  if (!selectedMix) return null;
  
  // Create topic performance data for each topic in the mix
  const topicPerformance = selectedMix.topics.map(topic => {
    return {
      topic,
      mainQuestions: [
        { 
          id: Math.floor(Math.random() * 1000), 
          question: `${topic} question 1: What is the primary concept in ${topic}?`, 
          status: Math.random() > 0.5 ? 'Right' : 'Wrong' as const 
        },
        { 
          id: Math.floor(Math.random() * 1000), 
          question: `${topic} question 2: How do you apply ${topic} in this scenario?`, 
          status: Math.random() > 0.5 ? 'Right' : 'Wrong' as const 
        }
      ],
      qas: Math.floor(Math.random() * 40) + 60 // Random QAS between 60-100
    }
  });
  
  // Only include root cause items for topics that have wrong answers
  const rootCauseDetection: RootCauseItem[] = [];
  
  for (const performance of topicPerformance) {
    const hasWrongAnswers = performance.mainQuestions.some(q => q.status === 'Wrong');
    
    if (hasWrongAnswers) {
      rootCauseDetection.push({
        microTopic: `${performance.topic} - Core Concepts`,
        videoResources: [`https://example.com/video/${performance.topic.toLowerCase().replace(/\s+/g, '-')}`],
        readingResources: [`https://example.com/reading/${performance.topic.toLowerCase().replace(/\s+/g, '-')}`]
      });
    }
  }
  
  return {
    topicPerformance,
    rootCauseDetection
  };
};
