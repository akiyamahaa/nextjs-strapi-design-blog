import { routing } from "@/i18n/routing";
import { fetchBlogs } from "@/libs/functions/getPosts";
import homepageData from "@/data/pages/_index.json";
import { popularCategories } from "@/libs/functions/categories";
import { slugify } from "@/libs/utils/slugify";
import Image from "next/image";
import { formatDate } from "@/libs/utils/formatDate";
import Layout from "@/app/components/Layout";
import LocalizedLink from "@/app/components/LocalizedLink";
import SectionHeader from "@/app/components/essential/SectionHeader";
import PostBlack from "@/app/components/posts/PostBlack";
import PostTwo from "@/app/components/posts/Post-2";
import Banner from "@/app/components/home-2/Banner";

const Home = async ({ params }) => {
  const { locale } = await params;
  if (!routing.locales.includes(locale)) {
    notFound();
  }

  const { latestArticles, popularArticles, postOfTheWeekSection } =
    homepageData.frontmatter || {};

  const allPosts = await fetchBlogs(locale);

  // All Categories with image
  const categories = popularCategories(allPosts).slice(0, 8) || [];

  // First featured post
  const allFeaturedPost =
    allPosts.filter((post) => post.frontmatter.featured) || [];
  const featuredPost = allFeaturedPost[0];

  // Fisrt post of - post of the week
  const allPostOfTheWeek =
    allPosts.filter((post) => post.frontmatter.post_of_the_week) || [];
  const postOfTheWeek = allPostOfTheWeek[0];

  // Latest posts
  const latestPosts = allPosts.slice(0, 6) || [];
  const generatePattern = (length) => {
    const pattern = [];
    for (let i = 0; i < length; i++) {
      const section = Math.floor(i / 4);
      const position = i % 4;
      if (position === 0 || position === 1) {
        pattern.push(section * 4 + position * 3);
      }
    }
    return pattern;
  };
  const latestPostsPattern = generatePattern(latestPosts.length);

  // Popular posts
  const popularPosts =
    allPosts
      .filter(
        (post) => post.slug !== featuredPost.slug && post.frontmatter.featured
      )
      .slice(0, 4) || [];

  return (
    <Layout>
      <div className="bg-homeSection1 bg-cover pt-20">
        <Banner trendingPosts={popularPosts} />
      </div>

      <div className="bg-homeSection2 bg-cover">
        {/* Explore topics */}
        <section className="pb-16 sm:pb-24">
          <SectionHeader
            title={"Khám phá các chủ đề"}
            buttonLabel={"Tất cả chủ đề"}
            buttonLink={"/category"}
            dark={false}
          />
          <div className="container mt-10 overflow-clip">
            <div className="row row-cols-3 sm:row-cols-4 lg:row-cols-6 justify-center gx-2 md:gx-4 gy-3 sm:gy-4">
              {categories.slice(0, 6).map((item, key) => (
                <div className="col" key={key}>
                  <LocalizedLink
                    href={`/category/${slugify(item.name)}`}
                    className="group"
                  >
                    <div className="overflow-hidden rounded-md sm:rounded-lg">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={200}
                        height={245}
                        className="rounded-md sm:rounded-lg bg-white/40 aspect-[5/6] object-cover transition duration-500 group-hover:brightness-75 group-hover:scale-110 group-hover:rotate-3"
                      />
                    </div>
                    <p className="font-primary text-center mt-4 text-sm sm:text-base md:text-xl overflow-hidden text-ellipsis capitalize transition duration-500 group-hover:opacity-50 tracking-wide">
                      {item.name}
                    </p>
                  </LocalizedLink>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <div className="bg-homeSection3 bg-cover">
        {/* Latest Articles */}
        {latestArticles?.enable && (
          <section className={`py-16 sm:py-24`}>
            <SectionHeader
              title={"Bài viết mới nhất"}
              buttonLabel={"Tất cả bài viết"}
              buttonLink={"/blog"}
              dark={true}
            />

            <div className="container sm:mt-6 md:mt-8 overflow-clip">
              <div className="row g-6 justify-center mt-0">
                {latestPosts.map((post, index) => (
                  <div
                    key={index}
                    className={`${
                      latestPostsPattern.includes(index)
                        ? "lg:col-5"
                        : "lg:col-7"
                    }`}
                  >
                    <PostBlack post={post} color="black" />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>

      <div className="bg-homeSection4 bg-cover">
        {/* Popular Articles */}
        {popularArticles?.enable && (
          <section className="py-16 sm:py-24">
            <SectionHeader
              title={"Bài viết được yêu thích nhất"}
              buttonLabel={"Tất cả bài viết"}
              buttonLink={"/blog?filter=popular"}
              dark={false}
            />
            <div className="container sm:mt-6 md:mt-8 overflow-clip">
              <div className="row gx-5 gy-6 mt-0">
                {popularPosts.map((post, index) => (
                  <div className="xl:col-3 lg:col-4 sm:col-6" key={index}>
                    <PostTwo post={post} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>

      {/* <div className="bg-home2 bg-cover">
        {false && postOfTheWeek && (
          <section className={`py-16 sm:py-24 overflow-clip`}>
            <div className="container">
              <div className="border-t pt-8 border-[#627669]">
                <div className="sm:flex justify-between">
                  <h2 className="text-base uppercase font-secondary pl-4 relative after:absolute after:rounded-full -mt-1 after:content-[''] after:h-2 after:w-2 after:bg-primary after:left-0 after:top-2 text-white w-fit mx-auto sm:mx-0 mb-10 sm:mb-0">
                    {postOfTheWeekSection?.title}
                  </h2>

                  <LocalizedLink
                    className="button group animate-top-right button-light w-fit hidden sm:flex"
                    href={postOfTheWeekSection?.button?.link}
                  >
                    <span className="relative overflow-hidden transition-none [&>span]:block">
                      <span className="group-hover:-translate-y-[200%] group-hover:scale-y-[2] group-hover:rotate-12">
                        {postOfTheWeekSection?.button?.label}
                      </span>
                      <span className="absolute left-0 top-0 scale-y-[2] rotate-12 translate-y-[200%] group-hover:translate-y-0 group-hover:scale-y-100 group-hover:rotate-0">
                        {postOfTheWeekSection?.button?.label}
                      </span>
                    </span>
                    <span className="overflow-hidden leading-none -translate-y-[2px]">
                      <svg className="inline-block animate-icon" width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 9.00005L9 1.00005M9 1.00005H1.8M9 1.00005V8.20005" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                  </LocalizedLink>
                </div>
              </div>
            </div>

            <div className="container mt-8">
              <article className="row g-4 lg:g-6 items-center">
                <div className="md:col-6">
                  <div className="post-card post-category-top group relative has-line-link-white">
                    <div className="relative">
                      <div
                        className={`text-white  z-10 absolute right-2 top-2 border border-white px-2 py-1 capitalize rounded-md hover:bg-gray-400`}
                      >
                        <LocalizedLink
                          href={`${locale}/category/${slugify(
                            postOfTheWeek.frontmatter.category
                          )}`}
                          className="transition duration-300  text-white border-white/30 "
                        >
                          {postOfTheWeek.frontmatter.category}
                        </LocalizedLink>
                      </div>
                      <Image
                        className="rounded-xl md:rounded-2xl h-[360px] w-full object-cover bg-white/10"
                        src={postOfTheWeek.frontmatter.image}
                        width={720}
                        height={600}
                        alt={postOfTheWeek.frontmatter.title}
                      />
                    </div>
                  </div>
                </div>

                <div className="md:col-6 text-center md:text-start">
                  <div className="post-card post-category-top group relative has-line-link-white text-white">
                    <span className="text-sm flex justify-center md:justify-start gap-2 items-center mb-3 uppercase">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.6663 2.66677H11.333V2.0001C11.333 1.82329 11.2628 1.65372 11.1377 1.5287C11.0127 1.40367 10.8432 1.33344 10.6663 1.33344C10.4895 1.33344 10.32 1.40367 10.1949 1.5287C10.0699 1.65372 9.99967 1.82329 9.99967 2.0001V2.66677H5.99967V2.0001C5.99967 1.82329 5.92944 1.65372 5.80441 1.5287C5.67939 1.40367 5.50982 1.33344 5.33301 1.33344C5.1562 1.33344 4.98663 1.40367 4.8616 1.5287C4.73658 1.65372 4.66634 1.82329 4.66634 2.0001V2.66677H3.33301C2.80257 2.66677 2.29387 2.87748 1.91879 3.25255C1.54372 3.62763 1.33301 4.13633 1.33301 4.66677V12.6668C1.33301 13.1972 1.54372 13.7059 1.91879 14.081C2.29387 14.4561 2.80257 14.6668 3.33301 14.6668H12.6663C13.1968 14.6668 13.7055 14.4561 14.0806 14.081C14.4556 13.7059 14.6663 13.1972 14.6663 12.6668V4.66677C14.6663 4.13633 14.4556 3.62763 14.0806 3.25255C13.7055 2.87748 13.1968 2.66677 12.6663 2.66677ZM13.333 12.6668C13.333 12.8436 13.2628 13.0131 13.1377 13.1382C13.0127 13.2632 12.8432 13.3334 12.6663 13.3334H3.33301C3.1562 13.3334 2.98663 13.2632 2.8616 13.1382C2.73658 13.0131 2.66634 12.8436 2.66634 12.6668V8.0001H13.333V12.6668ZM13.333 6.66677H2.66634V4.66677C2.66634 4.48996 2.73658 4.32039 2.8616 4.19536C2.98663 4.07034 3.1562 4.0001 3.33301 4.0001H4.66634V4.66677C4.66634 4.84358 4.73658 5.01315 4.8616 5.13817C4.98663 5.2632 5.1562 5.33343 5.33301 5.33343C5.50982 5.33343 5.67939 5.2632 5.80441 5.13817C5.92944 5.01315 5.99967 4.84358 5.99967 4.66677V4.0001H9.99967V4.66677C9.99967 4.84358 10.0699 5.01315 10.1949 5.13817C10.32 5.2632 10.4895 5.33343 10.6663 5.33343C10.8432 5.33343 11.0127 5.2632 11.1377 5.13817C11.2628 5.01315 11.333 4.84358 11.333 4.66677V4.0001H12.6663C12.8432 4.0001 13.0127 4.07034 13.1377 4.19536C13.2628 4.32039 13.333 4.48996 13.333 4.66677V6.66677Z" fill="currentColor"/></svg>
                      {formatDate(postOfTheWeek.frontmatter.date)}
                    </span>

                    <h3 className="text-2xl text-white leading-relaxed">
                      <LocalizedLink
                        href={postOfTheWeek.slug}
                        className="link-stretched line-link-el"
                      >
                        {postOfTheWeek.frontmatter.title}
                      </LocalizedLink>
                    </h3>

                    <ul className="flex justify-center md:justify-start flex-wrap items-center gap-3 gap-y-1 uppercase text-sm my-6 text-[#BBC5BE]">
                      <li className="flex items-center">
                        <Image
                          src={postOfTheWeek.frontmatter.authorImage}
                          alt={`Author of the post - ${postOfTheWeek.frontmatter.author}`}
                          height={24}
                          width={24}
                          className="h-6 w-6 border border-[#ABABAB] rounded-full mr-2 bg-white/10"
                        />
                        {postOfTheWeek.frontmatter.author}
                      </li>
                      <li>•</li>
                      <li>{postOfTheWeek.frontmatter.readingTime}</li>
                    </ul>

                    <LocalizedLink
                      href={postOfTheWeek.slug}
                      className="inline-block text-[#90A096] group-hover:text-white group-hover:rotate-45 transition duration-300"
                      aria-label={`Read More about ${postOfTheWeek.frontmatter.title}`}
                    >
                      <span className="h-12 w-12 flex items-center justify-center text-white bg-white/20 rounded-full has-transition">
                      <svg width="14" height="14" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.99902 18.0009L18 1.99991M18 1.99991H3.59912M18 1.99991V16.4008" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                    </LocalizedLink>
                  </div>
                </div>
              </article>

              <div className="block sm:hidden mt-12">
                <LocalizedLink
                  className="button button-lg group animate-top-right button-light w-fit mx-auto"
                  href={postOfTheWeekSection?.button?.link}
                >
                  <span className="relative overflow-hidden transition-none [&>span]:block">
                    <span className="group-hover:-translate-y-[200%] group-hover:scale-y-[2] group-hover:rotate-12">
                      {postOfTheWeekSection?.button?.label}
                    </span>
                    <span className="absolute left-0 top-0 scale-y-[2] rotate-12 translate-y-[200%] group-hover:translate-y-0 group-hover:scale-y-100 group-hover:rotate-0">
                      {postOfTheWeekSection?.button?.label}
                    </span>
                  </span>
                  <span className="overflow-hidden leading-none -translate-y-[2px]">
                    <svg className="inline-block animate-icon" width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 9.00005L9 1.00005M9 1.00005H1.8M9 1.00005V8.20005" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                </LocalizedLink>
              </div>
            </div>
          </section>
        )}
      </div> */}
    </Layout>
  );
};

export default Home;
