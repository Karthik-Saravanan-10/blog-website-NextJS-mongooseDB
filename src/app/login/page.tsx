"use client";

import { useState } from "react";
import Link from "next/link";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router=useRouter()
  const clickHandler = async () => {
    if (!email || !password) {
      toast.error("fill blanks");
    }

    if (password.length < 5) {
      toast.error("password must be minimum 5 characters");
    }

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if(res?.ok){
        router.push('/')
      }else{
        toast.error("Invalid credentials")
      }
    } catch (error) {
      toast.error("error");
    }
  };
  return (
    <div>
      <h2>Login</h2>
      <div className="flex flex-col w-fit shadow-2xl m-10 p-5 gap-5">
        <input
          type="email"
          name="email"
          className="border-2 rounded w-72"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          className="border-2 rounded w-72"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-green-400 w-fit px-2 rounded mx-28"
          onClick={clickHandler}
        >
          Login
        </button>
      </div>
      <div>
        <p>Don't have an account</p>
        <Link href={"/register"}>
          <button className="hover:underline">Register Now</button>
        </Link>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
