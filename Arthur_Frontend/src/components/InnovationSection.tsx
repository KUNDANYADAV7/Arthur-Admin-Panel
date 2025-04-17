import React from "react";
import { 
  Sparkles, 
  Dna, 
  Brain, 
  Sprout, 
  Atom
} from "lucide-react";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const InnovationSection: React.FC = () => {
  const innovations = [
    {
      id: 1,
      icon: <Sparkles className="h-10 w-10 text-yellow-400" />,
      title: "Flavor Amplification",
      description: "Our neural-enhanced spices create taste experiences that adapt to your personal preferences.",
    },
    {
      id: 2,
      icon: <Dna className="h-10 w-10 text-green-400" />,
      title: "Bio-Cultivated Proteins",
      description: "Ethically grown proteins with perfect texture and enhanced nutritional profiles.",
    },
    {
      id: 3,
      icon: <Brain className="h-10 w-10 text-purple-400" />,
      title: "Mood-Responsive Cuisine",
      description: "Dishes that subtly adjust their flavor profile based on your current emotional state.",
    },
    {
      id: 4,
      icon: <Sprout className="h-10 w-10 text-green-500" />,
      title: "Zero-Impact Farming",
      description: "Vertical nano-farms within our kitchen produce ingredients with no ecological footprint.",
    },
    {
      id: 5,
      icon: <Atom className="h-10 w-10 text-blue-400" />,
      title: "Molecular Restructuring",
      description: "Classic comfort foods reimagined at the molecular level for optimal satisfaction.",
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-pesto-cream/30 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="inline-block text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pesto-brown to-pesto-orange relative">
            Culinary Innovations
            <div className="absolute -z-10 bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-3 bg-pesto-orange/20 blur-xl"></div>
          </h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
            Pushing the boundaries of what's possible in gastronomy with our 2050 technologies
          </p>
        </div>

        <div className="relative">
          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent>
              {innovations.map((item) => (
                <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/3">
                  <div className="innovation-card group h-full">
                    <div className="bg-white rounded-2xl p-8 border border-pesto-cream shadow-lg shadow-pesto-cream/10 hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                      <div className="mb-6 p-4 rounded-full bg-pesto-cream/30 inline-block">
                        {item.icon}
                      </div>
                      <h3 className="text-xl font-bold text-pesto-brown mb-3 group-hover:text-pesto-orange transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-0 top-1/2" />
            <CarouselNext className="absolute right-0 top-1/2" />
          </Carousel>
          
          {/* Decorative elements */}
          <div className="absolute -z-10 top-1/4 left-0 w-72 h-72 rounded-full bg-pesto-orange/5 blur-3xl"></div>
          <div className="absolute -z-10 bottom-0 right-10 w-80 h-80 rounded-full bg-pesto-cream/30 blur-3xl"></div>
        </div>
      </div>
    </section>
  );
};

export default InnovationSection;
