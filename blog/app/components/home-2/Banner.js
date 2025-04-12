import Post from "@/components/posts/Post";
import Link from "next/link";

const Banner = ({ trendingPosts, banner }) => {
  return (
    <>
      <section className={`py-20 sm:py-28 relative z-10`}>
        <div className="container">
          <div className="row justify-center items-center">
            <div className="xl:col-8 lg:col-10">
              <h1 className="lg:text-6xl md:text-5xl text-[40px] text-black !leading-snug text-center text-balance -mt-2">
                <span>{banner.heading}</span>
              </h1>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16 sm:pb-24 overflow-clip relative z-10">
        {/* prettier-ignore */}
        <div className="absolute w-[1920px] h-[728px] left-1/2 -translate-x-1/2 bottom-0 pointer-events-none">
          {/* fix svg background for large devices */}
        </div>

        {/* start of posts */}
        <div className="container">
          <div className="row xl:row-cols-4 lg:row-cols-3 sm:row-cols-2 row-cols-1 g-6">
            {trendingPosts.map((post, index) => (
              <div
                className="col xl:last:block last:hidden [&:nth-child(3)]:hidden lg:[&:nth-child(3)]:block [&:nth-child(2)]:hidden sm:[&:nth-child(2)]:block"
                key={index}
              >
                <Post post={post} />
              </div>
            ))}
          </div>

          {/* Button */}
          <div className="flex xl:hidden justify-center mt-10 sm:mt-12 relative z-50">
            <Link
              className="button button-light button-lg group animate-top-right"
              href="/blog"
            >
              <span className="relative overflow-hidden transition-none [&>span]:block">
                <span className="group-hover:-translate-y-[200%] group-hover:scale-y-[2] group-hover:rotate-12">
                  All Posts
                </span>
                <span className="absolute left-0 top-0 scale-y-[2] rotate-12 translate-y-[200%] group-hover:translate-y-0 group-hover:scale-y-100 group-hover:rotate-0">
                  All Posts
                </span>
              </span>
              <span className="overflow-hidden leading-none -translate-y-[2px]">
                {/* prettier-ignore */}
                <svg className="inline-block animate-icon" width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 9.00005L9 1.00005M9 1.00005H1.8M9 1.00005V8.20005" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
            </Link>
          </div>
        </div>
        {/* end of posts */}
      </section>
    </>
  );
};

export default Banner;
