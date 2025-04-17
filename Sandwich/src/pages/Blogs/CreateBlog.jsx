import React, { useState, useEffect } from "react";
import { useBlog } from "../../context/BlogContext";
import { ArrowLeft, Image as ImageIcon } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import config from "../../config";
import toast from "react-hot-toast";

const CreateBlog = () => {
  const { createBlog, updateBlog, getBlogById, loading } = useBlog();
  const { id, slug } = useParams();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    photo: null,
    category: "",
    about: "",
  });

  const [preview, setPreview] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [previewUpdated, setPreviewUpdated] = useState(false); // ✅ new state

  // Fetch blog data if editing
  useEffect(() => {
    if (slug) {
      setIsEditMode(true);
      const fetchBlog = async () => {
        const blogData = await getBlogById(slug);
        if (blogData && !previewUpdated) {
          setFormData({
            title: blogData.title,
            category: blogData.category,
            about: blogData.about,
            photo: null,
          });
          setPreview(`${config.apiUrl}/${blogData.photo}`);
        }
      };
      fetchBlog();
    }
  }, [slug]); // ✅ only depends on slug

  const handleChange = (e) => {
    if (e.target.type === "file") {
      const file = e.target.files[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setPreview(imageUrl);
        setFormData({ ...formData, photo: file });
        setPreviewUpdated(true); // ✅ user manually updated image
      }
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
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
    data.append("title", formData.title);
    data.append("category", formData.category);
    data.append("about", formData.about);
    if (formData.photo) {
      data.append("blogImage", formData.photo);
    }

    try {
      if (isEditMode) {
        await updateBlog(id, data);
      } else {
        await createBlog(data);
      }
      setFormData({ title: "", photo: null, category: "", about: "" });
      setPreview(null);
      setPreviewUpdated(false);
      navigate("/blogs");
    } catch (error) {
      // toast.error("Error processing your request!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Link to="/blogs" className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-6 mt-8 md:mt-0">
        <ArrowLeft className="h-5 w-5" />
        <span>Back to Blogs</span>
      </Link>

      <h1 className="text-3xl font-bold text-[#5a1c00] mb-8">
        {isEditMode ? "Edit Blog Post" : "Create Blog Post"}
      </h1>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <form className="p-6 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-[#5a1c00] mb-2">Blog Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter blog title"
              onChange={handleChange}
              required
            />
          </div>

<div>
  <label className="block text-sm font-medium text-[#5a1c00] mb-2">Blog Image</label>
  <div className="relative mt-1 border-2 hover:bg-gray-100 border-gray-300 border-dashed rounded-md overflow-hidden">
    <label htmlFor="file-upload" className="w-full h-full cursor-pointer flex flex-col items-center justify-center">
      {preview ? (
        <>
          <img
            src={preview}
            alt="Preview"
            className="w-full h-40 object-cover m-0 p-0" // fixed and reduced height
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
        id="file-upload"
        type="file"
        name="photo"
        className="sr-only"
        onChange={handleChange}
      />
    </label>
  </div>
</div>



          <div>
            <label className="block text-sm font-medium text-[#5a1c00] mb-2">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter category"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#5a1c00] mb-2">Content</label>
            <textarea
              name="about"
              value={formData.about}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Write your blog content..."
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="submit"
              className="px-4 py-2 bg-[#5a1c00] hover:bg-[#7f2800] text-white rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : isEditMode ? "Update Post" : "Publish Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
