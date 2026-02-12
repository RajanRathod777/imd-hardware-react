import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { Star } from "lucide-react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const SingleProductReview = () => {
    const params = useParams();
    const productId = params?.productId;
    const apiUrl = import.meta.env.VITE_SERVER_API_URL;

    const [reviews, setReviews] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    // Fetch reviews on mount and when page changes
    useEffect(() => {
        if (!productId) return;

        const fetchProductReviews = async (page = 1) => {
            try {
                setLoading(true);
                const res = await fetch(
                    `${apiUrl}/api/v1/product-review/?page=${page}&limit=3&product_id=${productId}`,
                );

                if (!res.ok) throw new Error("Failed to fetch reviews");
                const data = await res.json();
                setReviews(data.reviews || []);
                setPagination(data.pagination || null);
            } catch (err) {
                console.error("Error fetching product reviews:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProductReviews(currentPage);
    }, [productId, apiUrl, currentPage]);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= pagination?.totalPages) {
            setCurrentPage(page);
        }
    };

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, index) => (
            <Star
                key={index}
                size={16}
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

    // Loading State
    if (loading) {
        return (
            <div className="flex items-center justify-center p-8">
                <div
                    className="animate-spin rounded-full h-8 w-8 border-2"
                    style={{
                        borderColor: "var(--color-border)",
                        borderTopColor: "var(--color-primary)",
                    }}
                ></div>
            </div>
        );
    }

    return (
        <div className="mt-6">
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
                            <span>Total reviews</span>
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

            {/* Empty State */}
            {!reviews || reviews.length === 0 ? (
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
                        Be the first to share your experience with this product
                        and help other customers make informed decisions.
                    </p>
                </div>
            ) : (
                <div className="relative">
                    {/* Reviews Carousel */}
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
                                {/* Review Card */}
                                <div
                                    className="rounded-lg border p-5 transition-all duration-300 group h-full flex flex-col"
                                    style={{
                                        backgroundColor: "var(--color-surface)",
                                        borderColor:
                                            "var(--color-border-light)",
                                    }}
                                >
                                    <div className="flex flex-col gap-4 flex-1">
                                        <div className="w-full">
                                            <div
                                                className="flex items-center gap-1.5 border rounded-lg px-2 py-1 w-fit"
                                                style={{
                                                    backgroundColor:
                                                        "var(--color-bg)",
                                                    borderColor:
                                                        "var(--color-border-light)",
                                                }}
                                            >
                                                <div className="flex items-center gap-0.5">
                                                    {renderStars(review.rating)}
                                                </div>
                                                <span
                                                    style={{
                                                        fontSize:
                                                            "var(--text-xs)",
                                                        color: "var(--color-text-secondary)",
                                                        fontWeight:
                                                            "var(--font-bold)",
                                                    }}
                                                >
                                                    {review.rating}
                                                </span>
                                            </div>
                                        </div>

                                        <div>
                                            <h3
                                                className="flex items-center transition-colors line-clamp-2"
                                                style={{
                                                    fontSize:
                                                        "var(--text-base)",
                                                    color: "var(--color-text-primary)",
                                                    fontWeight:
                                                        "var(--font-bold)",
                                                    minHeight: "3rem",
                                                }}
                                            >
                                                {review.review_title}
                                            </h3>
                                        </div>

                                        <p
                                            className="leading-relaxed line-clamp-4 flex-1"
                                            style={{
                                                fontSize: "var(--text-sm)",
                                                color: "var(--color-text-secondary)",
                                            }}
                                        >
                                            {review.review_text}
                                        </p>

                                        {review.reviewer_name && (
                                            <div
                                                className="pt-3 mt-auto border-t"
                                                style={{
                                                    borderColor:
                                                        "var(--color-border-light)",
                                                }}
                                            >
                                                <span
                                                    style={{
                                                        fontSize:
                                                            "var(--text-xs)",
                                                        color: "var(--color-text-muted)",
                                                        fontWeight:
                                                            "var(--font-medium)",
                                                    }}
                                                >
                                                    — {review.reviewer_name}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
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
                                className="px-4 py-2 rounded-lg border flex items-center gap-2"
                                style={{
                                    fontSize: "var(--text-sm)",
                                    color: "var(--color-text-secondary)",
                                    backgroundColor: "var(--color-bg)",
                                    borderColor: "var(--color-border)",
                                }}
                            >
                                <button
                                    onClick={() =>
                                        handlePageChange(currentPage - 1)
                                    }
                                    disabled={currentPage === 1}
                                    className="px-2 py-1 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[var(--color-surface-alt)] transition-colors"
                                    style={{
                                        color: "var(--color-text-primary)",
                                    }}
                                >
                                    ←
                                </button>

                                <span>
                                    Page{" "}
                                    <span
                                        style={{
                                            color: "var(--color-text-primary)",
                                            fontWeight: "var(--font-semibold)",
                                        }}
                                    >
                                        {currentPage}
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
                                </span>

                                <button
                                    onClick={() =>
                                        handlePageChange(currentPage + 1)
                                    }
                                    disabled={
                                        currentPage === pagination.totalPages
                                    }
                                    className="px-2 py-1 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[var(--color-surface-alt)] transition-colors"
                                    style={{
                                        color: "var(--color-text-primary)",
                                    }}
                                >
                                    →
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SingleProductReview;
