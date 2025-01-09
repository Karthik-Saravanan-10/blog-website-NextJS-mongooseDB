"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const BlogPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Nature");
  const [imageURL, setImg] = useState("");
  const { data: session, status } = useSession();

  const blogHandler = async () => {
    if (!title || !description || !category || !imageURL) {
      toast.error("fill the field");
      return;
    }

    if (status == "loading") {
      return <p>Loading....</p>;
    }

    if (status == "unauthenticated") {
      return <p>Error</p>;
    }

    try {
      // const res = await fetch("http://localhost:3000/api/blog", {
      //   headers: {
      //     "Content-Type": "application/json",
      //      'Authorization': `Bearer ${session?.user?.accessToken}`
      //   },
      //   method: "POST",
      //   body: JSON.stringify({ title, description, category, imageURL,session?.user?.accessToken}),
      // });
    } catch (error) {
      toast.error("error");
    }
  };

  return (
    <div className="w-fit p-5 m-10 shadow-2xl">
      <h2>Create Blog</h2>
      <div className="flex flex-col gap-5 mt-2">
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="border-2 rounded"
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          name="description"
          placeholder="description"
          className="border-2 rounded"
          onChange={(e) => setDescription(e.target.value)}
        />
        <select
          name="category"
          id="category"
          className="border-2 rounded"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Nature">Nature</option>
          <option value="Mountain">Mountain</option>
          <option value="Ocean">Ocean</option>
          <option value="Wildlife">Wildlife</option>
          <option value="Forest">Forest</option>
        </select>
        <input
          type="text"
          name="img"
          placeholder="image URL link"
          className="border-2 rounded"
          onChange={(e) => setImg(e.target.value)}
        />
        <button className="p-2 rounded bg-green-400" onClick={blogHandler}>
          Add Blog
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default BlogPage;
