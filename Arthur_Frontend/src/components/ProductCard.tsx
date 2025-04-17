import React, { useState } from "react";
import { formatCurrency } from "@/utils/formatters";
import { FoodItem } from "@/data/foodData";
import ProductModal from "./ProductModal";
import ImageModal from "./ImageModal";
import config from "@/config";

interface ProductCardProps {
  product: FoodItem;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFullImageOpen, setIsFullImageOpen] = useState(false);

  return (
    <>
      <div className="product-card group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden p-6 cursor-pointer" onClick={() => setIsModalOpen(true)}>
        {product.onSale && (
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-gradient-to-r from-pesto-orange to-pesto-light-orange text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg shadow-pesto-orange/20">
              Sale
            </span>
          </div>
        )}

        <div
          className="relative w-40 h-40 md:w-48 md:h-48 mx-auto overflow-hidden rounded-full mb-6 cursor-pointer group-hover:scale-105 transition-transform duration-500"
          onClick={() => setIsModalOpen(true)}
        >
          <img
            src={`${config.apiUrl}/${product.image}`}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            onClick={(e) => {
              e.stopPropagation();
              setIsFullImageOpen(true);
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-pesto-orange/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <div className="text-center mt-4">
          <h3
            className="font-bold text-pesto-brown text-xl mb-3 cursor-pointer group-hover:text-pesto-orange transition-colors duration-300"
            onClick={() => setIsModalOpen(true)}
          >
            {product.name}
          </h3>

          {/* <div className="flex items-center justify-center mb-4">
            <span className="font-bold text-pesto-orange text-lg">
              {product.categoryId === "ice-cream"
                ? product.price
                : typeof product.price === "number"
                  ? formatCurrency(product.price)
                  : "Price not available"}
            </span>

            {product.originalPrice && (
              <span className="text-muted-foreground line-through ml-2">
                {formatCurrency(product.originalPrice)}
              </span>
            )}
          </div> */}

{product.category === "ICE Cream"
  ? ""
  : (
    <div className="flex items-center justify-center mb-4">
      <span className="font-bold text-pesto-orange text-lg">
        {product.categoryId === "ice-cream"
          ? product.price
          : typeof product.price === "number"
            ? formatCurrency(product.price)
            : "Price not available"}
      </span>

      {product.originalPrice && (
        <span className="text-muted-foreground line-through ml-2">
          {formatCurrency(product.originalPrice)}
        </span>
      )}
    </div>
  )
}

        </div>
      </div>

      {/* ✅ Fix: pass isOpen prop */}
      <ProductModal
        product={product}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {isFullImageOpen && (
        <ImageModal
          imageSrc={`${config.apiUrl}/${product.image}`}
          onClose={() => setIsFullImageOpen(false)}
        />
      )}
    </>
  );
};

export default ProductCard;
