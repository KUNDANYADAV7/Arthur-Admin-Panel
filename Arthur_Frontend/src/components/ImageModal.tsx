
import React from "react";
import { X } from "lucide-react";

interface ImageModalProps {
  src: string;
  alt: string;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ src, alt, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <button 
        onClick={onClose} 
        className="absolute top-4 right-4 z-60 bg-white/20 hover:bg-white/40 rounded-full p-2 transition-colors"
      >
        <X size={32} className="text-white" />
      </button>
      
      <div className="max-w-[90%] max-h-[90%] overflow-hidden">
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-full object-contain rounded-lg shadow-2xl" 
        />
      </div>
    </div>
  );
};

export default ImageModal;
