import Loader from "@/components/UI/Loader";
import useProtectedRoute from "@/hooks/useProtectedRoute";
import DashboardLayout from "@/layouts/DashboardLayout";
import {
  useDeleteBlogMutation,
  useGetAllBlogQuery,
  useUpdateBlogMutation,
} from "@/redux/blog/blogApi";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

const jwt = require("jsonwebtoken");

const AllBlog = () => {
  const [blogCategory, setBlogCategory] = useState("English");
  const { data: allBlog } = useGetAllBlogQuery();

  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("access-token") : null;
  const decodedToken = jwt.decode(accessToken);

  // Protect Route
  useProtectedRoute(decodedToken?.role || "guest");

  const headers = {
    authorization: accessToken,
  };

  const blogUniqueSubjects = [];
  allBlog?.data?.map((blog) => {
    if (blogUniqueSubjects?.length > 0) {
      const isSubjectExist = blogUniqueSubjects?.find(
        (item) => item?.subject === blog?.subject
      );

      if (!isSubjectExist) {
        blogUniqueSubjects.push(blog);
      }
    } else {
      blogUniqueSubjects.push(blog);
    }
  });

  const filterByBlogSubject = allBlog?.data?.filter((blog) => {
    return blog?.subject === blogCategory;
  });

  const [
    deleteBlog,
    {
      isError: deleteBlogIsError,
      isSuccess: deleteBlogIs,
      error: deleteBlogError,
    },
  ] = useDeleteBlogMutation();

  const handleDeleteBlog = (blog) => {
    const isConfirm = window.confirm(
      `Do you want to delete: ${blog?.subject} ${blog?.serial}`
    );
    if (isConfirm) {
      deleteBlog({ id: blog?.id, headers });
    }
  };

  const [
    updateBlog,
    {
      success,
      isSuccess: updateBlogIsSuccess,
      isError: updateBlogIsError,
      error: updateBlogError,
    },
  ] = useUpdateBlogMutation();

  const handlePublish = (blog, value) => {
    const data = {
      isPublished: value,
    };
    updateBlog({ id: blog?.id, data, headers });
  };

  useEffect(() => {
    if (updateBlogIsError) {
      toast.error(`${error?.data?.message}` || "Blog Update Failed!");
    }

    if (updateBlogIsSuccess) {
      toast.success(success?.message || "Blog Updated Successfully!");
    }
  }, [
    updateBlogIsSuccess,
    updateBlogIsError,
    updateBlogError,
    success?.message,
  ]);

  return (
    <div>
      <div className="my-20 w-11/12 md:w-10/12 mx-auto">
        <h1 className="text-3xl font-semibold text-center my-8">Blogs</h1>
        {blogUniqueSubjects && blogUniqueSubjects.length > 0 ? (
          <div className="w-10/12 md:w-8/12 mx-auto flex flex-wrap justify-around gap-3">
            {blogUniqueSubjects?.map((blog, index) => (
              <div
                key={index}
                onClick={() => setBlogCategory(blog?.subject)}
                className={`relative mb-2 min-w-[96px] text-center hover:bg-green-500 px-2 py-1 rounded-md cursor-pointer hover:text-white font-semibold ${
                  blogCategory === blog?.subject
                    ? "bg-green-500"
                    : " bg-[#1d1836]"
                }`}
              >
                {blogCategory === blog?.subject && (
                  <div className="absolute top-full left-[45%] triangle_down border-l-[7px] border-r-[7px] border-t-[10px] border-t-green-500 border-transparent"></div>
                )}
                {blog?.subject}
              </div>
            ))}
          </div>
        ) : (
          <Loader />
        )}
        <div className="mt-10 flex flex-col gap-5">
          {filterByBlogSubject?.map((blog, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-[#1d1836] p-2 rounded-md"
            >
              <div>
                <h4 className="text-md font-semibold">
                  {blog?.subject} {blog?.serial}
                </h4>
                <p>Question: {blog?.questions?.length}</p>
                <p>Time: {blog?.timeLimit} min</p>
              </div>
              <div className="flex flex-col items-center justify-between gap-4">
                <div className="flex items-center justify-between gap-4">
                  <button
                    onClick={() => handleDeleteBlog(blog)}
                    className="text-2xl border-none  text-red-500 hover:text-red-600"
                  >
                    <MdDeleteOutline />
                  </button>
                  <Link
                    href={`/dashboard/blog/update/${blog?.id}`}
                    className="flex items-center"
                  >
                    <button className="text-lg border-none text-primary hover:text-blue-600">
                      <FaRegEdit />
                    </button>
                  </Link>
                </div>
                <Link
                  href={`/dashboard/blog-result/${blog?.id}`}
                  className="border-2 border-blue-500 rounded-md px-2 text-blue-500 hover:bg-blue-500 hover:text-white"
                >
                  Results
                </Link>
                {blog?.isPublished ? (
                  <button
                    onClick={() => handlePublish(blog, false)}
                    className="btn-xs border-2 border-blue-500 rounded-md px-2 text-blue-500 hover:bg-blue-500 hover:text-white"
                  >
                    Remove Publish
                  </button>
                ) : (
                  <button
                    onClick={() => handlePublish(blog, true)}
                    className="btn-xs border-2 border-blue-500 rounded-md px-2 text-blue-500 hover:bg-blue-500 hover:text-white"
                  >
                    Make Publish
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllBlog;

AllBlog.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
