import { useRef } from "react";
import { Upload } from "lucide-react";

const ImageUpload = ({ imagePreview, onImageChange, onImageClear }) => {
  const fileInputRef = useRef();

  const handleImageChange = (e) => {
    onImageChange(e);
    // Reset the file input value to allow same image selection again
    e.target.value = null;
  };

  const handleClickChangeImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="form-group">
      <label htmlFor="image" className="block text-sm font-medium text-[#5a1c00]">
        Menu Item Image
      </label>
      <div className="mt-2">
        {imagePreview ? (
          <div className="relative rounded-md overflow-hidden h-48 bg-gray-100">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={handleClickChangeImage}
              className="absolute bottom-2 right-2 px-4 py-2 text-white bg-[#5a1c00] hover:bg-[#7f2800] rounded-md text-sm"
            >
              Change Image
            </button>
            <input
              ref={fileInputRef}
              type="file"
              name="menuImage"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
        ) : (
          <label
            htmlFor="image-upload"
            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-md cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="h-10 w-10 text-gray-500 mb-2" />
              <p className="text-xs text-gray-500 mt-1">
                PNG, JPG, GIF up to 10MB
              </p>
              <p className="text-sm text-[#5a1c00]">
                <span className="font-medium">Click to upload</span>
              </p>
            </div>
            <input
              ref={fileInputRef}
              id="image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        )}
      </div>
    </div>
  );
};

export { ImageUpload };

