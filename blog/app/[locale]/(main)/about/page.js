import Layout from "@/components/Layout";
import aboutData from "@/data/pages/about.json";
import styles from "@/styles/modules/Style.module.scss";
import Image from "next/image";
import avatar from "@/public/images/img/avatar.jpg";
export const metadata = {
  title: aboutData.frontmatter.title,
  description: aboutData.frontmatter.description,
};

const About = () => {
  const { title, banner, about_info, authors } = aboutData.frontmatter;

  console.log(banner.image_01);

  return (
    <Layout>
      <div
        className={`${styles.waveBg} px-3 md:px-10 xl:px-1 py-24 text-center text-white`}
      >
        <div className="container relative">
          <div className="relative w-full max-w-4xl mx-auto z-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl text-white font-normal text-balance !leading-snug capitalize relative z-10 mix-blend-difference">
              Lịch sử không chỉ là quá khứ, mà là chiếc gương phản chiếu tương
              lai.
            </h1>
          </div>
          <p className="mt-8 font-light w-full max-w-lg mx-auto"></p>
        </div>
      </div>

      <div className="py-16 sm:py-24">
        <div className="container">
          <div className="row justify-center">
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl mb-8 !leading-snug">
                Đôi chút về bản thân
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
                Xin chào! Mình là{" "}
                <span className="font-semibold text-blue-700">Gojo Satoru</span>
                một người đam mê lịch sử đến mức có thể ngồi hàng giờ chỉ để nói
                về những câu chuyện đã qua hàng trăm, thậm chí hàng nghìn năm
                trước. 📜
              </p>
              <p className="mt-4 text-gray-700 text-lg leading-relaxed">
                Bạn từng nghĩ lịch sử chỉ là những mốc thời gian khô khan và
                những cái tên khó nhớ? Thật ra, lịch sử là một kho tàng những
                câu chuyện kỳ lạ, ly kỳ, cảm động và đầy cảm hứng – nơi bạn có
                thể gặp gỡ những con người vĩ đại, những bước ngoặt định hình cả
                thế giới, hay những điều nhỏ bé nhưng đầy thú vị về cuộc sống
                ngày xưa.
              </p>
              <p className="mt-4 text-gray-700 text-lg leading-relaxed">
                Blog này là nơi mình chia sẻ lịch sử theo cách gần gũi, sinh
                động và dễ tiếp cận, không giáo điều, không khô khan. Dù bạn là
                người yêu thích khám phá quá khứ, hay chỉ đơn giản muốn biết
                thêm vài chuyện hay ho về thế giới đã từng tồn tại – mình rất
                vui được đồng hành cùng bạn trong hành trình này! 🕰️
              </p>
              <p className="mt-4 text-gray-700 text-lg font-bold leading-relaxed">
                Cùng nhau khám phá dòng chảy lịch sử – để hiểu hiện tại và nhìn
                về tương lai! 🌍
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
