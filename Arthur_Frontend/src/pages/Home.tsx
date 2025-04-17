import React from "react";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import FeaturedItems from "@/components/FeaturedItems";
import AboutSection from "@/components/AboutSection";
import Testimonials from "@/components/Testimonials";
// import InnovationSection from "@/components/InnovationSection";
import FoodExperience from "@/components/FoodExperience";


const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <FeaturedItems />
      <Categories />
      {/* <InnovationSection /> */}
      <AboutSection />
      <FoodExperience />
      <Testimonials />
    </div>
  );
};

export default Home;


