
import { BookOpen, Book, Calculator } from "lucide-react";
import { LearningCard } from "@/components/LearningCard";
import { Section } from "@/components/Section";

export const InDepthTopicsList = () => {
  return (
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
  );
};
