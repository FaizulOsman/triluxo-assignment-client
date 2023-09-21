import {
  getFromLocalStorage,
  removeFromLocalStorage,
} from "@/utils/localstorage";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [stickyNav, setStickyNav] = useState(false);
  const [myProfile, setMyProfile] = useState({});
  const router = useRouter();
  const statePath = router.query.state?.path;

  const handleSignOut = () => {
    const path = statePath || "/login";
    router.push(path);

    removeFromLocalStorage("user-info");
    removeFromLocalStorage("access-token");
    toast.success("Successfully Signed Out!");
    setMyProfile({});
  };

  const fetchMyProfile = async () => {
    const accessToken = getFromLocalStorage("access-token");
    if (accessToken) {
      try {
        const url =
          "https://test-yourself-server.vercel.app/api/v1/users/my-profile";
        const options = {
          headers: {
            authorization: accessToken,
          },
        };
        const res = await fetch(url, options);
        const data = await res.json();
        setMyProfile(data?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  const handleScroll = () => {
    setStickyNav(window.pageYOffset > 5);
  };

  useEffect(() => {
    fetchMyProfile();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`z-50 border-b-1 border-solid border-blue-200 z-999 fixed w-full top-0 ${
        stickyNav
          ? "sticky shadow-md border-b-0 sticky__body bg-white"
          : "bg-gradient-to-r from-green-500 to-blue-500"
      }`}
    >
      <div className="w-11/12 max-w-[1200px] mx-auto">
        <div
          className={`navbar-wrapper__body  ${
            stickyNav ? "sticky__body" : ""
          } py-2 md:py-3`}
        >
          <div className="inherit md:hidden">
            <Link href="/">
              <Image
                alt="Logo"
                className="w-8 h-8 rounded-full"
                src="https://i.ibb.co/wrgvTfG/1688077229726.jpg"
                decoding="async"
                loading="lazy"
                width={300}
                height={300}
              />
            </Link>
          </div>
          <div className="hidden md:flex md:items-center md:w-fit gap-4">
            <li className="">
              <Link href="/">
                <Image
                  alt="Logo"
                  className="w-10 h-10 rounded-full"
                  src="https://i.ibb.co/wrgvTfG/1688077229726.jpg"
                  decoding="async"
                  loading="lazy"
                  width={300}
                  height={300}
                />
              </Link>
            </li>
            <li
              className={`left-menus__menu hidden lg:inline-block font-semibold hover:text-blue-600 ${
                stickyNav ? "sticky-menu" : ""
              }`}
            >
              <Link href="/blog">Blogs</Link>
            </li>
          </div>
          {/* right side menu for large devices  */}
          <div className="body__right-menus hidden md:flex md:items-center gap-4">
            {myProfile?.email ? (
              <>
                <li
                  className={`px-2 flex items-center border-2 rounded-lg hover:bg-green-500 duration-300  `}
                >
                  <Link
                    className="btn-link hover:no-underline"
                    href="/dashboard"
                  >
                    <h6
                      className={`btn-text ${
                        stickyNav ? "text-black hover:text-white" : "text-white"
                      }`}
                    >
                      Dashboard
                    </h6>
                  </Link>
                </li>
              </>
            ) : (
              <li className="download flex items-center  rounded-lg bg-blue-700">
                <Link href="/login">
                  <h6 className="btn-text text-white px-2">Login/SignUp</h6>
                </Link>
              </li>
            )}
            <svg
              onClick={() => setIsOpen(true)}
              className="small-device__sidebar-toggle w-52 h-52 cursor-pointer"
              focusable="false"
              aria-hidden="true"
              viewBox="0 0 24 24"
              data-testid="MenuIcon"
            >
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
            </svg>
          </div>
          {/* left side menu for large devices  */}
          <div className="md:hidden flex items-center gap-4">
            {myProfile?.email ? (
              <li className="flex items-center  rounded-lg bg-blue-700 hover:bg-green-500 duration-300 px-3 py-[2px]">
                <Link href="/dashboard">
                  <h6 className="btn-text text-white">Dashboard</h6>
                </Link>
              </li>
            ) : (
              <li className="flex items-center  rounded-lg bg-blue-700 px-3 py-[2px]">
                <Link href="/login">
                  <h6 className="btn-text text-white">Login/SignUp</h6>
                </Link>
              </li>
            )}
            <svg
              onClick={() => setIsOpen(true)}
              className="small-device__sidebar-toggle cursor-pointer"
              focusable="false"
              aria-hidden="true"
              viewBox="0 0 24 24"
              data-testid="MenuIcon"
            >
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
            </svg>
          </div>

          {/* Sidebar  */}
          <div className={`sidebar-wrapper ${isOpen ? "open" : ""}`}>
            <div className={`sidebar ${isOpen ? "" : "closeAnimation"}`}>
              <div className="sidebar__header">
                <div className="header__logoArea">
                  <Link href="/">
                    <Image
                      alt="Logo"
                      className="w-8 h-8 rounded-full"
                      src="https://i.ibb.co/wrgvTfG/1688077229726.jpg"
                      decoding="async"
                      loading="lazy"
                      width={300}
                      height={300}
                    />
                  </Link>
                </div>
                <div className="header__closeButton">
                  <button onClick={() => setIsOpen(false)} className="button">
                    <AiOutlineClose className="button-icon" />
                  </button>
                </div>
              </div>
              <div className="sidebar__body">
                <li onClick={() => setIsOpen(false)} className="body__menu">
                  <Link
                    href="/blog"
                    className="w-full block hover:bg-gray-200 px-2 p-1 rounded-md"
                  >
                    Blogs
                  </Link>
                </li>

                {myProfile?.email ? (
                  <li onClick={() => setIsOpen(false)} className="body__menu">
                    <Link
                      href="#"
                      onClick={() => handleSignOut()}
                      className="w-full block hover:bg-gray-200 px-2 p-1 rounded-md"
                    >
                      Logout
                    </Link>
                  </li>
                ) : (
                  <li
                    onClick={() => setIsOpen(false)}
                    className="mx-4 text-white text-center"
                  >
                    <Link
                      href="/login"
                      className="w-full block bg-green-500 hover:bg-green-600 text-white px-2 p-1 rounded-md"
                    >
                      Login
                    </Link>
                  </li>
                )}
              </div>
            </div>
            <div
              className="sidebar__backdrop"
              onClick={() => setIsOpen(false)}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
