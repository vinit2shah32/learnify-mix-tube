
import { useState, useEffect } from "react";
import { Calculator, Plus } from "lucide-react";
import { LearningCard } from "@/components/LearningCard";
import { Section } from "@/components/Section";

export const MixesList = () => {
  // Get mixes from global storage
  const [mixes, setMixes] = useState<Mix[]>([]);
  
  useEffect(() => {
    console.log('MixesList component mounted');
    
    // Check if window exists (client-side)
    if (typeof window !== 'undefined') {
      // Initialize if needed
      if (!window.mixesData) {
        window.mixesData = [];
      }
      
      // Force refresh the mixes from global store
      setMixes([...window.mixesData]);
      console.log('Setting initial mixes from window.mixesData:', window.mixesData);
      
      // Listen for changes in the global mixes data
      const handleMixesUpdate = () => {
        console.log('Mixes updated event received');
        setMixes([...window.mixesData]);
      };
      
      window.addEventListener('mixesUpdated', handleMixesUpdate);
      
      return () => {
        window.removeEventListener('mixesUpdated', handleMixesUpdate);
      };
    }
  }, []);
  
  useEffect(() => {
    console.log('Current mixes in state:', mixes);
  }, [mixes]);

  return (
    <Section title="Mixes for you" className="mb-8">
      {Array.isArray(mixes) && mixes.length > 0 ? (
        mixes.map((mix) => (
          <LearningCard
            key={mix.id}
            title={mix.title}
            subtitle={mix.topics.join(" • ")}
            icon={<Calculator className="w-6 h-6 text-spotify-accent" />}
            href={`/mix-practice/${mix.id}`}
            imageSrc={mix.isCustom 
              ? "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=500" 
              : "https://images.unsplash.com/photo-1460574283810-2aab119d8511?auto=format&fit=crop&w=500"}
          />
        ))
      ) : (
        <div className="col-span-3 text-center py-8 bg-spotify-card/50 rounded-lg">
          <p className="text-spotify-text">No mixes available yet.</p>
        </div>
      )}
      <LearningCard
        title="Create your Mix"
        subtitle="Customize your own practice mix"
        icon={<Plus className="w-6 h-6 text-spotify-accent" />}
        href="/create-mix"
        className="border-2 border-dashed border-spotify-hover bg-transparent hover:bg-spotify-card/20"
      />
    </Section>
  );
};
