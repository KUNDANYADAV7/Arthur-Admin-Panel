import React, { useState, useEffect } from "react";
import { usePopularChoice } from "../../context/PopularChoiceContext";
import { ArrowLeft, Image as ImageIcon } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import config from "../../config";
import toast from "react-hot-toast";

const CreatePopularChoice = () => {
  const {
    createPopularChoice,
    updatePopularChoice,
    getPopularChoiceById, // Add this to context
  } = usePopularChoice();

  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ photo: null });
  const [preview, setPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditMode, setIsEditMode] = useState(!!id);
  const [previewUpdated, setPreviewUpdated] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchPopularChoice = async () => {
        const data = await getPopularChoiceById(id);
        if (data && !previewUpdated) {
          setPreview(`${config.apiUrl}/${data.photo}`);
        }
      };
      fetchPopularChoice();
    }
  }, [id]);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setFormData({ photo: file });
      setPreviewUpdated(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.photo && !isEditMode) {
      toast.error("Image is required!");
      return;
    }

    setIsSubmitting(true);
    const data = new FormData();
    if (formData.photo) {
      data.append("photo", formData.photo);
    }

    try {
      if (isEditMode) {
        await updatePopularChoice(id, data);
      } else {
        await createPopularChoice(data);
      }
      navigate("/popular");
    } catch {
      toast.error("Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Link to="/popular" className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-6 mt-8 md:mt-0">
        <ArrowLeft className="h-5 w-5" />
        <span>Back to Popular Choices</span>
      </Link>

      <h1 className="text-3xl font-bold text-[#5a1c00] mb-8">
        {isEditMode ? "Edit Popular Choice" : "Create Popular Choice"}
      </h1>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <form className="p-6 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-[#5a1c00] mb-2">Upload Image</label>
            <div className="relative mt-1 border-2 hover:bg-gray-100 border-gray-300 border-dashed rounded-md overflow-hidden">
              <label htmlFor="file-upload" className="w-full h-full cursor-pointer flex flex-col items-center justify-center">
                {preview ? (
                  <>
                    <img src={preview} alt="Preview" className="w-full h-40 object-cover" />
                    <div className="absolute bottom-2 right-2">
                      <span className="bg-[#5a1c00] hover:bg-[#7f2800] text-white px-3 py-2 rounded shadow text-sm">
                        Change Image
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="space-y-1 text-center py-6 px-6">
                    <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    <p className="text-[#5a1c00] text-sm font-medium">Click to upload</p>
                  </div>
                )}
                <input id="file-upload" type="file" name="photo" className="sr-only" onChange={handleChange} />
              </label>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="submit"
              className="px-4 py-2 bg-[#5a1c00] hover:bg-[#7f2800] text-white rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : isEditMode ? "Update Image" : "Upload Image"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePopularChoice;
