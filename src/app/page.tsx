import BlogCard from "@/components/blogCard/BlogCard";
import { blogs } from "@/lib/data";

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl text-center my-2">Blog Website</h1>
      <BlogCard data={blogs}/>
    </div>
  );
}
