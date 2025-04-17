import React, { useState, useEffect } from "react";
import { X, Check, Star, Maximize } from "lucide-react";
import { formatCurrency } from "@/utils/formatters";
import { FoodItem } from "@/data/foodData";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import ImageModal from "./ImageModal";
import config from "@/config";

interface ProductModalProps {
  product: FoodItem;
  isOpen: boolean;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isFullImageOpen, setIsFullImageOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleContactClick = () => {
    onClose();
    navigate("/contact");
  };

  const nutritionFacts = [
    { name: "Protein", value: Math.floor(Math.random() * 40) + 20 + "g" },
    { name: "Carbs", value: Math.floor(Math.random() * 30) + 10 + "g" },
    { name: "Healthy Fats", value: Math.floor(Math.random() * 20) + 5 + "g" },
    { name: "Vitamins", value: Math.floor(Math.random() * 100) + 50 + "%" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      <div className="relative bg-white rounded-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 
          bg-white/10 md:bg-black/60 
          text-white md:text-white 
          backdrop-blur-sm 
          rounded-full p-2 
          hover:bg-white/20 md:hover:bg-black/70 
          transition-colors"
        >
          <X size={24} />
        </button>

        <div className="grid md:grid-cols-2">
          <div className="relative overflow-hidden bg-pesto-brown">
          {product.onSale && (
  <div className="absolute left-6 top-6 z-10 bg-pesto-orange/90 text-white px-4 py-2 rounded-full text-sm font-medium">
    Sale
  </div>
)}

            <img
              src={`${config.apiUrl}/${product.image}`}
              alt={product.name}
              className="w-full h-full object-cover aspect-square transition-transform duration-700 hover:scale-110"
              onClick={() => setIsFullImageOpen(true)}
            />
                        
            <div className="absolute bottom-6 left-6 bg-pesto-orange/90 text-white px-4 py-2 rounded-full text-sm font-medium">
              {product.category}
            </div>
          </div>

          <div className="p-8 bg-white relative">
            <div className="absolute top-0 right-0 w-40 h-40 bg-pesto-cream/30 rounded-full blur-3xl -z-10"></div>
            
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-pesto-brown mb-2">
                {product.name}
              </h2>
              
              <div className="flex items-center">
                <span className="text-3xl font-bold text-pesto-orange">
                  {/* {formatCurrency(product.price)} */}

                   {
    product.categoryId === "ice-cream"
      ? '' // show the full string, e.g., "$1.99 for 1 Scoop | $3.99 for 3 Scoop"
      : typeof product.price === "number"
        ? `$${product.price.toFixed(2)}`
        : "Price not available"
  }
                </span>
                
                {product.originalPrice && (
                  <span className="ml-3 text-muted-foreground line-through">
                    {formatCurrency(product.originalPrice)}
                  </span>
                )}
                

{product.onSale && typeof product.price === "number" && typeof product.originalPrice === "number" && (
  <span className="ml-3 bg-pesto-orange/10 text-pesto-orange text-sm font-medium px-2 py-1 rounded-full">
    Save {formatCurrency(product.originalPrice - product.price)}
  </span>
)}

              </div>

              <div>
                <h3 className="text-lg font-semibold text-pesto-brown mb-3">About This Dish</h3>
                <p className="text-muted-foreground mb-2 leading-relaxed">
                  {showFullDescription || !product.prepInstructions
                    ? product.description
                    : `${product.description.substring(0, 100)}...`}
                  {product.prepInstructions && (
                    <>
                      {showFullDescription && (
                        <> {product.prepInstructions}</>
                      )}
                      <button
                        onClick={() => setShowFullDescription(!showFullDescription)}
                        className="text-pesto-orange hover:underline ml-1 font-medium"
                      >
                        {showFullDescription ? "See less" : "See more"}
                      </button>
                    </>
                  )}
                </p>
              </div>
              <Button
                className="w-full py-6 text-lg relative overflow-hidden group"
                onClick={handleContactClick}
              >
                <span className="relative z-10">CONTACT US</span>
                <div className="absolute inset-0 bg-gradient-to-r from-pesto-orange to-pesto-light-orange opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {isFullImageOpen && (
        <ImageModal
          src={`${config.apiUrl}/${product.image}`}
          alt={product.name}
          onClose={() => setIsFullImageOpen(false)}
        />
      )}
    </div>
  );
};

export default ProductModal;
