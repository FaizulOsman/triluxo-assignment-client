import useProtectedRoute from "@/hooks/useProtectedRoute";
import DashboardLayout from "@/layouts/DashboardLayout";
import {
  useGetMyProfileQuery,
  useUpdateMyProfileMutation,
} from "@/redux/user/userApi";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const jwt = require("jsonwebtoken");

const MyProfile = () => {
  const [MyProfile, setMyProfile] = useState([]);

  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("access-token") : null;
  const decodedToken = jwt.decode(accessToken);

  // Protect Route
  useProtectedRoute(decodedToken?.role || "guest");

  const headers = {
    authorization: accessToken,
  };

  const { data: getMyProfile } = useGetMyProfileQuery({ headers });

  const [
    updateMyProfile,
    {
      isSuccess: updateProfileIsSuccess,
      isError: updateProfileIsError,
      error: updateProfileError,
    },
  ] = useUpdateMyProfileMutation();

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const phone = e.target.phone.value;

    const data = { email, phone };
    console.log(data);
    updateMyProfile({ data, headers });
  };

  useEffect(() => {
    setMyProfile(getMyProfile?.data);

    if (updateProfileIsSuccess) {
      toast.success("Profile updated successfully");
    }
    if (updateProfileIsError) {
      toast.error(updateProfileError.message || "Something went wrong");
    }
  }, [
    getMyProfile?.data,
    updateProfileIsSuccess,
    updateProfileIsError,
    updateProfileError,
  ]);

  return (
    <div className="py-7">
      <div>
        <div className="w-11/12 md:w-10/12 lg:w-8/12 mx-auto border rounded-lg border-blue-500 p-5">
          <h3 className="text-xl sm:text-2xl font-bold text-center my-5">
            My Profile
          </h3>
          <div>
            <form onSubmit={(e) => handleUpdateProfile(e)}>
              <div className="grid grid-cols-1 sm:grid-cols-2 justify-between gap-8 mt-4">
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="input-sm input-primary w-full py-3 px-4 border rounded-lg focus:outline-none focus:border-blue-500 bg-[#1d1836]"
                    autoComplete="off"
                    defaultValue={MyProfile?.name}
                    disabled={true}
                  />
                  <label
                    htmlFor="name"
                    className="absolute text-sm left-6 -top-3 bg-[#1d1836] rounded-lg px-2 text-primary transition-all duration-300"
                  >
                    Name
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    id="email"
                    name="email"
                    className="input-sm input-primary w-full py-3 px-4 border rounded-lg focus:outline-none focus:border-blue-500 bg-[#1d1836]"
                    autoComplete="off"
                    defaultValue={MyProfile?.email}
                  />
                  <label
                    htmlFor="email"
                    className="absolute text-sm left-6 -top-3 bg-[#1d1836] rounded-lg px-2 text-primary transition-all duration-300"
                  >
                    Email
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    className="input-sm input-primary w-full py-3 px-4 border rounded-lg focus:outline-none focus:border-blue-500 bg-[#1d1836]"
                    autoComplete="off"
                    defaultValue={MyProfile?.phone}
                  />
                  <label
                    htmlFor="phone"
                    className="absolute text-sm left-6 -top-3 bg-[#1d1836] rounded-lg px-2 text-primary transition-all duration-300"
                  >
                    Phone
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    id="image"
                    name="image"
                    className="input-sm input-primary w-full py-3 px-4 border rounded-lg focus:outline-none focus:border-blue-500 bg-[#1d1836]"
                    autoComplete="off"
                    defaultValue={MyProfile?.image}
                    disabled={true}
                  />
                  <label
                    htmlFor="image"
                    className="absolute text-sm left-6 -top-3 bg-[#1d1836] rounded-lg px-2 text-primary transition-all duration-300"
                  >
                    image
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    id="address"
                    name="address"
                    className="input-sm input-primary w-full py-3 px-4 border rounded-lg focus:outline-none focus:border-blue-500 bg-[#1d1836]"
                    autoComplete="off"
                    defaultValue={MyProfile?.address}
                    disabled={true}
                  />
                  <label
                    htmlFor="address"
                    className="absolute text-sm left-6 -top-3 bg-[#1d1836] rounded-lg px-2 text-primary transition-all duration-300"
                  >
                    address
                  </label>
                </div>
                <button type="submit" className="btn btn-sm w-full btn-primary">
                  Update Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;

MyProfile.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
