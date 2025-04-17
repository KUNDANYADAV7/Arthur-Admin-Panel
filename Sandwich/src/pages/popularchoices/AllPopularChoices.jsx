import React from "react";
import { Edit, Trash2, Plus } from "lucide-react";
import { usePopularChoice } from "../../context/PopularChoiceContext";
import { Link } from "react-router-dom";
import config from "../../config";

const AllPopularChoices = () => {
  const { allPopularChoices, deletePopularChoice } = usePopularChoice();

  const sortedPopularChoices = [...allPopularChoices].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div className="max-w-6xl mx-auto p-0 md:p-6">
      <div className="flex justify-between items-center mb-6 flex-col md:flex-row">
        <h1 className="text-3xl font-bold text-[#5a1c00]">All Popular Choices</h1>
        <Link
          to="/popular/create"
          className="flex items-center space-x-2 px-4 py-2 bg-[#5a1c00] hover:bg-[#7f2800] text-white rounded mt-3"
        >
          <Plus className="h-5 w-5" />
          <span>Create New</span>
        </Link>
      </div>

      {sortedPopularChoices.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 bg-white rounded shadow-md">
          <p className="text-lg font-semibold text-gray-600">No Popular Choices Available</p>
          <p className="text-sm text-gray-500 mx-3 md:mx-0">
            Start adding popular choices to showcase your items.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedPopularChoices.map((choice) => (
            <div key={choice._id} className="relative group overflow-hidden rounded shadow-lg">
              <img
                src={`${config.apiUrl}/${choice.photo}`}
                alt="Popular Choice"
                className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex space-x-4">
                  <Link
                    to={`/popular/create/${choice._id}`}
                    className="text-white bg-[#5a1c00] hover:bg-[#7f2800] p-2 rounded-full transition"
                  >
                    <Edit className="w-5 h-5" />
                  </Link>
                  <button
                    onClick={() => deletePopularChoice(choice._id)}
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

export default AllPopularChoices;
