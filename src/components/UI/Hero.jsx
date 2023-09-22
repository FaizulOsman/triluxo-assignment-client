import React from "react";

const Hero = () => {
  return (
    <div>
      <div class="container flex flex-col mx-auto bg-white">
        <div class="grid w-full grid-cols-1 my-12 md:grid-cols-2 xl:gap-14 md:gap-5">
          <div class="flex flex-col justify-center col-span-1 text-center lg:text-start">
            <div class="flex items-center justify-center mb-4 lg:justify-normal">
              <img
                class="h-5"
                src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/logos/logo-1.png"
                alt="logo"
              />
              <h4 class="ml-2 text-sm font-bold tracking-widest text-primary uppercase">
                Explore the Latest Blogs
              </h4>
            </div>
            <h1 class="mb-8 text-4xl font-extrabold leading-tight lg:text-5xl text-dark-grey-900">
              Welcome to the World of Knowledge: Explore Our Blog
            </h1>
            <p class="mb-6 text-base font-normal leading-7 lg:w-3/4 text-grey-900">
              Step into a world of discovery and enlightenment as you explore
              our blog. Our carefully curated content covers a wide array of
              topics, ensuring there is something for every curious mind. Join
              us on this journey of knowledge, where we share insights, ideas,
              and inspiration to spark your intellectual curiosity and expand
              your horizons.
            </p>
            <div class="flex flex-col items-center gap-4 lg:flex-row">
              <button class="flex items-center py-4 text-sm font-bold text-white px-7 bg-blue-500 hover:bg-purple-blue-600 focus:ring-4 focus:ring-purple-blue-100 transition duration-300 rounded-xl">
                Get started now
              </button>
            </div>
          </div>
          <div class="items-center justify-end hidden col-span-1 md:flex">
            <img
              class="w-4/5 rounded-md"
              src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/header-1.png"
              alt="header image"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
