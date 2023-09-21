import { useGetAllBlogQuery } from "@/redux/blog/blogApi";
import Image from "next/image";
import React from "react";

const Blog = () => {
  const { data: getAllBlog } = useGetAllBlogQuery();
  console.log(getAllBlog?.data);
  return (
    <div>
      <div>
        <h1 className="text-green-500 text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8">
          Blogs
        </h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {getAllBlog?.data?.map((blog, index) => (
          <div key={index} className="card w-full bg-base-100 shadow-xl">
            <figure>
              <Image
                src={blog?.imageUrl}
                className="w-full h-[200px]"
                width={300}
                height={300}
                alt="Shoes"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title text-green-500">{blog?.title}</h2>
              <p>{blog?.description.slice(1, 100)}...</p>
              <div className="card-actions justify-end">
                <div className="badge badge-primary btn-xs px-4 cursor-pointer">
                  Details
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
