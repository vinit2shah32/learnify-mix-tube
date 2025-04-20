
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Play } from "lucide-react";

interface LearningCardProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  href: string;
  className?: string;
  imageSrc?: string;
  children?: React.ReactNode;
  isVideo?: boolean;
  questionId?: number;
}

export const LearningCard = ({ 
  title, 
  subtitle, 
  icon, 
  href, 
  className, 
  imageSrc, 
  children, 
  isVideo,
  questionId 
}: LearningCardProps) => {
  // Determine if this is a question card and should link to the Question interface
  const isQuestion = questionId !== undefined;
  const finalHref = isQuestion ? `/question/${questionId}` : href;
  
  // Determine which component to use for the link
  const Component = isVideo ? 'a' : Link;
  
  return (
    <motion.div
      className={cn(
        "group relative overflow-hidden rounded-lg bg-spotify-card p-4 transition-all duration-300 hover:bg-spotify-hover",
        "flex flex-col gap-4 min-h-[200px]",
        className
      )}
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Component to={isVideo ? undefined : finalHref} href={isVideo ? href : undefined} className="flex-1 flex flex-col">
        {imageSrc && (
          <div className="absolute inset-0 opacity-20">
            <img src={imageSrc} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-spotify-card to-transparent opacity-80"></div>
          </div>
        )}
        <div className="flex items-center justify-between relative z-10">
          <div className="rounded-full bg-spotify-dark p-3">
            {icon}
          </div>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-12 h-12 rounded-full bg-spotify-accent flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer">
              <Play className="w-6 h-6 text-black ml-1" />
            </div>
          </div>
        </div>
        <div className="mt-auto relative z-10">
          <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
          <p className="text-sm text-spotify-text">{subtitle}</p>
          {children}
        </div>
      </Component>
    </motion.div>
  );
};
