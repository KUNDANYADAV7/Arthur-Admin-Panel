import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Star, Mail, Tag } from "lucide-react";
import { useOffer } from "@/context/OfferContext";


const Hero: React.FC = () => {
const { allOffers } = useOffer();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="pt-32 pb-24 md:pt-40 md:pb-28 relative overflow-hidden">
      {/* Animated background with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1500&auto=format&fit=crop)",
          backgroundPosition: "center 40%",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-pesto-brown/90 to-pesto-brown/50"></div>

        {/* Abstract shapes for futuristic feel */}
        <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-pesto-orange/20 blur-3xl"></div>
        <div className="absolute left-1/4 top-1/4 w-72 h-72 rounded-full bg-white/10 blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl text-white">
          <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm mb-6 border border-white/20">
            <Star size={16} className="text-yellow-400 mr-2" />
            <span>Rated #1 Restaurant Experience of 2025</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-pesto-light-orange">
              Future Food,
            </span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pesto-light-orange to-white">
              Today's Taste
            </span>
          </h1>

          <p className="text-lg md:text-xl opacity-90 mb-8 leading-relaxed">
            Experience culinary innovation with neuro-enhanced flavors and
            sustainable ingredients at Arthur's. Our quantum-aged recipes deliver
            taste sensations beyond imagination.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/menu">
              <button className="btn-primary flex items-center justify-center gap-2 w-full sm:w-auto group relative overflow-hidden">
                <span className="relative z-10">Experience Our Menu</span>
                <ArrowRight
                  size={18}
                  className="relative z-10 group-hover:translate-x-1 transition-transform"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-pesto-orange to-pesto-light-orange opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>
            </Link>
            <Link to="/about">
              <button className="bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20 font-bold py-2 px-6 rounded-lg transition-all duration-200 w-full sm:w-auto">
                Our Story
              </button>
            </Link>
          </div>
        </div>
      </div>

     {/* Sale Ribbon - Left to Right Scrolling */}
     

     {allOffers.length > 0 && (
  <div className="absolute bottom-0 left-0 w-full bg-green-600 overflow-hidden py-2 z-20">
    <div className="whitespace-nowrap animate-marquee-right text-white text-sm md:text-base flex gap-12">
      {allOffers.map((offer, index) => (
        <div key={`offer1-${index}`} className="flex items-center gap-2 px-4">
          <Tag size={16} className="text-pink-400" />
          <span>
            {offer.title} {offer.discount}% OFF – Valid from{" "}
            {new Date(offer.validFrom).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })} to{" "}
            {new Date(offer.validUntil).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>
      ))}

      {/* {allOffers.map((offer, index) => (
        <div key={`offer2-${index}`} className="flex items-center gap-2 px-4">
          <Tag size={16} className="text-pink-400" />
          <span>
            {offer.title} {offer.discount}% OFF – Valid from{" "}
            {new Date(offer.validFrom).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })} to{" "}
            {new Date(offer.validUntil).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>
      ))} */}
    </div>
  </div>
)}



      {/* Email Floating Button */}
      <EmailButton />
    </section>
  );
};

export default Hero;

const EmailButton: React.FC = () => {
  const [atBottom, setAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const footer = document.getElementById("footer");
      if (footer) {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const footerTop = footer.getBoundingClientRect().top + scrollY;

        setAtBottom(scrollY + windowHeight >= footerTop - 40);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openGmail = (): void => {
    const userAgent: string = navigator.userAgent || (navigator as any).vendor || (window as any).opera;

    if (/android/i.test(userAgent)) {
      window.location.href = "intent://compose?to=sandwichclub153@gmail.com#Intent;package=com.google.android.gm;scheme=mailto;end;";
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
      window.location.href = "googlegmail://co?to=sandwichclub153@gmail.com";
    } else {
      window.open("https://mail.google.com/mail/?view=cm&fs=1&to=sandwichclub153@gmail.com", "_blank");
    }
  };

  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        openGmail();
      }}
      className={`fixed z-50 right-4 top-12 md:right-8 transition-all duration-300`}
    >
      <div className="relative w-14 h-28 flex items-center justify-center">
        <span className="absolute inline-flex h-14 w-14 rounded-full bg-blue-500 opacity-75 animate-ping"></span>
        <div className="relative z-10 w-12 h-12 flex items-center justify-center bg-blue-500 rounded-full shadow-md hover:scale-105 transition">
          <Mail className="w-6 h-6 text-white" />
        </div>
      </div>
    </a>
  );
};
