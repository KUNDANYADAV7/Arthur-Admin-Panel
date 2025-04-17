import React, { useState, useEffect } from "react";
import { useOffer } from "../../context/OfferContext";
import { ArrowLeft, Image as ImageIcon } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import config from "../../config";

const CreateOffer = () => {
  const { createOffer, updateOffer, getOfferById } = useOffer();
  const { id } = useParams();
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [preview, setPreview] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [previewUpdated, setPreviewUpdated] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    discount: "",
    validFrom: "",
    validUntil: "",
    photo: null,
    active: true,
  });

  useEffect(() => {
    if (id) {
      setIsEditMode(true);
      const fetchOffer = async () => {
        const offerData = await getOfferById(id);
        if (offerData && !previewUpdated) {
          setFormData({
            title: offerData.title,
            description: offerData.description,
            discount: offerData.discount,
            validFrom: offerData.validFrom
              ? new Date(offerData.validFrom).toISOString().split("T")[0]
              : "",
            validUntil: offerData.validUntil
              ? new Date(offerData.validUntil).toISOString().split("T")[0]
              : "",
            photo: null,
            active: offerData.active,
          });
          setPreview(`${config.apiUrl}/${offerData.photo}`);
        }
      };
      fetchOffer();
    }
  }, [id]);

  const handleChange = (e) => {
    if (e.target.type === "file") {
      const file = e.target.files[0];
      setFormData({ ...formData, photo: file });
      setPreview(URL.createObjectURL(file));
    } else if (e.target.type === "checkbox") {
      setFormData({ ...formData, active: e.target.checked });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("discount", formData.discount);
    data.append("validFrom", formData.validFrom);
    data.append("validUntil", formData.validUntil);
    data.append("active", formData.active);

    if (formData.photo) {
      data.append("offerImage", formData.photo);
    }

    if (isEditMode) {
      await updateOffer(id, data);
    } else {
      await createOffer(data);
    }

    setIsSubmitting(false);

    setFormData({
      title: "",
      description: "",
      discount: "",
      validFrom: "",
      validUntil: "",
      photo: null,
      active: true,
    });
    setPreview(null);
    navigate("/offers");
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Link to="/offers" className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-6 mt-8 md:mt-0">
        <ArrowLeft className="h-5 w-5" />
        <span>Back to Offers</span>
      </Link>

      <h1 className="text-3xl font-bold text-[#5a1c00] mb-8">
        {isEditMode ? "Edit Offer" : "Create Special Offer"}
      </h1>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <form className="p-6 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-[#5a1c00] mb-2">Offer Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter offer title"
              onChange={handleChange}
              required
            />
          </div>

          {/* <div>
            <label className="block text-sm font-medium text-[#5a1c00] mb-2">Offer Image (optional)</label>
            <div className="relative mt-1 border-2 hover:bg-gray-100 border-gray-300 border-dashed rounded-md overflow-hidden">
              <label htmlFor="offer-file-upload" className="w-full h-full cursor-pointer flex flex-col items-center justify-center">
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
                  id="offer-file-upload"
                  type="file"
                  name="offerImage"
                  className="sr-only"
                  onChange={handleChange}
                />
              </label>
            </div>
          </div> */}

          <div>
            <label className="block text-sm font-medium text-[#5a1c00] mb-2">Discount Percentage</label>
            <input
              type="number"
              name="discount"
              value={formData.discount}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter discount percentage"
              onChange={handleChange}
              // onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '')}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-[#5a1c00] mb-2">Valid From</label>
              <input
                type="date"
                name="validFrom"
                value={formData.validFrom}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#5a1c00] mb-2">Valid Until</label>
              <input
                type="date"
                name="validUntil"
                value={formData.validUntil}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-[#5a1c00] hover:bg-[#7f2800] text-white rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : isEditMode ? "Update Offer" : "Create Offer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateOffer;
