import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { Star } from "lucide-react";
import Loading from "../../../../components/Loading";
import "swiper/css";
import "swiper/css/pagination";

const ProductReviews = ({
  reviews,
  pagination,
  reviewsLoading,
  onPageChange,
}) => {
  const [currentReviewPage, setCurrentReviewPage] = useState(1);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= pagination?.totalPages) {
      setCurrentReviewPage(page);
      onPageChange(page);
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={16}
        className={index < rating ? "" : ""}
        style={
          index < rating
            ? {
                fill: "var(--color-secondary)",
                color: "var(--color-secondary)",
              }
            : { color: "var(--color-border-strong)" }
        }
      />
    ));
  };

  return (
    <div
      className="mt-16 border-t pt-12"
      style={{ borderColor: "var(--color-border)" }}
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2
            className="mb-2"
            style={{
              fontSize: "var(--text-3xl)",
              color: "var(--color-text-primary)",
              fontFamily: "var(--font-heading)",
              fontWeight: "var(--font-bold)",
            }}
          >
            Customer Reviews
          </h2>
          {pagination && (
            <p
              className="flex items-center gap-2"
              style={{ color: "var(--color-text-secondary)" }}
            >
              reviews
              <span
                style={{
                  color: "var(--color-text-primary)",
                  fontWeight: "var(--font-semibold)",
                }}
              >
                {pagination.totalReviews}
              </span>
            </p>
          )}
        </div>
      </div>

      <ReviewsCarousel
        reviews={reviews || []}
        reviewsLoading={reviewsLoading}
        renderStars={renderStars}
        pagination={pagination}
        currentReviewPage={currentReviewPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

const ReviewsCarousel = ({
  reviews,
  reviewsLoading,
  renderStars,
  pagination,
  currentReviewPage,
  onPageChange,
}) => {
  if (reviewsLoading) {
    return <Loading />;
  }

  if (!reviews || reviews.length === 0) {
    return (
      <div
        className="text-center py-16 rounded-lg border"
        style={{
          backgroundColor: "var(--color-surface)",
          borderColor: "var(--color-border-light)",
        }}
      >
        <Star
          size={48}
          className="mx-auto mb-4"
          style={{ color: "var(--color-border-strong)" }}
        />
        <p
          className="mb-2"
          style={{
            fontSize: "var(--text-xl)",
            color: "var(--color-text-secondary)",
            fontWeight: "var(--font-semibold)",
          }}
        >
          No reviews yet
        </p>
        <p
          className="max-w-md mx-auto"
          style={{ color: "var(--color-text-muted)" }}
        >
          Be the first to share your experience with this product and help other
          customers make informed decisions.
        </p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Swiper Carousel */}
      <Swiper
        modules={[Pagination, Navigation]}
        spaceBetween={24}
        slidesPerView={3}
        pagination={{ clickable: true }}
        navigation={true}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 3 },
        }}
        className="pb-12"
      >
        {reviews.map((review) => (
          <SwiperSlide key={review.review_id}>
            <ReviewCard review={review} renderStars={renderStars} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Pagination Info */}
      {pagination && pagination.totalPages > 1 && (
        <div
          className="flex items-center justify-center mt-12 pt-6 border-t"
          style={{ borderColor: "var(--color-border)" }}
        >
          <div
            className="px-4 py-2 rounded-lg border"
            style={{
              fontSize: "var(--text-sm)",
              color: "var(--color-text-secondary)",
              backgroundColor: "var(--color-bg)",
              borderColor: "var(--color-border)",
            }}
          >
            Page{" "}
            <span
              style={{
                color: "var(--color-text-primary)",
                fontWeight: "var(--font-semibold)",
              }}
            >
              {currentReviewPage}
            </span>{" "}
            of{" "}
            <span
              style={{
                color: "var(--color-text-primary)",
                fontWeight: "var(--font-semibold)",
              }}
            >
              {pagination.totalPages}
            </span>
            {" • "}
            <span
              style={{
                color: "var(--color-text-primary)",
                fontWeight: "var(--font-semibold)",
              }}
            >
              {pagination.totalReviews}
            </span>{" "}
            total reviews
          </div>
        </div>
      )}
    </div>
  );
};

const ReviewCard = ({ review, renderStars }) => (
  <div
    className="rounded-lg border p-5 transition-all duration-300 group h-full"
    style={{
      backgroundColor: "var(--color-surface)",
      borderColor: "var(--color-border-light)",
    }}
  >
    <div className="flex flex-col gap-4">
      <div className="w-full">
        <div
          className="flex items-center gap-1.5 border rounded-lg px-2 py-1 w-fit"
          style={{
            backgroundColor: "var(--color-bg)",
            borderColor: "var(--color-border-light)",
          }}
        >
          <div className="flex items-center gap-0.5">
            {renderStars(review.rating)}
          </div>
          <span
            style={{
              fontSize: "var(--text-xs)",
              color: "var(--color-text-secondary)",
              fontWeight: "var(--font-bold)",
            }}
          >
            {review.rating}
          </span>
        </div>
      </div>

      <div className="">
        <div>
          <h3
            className="h-12 flex items-center transition-colors line-clamp-2"
            style={{
              fontSize: "var(--text-base)",
              color: "var(--color-text-primary)",
              fontWeight: "var(--font-bold)",
            }}
          >
            {review.review_title}
          </h3>
        </div>
      </div>

      <p
        className="h-24 leading-relaxed mb-2 line-clamp-4"
        style={{
          fontSize: "var(--text-sm)",
          color: "var(--color-text-secondary)",
        }}
      >
        {review.review_text}
      </p>
    </div>
  </div>
);

export default ProductReviews;
