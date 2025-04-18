import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit, MoreVertical, Search, Trash2, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useMenus } from '../context/MenuContexts';
import config from '../config';
import { useMenuCategory } from '../context/MenuCategoryContext';

const AllMenu = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { menus, deleteMenu, fetchMenus } = useMenus();
  const { myCategories }  = useMenuCategory();

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [saleFilter, setSaleFilter] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
const [selectedItem, setSelectedItem] = useState(null);

const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });


useEffect(()=>{
  fetchMenus();
},[])



  const filteredItems = menus.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter ? item.category === categoryFilter : true;
    const matchesSale = saleFilter === 'on-sale' ? item.onSale :
      saleFilter === 'not-on-sale' ? !item.onSale : true;

    return matchesSearch && matchesCategory && matchesSale;
  });

  const handleDeleteItem = (id) => {
    const itemName = menus.find(item => item._id === id)?.name;
    deleteMenu(id);
    toast({
      title: 'Item deleted',
      description: `${itemName} has been removed from the menu`,
    });
  };

  const handleEditItem = (id) => {
    navigate(`/edit-menu/${id}`);
  };

  const uniqueCategories = Array.from(new Set(menus.map(item => item.category)));

  return (
    <div className="space-y-6 p-0 md:p-4">

{/* {isModalOpen && selectedItem && (
  // <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-0 p-4">
  <div className="fixed inset-0 z-50 flex justify-center bg-black bg-opacity-0 p-4 items-start overflow-y-auto"> */}
{isModalOpen && selectedItem && (
  <div
    className="absolute z-50 bg-white rounded-lg max-w-3xl w-full shadow-lg"
    style={{
      top: modalPosition.top  - 200,
      // left: modalPosition.left,
      position: 'absolute',
      maxHeight: '90vh',
    }}
  >
    {/* Rest of your modal content */}

    <div className="bg-white rounded-lg max-w-3xl w-full shadow-lg relative max-h-[90vh]">
      {/* Close Button */}
      <button
        onClick={() => setIsModalOpen(false)}
        className="absolute top-2 right-2 z-10 p-2 text-[#5a1c00] hover:text-gray-900 text-xl"
      >
        ✕
      </button>

      {/* Scrollable Content */}
      <div className="overflow-y-auto max-h-[90vh]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
          {/* Left Side: Image and Sale Badge */}
          <div className="relative">
            <img
              src={`${config.apiUrl}/${selectedItem.image}`}
              alt={selectedItem.name}
              className="w-full h-60 object-cover rounded-md"
            />
            {selectedItem.onSale && (
              <span className="absolute top-4 left-4 bg-red-500 text-white text-xs px-2 py-1 rounded shadow">
                On Sale
              </span>
            )}
          </div>

          {/* Right Side: Details */}
          <div>
            <h2 className="text-2xl font-bold text-[#5a1c00] mb-2">{selectedItem.name}</h2>
            <p className="text-sm text-gray-600 mb-1">
              <strong className='text-[#5a1c00]'>Category:</strong> {selectedItem.category}
            </p>
            {selectedItem.subCategory && (
              <p className="text-sm text-gray-600 mb-1">
                <strong>Sub-Category:</strong> {selectedItem.subCategory}
              </p>
            )}
            <p className="text-gray-700 mt-2 text-sm leading-relaxed mb-2">
              <p className='text-[#5a1c00] font-semibold'>About This Dish</p>
              {selectedItem.description}
            </p>

            {selectedItem.onSale && selectedItem.originalPrice && <p className="text-gray-700 mt-2 text-sm leading-relaxed mb-2">
              <p className='text-[#5a1c00] font-semibold'>Sale Description</p>
              {selectedItem.saleDescription}
            </p>}

            {/* Pricing */}
            <div className="mt-2">
  {selectedItem.onSale && selectedItem.originalPrice ? (
    <span className="text-sm font-semibold">
      <span className="text-gray-500 line-through mr-2">
        ${selectedItem.originalPrice.toFixed(2)}
      </span>
      <span className="text-xl font-bold text-green-600 mr-2">
        ${selectedItem.price.toFixed(2)}
      </span>
      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
        Save ${ (selectedItem.originalPrice - selectedItem.price).toFixed(2) }
      </span>
    </span>
  ) : (
    <span className="text-xl font-bold text-blue-600">
      ${selectedItem.price.toFixed(2)}
    </span>
  )}
</div>


            {/* Action Buttons */}
            <div className="mt-4">
              <button
                onClick={() => {
                  handleEditItem(selectedItem._id);
                  setIsModalOpen(false);
                }}
                className="bg-[#5a1c00] hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  handleDeleteItem(selectedItem._id);
                  setIsModalOpen(false);
                }}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)}



      <div>
        <h1 className="text-3xl font-bold tracking-tight text-[#5a1c00] mt-8 md:mt-0">Menu Items</h1>
        <p className="text-black mt-2">View and manage all menu items across all categories</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search menu items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border pl-10 pr-4 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border p-2 rounded-md w-full md:w-44 text-sm"
          >
            <option value="">All Categories</option>
            {/* {uniqueCategories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))} */}
            {myCategories.map((cat) => (
              <option key={cat._id} value={cat.title}>{cat.title}</option>
            ))}
          </select>
          <select
            value={saleFilter}
            onChange={(e) => setSaleFilter(e.target.value)}
            className="border p-2 rounded-md w-full md:w-44 text-sm"
          >
            <option value="">All Items</option>
            <option value="on-sale">On Sale</option>
            <option value="not-on-sale">Not On Sale</option>
          </select>
          <button
            onClick={() => navigate('/create-menu')}
            className="bg-[#5a1c00] hover:bg-[#7f2800] text-white px-4 py-2 rounded text-sm"
          >
            Add New Item
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="border-b p-4">
          <h2 className="text-xl text-[#5a1c00] font-semibold">Menu Items</h2>
          <p className="text-gray-500 text-sm">
            Showing {filteredItems.length} of {menus.length} total items
          </p>
          <button
                onClick={() => {
                  setSearchTerm('');
                  setCategoryFilter('');
                  setSaleFilter('');
                }}
                className="mt-2 text-blue-600 hover:underline text-sm"
              >
                Clear filters
              </button>
        </div>
        <div className="p-1 md:p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div key={item._id} className="bg-gray-50 border rounded-lg shadow-sm">
                <div className="relative h-48">
                  <img src={`${config.apiUrl}/${item.image}`} alt={item.name} className="w-full h-full object-cover" />
                  {item.onSale && (
                    <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                      On Sale
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg text-[#5a1c00] font-semibold truncate max-w-[150px] md:max-w-[200px]">{item.name}</h3>
                      <p className="text-xs text-gray-500">{item.category} • {item.subCategory}</p>
                    </div>
                    <div className="relative">
                      <button
                        onClick={() =>
                          setDropdownOpen(dropdownOpen === item._id ? null : item._id)
                        }
                        className="p-1 rounded hover:bg-gray-100"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                      {dropdownOpen === item._id && (
                        <div className="absolute right-0 mt-2 w-32 bg-white border rounded-md shadow z-10">
                          {/* <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 flex items-center"   onClick={() => {
    setSelectedItem(item);
    setIsModalOpen(true);
    setDropdownOpen(null);
  }}>
                            <Eye className="h-4 w-4 mr-2" /> View
                          </button> */}

<button
  className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 flex items-center"
  onClick={(e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setModalPosition({ top: rect.top + window.scrollY, left: rect.left });
    setSelectedItem(item);
    setIsModalOpen(true);
    setDropdownOpen(null);
  }}
>
  <Eye className="w-4 h-4 mr-2" />
  View
</button>

                          <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 flex items-center" onClick={() => handleEditItem(item._id)}>
                            <Edit className="h-4 w-4 mr-2" /> Edit
                          </button>
                          <button className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center" onClick={() => handleDeleteItem(item._id)}>
                            <Trash2 className="h-4 w-4 mr-2" /> Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2 mb-3 line-clamp-2">{item.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-800">
                      {/* ${item.price.toFixed(2)} */}
                      ${
  !isNaN(Number(item.price)) ? (
    Number(item.price).toFixed(2)
  ) : (
    item.price // "Free", "Custom Quote", etc.
  )
}
                    </span>
                    <button
                      onClick={() => handleEditItem(item._id)}
                      className="text-sm border border-gray-300 px-3 py-1 rounded bg-[#5a1c00] hover:bg-[#7f2800] text-white flex items-center"
                    >
                      <Edit className="h-4 w-4 mr-1" /> Edit
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center py-10">
              <p className="text-[#5a1c00]">No menu items found.</p>
              <p>Start adding menu to attract more customers.</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setCategoryFilter('');
                  setSaleFilter('');
                }}
                className="mt-2 text-blue-600 hover:underline text-sm"
              >
                {/* Clear filters */}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>


  );
};

export default AllMenu;
