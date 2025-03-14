
import React, { useEffect } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { getMockReport } from '@/utils/reportUtils';
import { TopicPerformanceSection } from '@/components/report/TopicPerformanceSection';
import { RootCauseDetectionSection } from '@/components/report/RootCauseDetectionSection';
import { ActionButtons } from '@/components/report/ActionButtons';

const MixPracticeReport = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const selectedMix = window.mixesData?.find(mix => mix.id === parseInt(id || '1'));
  
  const round = searchParams.get('round') || 'final';
  const backPath = searchParams.get('back') || '';
  const isFinalReport = round === 'final';
  
  const mockReport = getMockReport(id || '1');
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  if (!selectedMix || !mockReport) {
    return <div className="text-center py-10">Mix not found</div>;
  }
  
  return (
    <div className="min-h-screen bg-spotify-dark text-white">
      <div className="container py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link to="/" className="flex items-center text-spotify-text hover:text-white mb-4">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </Link>
          
          <h1 className="text-4xl font-bold mb-2">
            {selectedMix.title} - {isFinalReport ? 'Final' : `Round ${round}`} Report
          </h1>
          <p className="text-spotify-text">Your performance analysis and recommendations</p>
        </motion.div>
        
        <div className="grid gap-10">
          {/* Topic Performance */}
          <TopicPerformanceSection topicPerformance={mockReport.topicPerformance} />
          
          {/* Root Cause Detection */}
          <RootCauseDetectionSection rootCauseDetection={mockReport.rootCauseDetection} />
          
          {/* Action buttons */}
          <ActionButtons 
            isFinalReport={isFinalReport} 
            backPath={backPath}
            mixId={id || '1'}
            round={round}
          />
        </div>
      </div>
    </div>
  );
};

export default MixPracticeReport;
