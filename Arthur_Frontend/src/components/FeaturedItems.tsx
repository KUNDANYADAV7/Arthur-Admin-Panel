import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePopularChoice } from '@/context/PopularChoiceContext';
import config from '@/config';
import Marquee from "react-fast-marquee";

interface MenuItem {
  id: string;
  name: string;
  photo: string;
}

const FeaturedMenu = () => {
  const navigate = useNavigate();
  
  const { allPopularChoices } = usePopularChoice();

  console.log(allPopularChoices);

  return (
    <section className="section-padding">
  <div className="mx-auto px-0">
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold text-pesto-brown mb-4 mt-10">Popular Choices</h2>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Discover our customer favorites, handcrafted with love and fresh ingredients
      </p>
    </div>

    <div className="overflow-hidden"> 
    {allPopularChoices.length > 0 ? (
  <Marquee
    direction="left"
    speed={90}
    gradient={false}
    pauseOnHover={false}
  >
    {allPopularChoices.map((item, index) => (
      <div
        key={`${item._id}-${index}`}
        className="cursor-pointer flex-shrink-0 w-[200px] md:w-[500px] h-[200px] md:h-[400px] mx-2 rounded-lg overflow-hidden duration-300"
      >
        <img
          src={`${config.apiUrl}/${item.photo}`}
          alt="img"
          className="w-full h-3/4 object-cover object-center"
        />
      </div>
    ))}
  </Marquee>
) : (
  <div className="text-center text-gray-600 py-10">
    No popular choices available at the moment.
  </div>
)}

    </div>
  </div>
</section>

  
  );
};

export default FeaturedMenu;


