import Layout from "@/components/Layout";
import AllPosts from "@/components/posts/AllPosts";
import { fetchBlogs } from "@/libs/functions/getPosts";
import { Suspense } from "react";

export const metadata = {
  title: "Danh sách bài viết",
  description: "All of Diep's Blog Posts",
};

const AllBlog = async (props) => {
  const params = await props.params;
  const locale = params.locale;
  const postsPerPage = 8;
  const allPosts = await fetchBlogs(locale);
  // i want to sort post by date
  const sortedPosts = allPosts.sort((a, b) => {
    const dateA = new Date(
      a.frontmatter?.date || a.frontmatter?.published || 0
    );
    const dateB = new Date(
      b.frontmatter?.date || b.frontmatter?.published || 0
    );
    return dateB - dateA; // Sắp xếp giảm dần (mới nhất trước)
  });

  return (
    <Suspense
      fallback={
        <div className="text-xl text-dark font-primary font-bold fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          Loading...
        </div>
      }
    >
      <Layout>
        <AllPosts postsPerPage={postsPerPage} allPosts={sortedPosts} />
      </Layout>
    </Suspense>
  );
};

export default AllBlog;
