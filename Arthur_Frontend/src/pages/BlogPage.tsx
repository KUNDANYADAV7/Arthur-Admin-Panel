import React, { useEffect } from "react";
import BlogCard from "@/components/BlogCard";
import { useBlog } from "@/context/BlogContext";

const BlogPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { allblogs, loading } = useBlog();

  console.log(allblogs)

  return (
    <div className="min-h-screen pt-24 pb-16 bg-[#fffbf2]">
    <div className="container mx-auto px-4">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-pesto-brown mb-4">Our Latest Blogs</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore our stories, tips, and insights straight from the kitchen!
        </p>
      </div>
  
      {loading ? (
        <p className="text-center text-gray-600">Loading blogs...</p>
      ) : allblogs.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {allblogs.map((blog) => (
            <BlogCard key={blog._id} {...(blog as any)} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 py-10">
          No blogs available at the moment. Check back soon!
        </p>
      )}
    </div>
  </div>
  
  );
};

export default BlogPage;
