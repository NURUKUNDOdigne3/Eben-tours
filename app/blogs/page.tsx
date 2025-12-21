import SectionHeader from "../components/SectionHeader";
import SingleBlog from "../components/SingleBlog";
import { blogPosts } from "./blogsData";

export default function BlogsPage() {
  return (
    <>
      <SectionHeader
        title="Latest from our Journal"
        note="Our Journal"
        description="Stories, tips, and insights from the trail. Discover travel wisdom and conservation practices."
      />

      <div className="container">
        <div className="grid grid-cols-3 gap-4">
          {blogPosts.map((post) => (
            <SingleBlog key={post.id} post={post} />
          ))}
        </div>
      </div>
    </>
  );
}
