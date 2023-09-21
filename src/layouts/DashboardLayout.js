import { FaHome, FaUser, FaUsers, FaChartLine } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import { BiCog } from "react-icons/bi";
import { AiFillHeart, AiTwotoneFileExclamation } from "react-icons/ai";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { removeFromLocalStorage } from "@/utils/localstorage";
import SidebarMenu from "@/components/Dashboard/SidebarMenu";
import DashboardHeader from "@/components/Dashboard/DashboardHeader";

const routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <FaHome />,
    permission1: "user",
    permission2: "admin",
  },
  {
    path: "/dashboard/users",
    name: "Users",
    icon: <FaUsers />,
    permission1: "",
    permission2: "admin",
  },
  {
    path: "/dashboard/my-profile",
    name: "My Profile",
    icon: <FaUser />,
    permission1: "user",
    permission2: "admin",
  },
  {
    path: "/dashboard/blog",
    name: "Blog",
    icon: <AiTwotoneFileExclamation />,
    permission1: "user",
    permission2: "admin",
    subRoutes: [
      {
        path: "/dashboard/blog/create-blog",
        name: "Create Blog",
        icon: <FaUser />,
      },
      {
        path: "/dashboard/blog/all-blog",
        name: "All Blog",
        icon: <AiTwotoneFileExclamation />,
      },
    ],
  },
];

const DashboardLayout = ({ children }) => {
  const { router } = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const inputAnimation = {
    hidden: {
      width: 0,
      padding: 0,
      transition: {
        duration: 0.2,
      },
    },
    show: {
      width: "80%",
      padding: "0 10px",
      transition: {
        duration: 0.2,
      },
    },
  };

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  const handleLogOut = () => {
    removeFromLocalStorage("user-info");
    removeFromLocalStorage("access-token");
  };

  const [myProfile, setMyProfile] = useState({});
  const fetchMyProfile = async () => {
    const accessToken =
      typeof window !== "undefined"
        ? localStorage.getItem("access-token")
        : null;
    if (accessToken) {
      try {
        const url =
          "https://blog-wave-server.vercel.app/api/v1/users/my-profile";
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

  useEffect(() => {
    fetchMyProfile();
  }, []);

  return (
    <div className="">
      <div className="flex bg-[#080925] text-white h-screen overflow-hidden">
        <motion.div
          animate={{
            width: isOpen ? "200px" : "45px",
            transition: {
              duration: 0.5,
              type: "spring",
              damping: 10,
            },
          }}
          className={`h-screen bg-[#00073d] text-white min-h-[100vh] overflow-y-auto`}
        >
          <div className="flex items-center justify-between py-2">
            <AnimatePresence>
              {isOpen && (
                <motion.h1
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="text-lg leading-[0px] pl-2"
                >
                  BlogWave
                </motion.h1>
              )}
            </AnimatePresence>
            <div className="cursor-pointer">
              <Image
                alt="Logo"
                className="w-8 h-8 rounded-full border-2 mx-1"
                src="https://i.ibb.co/wrgvTfG/1688077229726.jpg"
                decoding="async"
                loading="lazy"
                width={300}
                height={300}
              />
            </div>
          </div>
          <div className="flex items-center my-[10px] mx-0 h-4 p-2">
            <div className="search_icon">
              <BiSearch />
            </div>
            <AnimatePresence>
              {isOpen && (
                <motion.input
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  variants={inputAnimation}
                  type="text"
                  placeholder="Search"
                  className="border-none ml-2 rounded-md bg-white text-black p-0"
                />
              )}
            </AnimatePresence>
          </div>
          <section className="mt-4 flex flex-col gap-[5px]">
            {routes.map((route, index) => (
              <div key={index}>
                {(route?.permission1 === myProfile?.role ||
                  route?.permission2 === myProfile?.role) && (
                  <>
                    {route.subRoutes ? (
                      <SidebarMenu
                        setIsOpen={setIsOpen}
                        route={route}
                        showAnimation={showAnimation}
                        isOpen={isOpen}
                      />
                    ) : (
                      <Link href={route.path} passHref>
                        <div
                          className={`flex items-center text-white gap-[10px] p-2 border-r-4 border-transparent border-solid transition duration-200 ease-in-out cubic-bezier(0.6, -0.28, 0.735, 0.045) hover:bg-[#2d3359] hover:border-r-4 hover:border-white hover:transition-[0.2s cubic-bezier(0.6, -0.28, 0.735, 0.045)] ${
                            route.path === router?.asPath
                              ? "border-r-4 border-white bg-[#2d3359]"
                              : ""
                          }`}
                        >
                          <div className="icon">{route.icon}</div>
                          <AnimatePresence>
                            {isOpen && (
                              <motion.div
                                variants={showAnimation}
                                initial="hidden"
                                animate="show"
                                exit="hidden"
                                className="whitespace-nowrap text-[15px]"
                              >
                                {route.name}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </Link>
                    )}
                  </>
                )}
              </div>
            ))}
          </section>
        </motion.div>

        <div
          className={`${
            isOpen ? "w-[calc(100vw-200px)]" : "w-full"
          } flex flex-col`}
        >
          <div className="sticky top-0">
            <DashboardHeader toggle={toggle} handleLogOut={handleLogOut} />
          </div>
          <div className="flex-grow overflow-y-auto">
            <div style={{ minHeight: "calc(100vh - 100px)" }}>{children}</div>
            <footer className="footer footer-center p-4 bg-[#00073d] text-white">
              <div>
                <p>Copyright © 2023 - All right reserved by BlogWave Ltd.</p>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
