import React from "react";
import { Star } from "lucide-react";

// Testimonial data
const testimonials = [
  {
    id: 1,
    name: "Trevor Bresson",
    role: "Food Enthusiast",
    content: "Really enjoyed my panini experience from the sandwich house located in arthur! Great tasting fresh deli accomidatied by a in house baked panini bun. Give it a try!",
    rating: 5,
  },
  {
    id: 2,
    name: "Chad Harris",
    role: "Regular Customer",
    content: "Customer reviews Discover what our clients think about our service Stopped in Arthur on our way north and decided to try Arthur Sandwich House. The paninis were excellent on focaccia bread made in house. Really great experience.",
    rating: 5,
  },
  {
    id: 3,
    name: "Gary Rana",
    role: "Food Blogger",
    content: "I was driving by on my way to Blue mountain, was going to go to subway when this place caught my eye and boy was I glad I went here! Great food for the value! I got a chicken Caesar wrap and it did not disappoint. Lots of different items to choose from Wraps, burritos, sandwichs etc. Will definitely be coming back!",
    rating: 4,
  },
  {
    id: 4,
    name: "Elisa Downie",
    role: "Food Blogger",
    content: "Heading up north for the weekend when we spotted this new little shop, and thought a sandwich was just right- it does not disappoint. The pesto chicken was DELICIOUS. I love a good crunch to my sandwich, it was healthy without sacrificing any flavour. The staff was very courteous, shared some of their story and even made us the Nutella sandwich to try on the house- nice touch. I’ll be back.",
    rating: 5,
  },
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-16 bg-pesto-cream/50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-pesto-brown">
          What Our Customers Say
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center mb-4">
                {/* Stars */}
                <div className="flex text-yellow-500 mr-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      fill={i < testimonial.rating ? "currentColor" : "none"}
                      className={i < testimonial.rating ? "text-yellow-500" : "text-gray-300"}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {testimonial.rating}.0/5
                </span>
              </div>

              <p className="text-muted-foreground mb-6">"{testimonial.content}"</p>

              <div>
                <h4 className="font-bold text-pesto-brown">{testimonial.name}</h4>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
