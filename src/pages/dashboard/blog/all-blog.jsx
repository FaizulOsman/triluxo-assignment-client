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
  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("access-token") : null;
  const decodedToken = jwt.decode(accessToken);

  // Protect Route
  useProtectedRoute(decodedToken?.role || "guest");

  const headers = {
    authorization: accessToken,
  };

  // Data Query
  const { data: allBlog } = useGetAllBlogQuery({ headers });
  const [
    deleteBlog,
    {
      isError: deleteBlogIsError,
      isSuccess: deleteBlogIs,
      error: deleteBlogError,
    },
  ] = useDeleteBlogMutation();

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
      toast.error(`${updateBlogError?.data?.message}` || "Blog Update Failed!");
    }

    if (updateBlogIsSuccess) {
      toast.success(success?.message || "Blog Updated Successfully!");
    }

    if (deleteBlogIsError) {
      toast.error(deleteBlogError?.data?.message || "You can not delete!");
    }
  }, [
    updateBlogIsSuccess,
    updateBlogIsError,
    updateBlogError,
    success?.message,
    deleteBlogIsError,
    deleteBlogError,
  ]);

  return (
    <div>
      <div className="my-10 w-11/12 md:w-10/12 mx-auto">
        <h1 className="text-3xl font-semibold text-center my-8">Blogs</h1>
        {allBlog?.data ? (
          <div className="mt-10 flex flex-col gap-5">
            {allBlog?.data?.map((blog, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-[#1d1836] p-2 rounded-md"
              >
                <div className="w-[70%] pr-2">
                  <p className="text-md">
                    <span className="font-semibold text-blue-500">Title:</span>{" "}
                    {blog?.title}
                  </p>
                  <p className="text-sm mt-2">
                    <span className="font-semibold text-blue-500">
                      Description:
                    </span>{" "}
                    {blog?.description.slice(0, 200)}
                  </p>
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
                  {blog?.isPublished ? (
                    <button
                      onClick={() => handlePublish(blog, false)}
                      className="w-full h-full btn-xs border-2 border-blue-500 rounded-md px-2 text-blue-500 hover:bg-blue-500 hover:text-white"
                    >
                      Remove Publish
                    </button>
                  ) : (
                    <button
                      onClick={() => handlePublish(blog, true)}
                      className="w-full h-full btn-xs border-2 border-blue-500 rounded-md px-2 text-blue-500 hover:bg-blue-500 hover:text-white"
                    >
                      Make Publish
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-10">
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
};

export default AllBlog;

AllBlog.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
