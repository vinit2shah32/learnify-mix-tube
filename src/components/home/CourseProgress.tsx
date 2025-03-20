
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";

interface CourseProgressProps {
  title: string;
  subtitle: string;
  progress: number;
  imageSrc: string;
}

export const CourseProgress = ({ title, subtitle, progress, imageSrc }: CourseProgressProps) => {
  return (
    <motion.div
      className="flex items-center gap-4 p-4 rounded-lg bg-spotify-card hover:bg-spotify-hover transition-colors"
      whileHover={{ scale: 1.02 }}
    >
      <img src={imageSrc} alt="" className="w-12 h-12 rounded-lg object-cover" />
      <div className="flex-1">
        <h3 className="text-white font-medium">{title}</h3>
        <p className="text-sm text-spotify-text">{subtitle}</p>
        <Progress value={progress} className="mt-2" />
      </div>
      <span className="text-sm text-spotify-text">{progress}% complete</span>
    </motion.div>
  );
};
