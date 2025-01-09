"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setName] = useState("");
  const [password, setPassword] = useState("");

  const registerHandler = async () => {
    if (!email || !username || !password) {
      toast.error("empty fields");
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/api/register', {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ username, email, password }),
      });

      if (res?.ok) {
        toast.success("registered SucessFully");
        setTimeout(() => {
          signIn();
        }, 1500);
      } else {
        toast.error("error while registering");
      }
    } catch (error) {
      toast.error("error");
    }
  };

  return (
    <div className="w-fit shadow-2xl p-5 m-10">
      <h2>register</h2>
      <div className="flex flex-col gap-3">
        <input
          type="text"
          name="username"
          id="name"
          className="border-2 rounded w-72"
          placeholder="userName"
          value={username}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          className="border-2 rounded w-72"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          id="pass"
          className="border-2 rounded w-72"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-green-400 p-2 rounded" onClick={registerHandler}>
          Register
        </button>
      </div>
      <p>Already Have an Account?</p>
      <Link href={"/login"}>
        <button className="hover:underline">Log in</button>
      </Link>
      <ToastContainer />
    </div>
  );
};

export default Register;
