import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaAngleDown } from "react-icons/fa";

const menuAnimation = {
  hidden: {
    opacity: 0,
    height: 0,
    padding: 0,
    transition: { duration: 0.3, when: "afterChildren" },
  },
  show: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.3,
      when: "beforeChildren",
    },
  },
};
const menuItemAnimation = {
  hidden: (i) => ({
    padding: 0,
    x: "-100%",
    transition: {
      duration: (i + 1) * 0.1,
    },
  }),
  show: (i) => ({
    x: 0,
    transition: {
      duration: (i + 1) * 0.1,
    },
  }),
};

const SidebarMenu = ({ route, showAnimation, isOpen, setIsOpen }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsOpen(true);
  };

  useEffect(() => {
    if (!isOpen) {
      setIsMenuOpen(false);
    }
  }, [isOpen]);

  return (
    <>
      <div
        className="flex text-white flex-row items-center p-2 border-r-4 border-transparent justify-between cursor-pointer transition-[0.2s cubic-bezier(0.6, -0.28, 0.735, 0.045)] hover:bg-[#2d3359]"
        onClick={toggleMenu}
      >
        <div className="flex items-center gap-[10px]">
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
        {isOpen && (
          <motion.div
            animate={
              isMenuOpen
                ? {
                    rotate: -90,
                  }
                : { rotate: 0 }
            }
          >
            <FaAngleDown />
          </motion.div>
        )}
      </div>{" "}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={menuAnimation}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="flex flex-col"
          >
            {route.subRoutes.map((subRoute, i) => (
              <motion.div variants={menuItemAnimation} key={i} custom={i}>
                <Link href={subRoute.path} passHref>
                  <motion.div className="flex text-white gap-[10px] border-r-4 border-r-transparent no-underline transition-[0.2s] pl-5 py-[5px] px-[10px] border-b-[1px] transition-[0.2s cubic-bezier(0.6, -0.28, 0.735, 0.045)] hover:transition-[0.2s cubic-bezier(0.6, -0.28, 0.735, 0.045)] hover:bg-[#2d3359] hover:border-r-4 hover:border-white">
                    <div className="icon">{subRoute.icon}</div>
                    <motion.div className="text-[15px] whitespace-nowrap">
                      {subRoute.name}
                    </motion.div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SidebarMenu;
