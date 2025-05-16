import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ImageUpload } from './ImageUpload';
import { useMenus } from '../../context/MenuContexts';
import config from '../../config';
import { useMenuCategory } from '../../context/MenuCategoryContext';

//new

const menuCategories = [
  { value: 'sandwich', label: 'Sandwich' },
  { value: 'signature-sandwich', label: 'Signature Sandwich' },
  { value: 'panini', label: 'Panini' },
  { value: 'burrito', label: 'Burrito' },
  { value: 'bowls', label: 'Bowls' },
  { value: 'wraps', label: 'Wraps' },
  { value: 'grab-go', label: 'Grab & Go' },
  { value: 'salad', label: 'Salad' },
  { value: 'milkshake', label: 'Milk Shake' },
  { value: 'ice-cream', label: 'Ice Cream' },
];

const getInitialFormState = (initialMenuItem, isEditing) => {
  if (isEditing && initialMenuItem) {
    return {
      name: initialMenuItem.name || '',
      // category: menuCategories.find(cat => cat.label === initialMenuItem.category)?.value || '',
      category: initialMenuItem.category || '',
      description: initialMenuItem.description || '',
      price: initialMenuItem.price?.toString() || '',
      originalPrice: initialMenuItem.originalPrice?.toString() || '',
      saleDescription: initialMenuItem.saleDescription || '',
      onSale: initialMenuItem.onSale || false,
      image: null,
    };
  }
  return {
    name: '',
    category: '',
    description: '',
    price: '',
    originalPrice: '',
    saleDescription: '',
    onSale: false,
    image: null,
  };
};

const MenuForm = ({ initialMenuItem, isEditing = false }) => {
  const { myCategories } = useMenuCategory();
  const navigate = useNavigate();
  const { createMenu, updateMenu } = useMenus();

  const [formData, setFormData] = useState(() =>
    getInitialFormState(initialMenuItem, isEditing)
  );
  const [imagePreview, setImagePreview] = useState(initialMenuItem?.image ? `${config.apiUrl}/${initialMenuItem.image}` : '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = ({ target: { name, value } }) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = value => {
    setFormData(prev => ({ ...prev, category: value }));
  };

  const handleImageChange = e => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const clearImagePreview = () => {
    setFormData(prev => ({ ...prev, image: null }));
    setImagePreview('');
  };

  const resetForm = () => {
    setFormData(getInitialFormState(initialMenuItem, isEditing));
    setImagePreview(initialMenuItem?.image || '');
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const requiredFields = ['name', 'category', 'price'];
    const isFieldMissing = requiredFields.some(field => !formData[field] || formData[field].toString().trim() === '');
    
    // Image should only be required when not editing or when no previous image exists and no new image is selected
    const isImageMissing = !isEditing && !formData.image;
    
    const isOriginalPriceMissing = formData.onSale && (!formData.originalPrice || formData.originalPrice.toString().trim() === '');
    // const isSaleDescMissing = formData.onSale && (!formData.saleDescription || formData.saleDescription.trim() === '');
    
    if (isFieldMissing || isImageMissing || isOriginalPriceMissing) {
      toast.error(
        isOriginalPriceMissing
          ? 'Please fill in the original price since the item is on sale.'
          : isImageMissing
          ? 'Please upload an image.'
          : 'Please fill in all required fields.'
      );
      return;
    }
    

    setIsSubmitting(true);

    const formPayload = new FormData();
    formPayload.append('name', formData.name);
    formPayload.append('category', menuCategories.find(cat => cat.value === formData.category)?.label || formData.category);
    formPayload.append('description', formData.description);
    formPayload.append('price', parseFloat(formData.price));
    formPayload.append('onSale', formData.onSale);
    formPayload.append('originalPrice', formData.originalPrice ? parseFloat(formData.originalPrice) : '');
    formPayload.append('saleDescription', formData.saleDescription || '');
    formPayload.append('menuImage', formData.image || '/placeholder.svg');

    try {
      if (isEditing && initialMenuItem) {
        await updateMenu(initialMenuItem._id, formPayload);
      } else {
        await createMenu(formPayload);
      }

      setIsSubmitting(false);
      setTimeout(() => navigate('/all-menu'), 500);
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while submitting the form.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-[#5a1c00]">
            {isEditing ? 'Update Menu Information' : 'Menu Information'}
          </h2>
          <p className="text-sm text-gray-500">
            {isEditing ? 'Update the details' : 'Enter the details for your new menu item'}
          </p>
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-[#5a1c00] mb-1">
            Select Menu
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={(e) => handleSelectChange(e.target.value)}
            className="block w-full rounded border border-[#5a1c00] bg-white py-2.5 px-3 shadow-sm text-sm"
          >
            <option value="">Select menu category</option>
{myCategories.map((category) => (
              <option key={category._id} value={category.title}>
                {category.title}
              </option>
            ))}
          </select>
        </div>

        <input
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Item Name"
          className="w-full px-4 py-2 border rounded border-[#5a1c00]"
        />
        <input
          name="price"
          type="number"
          value={formData.price}
          onChange={handleInputChange}
          placeholder={formData.onSale ? 'Discounted Price' : 'Price'}
          className="w-full px-4 py-2 border rounded border-[#5a1c00]"
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Description"
          className="w-full px-4 py-2 border rounded border-[#5a1c00]"
        />

        <div className="flex items-center gap-3">
          <label htmlFor="onSale" className="text-sm text-[#5a1c00]">
            On Sale
          </label>
          <button
            onClick={(e) => {
              e.preventDefault();
              setFormData((prev) => ({ ...prev, onSale: !prev.onSale }));
            }}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
              formData.onSale ? 'bg-green-500' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                formData.onSale ? 'translate-x-5' : 'translate-x-1'
              }`}
            />
          </button>
        </div>


        {formData.onSale && (
          <>
            <input
              name="originalPrice"
              type="number"
              value={formData.originalPrice}
              onChange={handleInputChange}
              placeholder="Original Price"
              className="w-full px-4 py-2 border rounded border-[#5a1c00]"
            />
            <textarea
              name="saleDescription"
              value={formData.saleDescription}
              onChange={handleInputChange}
              placeholder="Sale Description"
              className="w-full px-4 py-2 border rounded border-[#5a1c00]"
            />
          </>
        )}

        <ImageUpload
          imagePreview={imagePreview}
          onImageChange={handleImageChange}
          onImageClear={clearImagePreview}
        />

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`inline-flex items-center px-4 py-2 text-white rounded ${
              isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#5a1c00] hover:bg-[#7f2800]'
            }`}
          >
            {isSubmitting ? 'Submitting...' : isEditing ? 'Update Item' : 'Create Item'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MenuForm;
