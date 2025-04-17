import React, { useState } from 'react';
import { Plus, Edit, Trash, Eye } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useOffer } from '../../context/OfferContext';
import config from '../../config';

const AllOffers = () => {
  const navigate = useNavigate();
  const { myOffers, handleDelete, handleToggleStatus, loading } = useOffer();
  const [selectedOffer, setSelectedOffer] = useState(null);

  const sortedOffers = [...myOffers].sort(
    (a, b) => new Date(b.validUntil) - new Date(a.validUntil)
  );

  const handleToggle = async (offer) => {
    const updatedOffer = { ...offer, isActive: !offer.isActive };
    await handleToggleStatus(offer._id, updatedOffer);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-bold text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6 flex-col md:flex-row">
        <h1 className="text-3xl font-bold text-[#5a1c00] mt-4 md:mt-0">Special Offers</h1>
        <Link
          to="/offers/create"
          className="flex items-center space-x-2 px-4 py-2 bg-[#5a1c00] hover:bg-[#7f2800] text-white rounded  mt-4 md:mt-0"
        >
          <Plus className="h-5 w-5" />
          <span>Create New Offer</span>
        </Link>
      </div>

      {sortedOffers.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 bg-white rounded-lg shadow-md">
          <p className="text-lg font-semibold text-[#5a1c00]">No Offers Found</p>
          <p className="text-sm text-black mx-5 md:mx-0">
            Start adding special offers to attract more customers.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedOffers.map((offer) => (
            <div
              key={offer._id}
              className="bg-white shadow-lg rounded overflow-hidden flex flex-col"
            >
              {/* <img
                src={`${config.apiUrl}/${offer.photo}`} // Ensure offer has a `photo` field like blogs
                alt={offer.title}
                className="w-full h-48 object-cover"
              /> */}
              <div className="p-4 flex flex-col justify-between flex-1">
                <h2 className="text-xl font-semibold text-[#5a1c00]">
                  {offer.title}
                </h2>
                <p className="text-sm text-black mt-2">
                  {/* {offer.discount}% OFF */}
                  {offer.discount}% OFF
                </p>
                <p className="text-xs text-black mt-1">
                  <span className='text-[#5a1c00] font-bold'>Valid:</span> {new Date(offer.validFrom).toLocaleDateString()} -{' '}
                  {new Date(offer.validUntil).toLocaleDateString()}
                </p>
                {/* <p
                  onClick={() => handleToggle(offer)}
                  className={`text-xs font-medium mt-2 w-fit cursor-pointer px-2 py-1 rounded-full ${
                    offer.isActive
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {offer.isActive ? 'Active' : 'Inactive'}
                </p> */}

                <div className="flex justify-between items-center mt-4">
                  <button
                    // onClick={() => setSelectedOffer(offer)}
                    className="flex items-center text-indigo-600 hover:text-indigo-900"
                  >
                    {/* <Eye className="h-5 w-5 mr-1" />
                    View */}
                    <p
                  onClick={() => handleToggle(offer)}
                  className={`text-xs font-medium mt-0 w-fit cursor-pointer px-2 py-1 rounded-full ${
                    offer.isActive
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {offer.isActive ? 'Active' : 'Inactive'}
                </p>
                  </button>
                  <div className="flex gap-3">
                    <button onClick={() => navigate(`/offers/create/${offer._id}`)}>
                      <Edit className="text-[#5a1c00] hover:text-[#7f2800] h-5 w-5" />
                    </button>
                    <button onClick={() => handleDelete(offer._id)}>
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
      {/* {selectedOffer && (
        <div className="fixed inset-0 bg-black bg-opacity-0 z-50 flex justify-center items-center p-4">
          <div className="bg-white max-w-2xl w-full rounded-lg overflow-auto max-h-[90vh] shadow-xl relative">
            <button
              className="absolute top-2 right-3 text-2xl font-bold text-red-700 hover:text-red-900"
              onClick={() => setSelectedOffer(null)}
            >
              &times;
            </button>
            <img
              src={`${config.apiUrl}/${selectedOffer.photo}`}
              alt={selectedOffer.title}
              className="w-full h-64 object-cover rounded-t-lg"
            />
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2 text-[#5a1c00]">{selectedOffer.title}</h2>
              <p className="text-sm text-black mb-4">
                <span className='text-[#5a1c00] font-semibold'>Valid from:{' '}</span>
                {new Date(selectedOffer.validFrom).toLocaleDateString()} to{' '}
                {new Date(selectedOffer.validUntil).toLocaleDateString()}
              </p>
              <p className="text-black whitespace-pre-line">
              <span className='text-[#5a1c00] font-semibold'>Discount:</span> {selectedOffer.discount}% OFF
              </p>
              <p className="mt-2 text-sm text-gray-500">
              <span className='text-[#5a1c00] font-semibold'>Status:{' '}</span>
                <span
                  className={`font-semibold ${
                    selectedOffer.isActive ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {selectedOffer.isActive ? 'Active' : 'Inactive'}
                </span>
              </p>
            </div>
          </div>
        </div>
      )} */}

{selectedOffer && (
  <div className="fixed inset-0 bg-black bg-opacity-0 z-50 flex justify-center items-center p-4 overflow-y-auto">
    <div className="bg-white max-w-sm w-full rounded-lg shadow-xl relative max-h-[90vh] overflow-y-auto">
      <button
        className="absolute top-2 right-3 text-2xl font-bold text-red-700 hover:text-red-900"
        onClick={() => setSelectedOffer(null)}
      >
        &times;
      </button>

      {selectedOffer.photo && (
        <img
          src={`${config.apiUrl}/${selectedOffer.photo}`}
          alt={selectedOffer.title}
          className="w-full h-64 object-cover rounded-t-lg"
        />
      )}

      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2 text-[#5a1c00]">{selectedOffer.title}</h2>

        <p className="text-sm text-black mb-4">
          <span className='text-[#5a1c00] font-semibold'>Valid from: </span>
          {new Date(selectedOffer.validFrom).toLocaleDateString()} to{' '}
          {new Date(selectedOffer.validUntil).toLocaleDateString()}
        </p>

        <p className="text-black whitespace-pre-line">
          <span className='text-[#5a1c00] font-semibold'>Discount:</span> {selectedOffer.discount}% OFF
        </p>

        <p className="mt-2 text-sm text-gray-500">
          <span className='text-[#5a1c00] font-semibold'>Status: </span>
          <span
            className={`font-semibold ${
              selectedOffer.isActive ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {selectedOffer.isActive ? 'Active' : 'Inactive'}
          </span>
        </p>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default AllOffers;
