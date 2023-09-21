import DashboardLayout from "@/layouts/DashboardLayout";
import {
  useGetSingleBlogQuery,
  useUpdateBlogMutation,
} from "@/redux/blog/blogApi";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { toast } from "react-hot-toast";

const UpdateBlog = () => {
  const router = useRouter();
  const id = router.query.blogId;
  const { data: getSingleBlog } = useGetSingleBlogQuery(id);

  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("access-token") : null;

  const headers = {
    authorization: accessToken,
  };

  const [updateBlog, { isSuccess, isError, error }] = useUpdateBlogMutation();

  const handleUpdateBlog = (e) => {
    e.preventDefault();
    const data = {
      imageUrl: e.target.imageUrl.value,
      videoUrl: e.target.videoUrl.value,
      title: e.target.title.value,
      description: e.target.description.value,
    };
    updateBlog({ id, data, headers });
  };

  useEffect(() => {
    if (isError) {
      toast.error(`${error?.data?.message}` || "Blog Creation Failed!");
    }

    if (isSuccess) {
      toast.success("Blog Updated Successfully!");
    }
  }, [isSuccess, isError, error]);

  return (
    <div>
      <div className="w-11/12 md:w-8/12 mx-auto mt-10 mb-7">
        <h2 className="text-3xl font-semibold text-center">Update Blog</h2>
      </div>
      <div className="my-5">
        <div className="w-11/12 md:w-10/12 lg:w-8/12 mx-auto mt-5 border rounded-lg border-blue-500 p-5">
          <form
            onSubmit={(e) => handleUpdateBlog(e)}
            className="grid grid-cols-1 justify-between gap-4 mt-4"
          >
            <div className="relative">
              <input
                type="text"
                id="imageUrl"
                name="imageUrl"
                className="input-sm input-primary w-full py-3 px-4 border rounded-lg focus:outline-none focus:border-blue-500 bg-[#1d1836]"
                autoComplete="off"
                defaultValue={getSingleBlog?.data?.imageUrl}
              />
              <label
                htmlFor="imageUrl"
                className="absolute text-sm left-6 -top-3  bg-[#1d1836] rounded-lg px-2 text-primary transition-all duration-300"
              >
                Image URL
              </label>
            </div>
            <div className="relative mt-4">
              <input
                type="text"
                id="videoUrl"
                name="videoUrl"
                className="input-sm input-primary w-full py-3 px-4 border rounded-lg focus:outline-none focus:border-blue-500 bg-[#1d1836]"
                autoComplete="off"
                defaultValue={getSingleBlog?.data?.videoUrl}
              />
              <label
                htmlFor="videoUrl"
                className="absolute text-sm left-6 -top-3  bg-[#1d1836] rounded-lg px-2 text-primary transition-all duration-300"
              >
                Video URL
              </label>
            </div>
            <div className="relative mt-4">
              <input
                type="text"
                id="title"
                name="title"
                className="input-sm input-primary w-full py-3 px-4 border rounded-lg focus:outline-none focus:border-blue-500 bg-[#1d1836]"
                autoComplete="off"
                defaultValue={getSingleBlog?.data?.title}
                required
              />
              <label
                htmlFor="title"
                className="absolute text-sm left-6 -top-3  bg-[#1d1836] rounded-lg px-2 text-primary transition-all duration-300"
              >
                Title
              </label>
            </div>
            <div className="relative mt-4">
              <textarea
                className="textarea first-letter:input input-bordered input-primary input-sm w-full h-[150px] bg-[#1d1836]"
                type="number"
                id="description"
                name="description"
                placeholder="Description"
                autoComplete="off"
                defaultValue={getSingleBlog?.data?.description}
                required
              ></textarea>
              <label
                htmlFor="description"
                className="absolute text-sm left-6 -top-3  bg-[#1d1836] rounded-lg px-2 text-primary transition-all duration-300"
              >
                Description
              </label>
            </div>
            <button type="submit" className="btn btn-sm btn-primary mt-4">
              Update Blog
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateBlog;

UpdateBlog.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
