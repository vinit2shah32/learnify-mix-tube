
import { Book, BookOpen, Calculator, Library, PlayCircle, Video, ChevronRight, Edit, Compass, Brain } from "lucide-react";
import { LearningCard } from "@/components/LearningCard";
import { Section } from "@/components/Section";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";

interface CourseProgressProps {
  title: string;
  subtitle: string;
  progress: number;
  imageSrc: string;
}

const CourseProgress = ({ title, subtitle, progress, imageSrc }: CourseProgressProps) => {
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
        </motion.div>

        <div className="grid gap-4 mb-8">
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
        </div>

        <Section title="Practice Questions" className="mb-8">
          <LearningCard
            title="Calculus Fundamentals"
            subtitle="What is the derivative of x²?"
            icon={<Edit className="w-6 h-6 text-spotify-accent" />}
            href="/question/1"
            questionId={1}
            imageSrc="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=500"
          />
          <LearningCard
            title="Physics Concepts"
            subtitle="Newton's Laws of Motion"
            icon={<Compass className="w-6 h-6 text-spotify-accent" />}
            href="/question/2"
            questionId={2}
            imageSrc="https://images.unsplash.com/photo-1516192518150-0d8fee5425e3?auto=format&fit=crop&w=500"
          />
          <LearningCard
            title="Biology Basics"
            subtitle="Understanding Cell Structure"
            icon={<Brain className="w-6 h-6 text-spotify-accent" />}
            href="/question/3"
            questionId={3}
            imageSrc="https://images.unsplash.com/photo-1559757175-7cb057fba93c?auto=format&fit=crop&w=500"
          />
        </Section>

        <Section title="Mixes for you" className="mb-8">
          <LearningCard
            title="Statistics Mix"
            subtitle="Median • Standard Deviation • Average"
            icon={<Calculator className="w-6 h-6 text-spotify-accent" />}
            href="/practice/statistics"
            imageSrc="https://images.unsplash.com/photo-1460574283810-2aab119d8511?auto=format&fit=crop&w=500"
          />
          <LearningCard
            title="Linear relationship Word problems mix"
            subtitle="Linear equations • Word Problems • Slopes"
            icon={<Book className="w-6 h-6 text-spotify-accent" />}
            href="/practice/linear"
            imageSrc="https://images.unsplash.com/photo-1486718448742-163732cd1544?auto=format&fit=crop&w=500"
          />
          <LearningCard
            title="Quadratic functions mix"
            subtitle="Quadratic equations • Graphs • Vertex"
            icon={<Library className="w-6 h-6 text-spotify-accent" />}
            href="/practice/quadratic"
            imageSrc="https://images.unsplash.com/photo-1439337153520-7082a56a81f4?auto=format&fit=crop&w=500"
          />
        </Section>

        <Section title="Video mix for you">
          <LearningCard
            title="The realm of mathematics"
            subtitle="Comprehensive guide to math concepts"
            icon={<Video className="w-6 h-6 text-spotify-accent" />}
            href="/videos/math-realm"
            imageSrc="https://images.unsplash.com/photo-1497604401993-f2e922e5cb0a?auto=format&fit=crop&w=500"
          />
          <LearningCard
            title="Diving deep into the world of probability"
            subtitle="Probability concepts explained"
            icon={<PlayCircle className="w-6 h-6 text-spotify-accent" />}
            href="/videos/probability"
            imageSrc="https://images.unsplash.com/photo-1551038247-3d9af20df552?auto=format&fit=crop&w=500"
          />
          <LearningCard
            title="Chemistry: Alkaline and Acidic solution study"
            subtitle="Understanding pH and solutions"
            icon={<Video className="w-6 h-6 text-spotify-accent" />}
            href="/videos/chemistry"
            imageSrc="https://images.unsplash.com/photo-1493397212122-2b85dda8106b?auto=format&fit=crop&w=500"
          />
        </Section>

        <Section title="In-depth topics">
          <LearningCard
            title="Differential calculus"
            subtitle="Advanced • Comprehensive guide"
            icon={<BookOpen className="w-6 h-6 text-spotify-accent" />}
            href="/topics/calculus"
            className="relative"
          >
            <span className="absolute bottom-4 right-4 text-xs font-medium bg-spotify-accent px-2 py-1 rounded">
              advance
            </span>
          </LearningCard>
          <LearningCard
            title="Quantum Mechanics of higher order"
            subtitle="Intermediate • Complex concepts"
            icon={<Book className="w-6 h-6 text-spotify-accent" />}
            href="/topics/quantum"
            className="relative"
          >
            <span className="absolute bottom-4 right-4 text-xs font-medium bg-yellow-500 px-2 py-1 rounded">
              intermediate
            </span>
          </LearningCard>
          <LearningCard
            title="Simultaneous & quadratic equations"
            subtitle="Advanced • Problem solving"
            icon={<Calculator className="w-6 h-6 text-spotify-accent" />}
            href="/topics/equations"
            className="relative"
          >
            <span className="absolute bottom-4 right-4 text-xs font-medium bg-spotify-accent px-2 py-1 rounded">
              advance
            </span>
          </LearningCard>
        </Section>
      </div>
    </div>
  );
};

export default Index;
