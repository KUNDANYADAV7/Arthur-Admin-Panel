
import React, { useEffect } from "react";

const About: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-pesto-brown mb-4">About Us</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
          Welcome to Arthur Sandwich House, where small-town charm meets delicious, fresh food. 
          Located on George Street, our cozy spot has been warmly embraced by the community since our grand opening.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="mb-16">
            <img
              src="./images/7.png"
              alt="ARTHUR SANDWICH HOUSE"
              className="w-full h-[400px] object-cover rounded-2xl mb-8"
            />

            <h2 className="text-3xl font-bold text-pesto-brown mb-6">Our Story</h2>
            <p className="text-lg text-muted-foreground mb-4">
            We started from a menu, aiming to bring something unique to Arthur. Our focus is on creating a friendly, 
            personal dining experience. We love chatting with our customers and making genuine connections, adding a 
            personal touch that sets us apart. 
            </p>
            <p className="text-lg text-muted-foreground mb-4">
            Our menu features fresh, healthier options like paninis, wraps, burritos, 
            salads, ice cream, milkshakes, and a variety of sandwiches. From the classic peanut 
            butter and jelly to the indulgent Nutella sandwich with strawberries and bananas, there’s 
            something for everyone.
            </p>
            <p className="text-lg text-muted-foreground mb-4">
            Arthur is a small town and a travel-through destination for many. We aim to provide friendly 
            conversation and satisfying meals for both locals and traveller's. 
            With nearly seven years in the food industry, our team brings a wealth of experience
            </p>
            <p className="text-lg text-muted-foreground mb-4">
              Our commitment to quality and service has remained unchanged over the years, 
              and we continue to innovate and improve our menu while staying true to our original mission.
              Each of us has different strengths, creating a perfect collaboration. 
              Our grand opening was a hit, and we are motivated to continue serving our community.
            </p>
            <p className="text-lg text-muted-foreground mb-4">
            We plan to introduce monthly promotions with special items like butter chicken and shawarma, 
            giving our customers new tastes to enjoy. 
            Our vision is to maintain that personal touch and friendly atmosphere as we grow.
            </p>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-pesto-brown mb-6">Our Values</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-pesto-cream/30 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-pesto-brown mb-3">Quality</h3>
                <p className="text-muted-foreground">
                  We source only the finest ingredients and prepare everything fresh daily. Our chefs are committed to culinary excellence in every dish.
                </p>
              </div>
              
              <div className="bg-pesto-cream/30 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-pesto-brown mb-3">Community</h3>
                <p className="text-muted-foreground">
                  We believe in giving back to the community that has supported us. We regularly host charity events and source from local suppliers.
                </p>
              </div>
              
              <div className="bg-pesto-cream/30 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-pesto-brown mb-3">Sustainability</h3>
                <p className="text-muted-foreground">
                  We're committed to reducing our environmental footprint through eco-friendly packaging, waste reduction, and energy-efficient practices.
                </p>
              </div>
              
              <div className="bg-pesto-cream/30 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-pesto-brown mb-3">Innovation</h3>
                <p className="text-muted-foreground">
                  While respecting culinary traditions, we're not afraid to innovate and create unique flavor profiles and dining experiences.
                </p>
              </div>
            </div>
          </div>
</div> 
<div className="flex flex-col md:flex-row items-center gap-8 bg-gray-50 p-6 rounded-xl shadow-lg">
  {/* Image Section */}
  <div className="w-full md:w-1/2">
    <img
      src="/images/aboutus.png"
      alt="Arthur Sandwich House Ribbon Cutting"
      className="rounded-lg w-full object-cover"
    />
  </div>

  {/* Content Section */}
  <div className="w-full md:w-1/2 text-center md:text-left">
    <h2 className="font-serif text-center text-3xl md:text-4xl font-bold mb-4 text-pesto-brown">
      ARTHUR <br />
      SANDWICH <br />
      HOUSE <br />
      OFFICIALLY OPEN
    </h2>

    {/* Logo Image */}
    <div className="flex justify-center bg-gray-50 py-2 px-4 inline-block rounded mb-6">
      <img
        src="/images/11.png"
        alt="North Wellington Community News Logo"
        className="w-84 max-w-full h-auto object-contain"
      />
    </div>

    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-6">

    {/* Author & Date */}
    <div className="flex items-center gap-3">
    <img
      src="./images/12.png"
      alt="author icon"
      className="w-20 h-20 rounded-full object-cover"
    />
    <div>
      <p className="text-xl font-semibold text-pesto-brown">Community News Staff</p>
      <p className="text-xl text-gray-500">June 5, 2024</p>
    </div>
  </div>

    {/* CTA Button */}
    <a
    href="https://www.wellingtonadvertiser.com/arthur-sandwich-house-officially-open/"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-block bg-black text-white font-semibold px-6 py-2 rounded-full hover:bg-pesto-brown transition-colors"
  >
    Read Article
  </a>
  </div>
  </div>
</div>

        </div>
      </div>
  );
};

export default About;
