
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface LearningCardProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  href: string;
  className?: string;
  imageSrc?: string;
  children?: React.ReactNode;
  isVideo?: boolean;
}

export const LearningCard = ({ title, subtitle, icon, href, className, imageSrc, children, isVideo }: LearningCardProps) => {
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
      <Component to={isVideo ? undefined : href} href={isVideo ? href : undefined} className="flex-1 flex flex-col">
        {imageSrc && (
          <div className="absolute inset-0 opacity-20">
            <img src={imageSrc} alt="" className="w-full h-full object-cover" />
          </div>
        )}
        <div className="flex items-center justify-between relative z-10">
          <div className="rounded-full bg-spotify-dark p-3">
            {icon}
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
