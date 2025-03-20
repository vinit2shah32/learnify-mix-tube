
import { Video, PlayCircle } from "lucide-react";
import { LearningCard } from "@/components/LearningCard";
import { Section } from "@/components/Section";

export const VideoMixList = () => {
  return (
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
  );
};
