import useProtectedRoute from "@/hooks/useProtectedRoute";
import DashboardLayout from "@/layouts/DashboardLayout";
import { useCreateBlogMutation } from "@/redux/blog/blogApi";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const jwt = require("jsonwebtoken");

const CreateBlog = () => {
  const [createBlog, { data, isError, isLoading, isSuccess, error, status }] =
    useCreateBlogMutation();

  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("access-token") : null;
  const decodedToken = jwt.decode(accessToken);

  // Protect Route
  useProtectedRoute(decodedToken?.role || "guest");

  const headers = {
    authorization: accessToken,
  };

  const handleCreateBlog = (e) => {
    e.preventDefault();
    const data = {
      imageUrl: e.target.imageUrl.value,
      videoUrl: e.target.videoUrl.value,
      title: e.target.title.value,
      description: e.target.description.value,
    };

    createBlog({ data, headers });
    e.target.imageUrl.value = "";
    e.target.videoUrl.value = "";
    e.target.title.value = "";
    e.target.description.value = "";
  };

  useEffect(() => {
    if (isError) {
      toast.error(`${error?.data?.message}` || "Blog Creation Failed!");
    }

    if (isSuccess) {
      toast.success("Blog Created Successfully!");
    }
  }, [isLoading, isSuccess, isError, error]);

  return (
    <div className="my-5">
      <div className="w-11/12 md:w-10/12 lg:w-8/12 mx-auto mt-5 border rounded-lg border-blue-500 p-5">
        <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-center mb-5">
          Create A Blog
        </h3>
        <form
          onSubmit={(e) => handleCreateBlog(e)}
          className="grid grid-cols-1 md:grid-cols-2 justify-between gap-4 mt-4"
        >
          <input
            type="text"
            name="imageUrl"
            placeholder="Image URL"
            className="input input-bordered input-primary input-sm w-full bg-[#1d1836]"
            required
          />
          <input
            type="text"
            name="videoUrl"
            placeholder="Video URL (Optional)"
            className="input input-bordered input-primary input-sm w-full bg-[#1d1836]"
          />
          <input
            type="text"
            name="title"
            placeholder="Title"
            className="input input-bordered input-primary input-sm w-full bg-[#1d1836]"
            required
          />
          <textarea
            className="textarea first-letter:input input-bordered input-primary input-sm w-full h-[150px] bg-[#1d1836]"
            name="description"
            placeholder="Description"
            required
          ></textarea>
          <button type="submit" className="btn btn-sm btn-primary">
            Create Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;

CreateBlog.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
