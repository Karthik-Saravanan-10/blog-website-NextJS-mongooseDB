"use client";
import { useState } from "react";
import person from "../../../public/person.jpg";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Navbar = () => {
  const [logClick, setLogClick] = useState(false);
  const { data: session } = useSession();
  const loggedHandler = () => {
    setLogClick((prev) => !prev);
  };
  return (
    <div className="shadow-2xl flex justify-between px-20 py-2">
      <div>
        <h1 className="text-xl">Blog</h1>
      </div>
      <div>
        {session?.user ? (
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
                <button
                  className="bg-green-500 text-white px-2 rounded-lg"
                  onClick={() => signOut()}
                  //onClick={() => console.log(data.update())}
                >
                  Log out
                </button>
                <Link href={"/create-blog"}>
                  {" "}
                  <button>Create</button>
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div className="flex gap-3">
            <button
              className="bg-green-500 text-white px-2 rounded-lg "
              onClick={() => signIn()}
            >
              Log in
            </button>
            <Link href={'/register'}><button>Register</button></Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
