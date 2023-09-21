import Loader from "@/components/UI/Loader";
import useProtectedRoute from "@/hooks/useProtectedRoute";
import DashboardLayout from "@/layouts/DashboardLayout";
import {
  useDeleteUserMutation,
  useGetAllUsersByQueryQuery,
  useGetMyProfileQuery,
  useUpdateUserMutation,
} from "@/redux/user/userApi";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

const jwt = require("jsonwebtoken");

const Users = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const [meta, setMeta] = useState({});
  const [sortOrder, setSortOrder] = useState("desc");
  const [id, setId] = useState("");

  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("access-token") : null;
  const decodedToken = jwt.decode(accessToken);

  // Protect Route
  useProtectedRoute(decodedToken?.role || "guest");

  const headers = {
    authorization: accessToken,
  };

  const { data: getMyProfile } = useGetMyProfileQuery({ headers });

  const { data: getAllUsers } = useGetAllUsersByQueryQuery({
    headers,
    limit,
    page,
    sortOrder,
  });
  const [
    updateUser,
    {
      isSuccess: isUpdateUserSuccess,
      isError: isUpdateUserError,
      error: updateUserError,
    },
  ] = useUpdateUserMutation();

  const totalPage = Math.ceil(parseInt(meta?.total) / parseInt(meta?.limit));

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPage) {
      setPage(newPage);
    }
  };

  const [
    deleteUser,
    {
      isSuccess: isDeleteSuccess,
      isError: isDeleteError,
      error: deleteErrMessage,
    },
  ] = useDeleteUserMutation();
  const handleDeleteUser = (user) => {
    setId(user?.id);
    const isConfirmed = window.confirm(`Do you want to delete ${user?.email}`);
    if (isConfirmed) {
      deleteUser({ id: user?.id, headers });
    }
  };

  const handleSetRole = ({ user, e }) => {
    if (e.target.checked) {
      const data = { role: "admin" };
      updateUser({ id: user?.id, data, headers });
    } else {
      const data = { role: "user" };
      updateUser({ id: user?.id, data, headers });
    }

    setTimeout(() => {
      window.location.reload();
    }, [3000]);
  };

  useEffect(() => {
    setAllUsers(getAllUsers?.data);
    setMeta(getAllUsers?.meta);

    if (isDeleteSuccess) {
      toast.success("Successfully deleted user.");
      setAllUsers(getAllUsers?.data);
    }
    if (isDeleteError) {
      toast.error(deleteErrMessage?.message || "Something went wrong");
    }

    if (isUpdateUserSuccess) {
      toast.success("Successfully Updated User.");
      setAllUsers(getAllUsers?.data);
    }
    if (isUpdateUserError) {
      toast.error(updateUserError?.message || "Something went wrong");
    }
  }, [
    getAllUsers,
    getAllUsers?.data,
    isDeleteSuccess,
    isDeleteError,
    deleteErrMessage,
    isUpdateUserSuccess,
    isUpdateUserError,
    updateUserError,
  ]);

  return (
    <div>
      <div className="bg-gray-100 dark:text-white flex overflow-hidden text-sm">
        <div className="flex-grow overflow-hidden h-full flex flex-col">
          <div className="flex-grow flex overflow-x-hidden">
            <div className="flex-grow bg-[#080925] overflow-y-auto">
              <div className="z-50 bg-[#080925] sm:px-7 sm:pt-7 px-4 pt-4 flex flex-col w-full border-b border-gray-800  sticky top-0">
                <div className="flex w-full items-center">
                  <div className="flex items-center text-lg sm:text-2xl  dark:text-white mb-5 border-l-4 pl-3">
                    All Users (
                    {getAllUsers?.meta?.total ? getAllUsers?.meta?.total : 0})
                  </div>
                </div>
              </div>
              <div className="sm:p-7 p-4">
                <div className="flex w-full items-center mb-7">
                  <button className="hidden sm:inline-flex mr-3 items-center h-8 pl-2.5 pr-2 rounded-md shadow   dark:border-gray-800 border border-gray-200 leading-none py-0">
                    <svg
                      viewBox="0 0 24 24"
                      className="w-4 mr-2  "
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect
                        x="3"
                        y="4"
                        width="18"
                        height="18"
                        rx="2"
                        ry="2"
                      ></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    Last 30 days
                    <svg
                      viewBox="0 0 24 24"
                      className="w-4 ml-1.5  "
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </button>
                  <button
                    onClick={() =>
                      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                    }
                    className="inline-flex items-center h-8 pl-2.5 pr-2 rounded-md shadow dark:border-gray-800 border border-gray-200 leading-none py-0"
                  >
                    {sortOrder === "asc" ? "desc" : "asc"}
                    <svg
                      viewBox="0 0 24 24"
                      className="w-4 ml-1.5  "
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </button>
                  <div className="ml-auto text-xs inline-flex items-center">
                    <span className="mr-3 hidden sm:inline-block">
                      Limit {limit}
                    </span>
                    <button
                      onClick={() => setLimit(limit - 1)}
                      className={`mr-3 inline-flex items-center h-8 w-8 justify-center rounded-md shadow border ${
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
                    <button
                      onClick={() => setLimit(limit + 1)}
                      className={`inline-flex items-center h-8 w-8 justify-center rounded-md shadow border ${
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
                {allUsers ? (
                  <>
                    {allUsers?.length > 0 ? (
                      <table className="w-full text-left">
                        <thead>
                          <tr className="font-normal border-b border-gray-800">
                            <th className="sm:px-3 pt-0 pb-3 hidden md:table-cell">
                              Image
                            </th>
                            <th className="sm:px-3 pt-0 pb-3">Name</th>
                            <th className="sm:px-3 pt-0 pb-3 hidden sm:table-cell">
                              Email
                            </th>
                            <th className="sm:px-3 pt-0 pb-3">isAdmin</th>
                            <th className="sm:px-3 pt-0 pb-3">Delete</th>
                            <th className="sm:px-3 pt-0 pb-3 hidden sm:table-cell">
                              Update
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {allUsers?.map((user, index) => (
                            <tr
                              key={index}
                              className="border-b border-gray-800"
                            >
                              <td className="sm:p-3 py-2 hidden md:table-cell">
                                <Image
                                  src="https://i.ibb.co/D70zkJV/avatar-girl-full.jpg"
                                  alt="profile"
                                  className="w-7 h-7 mr-2.5 border border-gray-800 rounded-full"
                                  width={50}
                                  height={50}
                                />
                              </td>
                              <td className="sm:p-3 py-2">{user.name}</td>
                              <td className="sm:p-3 py-2 hidden sm:table-cell">
                                {user.email}
                              </td>
                              <td className="sm:p-3 py-2">
                                <input
                                  type="checkbox"
                                  className="toggle toggle-sm toggle-primary"
                                  checked={
                                    user?.role === "admin" ? true : false
                                  }
                                  onClick={(e) => handleSetRole({ user, e })}
                                  disabled={
                                    user?.email === getMyProfile?.data?.email
                                      ? true
                                      : false
                                  }
                                />
                              </td>
                              <td className="sm:p-3 py-2">
                                <button
                                  disabled={
                                    user?.email === getMyProfile?.data?.email
                                      ? true
                                      : false
                                  }
                                  className={`${
                                    user?.email === getMyProfile?.data?.email
                                      ? "cursor-not-allowed text-red-400"
                                      : "cursor-pointer text-red-600"
                                  }`}
                                >
                                  <MdDeleteOutline
                                    onClick={() => handleDeleteUser(user)}
                                    className={`w-5 h-5`}
                                  />
                                </button>
                              </td>
                              <td className="sm:p-3 py-2 hidden sm:table-cell">
                                <button
                                  disabled={
                                    user?.email === getMyProfile?.data?.email
                                      ? true
                                      : false
                                  }
                                  className={`${
                                    user?.email === getMyProfile?.data?.email
                                      ? "cursor-not-allowed text-green-400"
                                      : "cursor-pointer text-green-600"
                                  }`}
                                >
                                  <FaRegEdit className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <div className="min-h-[30vh] flex items-center justify-center">
                        <h2 className="text-md sm:text-xl md:text-2xl text-red-500">
                          No data found
                        </h2>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="min-h-[30vh] flex items-center">
                    <Loader />
                  </div>
                )}
                <div className="flex flex-wrap w-full mt-5 gap-2 justify-end">
                  <button
                    onClick={() => handlePageChange(page - 1)}
                    className={`inline-flex items-center h-8 w-8 justify-center rounded-md shadow border ${
                      page === 1
                        ? "opacity-50 cursor-not-allowed"
                        : "border-gray-800"
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
                      className={`inline-flex items-center h-8 w-8 justify-center rounded-md shadow border ${
                        page === index + 1
                          ? "bg-gray-800 border-gray-800"
                          : "border-gray-800"
                      } leading-none`}
                    >
                      {index + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => handlePageChange(page + 1)}
                    className={`inline-flex items-center h-8 w-8 justify-center rounded-md shadow border ${
                      page === totalPage
                        ? "opacity-50 cursor-not-allowed"
                        : "border-gray-800"
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;

Users.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
