import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import config from "@/config";

interface BlogCardProps {
  _id: string;
  title: string;
  excerpt: string;
  photo: string;
  createdAt: string;
  slug: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ _id, title, excerpt, photo, createdAt, slug }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden transition hover:shadow-xl">
      <img src={`${config.apiUrl}/${photo}`} alt={title} className="w-full h-56 object-cover" />
      <div className="p-5">
        <h2 className="text-xl font-semibold text-pesto-brown">{title}</h2>
        <p className="text-sm text-gray-500 mt-1">{new Date(createdAt!).toDateString()}</p>
        <p className="text-gray-600 mt-3">{excerpt}</p>

        <Link
          to={`/blog/${slug}`}
          className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-pesto-brown rounded-full hover:bg-pesto-dark transition duration-300"
        >
          Read More
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
