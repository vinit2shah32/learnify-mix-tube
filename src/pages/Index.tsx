
import { motion } from "framer-motion";
import { ExamSelector } from "@/components/ExamSelector";
import { CourseProgressList } from "@/components/home/CourseProgressList";
import { PracticeQuestionsList } from "@/components/home/PracticeQuestionsList";
import { MixesList } from "@/components/home/MixesList";
import { VideoMixList } from "@/components/home/VideoMixList";
import { InDepthTopicsList } from "@/components/home/InDepthTopicsList";

// Initialize global mixes data if not already set
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

const Index = () => {
  return (
    <div className="min-h-screen bg-spotify-dark text-white">
      <div className="container py-8">
        <motion.div 
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h1 className="text-4xl font-bold">Welcome back to your learning journey</h1>
            <p className="text-spotify-text mt-2">Resume your topics</p>
          </div>
          <ExamSelector className="ml-auto" />
        </motion.div>

        <CourseProgressList />
        <PracticeQuestionsList />
        <MixesList />
        <VideoMixList />
        <InDepthTopicsList />
      </div>
    </div>
  );
};

export default Index;
