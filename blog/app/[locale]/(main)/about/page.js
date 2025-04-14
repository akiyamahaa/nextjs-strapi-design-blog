import Layout from "@/components/Layout";
import aboutData from "@/data/pages/about.json";
import Image from "next/image";
import avatar from "@/public/images/img/avatar.jpg";

export const metadata = {
  title: aboutData.frontmatter.title,
  description: aboutData.frontmatter.description,
};

const About = () => {
  const { title, banner, about_info, authors } = aboutData.frontmatter;

  return (
    <Layout>
      <div
        className={`bg-aboutBanner px-3 md:px-10 xl:px-1 py-24 text-center text-white`}
      >
        <div className="container relative">
          <div className="relative w-full max-w-4xl mx-auto z-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl text-white font-normal text-balance !leading-snug capitalize relative z-10 mix-blend-difference">
              Thiết kế không chỉ là cái đẹp – mà là cách mọi thứ vận hành.
            </h1>
          </div>
          <p className="mt-8 font-light w-full max-w-lg mx-auto"></p>
        </div>
      </div>

      <div className="py-16 sm:py-24 bg-bgAbout bg-cover">
        <div className="container">
          <div className="row justify-center">
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl mb-8 !leading-snug">
                Đôi nét về mình
              </h2>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-center items-center gap-8">
            <div className="w-1/3 rounded-3xl overflow-hidden">
              <img
                src={
                  "https://i.pinimg.com/736x/8e/de/53/8ede538fcf75a0a1bd812810edb50cb7.jpg"
                }
                alt="avatar"
                width={"100%"}
                className=""
              />
            </div>
            <div className="w-2/3 space-y-4">
              <p className="mt-4 text-gray-700 text-lg leading-relaxed">
                Chào bạn! Mình là{" "}
                <span className="font-semibold text-blue-700">Gojo Satoru</span>,  
                một designer với niềm đam mê mãnh liệt với thế giới UI/UX – nơi mà thiết kế không chỉ để nhìn đẹp, mà còn để giải quyết vấn đề.
              </p>
              <p className="mt-4 text-gray-700 text-lg leading-relaxed">
                Thiết kế giao diện (UI) và trải nghiệm người dùng (UX) không chỉ là công việc của sự sáng tạo, mà còn là hành trình tìm hiểu con người – từ hành vi, thói quen đến cảm xúc. Mình tin rằng một thiết kế tốt là khi người dùng không cần nghĩ – mọi thứ đều mượt mà, tự nhiên, và khiến họ muốn quay lại lần nữa.
              </p>
              <p className="mt-4 text-gray-700 text-lg leading-relaxed">
                Blog này là không gian mình chia sẻ góc nhìn về thiết kế số hiện đại, từ những nguyên tắc nền tảng đến các xu hướng UI/UX mới nhất, công cụ thiết kế hiệu quả, và cả những bài học thực tế trong nghề. Nếu bạn là designer đang học hỏi, developer muốn hiểu UX hơn, hoặc đơn giản là người yêu cái đẹp có chức năng – thì bạn đang ở đúng chỗ!
              </p>
              <p className="mt-4 text-gray-700 text-lg font-bold leading-relaxed">
                Cùng nhau thiết kế nên những trải nghiệm tuyệt vời – vì người dùng xứng đáng được tận hưởng điều tốt nhất. ✨
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
