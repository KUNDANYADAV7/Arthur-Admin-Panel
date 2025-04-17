import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProductCard from "@/components/ProductCard";
import { useMenuCategory } from "@/context/MenuCategoryContext";
import { useMenus } from "@/context/MenuContexts";
import config from "@/config";

// Utility functions to handle slugs
const toSlug = (str: string) => str.toLowerCase().replace(/\s+/g, "-");
const fromSlug = (slug: string) => slug.replace(/-/g, " ");

const Menu: React.FC = () => {
  const { allCategories } = useMenuCategory();
  const { getMenusByCategory, menus, loading: menuLoading } = useMenus();
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  console.log(allCategories);

  const [sortOrder, setSortOrder] = useState("default");
  const [filteredMenus, setFilteredMenus] = useState([]);
  const categoryTabsRef = useRef<HTMLDivElement>(null);

  const selectedCategory = fromSlug(categoryId?.toLowerCase() || "all");

  // Fetch menus when category changes
  useEffect(() => {
    if (categoryId) {
      getMenusByCategory(fromSlug(categoryId));
    }
    window.scrollTo(0, 0);
  }, [categoryId]);

  // Filter menus based on categoryId
  useEffect(() => {
    if (!categoryId || categoryId.toLowerCase() === "all") {
      setFilteredMenus(menus);
    } else {
      const categoryName = fromSlug(categoryId.toLowerCase());
      const match = menus.filter(
        (menu) => menu.category?.toLowerCase() === categoryName
      );
      setFilteredMenus(match);
    }
  }, [menus, categoryId]);

  const handleCategoryChange = (newCategoryTitle: string) => {
    navigate(`/menu/${toSlug(newCategoryTitle)}`);
  };

  const scrollTabs = (direction: "left" | "right") => {
    if (categoryTabsRef.current) {
      const scrollAmount = 200;
      direction === "left"
        ? (categoryTabsRef.current.scrollLeft -= scrollAmount)
        : (categoryTabsRef.current.scrollLeft += scrollAmount);
    }
  };

  // Sort menus
  let sortedMenus = [...filteredMenus];
  switch (sortOrder) {
    case "price-low-high":
      sortedMenus.sort((a, b) => Number(a.price) - Number(b.price));
      break;
    case "price-high-low":
      sortedMenus.sort((a, b) => Number(b.price) - Number(a.price));
      break;
    case "name-a-z":
      sortedMenus.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "name-z-a":
      sortedMenus.sort((a, b) => b.name.localeCompare(a.name));
      break;
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-pesto-brown mb-4">Our Menu</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base">
            Explore our wide range of delicious options, prepared with the freshest ingredients and crafted with care.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="relative mb-12">
          <button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white shadow-md p-2 rounded-full z-10 text-pesto-brown hidden md:block"
            onClick={() => scrollTabs("left")}
          >
            <ChevronLeft size={20} />
          </button>

          <div
            ref={categoryTabsRef}
            className="flex overflow-x-auto scrollbar-none py-4 px-4 sm:px-6 space-x-4 snap-x"
          >
            {/* All Category */}
            <button
  onClick={() => navigate("/menu/all")}
  className={`snap-start flex flex-col items-center min-w-[80px] sm:min-w-[100px] transition-all duration-300 ${
    categoryId?.toLowerCase() === "all"
      ? "text-pesto-orange scale-110 font-semibold"
      : "text-pesto-brown hover:text-pesto-orange"
  }`}
>
  <div
    className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden mb-2 ${
      categoryId?.toLowerCase() === "all" ? "ring-2 ring-pesto-orange" : ""
    }`}
  >
    <img src="/all-menu.png" alt="All" className="w-full h-full object-cover" />
  </div>
  <span className="font-medium text-sm">All</span>
</button>


            {/* Other Categories */}
            {allCategories.map((category) => {
              const isActive =
                toSlug(category.title) === categoryId?.toLowerCase();
              return (
                <button
                  key={category._id}
                  onClick={() => handleCategoryChange(category.title)}
                  className={`snap-start flex flex-col items-center min-w-[80px] sm:min-w-[100px] transition-all duration-300 ${
                    isActive
                      ? "text-pesto-orange scale-110 font-semibold"
                      : "text-pesto-brown hover:text-pesto-orange"
                  }`}
                >
                  <div
                    className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden mb-2 ${
                      isActive ? "ring-2 ring-pesto-orange" : ""
                    }`}
                  >
                    <img
                      src={`${config.apiUrl}/${category.photo}`}
                      alt={category.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="font-medium text-sm">{category.title}</span>
                </button>
              );
            })}
          </div>

          <button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white shadow-md p-2 rounded-full z-10 text-pesto-brown hidden md:block"
            onClick={() => scrollTabs("right")}
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Header and Sort */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <h2 className="text-2xl font-bold text-pesto-brown capitalize">
            {selectedCategory}
            <span className="text-muted-foreground text-lg font-normal ml-2">
              ({sortedMenus.length} items)
            </span>
          </h2>
          <Select onValueChange={setSortOrder} defaultValue="default">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="price-low-high">Price: Low to High</SelectItem>
              <SelectItem value="price-high-low">Price: High to Low</SelectItem>
              <SelectItem value="name-a-z">Name: A to Z</SelectItem>
              <SelectItem value="name-z-a">Name: Z to A</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Conditional Notes */}
        {selectedCategory === "salad" && sortedMenus.length > 0 && (
          <p className="text-green-500 text-xl text-center mb-4">
            Build your own | Extra for protein
          </p>
        )}
        
        {selectedCategory === "ice cream" && sortedMenus.length > 0 && (
          <p className="text-green-500 text-xl text-center mb-10">
            $1.99 for 1 Scoop | $3.99 for 3 Scoop
          </p>
        )}



        {/* {selectedCategory.toLowerCase() === "ice cream" && sortedMenus.length > 0 && (
  <>
    {allCategories
      .filter(
        (item) => item.title && item.title.toLowerCase() === "ice cream"
      )
      .slice(0, 1)
      .map((item) => (
        <p key={item._id} className="text-green-500 text-xl text-center mb-10">
          {item?.price}
        </p>
      ))}
  </>
)} */}





        {/* Product Cards */}
        {menuLoading ? (
          <p className="text-center text-muted-foreground">Loading...</p>
        ) : sortedMenus.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedMenus.map((item) => (
              <ProductCard key={item._id} product={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">
              No categories available for this selection.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
