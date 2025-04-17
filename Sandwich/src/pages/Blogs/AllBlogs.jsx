import React, { useState } from 'react';
import { Plus, Edit, Trash, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useBlog } from "../../context/BlogContext";
import config from '../../config';

const AllBlogs = () => {
  const { myblogs, handleDelete, loading } = useBlog();
  const [selectedBlog, setSelectedBlog] = useState(null);

  const sortedBlogs = [...myblogs].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-bold text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 mt-4 md:mt-0">
      <div className="flex justify-between items-center mb-6 flex-col md:flex-row">
        <h1 className="text-3xl font-bold text-[#5a1c00]">Blog Posts</h1>
        <Link
          to="/blogs/create"
          className="flex items-center space-x-2 px-4 py-2 bg-[#5a1c00] hover:bg-[#7f2800] text-white rounded mt-4 md:mt-0"
        >
          <Plus className="h-5 w-5" />
          <span>Create New Post</span>
        </Link>
      </div>

      {sortedBlogs.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 bg-white rounded-lg shadow-md">
          <p className="text-lg font-semibold text-[#5a1c00]">No Blogs Found</p>
          <p className="text-sm text-black mx-5 md:mx-0">
            Start creating blogs to manage and share your content.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedBlogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col"
            >
              <img
                src={`${config.apiUrl}/${blog.photo}`}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 flex flex-col justify-between flex-1">
                <h2 className="text-xl font-semibold text-[#5a1c00]">
                  {blog.title}
                </h2>
                <p className="text-sm text-gray-600 mt-2">
                  {blog.about.slice(0, 100)}...
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  {new Date(blog.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>

                <div className="flex justify-between items-center mt-4">
                  <button
                    onClick={() => setSelectedBlog(blog)}
                    className="flex items-center text-indigo-600 hover:text-indigo-900"
                  >
                    <Eye className="h-5 w-5 mr-1" />
                    View
                  </button>
                  <div className="flex gap-3">
                    <Link to={`/blogs/create/${blog._id}/${blog.slug}`}>
                      <Edit className="text-[#5a1c00] hover:text-[#7f2800] h-5 w-5" />
                    </Link>
                    <button onClick={() => handleDelete(blog._id)}>
                      <Trash className="text-red-600 hover:text-red-800 h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
{selectedBlog && (
  <div className="absolute top-0 left-0 w-full min-h-screen bg-black bg-opacity-0 z-50 flex justify-center p-4">
    <div className="bg-white max-w-2xl w-full rounded-lg shadow-xl relative mt-20 max-h-[70vh] overflow-y-auto">
      <button
        className="absolute top-2 right-3 float-right z-10 text-2xl font-bold text-[#5a1c00] hover:text-red-900"
        onClick={() => setSelectedBlog(null)}
      >
        &times;
      </button>
      <img
        src={`${config.apiUrl}/${selectedBlog.photo}`}
        alt={selectedBlog.title}
        className="w-full h-64 object-cover rounded-t-lg"
      />
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2 text-[#5a1c00]">{selectedBlog.title}</h2>
        <p className="text-sm text-gray-500 mb-4">
          {new Date(selectedBlog.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <p className="text-gray-700 whitespace-pre-line">{selectedBlog.about}</p>
      </div>
    </div>
  </div>
)}



    </div>
  );
};

export default AllBlogs;
