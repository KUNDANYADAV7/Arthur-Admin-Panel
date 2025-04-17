import React, { useState, useEffect } from "react";
import { useMenuCategory } from "../../context/MenuCategoryContext";
import { ArrowLeft, Image as ImageIcon } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import config from "../../config";
import toast from "react-hot-toast";

const CreateCategory = () => {
  const { createCategory, updateCategory, getCategoryById, loading } = useMenuCategory();
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    price: "",  // Add price field here
    photo: null,
  });
  const [preview, setPreview] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (id) {
      setIsEditMode(true);
      const fetchCategory = async () => {
        const data = await getCategoryById(id);
        if (data) {
          setFormData({ title: data.title, price: data.price || "", photo: null });  // Handle price if it's available
          setPreview(`${config.apiUrl}/${data.photo}`);
        }
      };
      fetchCategory();
    }
  }, [id]);

  const handleChange = (e) => {
    if (e.target.type === "file") {
      const file = e.target.files[0];
      setFormData({ ...formData, photo: file });
      setPreview(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.photo && !isEditMode) {
      toast.error("Image field is required!");
      return;
    }

    const data = new FormData();
    data.append("title", formData.title);
    if (formData.price) data.append("price", formData.price);  // Append price if provided
    if (formData.photo) data.append("photo", formData.photo);

    let success = false;

    if (isEditMode) {
      success = await updateCategory(id, data);
    } else {
      success = await createCategory(data);
    }

    console.log("Success status:", success); // 🧐 Log success status

    if (success) {
      setFormData({ title: "", price: "", photo: null });
      setPreview(null);
      navigate("/all-category"); // ✅ Only navigate if success
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Link to="/all-category" className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-6">
        <ArrowLeft className="h-5 w-5" />
        <span>Back to Categories</span>
      </Link>

      <h1 className="text-3xl font-bold text-[#5a1c00] mb-8">
        {isEditMode ? "Edit Category" : "Create Category"}
      </h1>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <form className="p-6 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-[#5a1c00] mb-2">Category Name</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter category name"
              required
            />
          </div>

          {/* Price Field */}
          {/* <div>
            <label className="block text-sm font-medium text-[#5a1c00] mb-2">Price</label>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter category price for Ice Cream (optional)"
            />
          </div> */}

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-[#5a1c00] mb-2">Category Image</label>
            <div className="relative mt-1 border-2 hover:bg-gray-100 border-gray-300 border-dashed rounded-md overflow-hidden">
              <label htmlFor="category-file-upload" className="w-full h-full cursor-pointer flex flex-col items-center justify-center">
                {preview ? (
                  <>
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full h-40 object-cover m-0 p-0"
                    />
                    <div className="absolute bottom-2 right-2">
                      <span className="bg-[#5a1c00] hover:bg-[#7f2800] text-white px-3 py-2 rounded shadow text-sm">Change Image</span>
                    </div>
                  </>
                ) : (
                  <div className="space-y-1 text-center py-6 px-6">
                    <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    <p className="text-[#5a1c00] text-sm font-medium">Click to upload</p>
                  </div>
                )}
                <input
                  id="category-file-upload"
                  type="file"
                  name="photo"
                  className="sr-only"
                  onChange={handleChange}
                />
              </label>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button type="submit" className="px-4 py-2 bg-[#5a1c00] hover:bg-[#7f2800] text-white rounded  disabled:bg-gray-400 disabled:cursor-not-allowed" disabled={loading}>
              {loading ? "Processing..." : isEditMode ? "Update Category" : "Create Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCategory;
