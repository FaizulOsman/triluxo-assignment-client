import RootLayout from "@/layouts/RootLayout";
import { useGetSingleBlogQuery } from "@/redux/blog/blogApi";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

const SingleBlog = () => {
  const router = useRouter();
  const id = router.query.blogId;

  // Data Query
  const { data: getSingleBlog } = useGetSingleBlogQuery(id);
  console.log(getSingleBlog?.data);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-14 items-center">
      <Image
        src={getSingleBlog?.data?.imageUrl}
        alt="Blog Image"
        className="w-full mx-auto"
        width={300}
        height={300}
      />
      <div>
        <h1 className="text-xl sm:text-3xl md:text-4xl font-semibold text-center my-5 text-blue-600">
          {getSingleBlog?.data?.title}
        </h1>
        <p>{getSingleBlog?.data?.description}</p>
      </div>
    </div>
  );
};

export default SingleBlog;

SingleBlog.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
