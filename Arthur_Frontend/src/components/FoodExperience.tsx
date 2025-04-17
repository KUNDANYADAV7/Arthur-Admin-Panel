
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ArrowUpRight, 
  HeartHandshake, 
  Eye, 
  Zap, 
  Smile 
} from "lucide-react";

const FoodExperience: React.FC = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-pesto-orange/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-pesto-brown/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div>
            <div className="inline-flex items-center bg-pesto-cream/50 px-4 py-2 rounded-full text-sm mb-6">
              <Smile className="text-pesto-orange mr-2 h-4 w-4" />
              <span className="text-pesto-brown font-medium">The Arthur's Experience</span>
            </div>

<h2 className="text-center text-4xl md:text-5xl font-bold text-pesto-brown mb-6 leading-tight">
  Small town friendly feeling at new{" "}
  <br />
  <span className="relative inline-block">
    <span className="block">Arthur Sandwich House</span>
    <span className="absolute bottom-2 -z-10 left-0 right-0 h-3 bg-pesto-orange/20"></span>
  </span>
</h2>



            
            <p className="text-center text-lg text-muted-foreground mb-8">
            Welcome to Arthur Sandwich House, where small-town charm meets delicious, fresh food. That’s a big reason to come back, to get that small town friendly feeling
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <Card className="bg-white border-none shadow-xl shadow-pesto-cream/10">
                <CardContent className="p-6">
                  <div className="bg-pesto-cream/30 p-2 rounded-full w-fit mb-4">
                    <HeartHandshake className="h-6 w-6 text-pesto-orange" />
                  </div>
                  <h3 className="font-bold text-pesto-brown text-lg mb-2">Personalized Tastes</h3>
                  <p className="text-muted-foreground text-sm">Smart algorithms adapt flavors to your preferences.</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white border-none shadow-xl shadow-pesto-cream/10">
                <CardContent className="p-6">
                  <div className="bg-pesto-cream/30 p-2 rounded-full w-fit mb-4">
                    <Eye className="h-6 w-6 text-pesto-orange" />
                  </div>
                  <h3 className="font-bold text-pesto-brown text-lg mb-2">Visual Artistry</h3>
                  <p className="text-muted-foreground text-sm">Holographic garnishes and reactive plating.</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white border-none shadow-xl shadow-pesto-cream/10">
                <CardContent className="p-6">
                  <div className="bg-pesto-cream/30 p-2 rounded-full w-fit mb-4">
                    <Zap className="h-6 w-6 text-pesto-orange" />
                  </div>
                  <h3 className="font-bold text-pesto-brown text-lg mb-2">Texture Revolution</h3>
                  <p className="text-muted-foreground text-sm">Programmable textures that shift during your meal.</p>
                </CardContent>
              </Card>
            </div>
            
       
<button
  onClick={() => window.location.href = "/#/menu"}
  className="group flex items-center text-pesto-brown font-bold hover:text-pesto-orange transition-colors"
>
  Discover our Menu
  <ArrowUpRight className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
</button>
          </div>
          
          {/* Right Column - Image */}
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden relative">
              <img 
                src="./images/aboutus.png" 
                alt="Futuristic dining experience" 
                className="w-full h-full object-cover"
              />
              
              {/* Decorative elements */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              
              <div className="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 flex items-center justify-between">
  {/* Author Info */}
  <div className="flex items-center gap-4">
    <img
      src="/images/13.png" // replace with actual image path
      alt="Barbara Latkowski"
      className="w-12 h-12 rounded-full object-cover"
    />
    <div>
      <p className="text-white font-semibold">Barbara Latkowski</p>
      <p className="text-white text-sm">Jun 6, 2024</p>
    </div>
  </div>

  {/* Read Article Button */}
  <a
    href="https://www.elorafergustoday.com/lets-eat/small-town-friendly-feeling-at-new-arthur-sandwich-house-8993614"
    target="_blank"
    rel="noopener noreferrer"
    className="bg-black text-white font-semibold px-6 py-2 rounded-full hover:bg-pesto-brown transition-colors"
  >
    Read Article
  </a>
</div>
            </div>
            
            {/* Floating accent element */}
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default FoodExperience;
