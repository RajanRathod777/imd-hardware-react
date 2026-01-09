import { useStore } from "../../../stores/useStore";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Link } from "react-router";

const CategoryViewer = () => {
  const apiUrl = import.meta.env.VITE_SERVER_API_URL;
  const { categories } = useStore();

  // Splide Display
  return (
    <section className="p-2">
      {/* Name */}
      <h3
        className="py-3 text-left "
        style={{
          color: "var(--color-text-primary)",
          fontFamily: "var(--font-heading)",
          fontSize: "var(--text-2xl)",
          fontWeight: "var(--font-bold)",
        }}
      >
        Popular Categories
      </h3>
      <div className="slider-out-pagination">
        <Swiper
          modules={[Pagination, Navigation]}
          spaceBetween={15}
          slidesPerView={2}
          pagination={{ clickable: true }}
          breakpoints={{
            320: { slidesPerView: 2 },
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 5 },
          }}
          className="py-4 !pb-8"
        >
          {categories.map((category) => (
            <SwiperSlide
              key={category.product_category_id}
              className="max-w-[200px] border border-[var(--color-border)] rounded-full"
            >
              <Link href={`/products?category=${category.name}`}>
                <div className="relative w-full h-full  aspect-[1/1] overflow-hidden">
                  {/* Image */}
                  <div className="w-full h-full hover:scale-101 ">
                    <img
                      src={`${apiUrl}/image/productCategory/${category.image[0]}`}
                      alt={category.name}
                      className="w-full h-full object-fit rounded-full"
                    />
                  </div>

                  {/* Name */}
                  <h3
                    className="absolute bottom-0 text-center w-full py-1 rounded-full"
                    style={{
                      color: "var(--color-text-on-primary)",
                      backgroundColor: "var(--color-text-primary)",
                      opacity: 0.8,
                      fontSize: "var(--text-base)",
                    }}
                  >
                    {category.name}
                  </h3>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default CategoryViewer;
