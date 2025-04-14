import Layout from "@/components/Layout";
import MDXcomponents from "@/components/MDXcomponents";
import ScrollProgressBar from "@/components/blog/ScrollProgressBar";
import SectionHeader from "@/components/essential/SectionHeader";
import PostThree from "@/components/posts/Post-3";
import { getSuggestedPosts } from "@/libs/functions/getSuggestedPosts";
import { formatDate } from "@/libs/utils/formatDate";
import { slugify } from "@/utils/slugify";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import { notFound } from "next/navigation";
import { fetchBlogs } from "@/libs/functions/getPosts";
import SetCurrentPostClient from "@/app/components/blog/SetClientPost";
import LocalizedLink from "@/app/components/LocalizedLink";
import TableOfContents from "@/app/components/blog/TableOfContents";
import CommentGroup from "@/app/components/comment/CommentGroup";

const BlogDetails = async (props) => {
  const params = await props.params;
  const locale = params.locale;
  const slug = params.slug;

  const allPosts = await fetchBlogs(locale);

  const currentPost = allPosts.find((post) => post.slug === slug);

  if (!currentPost) {
    return notFound();
  }

  const { title, category, image, date, author, authorImage, readingTime } =
    currentPost.frontmatter;

  const content = await currentPost.content;

  // get first 3 suggested posts
  const suggestedPosts = getSuggestedPosts(allPosts, slug, category);

  return (
    <>
      <SetCurrentPostClient currentPost={currentPost} />
      <Layout>
        <div className="bg-homeSection1">
          <div id="post-header" className="py-16 sm:py-20 overflow-clip">
            <div className="container">
              <div className="row lg:flex-nowrap items-center">
                <div className="lg:col-6 text-center lg:text-left">
                  <div className="mb-6 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-x-4 gap-y-1">
                    <LocalizedLink
                      href={`/category/${slugify(category)}`}
                      className="uppercase bg-white/10 border border-border rounded-md px-3 py-2 text-sm block text-dark hover:text-white hover:bg-dark transition-all duration-300 w-fit lg:mx-0"
                    >
                      {category}
                    </LocalizedLink>
                    <span className="font-extralight opacity-40">—</span>

                    <p>{formatDate(date)}</p>
                  </div>

                  <h1 className="text-3xl md:text-4xl !leading-relaxed mb-6 text-balance">
                    {title}
                  </h1>

                  <ul className="flex flex-wrap items-center justify-center lg:justify-start gap-3 gap-y-1 uppercase text-sm text-dark mb-14">
                    <li>
                      <LocalizedLink
                        href={`/author/${slugify(author)}`}
                        className="flex items-center hover:text-dark hover:underline transition-all duration-300"
                      >
                        <Image
                          src={authorImage}
                          alt={`Author of the post - ${author}`}
                          height={24}
                          width={24}
                          className="h-6 w-6 border border-[#ABABAB] rounded-full mr-2 bg-white/40"
                        />
                        {author}
                      </LocalizedLink>
                    </li>
                    <li>•</li>
                    <li>{readingTime}</li>
                  </ul>
                </div>
                <div className="lg:col-8">
                  <div className="relative w-full h-[380px] lg:h-[460px]">
                    <Image
                      className="rounded-xl object-cover bg-dark/10"
                      fill
                      src={image}
                      alt={title}
                      sizes="(max-width: 768px) 400px, (max-width: 1200px) 500px, 700px"
                    />

                    {/* prettier-ignore */}
                    <svg className="absolute bottom-0 left-[96px] md:left-[104px] lg:left-[63px] z-20 rotate-[270deg] w-4 h-4 text-light" width="101" height="101" viewBox="0 0 101 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M101 0H0V101H1C1 45.7715 45.7715 1 101 1V0Z" fill="currentColor"></path></svg>
                    {/* prettier-ignore */}
                    <svg className="absolute bottom-0 lg:bottom-[71px] left-[95px] md:left-[102px] lg:left-0 z-20 rotate-[270deg] w-4 h-4 text-light" width="101" height="101" viewBox="0 0 101 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M101 0H0V101H1C1 45.7715 45.7715 1 101 1V0Z" fill="currentColor"></path></svg>

                    <div className="bg-[#f6f5ed] border-8 border-light w-24 sm:w-28 absolute -bottom-10 left-3 lg:-left-12 rounded-full p-3 text-[15px] font-bold">
                      {/* prettier-ignore */}
                      <svg className="uppercase" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <path id="circlePath" d="M 10, 50 a 40,40 0 1,1 80,0 40,40 0 1,1 -80,0" fill="none" />
                    <text><textPath href="#circlePath" className="font-light tracking-[0.07em] text-sm">
                      — scroll down — read more
                    </textPath></text>
                  </svg>

                      {/* prettier-ignore */}
                      <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary" width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 1C9 0.447715 8.55228 -2.41412e-08 8 0C7.44772 2.41412e-08 7 0.447715 7 1L9 1ZM7.29289 17.7071C7.68342 18.0976 8.31658 18.0976 8.70711 17.7071L15.0711 11.3431C15.4616 10.9526 15.4616 10.3195 15.0711 9.92893C14.6805 9.53841 14.0474 9.53841 13.6569 9.92893L8 15.5858L2.34315 9.92893C1.95262 9.53841 1.31946 9.53841 0.928933 9.92893C0.538408 10.3195 0.538408 10.9526 0.928933 11.3431L7.29289 17.7071ZM7 1L7 17L9 17L9 1L7 1Z" fill="currentColor"/></svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container hidden lg:block">
            <div className="row">
              <div className="col-12 mt-2">
                <hr className="border-[#DBD8BD]" />
              </div>
            </div>
          </div>

          <ScrollProgressBar title={title} />

          {/* Content */}
          <div className="lg:pt-20 pb-16 sm:pb-20 overflow-clip">
            <div className="container">
              <div className="row g-6">
                <div className="lg:col-8 xl:col-9">
                  <div className="block lg:hidden mb-8">
                    <TableOfContents />
                  </div>
                  <div id="post-content" className="prose content max-w-none">
                    <MDXRemote source={content} components={MDXcomponents} />
                  </div>

                  <div className="block lg:hidden mt-14 [&_p]:!text-start [&_ul]:!justify-start [&_hr]:!ml-0">
                    {/* <SharePost title={title} slug={slug} /> */}
                  </div>
                </div>

                <div className="lg:col-4 xl:col-3 hidden lg:block">
                  <div className="sticky top-16">
                    <TableOfContents />
                    {/* <SharePost title={title} slug={slug} /> */}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Comment */}
          <CommentGroup blogId={currentPost.id} />
          <section className="pb-16 sm:pb-24">
            <SectionHeader
              title="Bài viết liên quan"
              buttonLabel="Tất cả bài viết"
              buttonLink="/blog"
            />

            <div className="container mt-12">
              <div className="row gy-6">
                {suggestedPosts.map((post, key) => (
                  <div
                    key={`${key}-${post.title}`}
                    className="md:col-6 lg:col-4"
                  >
                    <PostThree post={post} imageHeight={true} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </Layout>
    </>
  );
};

export default BlogDetails;
