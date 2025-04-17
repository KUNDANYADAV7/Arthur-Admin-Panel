import { useState } from 'react';
import { useMenus } from '../context/MenuContexts';
import config from '../config';

// Modal for showing product details
const ProductDetailModal = ({ open, onClose, product }) => {
  if (!product || !open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
        <h2 className="text-xl font-bold mb-1">{product.name}</h2>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <div className="relative w-full h-48 rounded-md overflow-hidden mb-4">
          <img
            src={`${config.apiUrl}/${product.image}`}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          {product.onSale && (
            <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded shadow">
              SALE
            </span>
          )}
        </div>

        <div className="mb-4">
          {product.onSale && product.originalPrice ? (
            <>
              <p className="text-gray-500 line-through text-sm">
                ${product.originalPrice.toFixed(2)}
              </p>
              <p className="text-xl font-bold text-red-600">${product.price.toFixed(2)}</p>
            </>
          ) : (
            <p className="text-xl font-bold text-sandwich-700">${product.price.toFixed(2)}</p>
          )}
        </div>
        <div className="mb-4 text-sm text-gray-700">
          <p><strong>Protein:</strong> {product.nutrition?.protein}</p>
          <p><strong>Carbs:</strong> {product.nutrition?.carbs}</p>
          <p><strong>Vitamins:</strong> {product.nutrition?.vitamins}</p>
          <p><strong>Healthy Fats:</strong> {product.nutrition?.healthyFats}</p>
        </div>
        <button
          onClick={onClose}
          className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};


// 🔄 Dynamic icon rendering based on dish name or category
const getCategoryIcon = (name = "") => {
  const lower = name.toLowerCase();

  if (lower === "sandwich") {
    return <span className="text-xl">🥪</span>; // Sandwich
  }

  if (lower.includes("signature sandwich")) {
    return <span className="text-xl">🍽️</span>; // Signature Sandwich
  }

  if (lower.includes("panini")) {
    return <span className="text-xl">🥙</span>; // Panini (pressed sandwich style)
  }

  if (lower.includes("burrito")) {
    return <span className="text-xl">🌯</span>; // Burrito
  }

  if (lower.includes("bowls")) {
    return <span className="text-xl">🥣</span>; // Bowls
  }

  if (lower.includes("wraps")) {
    return <span className="text-xl">🫔</span>; // Wraps (tamale-style wrap)
  }

  if (lower.includes("grab")) {
    return <span className="text-xl">👜</span>; // Grab & Go (shopping bag)
  }

  if (lower.includes("salad")) {
    return <span className="text-xl">🥗</span>; // Salad
  }

  if (lower.includes("milk shake")) {
    return <span className="text-xl">🥤</span>; // Milk Shake
  }

  if (lower.includes("ice cream")) {
    return <span className="text-xl">🍦</span>; // Ice Cream
  }

  // fallback icon
  return <span className="text-xl">🍽️</span>;
};


// Category box
const MenuCategory = ({ name, count }) => (
  <div className="flex flex-col items-center p-4 bg-gray-100 rounded-xl transition-all hover:bg-sandwich-100 cursor-pointer">
    <div className="w-12 h-12 bg-sandwich-200 rounded-full flex items-center justify-center mb-2">
      {getCategoryIcon(name)}
    </div>
    <h3 className="font-medium text-center">{name}</h3>
    <p className="text-sm text-gray-500">{count} items</p>
  </div>
);

// Menu item card
const MenuItem = ({ name, description, price, image, onSale }) => (
  <div className="flex flex-col sm:flex-row gap-4 p-4 border rounded-lg hover:shadow-md transition relative w-full">
    <div className="sm:w-24 sm:h-24 w-full h-32 flex-shrink-0 bg-gray-100 rounded overflow-hidden relative">
      <img src={image} alt={name} className="w-full h-full object-cover" />
      {onSale && (
        <div className="absolute top-1 left-1 bg-red-600 text-white text-xs px-2 py-1 rounded shadow-md">
          SALE
        </div>
      )}
    </div>

    <div className="flex-1">
      {/* Name & Price stacked on small screens */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
        <h3 className="font-medium text-sm sm:text-base break-words">{name}</h3>
        <span className="font-medium text-sandwich-700 text-sm sm:text-base">
          ${price.toFixed(2)}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-500 mt-1 break-words">{description}</p>
    </div>
  </div>
);




// Main Menu Component
const Menu = () => {
  const [activeTab, setActiveTab] = useState('all');
  const { menus } = useMenus();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleItemClick = (item) => {
    setSelectedProduct(item);
    setModalOpen(true);
  };

  const uniqueCategories = Array.from(
    new Set(menus.map((item) => item.category.toLowerCase()))
  );

  const categoryCountMap = menus.reduce((acc, item) => {
    const category = item.category.toLowerCase();
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  const menuCategories = Object.entries(categoryCountMap).map(([category, count]) => {
    let displayName = category.charAt(0).toUpperCase() + category.slice(1);
    if (displayName.includes('sandwich')) displayName = 'Sandwiches';
    else if (displayName.includes('salad')) displayName = 'Salads';
    else if (displayName.includes('drink')) displayName = 'Drinks';
    else if (displayName.includes('milk shake') || displayName.includes('ice cream') || displayName.includes('milkshake'))
      displayName = 'Desserts';
    return { name: displayName, count };
  });

  const filteredItems =
    activeTab === 'all'
      ? menus
      : menus.filter((item) => item.category.toLowerCase().includes(activeTab));

  return (
    <div className="space-y-6 px-4 md:px-8 py-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-sandwich-900">Menu</h1>
        <p className="text-gray-500 mt-2">Browse and explore our menu offerings</p>
      </div>

      {/* Menu Categories */}
<div className="bg-white border rounded-lg p-6 shadow">
  <h2 className="text-lg font-semibold mb-1">Menu Categories</h2>
  <p className="text-sm text-gray-500 mb-4">Explore our different menu categories</p>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {menuCategories.length > 0 ? (
      menuCategories.map((category, index) => (
        <div
          key={index}
          onClick={() => setActiveTab(category.name.toLowerCase())}
          className="cursor-pointer"
        >
          <MenuCategory name={category.name} count={category.count} />
        </div>
      ))
    ) : (
      <p className="col-span-full text-center py-4 text-gray-500">
        No menu categories available yet.
      </p>
    )}
  </div>
</div>


      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        <button
          className={`px-4 py-2 rounded ${
            activeTab === 'all'
              ? 'bg-sandwich-700 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          onClick={() => setActiveTab('all')}
        >
          All
        </button>
        {uniqueCategories.map((cat) => (
          <button
            key={cat}
            className={`px-4 py-2 rounded capitalize ${
              activeTab === cat
                ? 'bg-sandwich-700 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => setActiveTab(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Menu Items */}
      <div className="bg-white border rounded-lg p-6 shadow">
        <h2 className="text-lg font-semibold mb-1">Menu Items</h2>
        <p className="text-sm text-gray-500 mb-4">Browse all our available menu items</p>
        <div className="space-y-4">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div key={item._id} onClick={() => handleItemClick(item)} className="cursor-pointer">
                <MenuItem
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  image={`${config.apiUrl}/${item.image}`}
                  onSale={item.onSale}
                />
              </div>
            ))
          ) : (
            <p className="text-center py-8 text-gray-500">No items found in this category.</p>
          )}
        </div>
      </div>




      {/* Modal */}
      <ProductDetailModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        product={selectedProduct}
      />
    </div>
  );
};

export default Menu;
