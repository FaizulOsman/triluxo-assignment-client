import Image from "next/image";
import Link from "next/link";
import React from "react";

const NotFoundPage = () => {
  return (
    <div>
      <section className="text-gray-600 body-font container">
        <div className="container mx-auto flex px-5 py-24 flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 md:pr-16 flex flex-col md:items-center md:text-left mb-16 md:mb-0 items-center text-center">
            <Image
              src="https://i.ibb.co/3YpsG7v/download.jpg"
              alt=""
              width={300}
              height={300}
            />
            <h1 className="title-font sm:text-3xl text-3xl mb-4 font-medium  text-red-500">
              PAGE NOT FOUND
            </h1>

            <div className="flex justify-center">
              <Link href="/">
                <button className="inline-flex text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg">
                  Back Home
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NotFoundPage;
