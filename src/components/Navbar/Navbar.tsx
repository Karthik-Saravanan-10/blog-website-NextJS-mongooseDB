"use client";
import { useState } from "react";
import person from "../../../public/person.jpg";
import Image from "next/image";
const Navbar = () => {
  const isLogged = true;
  const [logClick, setLogClick] = useState(false);
  const loggedHandler = () => {
    setLogClick((prev) => !prev);
  };
  return (
    <div className="shadow-2xl flex justify-between px-20 py-2">
      <div>
        <h1 className="text-xl">Blog</h1>
      </div>
      <div>
        {isLogged ? (
          <div>
            <button onClick={loggedHandler}>
              <Image
                src={person}
                alt={"profile"}
                width={70}
                className="rounded-full"
              />
            </button>
            {logClick && (
              <div className="flex gap-3 absolute right-8">
                <button onClick={loggedHandler}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <button className="bg-green-500 text-white px-2 rounded-lg ">
                  Log out
                </button>
                <button>Create</button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex gap-3">
            <button className="bg-green-500 text-white px-2 rounded-lg ">
              Log in
            </button>
            <button>Register</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
