
import { Edit, Compass, Brain } from "lucide-react";
import { LearningCard } from "@/components/LearningCard";
import { Section } from "@/components/Section";

export const PracticeQuestionsList = () => {
  return (
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
  );
};
