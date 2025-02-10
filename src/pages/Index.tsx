import { Book, BookOpen, Calculator, Library, PlayCircle, Video } from "lucide-react";
import { LearningCard } from "@/components/LearningCard";
import { Section } from "@/components/Section";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <div className="min-h-screen bg-spotify-dark text-white">
      <div className="container py-8">
        <motion.h1 
          className="text-4xl font-bold mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Welcome back to your learning journey
        </motion.h1>

        <Section title="Practice Mix">
          <LearningCard
            title="Algebra Practice"
            subtitle="Master equations and expressions"
            icon={<Calculator className="w-6 h-6 text-spotify-accent" />}
            href="/practice/algebra"
            imageSrc="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=500"
          />
          <LearningCard
            title="Geometry Practice"
            subtitle="Explore shapes and spaces"
            icon={<Book className="w-6 h-6 text-spotify-accent" />}
            href="/practice/geometry"
            imageSrc="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=500"
          />
          <LearningCard
            title="Advanced Math"
            subtitle="Challenge yourself"
            icon={<Library className="w-6 h-6 text-spotify-accent" />}
            href="/practice/advanced"
            imageSrc="https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?auto=format&fit=crop&w=500"
          />
        </Section>

        <Section title="Video Recommendations">
          <LearningCard
            title="Understanding Functions"
            subtitle="Comprehensive guide to functions"
            icon={<Video className="w-6 h-6 text-spotify-accent" />}
            href="/videos/functions"
            imageSrc="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=500"
          />
          <LearningCard
            title="Trigonometry Basics"
            subtitle="Essential concepts explained"
            icon={<PlayCircle className="w-6 h-6 text-spotify-accent" />}
            href="/videos/trigonometry"
          />
          <LearningCard
            title="Calculus Introduction"
            subtitle="Start your calculus journey"
            icon={<Video className="w-6 h-6 text-spotify-accent" />}
            href="/videos/calculus"
          />
        </Section>

        <Section title="Question of the Day">
          <LearningCard
            title="Algebra Challenge"
            subtitle="Test your algebraic skills"
            icon={<Calculator className="w-6 h-6 text-spotify-accent" />}
            href="/questions/algebra"
            imageSrc="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=500"
          />
          <LearningCard
            title="Geometry Puzzle"
            subtitle="Solve spatial problems"
            icon={<Book className="w-6 h-6 text-spotify-accent" />}
            href="/questions/geometry"
          />
          <LearningCard
            title="Advanced Problem"
            subtitle="Push your limits"
            icon={<Library className="w-6 h-6 text-spotify-accent" />}
            href="/questions/advanced"
          />
        </Section>

        <Section title="Topics to Practice">
          <LearningCard
            title="Probability"
            subtitle="Master chance and statistics"
            icon={<Calculator className="w-6 h-6 text-spotify-accent" />}
            href="/topics/probability"
            imageSrc="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=500"
          />
          <LearningCard
            title="Coordinate Geometry"
            subtitle="Navigate the coordinate plane"
            icon={<BookOpen className="w-6 h-6 text-spotify-accent" />}
            href="/topics/coordinate-geometry"
          />
          <LearningCard
            title="Linear Equations"
            subtitle="Word problems and applications"
            icon={<Book className="w-6 h-6 text-spotify-accent" />}
            href="/topics/linear-equations"
          />
        </Section>
      </div>
    </div>
  );
};

export default Index;
