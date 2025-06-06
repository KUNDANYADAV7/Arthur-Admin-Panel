import React from "react";
import { Edit, Trash2, Plus } from "lucide-react";
import { useMenuCategory } from "../../context/MenuCategoryContext";
import { Link } from "react-router-dom";
import config from "../../config";

const AllCategory = () => {
  const { myCategories,allCategories, deleteCategory } = useMenuCategory();

  // Sort categories by latest first
  const sortedCategories = [...myCategories].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div className="max-w-6xl mx-auto p-0 md:p-6">
      <div className="flex justify-between items-center mb-6 flex-col md:flex-row">
        <h1 className="text-3xl font-bold text-[#5a1c00]">All Menu Categories</h1>
        <div className="flex justify-between items-center">
          <Link
            to="/create-category"
            className="flex items-center space-x-2 px-4 py-2 bg-[#5a1c00] hover:bg-[#7f2800] text-white rounded mt-3"
          >
            <Plus className="h-5 w-5" />
            <span>Create New Category</span>
          </Link>
        </div>
      </div>

      {sortedCategories.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 bg-white rounded shadow-md">
          <p className="text-lg font-semibold text-gray-600">No Categories Available</p>
          <p className="text-sm text-gray-500 mx-3 md:mx-0">
            Start adding categories to organize your menu.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedCategories.map((category) => (
            <div
              key={category._id}
              className="relative group overflow-hidden rounded-lg shadow-lg"
            >
              <img
                src={`${config.apiUrl}/${category.photo}`}
                alt={category.title}
                className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white text-center py-2">
                <h2 className="text-lg font-semibold px-2">{category.title}</h2>
              </div>
              <div className="absolute inset-0 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex space-x-4">
                  <Link
                    to={`/create-category/${category._id}`}
                    className="text-white bg-[#5a1c00] hover:bg-[#7f2800] p-2 rounded-full  transition"
                  >
                    <Edit className="w-5 h-5" />
                  </Link>
                  <button
                    onClick={() => deleteCategory(category._id)}
                    className="text-white bg-red-500 p-2 rounded-full hover:bg-red-600 transition"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllCategory;
