import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import Cookies from "js-cookie";
import {
  Star,
  ArrowLeft,
  Loader,
  CheckCircle,
  AlertCircle,
  Trash2,
} from "lucide-react";

export default function ReviewManagement({ orderId, productId }) {
  const params = useParams();
  const navigate = useNavigate();
  const actualOrderId = orderId || params?.orderId;
  const actualProductId = productId || params?.productId;

  const apiUrl = import.meta.env.VITE_SERVER_API_URL;
  const token = Cookies.get("auth_token");

  const [review, setReview] = useState(null);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reviewLoading, setReviewLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [validationError, setValidationError] = useState("");

  const [reviewForm, setReviewForm] = useState({
    rating: 0,
    review_title: "",
    review_text: "",
  });

  useEffect(() => {
    if (actualOrderId && actualProductId && token) {
      fetchReviewDetails();
    } else if (!token) {
      setError("Please log in to write or edit a review.");
      setLoading(false);
    }
  }, [actualOrderId, actualProductId, token]);

  const fetchReviewDetails = async () => {
    try {
      setLoading(true);
      setError("");

      const productRes = await fetch(
        `${apiUrl}/api/v1/product/${actualProductId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (productRes.ok) {
        const data = await productRes.json();
        if (data.status) setProduct(data.product);
      }

      const reviewRes = await fetch(
        `${apiUrl}/api/v1/product-review?order_id=${actualOrderId}&product_id=${actualProductId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (reviewRes.ok) {
        const data = await reviewRes.json();
        if (data.status && data.reviews?.length > 0) {
          const existing = data.reviews[0];
          setReview(existing);
          setReviewForm({
            rating: existing.rating || 0,
            review_title: existing.review_title || "",
            review_text: existing.review_text || "",
          });
        }
      }
    } catch (err) {
      setError("Failed to load details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const submitReview = async (e) => {
    e.preventDefault();
    setValidationError("");
    setError("");
    setSuccessMessage("");

    if (reviewForm.rating === 0)
      return setValidationError("Please select a rating");
    if (!reviewForm.review_title.trim())
      return setValidationError("Title is required");
    if (!reviewForm.review_text.trim())
      return setValidationError("Review text is required");

    try {
      setReviewLoading(true);
      review ? await updateReview() : await addReview();
    } catch {
      setError("Submission failed. Please try again.");
    } finally {
      setReviewLoading(false);
    }
  };

  const addReview = async () => {
    const res = await fetch(`${apiUrl}/api/v1/product-review`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        product_id: actualProductId,
        order_id: actualOrderId,
        rating: reviewForm.rating,
        review_title: reviewForm.review_title.trim(),
        review_text: reviewForm.review_text.trim(),
      }),
    });
    if (!res.ok) throw new Error();
    const data = await res.json();
    if (data.status) {
      setReview(data.review);
      setSuccessMessage("Review submitted successfully!");
    }
  };

  const updateReview = async () => {
    const res = await fetch(`${apiUrl}/api/v1/product-review`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        review_id: review.review_id,
        rating: reviewForm.rating,
        review_title: reviewForm.review_title.trim(),
        review_text: reviewForm.review_text.trim(),
      }),
    });
    if (!res.ok) throw new Error();
    const data = await res.json();
    if (data.status) {
      setReview(data.review);
      setSuccessMessage("Review updated successfully!");
    }
  };

  const deleteReview = async () => {
    const res = await fetch(`${apiUrl}/api/v1/product-review`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ review_id: review.review_id }),
    });
    if (!res.ok) throw new Error();
    const data = await res.json();
    if (data.status) {
      setReview(null);
      setReviewForm({ rating: 0, review_title: "", review_text: "" });
      setSuccessMessage("Review deleted.");
    }
  };

  const handleDelete = () => {
    if (window.confirm("Permanently delete this review?")) deleteReview();
  };

  const renderStars = (currentRating, interactive = false) => (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={!interactive}
          onClick={() =>
            interactive &&
            setReviewForm((prev) => {
              setValidationError("");
              return { ...prev, rating: star };
            })
          }
          className={`transition-all ${interactive ? "hover:scale-110" : ""}`}
        >
          <Star
            className="w-8 h-8" // Smaller, standard size
            fill={star <= currentRating ? "currentColor" : "none"}
            style={{
              color:
                star <= currentRating
                  ? "var(--color-secondary)"
                  : "var(--color-border-dark)",
            }}
          />
        </button>
      ))}
    </div>
  );

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "var(--color-bg)" }}
      >
        <Loader
          className="w-10 h-10 animate-spin"
          style={{ color: "var(--color-primary)" }}
        />
      </div>
    );
  }

  return (
    <div
      className="min-h-screen py-4 px-4"
      style={{
        backgroundColor: "var(--color-bg)",
        fontFamily: "var(--font-primary)",
      }}
    >
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-2 transition hover:opacity-80"
          style={{
            color: "var(--color-text-secondary)",
            fontSize: "var(--text-sm)",
          }}
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <h1
          className="mb-2"
          style={{
            fontSize: "var(--text-3xl)",
            fontFamily: "var(--font-heading)",
            color: "var(--color-text-primary)",
            fontWeight: "var(--font-bold)",
          }}
        >
          {review ? "Edit Review" : "Write a Review"}
        </h1>

        {product && (
          <p
            className="mb-8"
            style={{
              fontSize: "var(--text-lg)",
              color: "var(--color-text-secondary)",
            }}
          >
            {product.product_name || product.name}
          </p>
        )}

        {/* Messages */}
        {(successMessage || error || validationError) && (
          <div className="mb-6 space-y-3">
            {successMessage && (
              <div
                className="p-4 rounded-lg border flex items-center gap-3"
                style={{
                  backgroundColor: "var(--color-success-light)",
                  borderColor: "var(--color-success)",
                }}
              >
                <CheckCircle
                  className="w-5 h-5"
                  style={{ color: "var(--color-success)" }}
                />
                <span style={{ color: "var(--color-success)" }}>
                  {successMessage}
                </span>
              </div>
            )}
            {(error || validationError) && (
              <div
                className="p-4 rounded-lg border flex items-center gap-3"
                style={{
                  backgroundColor: "var(--color-danger-light)",
                  borderColor: "var(--color-danger)",
                }}
              >
                <AlertCircle
                  className="w-5 h-5"
                  style={{ color: "var(--color-danger)" }}
                />
                <span style={{ color: "var(--color-danger)" }}>
                  {error || validationError}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Compact Review Form */}
        <div
          className="p-6 md:p-8 rounded-xl border"
          style={{
            backgroundColor: "var(--color-surface)",
            borderColor: "var(--color-border-light)",
          }}
        >
          <form onSubmit={submitReview} className="space-y-6">
            {/* Rating */}
            <div>
              <label
                className="block mb-3"
                style={{
                  color: "var(--color-text-primary)",
                  fontWeight: "var(--font-medium)",
                }}
              >
                Rating <span style={{ color: "var(--color-danger)" }}>*</span>
              </label>
              {renderStars(reviewForm.rating, true)}
            </div>

            {/* Title */}
            <div>
              <label
                className="block mb-2"
                style={{
                  color: "var(--color-text-primary)",
                  fontWeight: "var(--font-medium)",
                }}
              >
                Title <span style={{ color: "var(--color-danger)" }}>*</span>
              </label>
              <input
                type="text"
                value={reviewForm.review_title}
                onChange={(e) =>
                  setReviewForm((prev) => ({
                    ...prev,
                    review_title: e.target.value,
                  }))
                }
                maxLength={100}
                placeholder="e.g. Excellent quality!"
                className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition"
                style={{
                  backgroundColor: "var(--color-surface)",
                  borderColor: "var(--color-border-light)",
                  color: "var(--color-text-primary)",
                  "--tw-ring-color": "var(--color-primary)",
                }}
              />
              <p
                className="mt-1 text-right"
                style={{
                  color: "var(--color-text-muted)",
                  fontSize: "var(--text-xs)",
                }}
              >
                {reviewForm.review_title.length}/100
              </p>
            </div>

            {/* Review Text */}
            <div>
              <label
                className="block mb-2"
                style={{
                  color: "var(--color-text-primary)",
                  fontWeight: "var(--font-medium)",
                }}
              >
                Your Review{" "}
                <span style={{ color: "var(--color-danger)" }}>*</span>
              </label>
              <textarea
                value={reviewForm.review_text}
                onChange={(e) =>
                  setReviewForm((prev) => ({
                    ...prev,
                    review_text: e.target.value,
                  }))
                }
                rows={5}
                maxLength={500}
                placeholder="Share your experience..."
                className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition resize-none"
                style={{
                  backgroundColor: "var(--color-surface)",
                  borderColor: "var(--color-border-light)",
                  color: "var(--color-text-primary)",
                  "--tw-ring-color": "var(--color-primary)",
                }}
              />
              <p
                className="mt-1 text-right"
                style={{
                  color: "var(--color-text-muted)",
                  fontSize: "var(--text-xs)",
                }}
              >
                {reviewForm.review_text.length}/500
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-between gap-4 pt-4">
              <div>
                {review && (
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-lg border transition hover:opacity-90"
                    style={{
                      backgroundColor: "var(--color-danger-light)",
                      color: "var(--color-danger)",
                      borderColor: "var(--color-danger)",
                      fontWeight: "var(--font-medium)",
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="px-6 py-2.5 rounded-lg border transition hover:opacity-90"
                  style={{
                    backgroundColor: "var(--color-surface-alt)",
                    color: "var(--color-text-primary)",
                    borderColor: "var(--color-border-light)",
                    fontWeight: "var(--font-medium)",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={reviewLoading}
                  className="px-7 py-2.5 rounded-lg transition hover:opacity-90 disabled:opacity-60 flex items-center justify-center gap-2 min-w-32"
                  style={{
                    backgroundColor: "var(--color-primary)",
                    color: "var(--color-text-on-primary)",
                    fontWeight: "var(--font-semibold)",
                  }}
                >
                  {reviewLoading && <Loader className="w-4 h-4 animate-spin" />}
                  {reviewLoading
                    ? "Submitting..."
                    : review
                    ? "Update"
                    : "Submit"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
