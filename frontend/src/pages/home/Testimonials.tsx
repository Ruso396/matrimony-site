import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

interface Testimonial {
  id: number;
  image: string;
  quote: string;
  name: string;
  title: string;
  rating: number;
}

const StarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-5 h-5 text-yellow-500"
  >
    <path
      fillRule="evenodd"
      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.007z"
      clipRule="evenodd"
    />
  </svg>
);

const testimonialsData: Testimonial[] = [
  {
    id: 1,
    image: "https://i.pravatar.cc/100?img=12",
    quote:
      "This platform truly changed my life. I met my partner here, and everything was simple, secure, and professional from start to finish.",
    name: "Caleb Delaney",
    title: "Research Scientist",
    rating: 5,
  },
  {
    id: 2,
    image: "https://i.pravatar.cc/100?img=47",
    quote:
      "The experience was smooth and enjoyable. The website design is intuitive, and I felt safe and supported throughout the process.",
    name: "Ursula Crane",
    title: "Software Engineer",
    rating: 5,
  },
  {
    id: 3,
    image: "https://i.pravatar.cc/100?img=36",
    quote:
      "I love how genuine and transparent the community is here. It's refreshing to see a service that truly values real connections.",
    name: "Jackson Guerrero",
    title: "Entrepreneur",
    rating: 5,
  },
  {
    id: 4,
    image: "https://i.pravatar.cc/100?img=11",
    quote:
      "A wonderful experience from start to finish. The matching process felt personal and very accurate.",
    name: "Aiden Reed",
    title: "UX Designer",
    rating: 4,
  },
  {
    id: 5,
    image: "https://i.pravatar.cc/100?img=49",
    quote:
      "I appreciate the professionalism and attention to detail. It really made me trust the platform instantly.",
    name: "Sophia Bennett",
    title: "Marketing Head",
    rating: 5,
  },
  {
    id: 6,
    image: "https://i.pravatar.cc/100?img=33",
    quote:
      "The whole experience felt elegant and well-organized. I’d recommend it to anyone looking for something genuine.",
    name: "Liam Foster",
    title: "Photographer",
    rating: 5,
  },
  {
    id: 7,
    image: "https://i.pravatar.cc/100?img=50",
    quote:
      "The interface is beautiful, and the support team is always there to help. I couldn’t have asked for more.",
    name: "Olivia Hayes",
    title: "Architect",
    rating: 4,
  },
  {
    id: 8,
    image: "https://i.pravatar.cc/100?img=15",
    quote:
      "A great platform that brings people together in a truly meaningful way. I found my perfect match here!",
    name: "Noah Patel",
    title: "Doctor",
    rating: 5,
  },
];

const Testimonials: React.FC = () => {
  return (
    <>
      <style>
        {`
          .testimonial-slider .swiper-pagination {
            position: static;
            margin-top: 2rem;
          }
          .testimonial-slider .swiper-pagination-bullet {
            width: 10px;
            height: 10px;
            background-color: #444;
            opacity: 1;
            margin: 0 5px;
            transition: all 0.3s ease;
          }
          .testimonial-slider .swiper-pagination-bullet-active {
            width: 28px;
            border-radius: 6px;
            background-color: #78350F; /* amber-900 */
          }
        `}
      </style>

      <section className="py-20 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-amber-900 mb-14 tracking-tight">
            What Our Members Say
          </h2>

          <Swiper
            className="testimonial-slider"
            modules={[Pagination, Autoplay]}
            loop={true}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
            }}
            spaceBetween={35}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {testimonialsData.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <div className="bg-white border border-amber-900 rounded-2xl p-8 pt-14 mt-12 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative flex flex-col min-h-[320px]">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 p-1 bg-gradient-to-br from-amber-900 via-amber-700 to-amber-600 rounded-full">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-20 h-20 rounded-full border-4 border-white shadow-lg"
                    />
                  </div>

                  <p className="text-gray-700 text-base italic text-center flex-grow leading-relaxed">
                    “{testimonial.quote}”
                  </p>

                  <hr className="border-t border-amber-900 my-5" />

                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">
                        {testimonial.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {testimonial.title}
                      </p>
                    </div>
                    <div className="flex">
                      {Array.from({ length: testimonial.rating }).map(
                        (_, index) => (
                          <StarIcon key={index} />
                        )
                      )}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </>
  );
};

export default Testimonials;
