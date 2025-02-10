
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface LearningCardProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  href: string;
  className?: string;
}

export const LearningCard = ({ title, subtitle, icon, href, className }: LearningCardProps) => {
  return (
    <motion.a
      href={href}
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
      <div className="flex items-center justify-between">
        <div className="rounded-full bg-spotify-dark p-3">
          {icon}
        </div>
      </div>
      <div className="mt-auto">
        <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
        <p className="text-sm text-spotify-text">{subtitle}</p>
      </div>
    </motion.a>
  );
};
