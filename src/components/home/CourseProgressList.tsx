
import { motion } from "framer-motion";
import { CourseProgress } from "./CourseProgress";

export const CourseProgressList = () => {
  return (
    <motion.div 
      className="grid gap-4 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <CourseProgress
        title="Understanding laws of Physics"
        subtitle="Thermodynamics • Motion • Vector"
        progress={90}
        imageSrc="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=500"
      />
      <CourseProgress
        title="Body and mind"
        subtitle="Physical systems • digestion • Exercise"
        progress={85}
        imageSrc="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=500"
      />
      <CourseProgress
        title="Understanding universe"
        subtitle="Space • Relativity • Dark matter"
        progress={65}
        imageSrc="https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?auto=format&fit=crop&w=500"
      />
    </motion.div>
  );
};
