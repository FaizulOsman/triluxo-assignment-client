import RootLayout from "@/layouts/RootLayout";
import {
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useGetAllCommentQuery,
  useGetCommentsByIdQuery,
  useUpdateCommentMutation,
} from "@/redux/comment/commentApi";
import { useGetMyProfileQuery } from "@/redux/user/userApi";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";

const Comment = ({ blogId }) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [meta, setMeta] = useState({});
  const [sortOrder, setSortOrder] = useState("desc");
  const [replyFormIndex, setReplyFormIndex] = useState(null);
  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("access-token") : null;

  const headers = {
    authorization: accessToken,
  };

  //  Data Query
  const { data: getMyProfile } = useGetMyProfileQuery({ headers });
  const [
    createComment,
    { data: createCommentData, isSuccess: createCommentIsSuccess },
  ] = useCreateCommentMutation();
  const [updateComment] = useUpdateCommentMutation();
  const [deleteComment, { isSuccess: deleteCommentIsSuccess }] =
    useDeleteCommentMutation();
  const { data: getAllComment } = useGetCommentsByIdQuery({
    id: blogId,
    page,
    limit,
    sortOrder,
  });

  const handleAddQuesInComment = (e) => {
    e.preventDefault();
    if (accessToken) {
      const data = {
        blogId,
        userName: getMyProfile?.data?.name,
        userEmail: getMyProfile?.data?.email,
        question: e.target.comment.value,
      };
      createComment(data);
    } else {
      toast.error("You must be logged in first!");
    }
    e.target.comment.value = "";
  };

  const handleDeleteComment = (data) => {
    deleteComment({ id: data?.id, headers });
  };

  const handleLike = (d) => {
    if (accessToken) {
      const isAlreadyLiked = d?.likes?.find(
        (like) =>
          like.email === getMyProfile?.data?.email && like?.isLiked === true
      );

      const removeLikeAndFilterOthers = d?.likes?.filter(
        (data) => data?.email !== isAlreadyLiked?.email
      );

      if (!isAlreadyLiked) {
        const data = {
          likes: [
            ...d?.likes,
            {
              email: getMyProfile?.data?.email,
              isLiked: true,
            },
          ],
        };
        updateComment({ id: d?.id, data });
      } else {
        const data = {
          likes: removeLikeAndFilterOthers,
        };
        updateComment({ id: d?.id, data });
      }
    } else {
      toast.error("You must be logged in first!");
    }
  };

  const handleAddReply = ({ e, data: d }) => {
    e.preventDefault();
    if (accessToken) {
      const data = {
        replies: [
          ...d?.replies,
          {
            email: getMyProfile?.data?.email,
            name: getMyProfile?.data?.name,
            reply: e.target.reply.value,
          },
        ],
      };
      updateComment({ id: d?.id, data });
    } else {
      toast.error("You must be logged in first!");
    }
    e.target.reply.value = "";
  };

  const handleRemoveReply = ({ data: d, reply }) => {
    const removeReplyAndFilterOthers = d?.replies?.filter(
      (data) => data?.id !== reply?.id
    );

    const data = {
      replies: removeReplyAndFilterOthers,
    };
    updateComment({ id: d?.id, data });
  };

  const totalPage = Math.ceil(parseInt(meta?.total) / parseInt(meta?.limit));

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPage) {
      setPage(newPage);
    }
  };

  useEffect(() => {
    if (createCommentData && createCommentIsSuccess) {
      toast.success("Comment created!");
    }
  }, [createCommentData, createCommentIsSuccess]);

  useEffect(() => {
    if (deleteCommentIsSuccess) {
      toast.success("Comment deleted successfully!");
    }
  }, [deleteCommentIsSuccess]);

  useEffect(() => {
    setMeta(getAllComment?.meta);
  }, [getAllComment?.meta]);

  return (
    <div className="mt-10">
      <div>
        <div className="flex justify-between border-b-2 pb-4">
          <h2 className="hidden sm:inline-block text-xl text-blue-500 font-bold">
            {getAllComment?.meta?.total > 0 ? getAllComment?.meta?.total : 0}{" "}
            Comments
          </h2>
          <div className="sm:ml-auto mr-5 flex items-center gap-4">
            <select
              onChange={(e) => {
                const selectedValue = e.target.value;
                setSortOrder(selectedValue);
              }}
              className="select select-bordered select-sm max-w-xs"
            >
              <option value="desc">Newest</option>
              <option value="asc">Oldest</option>
            </select>
          </div>
          <div className="text-xs items-center inline-flex">
            <button
              onClick={() => setLimit(limit - 1)}
              className={`mr-2 inline-flex items-center h-6 w-6 justify-center rounded-md shadow border ${
                limit === 1
                  ? "opacity-50 cursor-not-allowed"
                  : "border-gray-800"
              } leading-none`}
              disabled={limit === 1}
            >
              <svg
                className="w-4"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <span className="mr-2 font-semibold">Limit {limit}</span>
            <button
              onClick={() => setLimit(limit + 1)}
              className={`inline-flex items-center h-6 w-6 justify-center rounded-md shadow border ${
                page === totalPage
                  ? "opacity-50 cursor-not-allowed"
                  : "border-gray-800"
              } leading-none`}
              disabled={limit === parseInt(meta?.total)}
            >
              <svg
                className="w-4"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between my-8 gap-4">
          <Image
            alt="Profile Image"
            className="w-12 rounded-full border-2 p-[2px]"
            src="https://i.ibb.co/nrtwzQd/avatar-boy.webp"
            decoding="async"
            loading="lazy"
            width={300}
            height={300}
          />
          <div className="flex-1">
            <form
              onSubmit={(e) => handleAddQuesInComment(e)}
              className="flex gap-4"
            >
              <input
                type="text"
                name="comment"
                placeholder="Type here"
                className="input input-bordered w-full"
              />
              <button
                type="submit"
                className="border-2 border-blue-500 rounded-full px-[14px] py-2 bg-blue-500 flex items-center justify-center cursor-pointer"
              >
                <svg
                  stroke="currentColor"
                  fill="none"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-white"
                >
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </form>
          </div>
        </div>

        {getAllComment?.data?.map((data, index) => (
          <div key={index} className="flex gap-4 mb-4">
            <Image
              alt="Profile Image"
              className="w-10 h-10 rounded-full border-2 p-[2px] mt-3"
              src="https://i.ibb.co/nrtwzQd/avatar-boy.webp"
              decoding="async"
              loading="lazy"
              width={300}
              height={300}
            />
            <div className="">
              <h4 className="font-semibold">{data?.userName}</h4>
              <p className="text-gray-600 text-sm">{data?.question}</p>
              <div className="flex items-center gap-2 text-sm">
                <p className="text-blue-500">
                  {data?.likes?.length}{" "}
                  <span
                    className="cursor-pointer"
                    onClick={() => handleLike(data)}
                  >
                    {data?.likes?.find(
                      (like) => like?.email === getMyProfile?.data?.email
                    ) ? (
                      <span>Unlike</span>
                    ) : (
                      <span>Like</span>
                    )}
                  </span>
                </p>
                <p className="">.</p>
                <p
                  className="text-blue-500 cursor-pointer"
                  onClick={() => setReplyFormIndex(index)}
                >
                  Reply
                </p>

                {data?.userEmail === getMyProfile?.data?.email && (
                  <>
                    <p className="">.</p>
                    <p
                      className="text-blue-500 cursor-pointer"
                      onClick={() => handleDeleteComment(data)}
                    >
                      Delete
                    </p>
                  </>
                )}
              </div>
              {index === replyFormIndex && (
                <form
                  onSubmit={(e) => handleAddReply({ e, data })}
                  className="flex gap-2 my-4"
                >
                  <input
                    type="text"
                    name="reply"
                    placeholder="Reply"
                    className="input input-bordered input-sm w-full"
                  />
                  <button
                    type="submit"
                    className="border-2 border-blue-500 rounded-full px-[6px] py-1 bg-blue-500 flex items-center justify-center cursor-pointer"
                  >
                    <svg
                      stroke="currentColor"
                      fill="none"
                      stroke-width="2"
                      viewBox="0 0 24 24"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-white"
                    >
                      <line x1="22" y1="2" x2="11" y2="13"></line>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                  </button>
                </form>
              )}
              {data?.replies?.map((reply, index) => (
                <div key={index} className="mt-4">
                  <div className="flex items-center gap-4 mb-4">
                    <Image
                      alt="Profile Image"
                      className="w-10 h-10 rounded-full border-2 p-[2px]"
                      src="https://i.ibb.co/nrtwzQd/avatar-boy.webp"
                      decoding="async"
                      loading="lazy"
                      width={300}
                      height={300}
                    />
                    <div className="">
                      <h4 className="font-semibold flex gap-4">
                        {reply?.name}
                        {reply?.email === getMyProfile?.data?.email && (
                          <AiOutlineDelete
                            onClick={() => handleRemoveReply({ data, reply })}
                            className="text-red-500 cursor-pointer mt-1"
                          />
                        )}
                      </h4>
                      <p className="text-gray-600 text-sm">{reply?.reply}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="flex w-full mt-10 space-x-2 justify-center">
        <button
          onClick={() => handlePageChange(page - 1)}
          className={`inline-flex items-center h-6 w-6 justify-center rounded-md shadow border ${
            page === 1 ? "opacity-50 cursor-not-allowed" : "border-blue-800"
          } leading-none`}
          disabled={page === 1}
        >
          <svg
            className="w-4"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        {Array.from({ length: totalPage }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`inline-flex items-center h-6 w-6 justify-center rounded-md shadow border ${
              page === index + 1
                ? "bg-blue-500 border-blue-800 text-white"
                : "border-blue-800"
            } leading-none`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(page + 1)}
          className={`inline-flex items-center h-6 w-6 justify-center rounded-md shadow border ${
            page === totalPage
              ? "opacity-50 cursor-not-allowed"
              : "border-blue-800"
          } leading-none`}
          disabled={page === totalPage}
        >
          <svg
            className="w-4"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Comment;

Comment.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
