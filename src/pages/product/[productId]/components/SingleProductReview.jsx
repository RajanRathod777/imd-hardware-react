import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { Star } from "lucide-react";
import "swiper/css";
import "swiper/css/pagination";

const SingleProductReview = () => {
    const { productId } = useParams();
    const apiUrl = import.meta.env.VITE_SERVER_API_URL;

    const [reviews, setReviews] = useState([]);
    const [error, setError] = useState("");

    const [pagination, setPagination] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 3;

    const isFetching = useRef(false);
    const swiperRef = useRef(null);

    // ---------------- FETCH REVIEWS ----------------
    const fetchProductReviews = async (pageNumber = 1) => {
        if (!productId) return;
        if (isFetching.current) {
            console.log("Already fetching, skipping...");
            return;
        }

        try {
            console.log("FETCH PAGE:", pageNumber);
            isFetching.current = true;
            setError("");

            const res = await fetch(
                `${apiUrl}/api/v1/product-review/?page=${pageNumber}&limit=${limit}&product_id=${productId}`,
            );

            if (!res.ok) throw new Error("Failed to fetch reviews");

            const data = await res.json();

            const responseData = data.data || data;
            const newReviews = responseData.reviews || [];
            const newPagination = responseData.pagination || {};

            if (data.status && newReviews.length) {
                setReviews((prev) =>
                    pageNumber === 1 ? newReviews : [...prev, ...newReviews],
                );
                setPagination(newPagination);
                setCurrentPage(pageNumber);
            } else if (pageNumber === 1) {
                setReviews([]);
                setError(data.message || "No reviews found");
            }
        } catch (err) {
            console.error("Error fetching reviews:", err);
            setError("Failed to fetch reviews. Please try again later.");
        } finally {
            isFetching.current = false;
        }
    };

    // ---------------- TRIGGER NEXT PAGE ON SLIDE CHANGE ----------------
    const handleSlideChange = (swiper) => {
        const index = swiper.activeIndex;
        const slidesPerView = swiper.params.slidesPerView || 1;
        const totalSlides = reviews.length;
        const isNearEnd = index >= totalSlides - slidesPerView - 1;

        if (isNearEnd && pagination?.hasNextPage && !isFetching.current) {
            console.log("Fetching next page via swipe...");
            fetchProductReviews(currentPage + 1);
        }
    };

    // ---------------- INITIAL LOAD ----------------
    useEffect(() => {
        if (productId) {
            setReviews([]);
            setCurrentPage(1);
            fetchProductReviews(1);
        }
    }, [productId]);

    // ---------------- STAR RENDER ----------------
    const renderStars = (rating) =>
        Array.from({ length: 5 }, (_, index) => (
            <Star
                key={index}
                size={16}
                className={index < rating ? "fill-current" : ""}
                style={{
                    color:
                        index < rating
                            ? "var(--color-secondary)"
                            : "var(--color-border)",
                    strokeWidth: index < rating ? 0 : 2,
                }}
            />
        ));

    // ---------------- ERROR ----------------
    if (error && reviews.length === 0) {
        return (
            <div
                className="text-center py-10 px-4"
                style={{
                    color: "var(--color-danger)",
                    fontSize: "var(--text-lg)",
                }}
            >
                {error}
            </div>
        );
    }

    return (
        <div className="p-2 relative slider-out-pagination mt-6">
            {/* HEADER */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2
                        className="text-3xl font-bold"
                        style={{
                            color: "var(--color-text-primary)",
                            fontFamily: "var(--font-heading)",
                            fontSize: "var(--text-2xl)",
                            fontWeight: "var(--font-bold)",
                        }}
                    >
                        Customer Reviews
                    </h2>
                    {pagination?.totalReviews > 0 && (
                        <p
                            className="text-sm mt-1"
                            style={{ color: "var(--color-text-secondary)" }}
                        >
                            Total reviews:{" "}
                            <span className="font-semibold">
                                {pagination.totalReviews}
                            </span>
                        </p>
                    )}
                </div>

                {pagination?.totalPages > 1 && (
                    <div
                        className="px-3 py-1 rounded-lg text-sm"
                        style={{
                            backgroundColor: "var(--color-bg-alt)",
                            color: "var(--color-text-secondary)",
                            border: "1px solid var(--color-border-light)",
                        }}
                    >
                        Page {currentPage} of {pagination.totalPages}
                    </div>
                )}
            </div>

            {/* EMPTY STATE */}
            {reviews.length === 0 ? (
                <div
                    className="text-center py-16 rounded-lg"
                    style={{
                        border: "1px solid var(--color-border-light)",
                        backgroundColor: "var(--color-surface)",
                    }}
                >
                    <Star
                        size={48}
                        style={{
                            color: "var(--color-border-strong)",
                            margin: "0 auto 1rem",
                        }}
                    />
                    <p
                        className="text-xl font-semibold"
                        style={{ color: "var(--color-text-primary)" }}
                    >
                        No reviews yet
                    </p>
                    <p
                        className="text-sm mt-2"
                        style={{ color: "var(--color-text-secondary)" }}
                    >
                        Be the first to review this product
                    </p>
                </div>
            ) : (
                <div className="relative">
                    <Swiper
                        onSwiper={(swiper) => {
                            swiperRef.current = swiper;
                        }}
                        modules={[Pagination]}
                        spaceBetween={24}
                        slidesPerView={3}
                        pagination={{
                            clickable: true,
                            dynamicBullets: true,
                        }}
                        onSlideChange={handleSlideChange}
                        breakpoints={{
                            320: { slidesPerView: 1, spaceBetween: 16 },
                            640: { slidesPerView: 1.5, spaceBetween: 16 },
                            768: { slidesPerView: 2, spaceBetween: 20 },
                            1024: { slidesPerView: 3, spaceBetween: 24 },
                            1280: { slidesPerView: 3, spaceBetween: 24 },
                        }}
                        className="py-4 !pb-8"
                    >
                        {reviews.map((review, index) => (
                            <SwiperSlide
                                key={`${review.review_id || index}`}
                                className="flex flex-col !h-auto"
                            >
                                <div
                                    className="p-6 rounded-xl h-full flex flex-col transition-all duration-300 hover:shadow-lg"
                                    style={{
                                        backgroundColor: "var(--color-surface)",
                                        border: "1px solid var(--color-border-light)",
                                    }}
                                >
                                    <div className="flex items-center gap-0.5 mb-4">
                                        {renderStars(review.rating)}
                                    </div>

                                    <h3
                                        className="mb-2 line-clamp-1"
                                        style={{
                                            color: "var(--color-text-primary)",
                                            fontFamily: "var(--font-heading)",
                                            fontSize: "var(--text-lg)",
                                            fontWeight: "var(--font-semibold)",
                                        }}
                                    >
                                        {review.review_title || "No Title"}
                                    </h3>

                                    <p
                                        className="leading-relaxed flex-grow overflow-hidden"
                                        style={{
                                            color: "var(--color-text-secondary)",
                                            fontFamily: "var(--font-body)",
                                            fontSize: "var(--text-sm)",
                                            lineHeight: "1.6",
                                        }}
                                    >
                                        {review.review_text &&
                                        review.review_text.length > 150
                                            ? `${review.review_text.substring(0, 150)}...`
                                            : review.review_text ||
                                              "No review text provided"}
                                    </p>

                                    {review.reviewer_name && (
                                        <span
                                            className="text-xs mt-4 block"
                                            style={{
                                                color: "var(--color-text-tertiary)",
                                                fontStyle: "italic",
                                            }}
                                        >
                                            — {review.reviewer_name}
                                        </span>
                                    )}
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            )}
        </div>
    );
};

export default SingleProductReview;
