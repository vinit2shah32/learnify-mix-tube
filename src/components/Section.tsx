
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";

interface SectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  useCarousel?: boolean;
}

export const Section = ({ title, children, className, useCarousel = false }: SectionProps) => {
  // Convert children to array to work with
  const childArray = React.Children.toArray(children);
  
  return (
    <motion.section
      className={cn("mb-12", className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <a href="#" className="text-spotify-text hover:text-white flex items-center gap-1 text-sm">
          Show all <ChevronRight className="w-4 h-4" />
        </a>
      </div>
      
      {useCarousel ? (
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="relative"
        >
          <CarouselContent className="-ml-4">
            {childArray.map((child, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 pl-4">
                {child}
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-spotify-accent text-black hover:bg-spotify-accent/80" />
          <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-spotify-accent text-black hover:bg-spotify-accent/80" />
        </Carousel>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {children}
        </div>
      )}
    </motion.section>
  );
};
