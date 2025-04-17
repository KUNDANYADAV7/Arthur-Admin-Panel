import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useBlog } from "@/context/BlogContext";
import config from "@/config";

const BlogDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const { getBlogById } = useBlog();
  const navigate = useNavigate();

  const [blog, setBlog] = useState<any>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (slug) {
      getBlogById(slug).then((data) => {
        if (data) setBlog(data);
        else setBlog(null);
      });
    }
  }, [slug]);

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fffbf2]">
        <p className="text-xl text-gray-600">Blog not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-[#fffbf2]">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-pesto-brown mb-4">{blog.title}</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">{new Date(blog.createdAt).toDateString()}</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <img
            src={`${config.apiUrl}/${blog.photo}`}
            alt={blog.title}
            className="w-full h-96 object-cover rounded-xl shadow-md mb-8"
          />
          <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
            {blog.about}
          </p>

          <div className="text-center mt-8">
            <button
              onClick={() => navigate('/blog')}
              className="bg-pesto-brown text-white px-6 py-2 rounded-lg text-lg hover:bg-pesto-dark transition"
            >
              Back to Blogs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
