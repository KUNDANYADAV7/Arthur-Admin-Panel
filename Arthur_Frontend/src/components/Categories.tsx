import React from "react";
import { Link } from "react-router-dom";
import { useMenuCategory } from "@/context/MenuCategoryContext";
import config from "@/config";
import { useMenus } from "@/context/MenuContexts";
const toSlug = (str: string) => str.toLowerCase().replace(/\s+/g, "-");

const Categories: React.FC = () => {
  const { allCategories } = useMenuCategory();
  const { menus } = useMenus();

  console.log(menus);

  return (
    <section className="py-16 bg-pesto-cream/50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-pesto-brown">
          Arthur&apos;s Featured Menu
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* "All" card first */}
          <Link
            to="/menu/all"
             className="category-card"
          >
            <div className="relative">
              <img
                src="/all-menu.png"
                alt="All"
                className="category-image"
              />
            </div>
            <div className="mt-4 text-center">
              <h3 className="font-bold text-pesto-brown text-lg">All</h3>
              <p className="text-sm text-gray-600">
  {
    menus.length
  }{" "}
  items
</p>
            </div>
          </Link>

          {/* Dynamic categories */}
          {allCategories?.map((category) => (
            <Link
              key={category._id}
              to={`/menu/${toSlug(category.title)}`}
               className="category-card"
            >
              <div className="relative">
                <img
                  src={`${config.apiUrl}/${category.photo}`}
                  alt={category.title}
                  className="category-image"
                />
              </div>
              <div className="mt-4 text-center">
              <h3 className="font-bold text-pesto-brown text-lg">
  {category?.title}
</h3>
<p className="text-sm text-gray-600">
  {
    menus?.filter((menu) =>
      menu.category.toLowerCase() === category.title.toLowerCase()
    ).length
  }{" "}
  items
</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;

