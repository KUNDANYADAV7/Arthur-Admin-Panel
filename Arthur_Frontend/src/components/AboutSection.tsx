
import React from "react";
import { Link } from "react-router-dom";

const AboutSection: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Image */}
          <div className="lg:w-1/2">
            <div className="relative">
              <img
                src="./images/8.png"
                alt="ARTHUR SANDWICH HOUSE"
                className="rounded-2xl shadow-xl"
              />
            </div>
          </div>

          {/* Content */}
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-pesto-brown">
              About Arthur 
            </h2>
            
            <p className="text-lg text-muted-foreground mb-6">
            Bring the gift of Our Sandwiches to your parties, holidays, 
            corporate events and more with our Catering.
            </p>
            
            <p className="text-lg text-muted-foreground mb-8">
            Our commitment to quality and service has remained unchanged over the years, and 
            we continue to innovate and improve our menu while staying true to our original mission.
             Each of us has different strengths, creating a perfect collaboration. 
            Our grand opening was a hit, and we are motivated to continue serving our community.
            </p>
                        
            <Link to="/about">
              <button className="btn-primary">
                Learn More About Us
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

