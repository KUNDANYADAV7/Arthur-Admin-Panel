
import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter, MapPin, Phone, Mail, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-pesto-brown text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* About */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-white">Arthur's</h3>
            <p className="mb-6 text-white/80">
              Serving delicious food with quality ingredients since 2003. Our mission is to create memorable dining experiences for every customer.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/arthur_sandw1ch_house/?igsh=MXR4MzZmZ3F3c25lYw%3D%3D#"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://www.facebook.com/people/Arthur-Sandwich-House/61559118974753/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
              >
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-white/80 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/menu" className="text-white/80 hover:text-white transition-colors">
                  Menu
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white/80 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/80 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={20} className="mr-3 mt-1 flex-shrink-0" />
                <span className="text-white/80">
                143 George St Unit 102
                Arthur, ON N0G 1A0
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-3 flex-shrink-0" />
                <a href="tel:+123456789" className="text-white/80 hover:text-white transition-colors">
                +1 (519) 848-3136
                </a>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Opening Hours</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Clock size={20} className="mr-3 flex-shrink-0" />
                <div>
                  <p className="font-medium">Monday - Saturday</p>
                  <p className="text-white/80">10am - 9pm</p>
                </div>
              </li>
              <li className="flex items-center">
                <Clock size={20} className="mr-3 flex-shrink-0" />
                <div>
                  <p className="font-medium">Sunday</p>
                  <p className="text-white/80">11am - 8pm</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex justify-between items-center">
  <p className="text-white/70">© {currentYear} Arthur Sandwich House. All rights reserved.</p>
  <p className="text-white/70">
    Powered by: <a href="https://www.techybuilder.in/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Techy Builder</a>
  </p>
</div>


      </div>
    </footer>
  );
};

export default Footer;


