import Comment from "@/components/UI/Comment";
import VideoPlayer from "@/components/UI/VideoPlayer";
import RootLayout from "@/layouts/RootLayout";
import { useGetSingleBlogQuery } from "@/redux/blog/blogApi";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";

const SingleBlog = () => {
  const router = useRouter();
  const id = router.query.blogId;
  const [show, setShow] = useState(2);

  // Data Query
  const { data: getSingleBlog } = useGetSingleBlogQuery(id);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-14 items-center">
        <div>
          {show === 1 && (
            <Image
              src={getSingleBlog?.data?.imageUrl}
              alt="Blog Image"
              className="w-full mx-auto"
              width={300}
              height={300}
            />
          )}
          {show === 2 && (
            <VideoPlayer videoUrl={getSingleBlog?.data?.videoUrl} />
          )}
          <div className="flex justify-between w-52 mx-auto my-5">
            <h4
              onClick={() => setShow(1)}
              className={`font-bold cursor-pointer ${
                show === 1 ? "text-primary" : "text-black"
              }`}
            >
              Image
            </h4>
            <h4
              onClick={() => setShow(2)}
              className={`font-bold cursor-pointer ${
                show === 2 ? "text-primary" : "text-black"
              }`}
            >
              Video
            </h4>
          </div>
        </div>
        <div>
          <h1 className="text-xl sm:text-3xl md:text-4xl font-semibold text-center my-5 text-blue-600">
            {getSingleBlog?.data?.title}
          </h1>
          <p>{getSingleBlog?.data?.description}</p>
        </div>
      </div>
      <Comment blogId={getSingleBlog?.data?.id} />
    </div>
  );
};

export default SingleBlog;

SingleBlog.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
