import LocalizedLink from "@/app/components/LocalizedLink";
import SetCurrentCategoryClient from "@/app/components/SetClientCategory";
import Layout from "@/components/Layout";
import PostBlack from "@/components/posts/PostBlack";
import { popularCategories } from "@/functions/categories";
import {
  fetchCategories,
  formatWithLocalization,
} from "@/libs/functions/getCategories";
import { fetchBlogs } from "@/libs/functions/getPosts";
import { slugify } from "@/libs/utils/slugify";
import styles from "@/styles/modules/Style.module.scss";
import { notFound } from "next/navigation";

const CategorySingle = async (props) => {
  const params = await props.params;
  const slug = params.category;
  const locale = params.locale;
  const allPosts = await fetchBlogs(locale);
  const posts = allPosts.filter((post) => {
    return post.frontmatter.categorySlug === slug;
  });

  if (!posts) {
    return notFound();
  }

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
  const postsPattern = generatePattern(posts.length);
  const allCategories = await fetchCategories(locale);
  const categories = popularCategories(posts).map((category) =>
    formatWithLocalization(category, allCategories)
  );
  console.log("🚀 ~ CategorySingle ~ categories:", categories);

  return (
    <>
      <SetCurrentCategoryClient currentCategory={categories[0]} />
      <Layout>
        <div className="bg-blogSection bg-cover bg-no-repeat min-h-[calc(100vh-542px)]">
          <section className="py-16 md:py-24 border-b border-border overflow-clip">
            <div className="container">
              <div className="row items-end gy-4">
                <div className="col-12">
                  <p className="flex items-center justify-center gap-x-2 mb-6 sm:mb-8">
                    <span>CHỦ ĐỀ</span>
                  </p>
                  <h1 className="text-4xl md:text-5x text-white font-normal text-balance leading-tight capitalize relative z-10 mix-blend-difference text-center">
                    <span className="inline-block bg-white w-6 md:w-10 h-px align-middle mr-4 md:mr-6"></span>
                    {slug.split("-").join(" ")}
                    <span className="inline-block bg-white w-6 md:w-10 h-px align-middle ml-4 md:ml-6"></span>
                  </h1>
                </div>

                <div className="md:col-10 mx-auto">
                  <div className="post-card mt-8 sm:mt-16">
                    <div className="post-category !static !flex flex-wrap gap-2 sm:gap-3 justify-center">
                      {categories.map((category, key) => (
                        <LocalizedLink
                          className={`min-h-[40px] py-2 px-3 border-border transition-all duration-300 hover:bg-dark hover:text-white hover:border-dark !flex items-center gap-x-1 sm:w-auto w-[calc(50%-0.5rem)] justify-center text-center ${slug === slugify(category.name)
                              ? "bg-dark text-white border-dark"
                              : ""
                            }`}
                          href={`/category/${slugify(category.name)}`}
                          key={key}
                        >
                          {category.name}
                          {category.count > 1 && (
                            <span className="bg-primary text-white h-5 w-5 leading-5 rounded-full inline-block text-center text-xs ml-1">
                              {category.count}
                            </span>
                          )}
                        </LocalizedLink>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className={`${styles.waveBg} py-16 md:py-24 overflow-clip`}>
            <div className="container">
              <div className="row g-6 justify-center">
                {posts.map((post, index) => (
                  <div
                    key={index}
                    className={`${postsPattern.includes(index) ? "lg:col-5" : "lg:col-7"
                      }`}
                  >
                    <PostBlack post={post} color="text2" />
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

export default CategorySingle;
