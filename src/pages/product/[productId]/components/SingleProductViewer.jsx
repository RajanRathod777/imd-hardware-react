// SingleProductViewer.jsx
import { useEffect, useState, Suspense, lazy, useRef } from "react";
import { useParams, useNavigate } from "react-router";
import { useStore } from "../../../../stores/useStore";
import Loading from "../../../../components/Loading";
import SEO from "../../../../components/SEO";
import { generateProductSchema } from "../../../../seo/singleProductSeo";
import SingleProductInfo from "./SingleProductInfo";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// Icon imports
import {
    ArrowLeft,
    Star,
    Check,
    Truck,
    Shield,
    RotateCcw,
    Ruler,
    Component,
    Palette,
    Box,
    ShoppingCart,
    Plus,
    Minus,
    Trash2,
    Share2,
    X,
    Facebook,
    Twitter,
    Linkedin,
    MessageCircle,
    MessageSquare,
    Mail,
    Link,
    Film,
    Loader2,
    Sparkles,
    FileText,
    Image as ImageIcon,
    Box as Box3dIcon,
} from "lucide-react";
import SingleProductReview from "./SingleProductReview";

// Lazy load 3D model viewer
const ModelViewer3D = lazy(() => import("./ModelViewer3D"));

const SingleProductViewer = () => {
    const params = useParams();
    const productId = params?.productId;
    const navigate = useNavigate();
    const {
        getProductById,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
    } = useStore();
    const apiUrl = import.meta.env.VITE_SERVER_API_URL;

    // Product state
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    // Gallery state
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const mainSwiperRef = useRef(null);

    // Share popup state
    const [showSharePopup, setShowSharePopup] = useState(false);
    const [linkCopied, setLinkCopied] = useState(false);
    const popupRef = useRef(null);

    // Cart state
    const [isAdding, setIsAdding] = useState(false);

    // 3D model state
    const [modelViewerReady, setModelViewerReady] = useState(false);

    // Tab state - 'images' or '3dmodel'
    const [activeGalleryTab, setActiveGalleryTab] = useState("images");

    // Get product from store
    const storeProduct = getProductById(Number(productId));
    const inCart = cart.find((p) => p.product_id === product?.product_id);

    // Fetch product
    useEffect(() => {
        if (storeProduct) {
            setProduct(storeProduct);
            setLoading(false);
        } else {
            const fetchProduct = async () => {
                try {
                    setLoading(true);
                    const res = await fetch(
                        `${apiUrl}/api/v1/product/${productId}`,
                        {
                            method: "GET",
                            headers: { "Content-Type": "application/json" },
                        },
                    );
                    if (res.ok) {
                        const data = await res.json();
                        console.log(`data: ${data}`);
                        setProduct(data.product || null);
                    }
                } catch (err) {
                    console.error("Error fetching product:", err);
                } finally {
                    setLoading(false);
                }
            };
            fetchProduct();
        }
    }, [productId, storeProduct, apiUrl]);

    // Load 3D model viewer
    useEffect(() => {
        if (product?.models_3d?.[0]) {
            import("@google/model-viewer")
                .then(() => setModelViewerReady(true))
                .catch((err) =>
                    console.error("Failed to load model-viewer:", err),
                );
        }
    }, [product?.models_3d]);

    // Close share popup when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setShowSharePopup(false);
            }
        };
        if (showSharePopup) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showSharePopup]);

    // Reset thumbs swiper when switching back to images tab
    useEffect(() => {
        if (activeGalleryTab === "images") {
            // Reset thumbs swiper to avoid stale references
            setThumbsSwiper(null);
        }
    }, [activeGalleryTab]);

    // Handlers
    const handleAddToCart = async (e) => {
        e.preventDefault();
        setIsAdding(true);
        await new Promise((resolve) => setTimeout(resolve, 500));
        addToCart(product, 1);
        setIsAdding(false);
    };

    const handleShare = async (platform) => {
        const url = window.location.href;
        const title = product?.name || "Check out this product";
        const text = `Check out ${product?.name || "this product"}`;

        switch (platform) {
            case "facebook":
                window.open(
                    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
                    "_blank",
                );
                break;
            case "twitter":
                window.open(
                    `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
                    "_blank",
                );
                break;
            case "linkedin":
                window.open(
                    `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
                    "_blank",
                );
                break;
            case "instagram":
                try {
                    await navigator.clipboard.writeText(url);
                    alert("Link copied! You can share it on Instagram.");
                } catch (err) {
                    console.error("Failed to copy:", err);
                }
                break;
            case "whatsapp":
                window.open(
                    `https://wa.me/?text=${encodeURIComponent(`${text} - ${url}`)}`,
                    "_blank",
                );
                break;
            case "email":
                window.open(
                    `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${text}\n\n${url}`)}`,
                    "_blank",
                );
                break;
            case "copy":
                try {
                    await navigator.clipboard.writeText(url);
                    setLinkCopied(true);
                    setTimeout(() => setLinkCopied(false), 3000);
                } catch (err) {
                    const textArea = document.createElement("textarea");
                    textArea.value = url;
                    document.body.appendChild(textArea);
                    textArea.select();
                    document.execCommand("copy");
                    document.body.removeChild(textArea);
                    setLinkCopied(true);
                    setTimeout(() => setLinkCopied(false), 3000);
                }
                break;
        }

        if (platform !== "copy") {
            setShowSharePopup(false);
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

    if (loading) return <Loading />;
    if (!product) return <div>Product not found</div>;

    const has3DModel = product?.models_3d?.[0] && modelViewerReady;

    return (
        <div className="min-h-screen bg-[var(--color-bg)]">
            {product && (
                <SEO
                    metadata={{
                        schema: generateProductSchema(product),
                    }}
                />
            )}
            <div className="max-w-7xl mx-auto p-2">
                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 ">
                    {/* ========== PRODUCT GALLERY WITH TABS ========== */}
                    <div className="space-y-2">
                        {/* Gallery Tabs */}
                        <div
                            className="flex items-center gap-2"
                            style={{ borderColor: "var(--color-border-light)" }}
                        >
                            <button
                                onClick={() => setActiveGalleryTab("images")}
                                className={` flex items-center gap-2 px-4 py-2 border rounded-lg transition-all duration-200 ${
                                    activeGalleryTab === "images"
                                        ? "bg-[var(--color-surface)]"
                                        : "hover:bg-[var(--color-surface-alt)]"
                                }`}
                                style={{
                                    borderColor: "var(--color-border)",
                                    color:
                                        activeGalleryTab === "images"
                                            ? "var(--color-text-primary)"
                                            : "var(--color-text-secondary)",
                                }}
                            >
                                <ImageIcon size={16} />
                                <span>
                                    Images ({product.images?.length || 0})
                                </span>
                            </button>

                            {has3DModel && (
                                <button
                                    onClick={() =>
                                        setActiveGalleryTab("3dmodel")
                                    }
                                    className={`flex items-center gap-2 px-4 py-2 border rounded-lg transition-all duration-200 ${
                                        activeGalleryTab === "3dmodel"
                                            ? "bg-[var(--color-surface)]  "
                                            : "hover:bg-[var(--color-surface-alt)]"
                                    }`}
                                    style={{
                                        borderColor: "var(--color-border)",
                                        color:
                                            activeGalleryTab === "3dmodel"
                                                ? "var(--color-text-primary)"
                                                : "var(--color-text-secondary)",
                                    }}
                                >
                                    <Box3dIcon size={16} />
                                    <span>3D Model</span>
                                </button>
                            )}
                        </div>

                        {/* Gallery Content */}
                        <div
                            className="relative group overflow-hidden rounded-xl shadow-sm border"
                            style={{
                                backgroundColor: "var(--color-surface)",
                                borderColor: "var(--color-border)",
                                minHeight:
                                    activeGalleryTab === "3dmodel"
                                        ? "500px"
                                        : "auto",
                            }}
                        >
                            {/* Images Tab - Only render when active */}
                            {activeGalleryTab === "images" && (
                                <>
                                    <Swiper
                                        key="main-swiper"
                                        modules={[FreeMode, Navigation, Thumbs]}
                                        spaceBetween={0}
                                        slidesPerView={1}
                                        thumbs={{
                                            swiper:
                                                thumbsSwiper &&
                                                !thumbsSwiper.destroyed
                                                    ? thumbsSwiper
                                                    : null,
                                        }}
                                        onSwiper={(swiper) => {
                                            mainSwiperRef.current = swiper;
                                        }}
                                        onSlideChange={(swiper) => {
                                            setActiveImageIndex(
                                                swiper.activeIndex,
                                            );
                                        }}
                                        navigation={true}
                                        className="aspect-square rounded-lg"
                                    >
                                        {product.images?.map((img, idx) => (
                                            <SwiperSlide key={idx}>
                                                <div
                                                    className="w-full h-full aspect-square flex items-center justify-center p-4"
                                                    style={{
                                                        background:
                                                            "linear-gradient(to bottom right, var(--color-bg), var(--color-bg-alt))",
                                                    }}
                                                >
                                                    <img
                                                        src={`${apiUrl}/image/product/${img}`}
                                                        alt={`${product.title} - Image ${idx + 1}`}
                                                        className="w-full h-full aspect-square rounded-lg object-contain transition-all duration-500 hover:scale-105"
                                                        loading="eager"
                                                    />
                                                </div>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>

                                    {product.images?.length > 1 && (
                                        <div
                                            className="absolute top-3 left-3 z-10 px-2 py-1 rounded-full"
                                            style={{
                                                backgroundColor:
                                                    "rgba(0,0,0,0.7)",
                                                color: "var(--color-surface)",
                                                fontSize: "var(--text-xs)",
                                                fontWeight:
                                                    "var(--font-medium)",
                                            }}
                                        >
                                            {activeImageIndex + 1} /{" "}
                                            {product.images.length}
                                        </div>
                                    )}
                                </>
                            )}

                            {/* 3D Model Tab */}
                            {activeGalleryTab === "3dmodel" && has3DModel && (
                                <div className="w-full aspect-square">
                                    <Suspense
                                        fallback={
                                            <div className="w-full h-full flex items-center justify-center">
                                                <div className="flex flex-col items-center gap-3">
                                                    <Loader2
                                                        size={32}
                                                        className="animate-spin"
                                                        style={{
                                                            color: "var(--color-primary)",
                                                        }}
                                                    />
                                                    <span
                                                        style={{
                                                            color: "var(--color-text-secondary)",
                                                        }}
                                                    >
                                                        Loading 3D Model...
                                                    </span>
                                                </div>
                                            </div>
                                        }
                                    >
                                        <ModelViewer3D
                                            product={product}
                                            apiUrl={apiUrl}
                                        />
                                    </Suspense>
                                </div>
                            )}

                            {/* Share Button */}
                            <div
                                className="absolute top-3 right-3 z-10"
                                ref={popupRef}
                            >
                                <button
                                    className="backdrop-blur-sm p-3 rounded-full shadow-lg border transition-all duration-300 hover:shadow-xl hover:scale-105"
                                    style={{
                                        backgroundColor: "var(--color-surface)",
                                        borderColor:
                                            "var(--color-border-light)",
                                    }}
                                    onClick={() =>
                                        setShowSharePopup(!showSharePopup)
                                    }
                                >
                                    <Share2
                                        size={16}
                                        style={{
                                            color: "var(--color-text-secondary)",
                                        }}
                                    />
                                </button>

                                {/* Share Popup - No Names */}
                                {showSharePopup && (
                                    <div
                                        className="absolute right-0 top-14 rounded-xl shadow-2xl border p-3 min-w-48 z-50"
                                        style={{
                                            backgroundColor:
                                                "var(--color-surface)",
                                            borderColor: "var(--color-border)",
                                        }}
                                    >
                                        {/* Header - Minimal */}
                                        <div
                                            className="flex items-center justify-between mb-2 pb-2 border-b"
                                            style={{
                                                borderColor:
                                                    "var(--color-border-light)",
                                            }}
                                        >
                                            <h3
                                                style={{
                                                    fontSize: "var(--text-sm)",
                                                    color: "var(--color-text-primary)",
                                                    fontWeight:
                                                        "var(--font-semibold)",
                                                }}
                                            >
                                                Share
                                            </h3>
                                            <button
                                                onClick={() =>
                                                    setShowSharePopup(false)
                                                }
                                                className="p-1 rounded-lg hover:bg-[var(--color-surface-alt)]"
                                            >
                                                <X
                                                    size={12}
                                                    style={{
                                                        color: "var(--color-text-muted)",
                                                    }}
                                                />
                                            </button>
                                        </div>

                                        {/* Share Icons - 3x2 Grid - No Text Labels */}
                                        <div className="grid grid-cols-3 gap-1">
                                            {[
                                                {
                                                    platform: "facebook",
                                                    icon: Facebook,
                                                    color: "bg-[#1877F2]",
                                                    title: "Share on Facebook",
                                                },
                                                {
                                                    platform: "twitter",
                                                    icon: X,
                                                    color: "bg-black",
                                                    title: "Share on X (Twitter)",
                                                },
                                                {
                                                    platform: "linkedin",
                                                    icon: Linkedin,
                                                    color: "bg-[#0A66C2]",
                                                    title: "Share on LinkedIn",
                                                },
                                                {
                                                    platform: "whatsapp",
                                                    icon: MessageCircle,
                                                    color: "bg-[#25D366]",
                                                    title: "Share on WhatsApp",
                                                },
                                                {
                                                    platform: "email",
                                                    icon: Mail,
                                                    color: "bg-gray-600",
                                                    title: "Share via Email",
                                                },
                                                {
                                                    platform: "copy",
                                                    icon: Link,
                                                    color: "bg-[var(--color-text-primary)]",
                                                    title: "Copy Link",
                                                },
                                            ].map(
                                                ({
                                                    platform,
                                                    icon: Icon,
                                                    color,
                                                    title,
                                                }) => (
                                                    <button
                                                        key={platform}
                                                        onClick={() =>
                                                            handleShare(
                                                                platform,
                                                            )
                                                        }
                                                        className="flex items-center justify-center p-2 rounded-lg transition-all duration-200 hover:bg-[var(--color-surface-alt)] group"
                                                        title={title}
                                                    >
                                                        <div
                                                            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 group-hover:scale-110 shadow-sm ${color}`}
                                                        >
                                                            <Icon
                                                                size={18}
                                                                className="text-white"
                                                            />
                                                        </div>
                                                    </button>
                                                ),
                                            )}
                                        </div>

                                        {/* Copy Link Success Message */}
                                        {linkCopied && (
                                            <div
                                                className="mt-2 pt-2 text-center text-xs border-t"
                                                style={{
                                                    borderColor:
                                                        "var(--color-border-light)",
                                                    color: "var(--color-success)",
                                                }}
                                            >
                                                ✓ Link copied!
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Thumbnails - Only show for images tab and only when active */}
                        {activeGalleryTab === "images" &&
                            product.images?.length > 1 && (
                                <div className="px-2">
                                    <Swiper
                                        key="thumbs-swiper"
                                        modules={[FreeMode, Navigation, Thumbs]}
                                        onSwiper={(swiper) => {
                                            setThumbsSwiper(swiper);
                                        }}
                                        spaceBetween={8}
                                        slidesPerView={4}
                                        freeMode={true}
                                        watchSlidesProgress={true}
                                        className="w-full"
                                    >
                                        {product.images.map((img, idx) => (
                                            <SwiperSlide key={idx}>
                                                <div
                                                    className="m-1 aspect-square rounded-lg overflow-hidden cursor-pointer transition-all duration-200"
                                                    style={{
                                                        outline:
                                                            activeImageIndex ===
                                                            idx
                                                                ? "2px solid var(--color-text-primary)"
                                                                : "1px solid var(--color-border)",
                                                        outlineOffset:
                                                            activeImageIndex ===
                                                            idx
                                                                ? "2px"
                                                                : "0",
                                                        opacity:
                                                            activeImageIndex ===
                                                            idx
                                                                ? 1
                                                                : 0.8,
                                                    }}
                                                    onClick={() => {
                                                        if (
                                                            mainSwiperRef.current
                                                        ) {
                                                            mainSwiperRef.current.slideTo(
                                                                idx,
                                                            );
                                                        }
                                                    }}
                                                >
                                                    <div
                                                        className="w-full h-full flex items-center justify-center p-1"
                                                        style={{
                                                            backgroundColor:
                                                                "var(--color-bg)",
                                                        }}
                                                    >
                                                        <img
                                                            src={`${apiUrl}/image/product/${img}`}
                                                            alt={`Thumbnail ${idx + 1}`}
                                                            className="w-full h-full aspect-square object-cover rounded-lg transition-transform duration-200 hover:scale-110"
                                                            loading="lazy"
                                                        />
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </div>
                            )}

                        {/* 3D Model Info Badge */}
                        {activeGalleryTab === "3dmodel" && (
                            <div
                                className="flex items-center gap-2 px-4 py-3 rounded-lg bg-[var(--color-surface)] border"
                                style={{
                                    borderColor: "var(--color-border-light)",
                                }}
                            >
                                <Box
                                    size={16}
                                    style={{ color: "var(--color-primary)" }}
                                />
                                <span
                                    style={{
                                        fontSize: "var(--text-sm)",
                                        color: "var(--color-text-secondary)",
                                    }}
                                >
                                    Interactive 3D model - Drag to rotate,
                                    scroll to zoom
                                </span>
                            </div>
                        )}
                    </div>

                    {/* ========== PRODUCT INFO ========== */}
                    <div className="space-y-8">
                        {/* Product info content - unchanged */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 flex-wrap">
                                <span
                                    className="px-4 py-2 rounded-lg border"
                                    style={{
                                        fontSize: "var(--text-xs)",
                                        backgroundColor: "var(--color-surface)",
                                        borderColor: "var(--color-border)",
                                        color: "var(--color-text-secondary)",
                                        fontWeight: "var(--font-semibold)",
                                        textTransform: "uppercase",
                                    }}
                                >
                                    {product.category_name}
                                </span>
                                {inCart && (
                                    <span
                                        className="flex items-center gap-1 px-3 py-1 rounded-lg border"
                                        style={{
                                            fontSize: "var(--text-xs)",
                                            backgroundColor:
                                                "var(--color-success-light)",
                                            color: "var(--color-success)",
                                            borderColor:
                                                "rgba(40, 167, 69, 0.2)",
                                            fontWeight: "var(--font-semibold)",
                                        }}
                                    >
                                        <Check size={12} />
                                        In Cart
                                    </span>
                                )}
                            </div>

                            <div className="space-y-1">
                                <h1
                                    className="leading-tight"
                                    style={{
                                        fontSize: "var(--text-3xl)",
                                        color: "var(--color-text-primary)",
                                        fontFamily: "var(--font-heading)",
                                        fontWeight: "var(--font-bold)",
                                    }}
                                >
                                    {product.name}
                                </h1>
                                <p
                                    style={{
                                        fontSize: "var(--text-base)",
                                        color: "var(--color-text-muted)",
                                        fontWeight: "var(--font-medium)",
                                    }}
                                >
                                    {product.title}
                                </p>
                            </div>

                            <div className="flex items-center gap-4">
                                <div
                                    className="flex items-center gap-2 border rounded-lg px-3 py-1.5"
                                    style={{
                                        backgroundColor: "var(--color-bg)",
                                        borderColor: "var(--color-border)",
                                    }}
                                >
                                    <div className="flex items-center gap-1">
                                        {renderStars(product.star_rating || 0)}
                                    </div>
                                    <span
                                        className="ml-1"
                                        style={{
                                            fontSize: "var(--text-xs)",
                                            color: "var(--color-text-secondary)",
                                            fontWeight: "var(--font-semibold)",
                                        }}
                                    >
                                        {product.star_rating || 0} Rating
                                    </span>
                                </div>
                                <span style={{ fontSize: "var(--text-xl)" }}>
                                    {product.emoji}
                                </span>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-baseline gap-2">
                                    <span
                                        style={{
                                            fontSize: "var(--text-3xl)",
                                            color: "var(--color-text-primary)",
                                            fontWeight: "var(--font-bold)",
                                        }}
                                    >
                                        ₹{product.price}
                                    </span>
                                    {product.original_price &&
                                        product.original_price >
                                            product.price && (
                                            <span
                                                className="line-through"
                                                style={{
                                                    fontSize: "var(--text-lg)",
                                                    color: "var(--color-text-light)",
                                                }}
                                            >
                                                ₹{product.original_price}
                                            </span>
                                        )}
                                </div>

                                <div className="flex items-center gap-2">
                                    <div
                                        className="w-1.5 h-1.5 rounded-full"
                                        style={{
                                            backgroundColor:
                                                product.max_quantity > 10
                                                    ? "var(--color-success)"
                                                    : product.max_quantity > 0
                                                      ? "var(--color-warning)"
                                                      : "var(--color-danger)",
                                        }}
                                    ></div>
                                    <span
                                        style={{
                                            fontSize: "var(--text-sm)",
                                            color: "var(--color-text-secondary)",
                                            fontWeight: "var(--font-medium)",
                                        }}
                                    >
                                        {product.max_quantity > 10
                                            ? `In Stock (${product.max_quantity} available)`
                                            : product.max_quantity > 0
                                              ? `Low Stock (${product.max_quantity} left)`
                                              : "Out of Stock"}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Specifications */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <div className="w-1 h-4 bg-[var(--color-primary)] rounded-full"></div>
                                <h3
                                    style={{
                                        fontSize: "var(--text-sm)",
                                        color: "var(--color-text-secondary)",
                                        textTransform: "uppercase",
                                        fontWeight: "var(--font-bold)",
                                    }}
                                >
                                    Specifications
                                </h3>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    {
                                        label: "Size",
                                        value: product.size,
                                        icon: Ruler,
                                    },
                                    {
                                        label: "Material",
                                        value: product.material,
                                        icon: Component,
                                    },
                                    {
                                        label: "Color",
                                        value: product.color,
                                        icon: Palette,
                                    },
                                    {
                                        label: "Available Stock",
                                        value: `${product.max_quantity} units`,
                                        icon: Box,
                                    },
                                ].map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center gap-3 p-3 rounded-lg border transition-all duration-200 hover:border-[var(--color-border-strong)]"
                                        style={{
                                            backgroundColor:
                                                "var(--color-surface)",
                                            borderColor:
                                                "var(--color-border-light)",
                                        }}
                                    >
                                        <div className="p-1.5 rounded-md bg-[var(--color-bg-alt)]">
                                            <item.icon
                                                size={12}
                                                style={{
                                                    color: "var(--color-text-secondary)",
                                                }}
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <span
                                                style={{
                                                    fontSize: "var(--text-xs)",
                                                    color: "var(--color-text-light)",
                                                    fontWeight:
                                                        "var(--font-medium)",
                                                }}
                                            >
                                                {item.label}
                                            </span>
                                            <p
                                                className="truncate max-w-[120px]"
                                                style={{
                                                    fontSize: "var(--text-xs)",
                                                    color: "var(--color-text-primary)",
                                                    fontWeight:
                                                        "var(--font-semibold)",
                                                }}
                                            >
                                                {item.value}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Cart Actions */}
                        <div
                            className="pt-6 border-t"
                            style={{ borderColor: "var(--color-border)" }}
                        >
                            {inCart ? (
                                <div className="flex items-center gap-4">
                                    <div
                                        className="flex items-center gap-1 border rounded-lg p-1"
                                        style={{
                                            backgroundColor:
                                                "var(--color-surface)",
                                            borderColor:
                                                "var(--color-border-light)",
                                        }}
                                    >
                                        <button
                                            className="w-12 h-12 flex items-center justify-center rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-md hover:bg-[var(--color-bg-alt)]"
                                            style={{
                                                color: "var(--color-text-secondary)",
                                            }}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                updateCartQuantity(
                                                    product.product_id,
                                                    inCart.quantity - 1,
                                                );
                                            }}
                                            disabled={inCart.quantity <= 1}
                                        >
                                            <Minus size={14} />
                                        </button>
                                        <span
                                            className="min-w-8 text-center"
                                            style={{
                                                color: "var(--color-text-primary)",
                                                fontWeight: "var(--font-bold)",
                                                fontSize: "var(--text-base)",
                                            }}
                                        >
                                            {inCart.quantity}
                                        </span>
                                        <button
                                            className="w-12 h-12 flex items-center justify-center rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-md hover:bg-[var(--color-bg-alt)]"
                                            style={{
                                                color: "var(--color-text-secondary)",
                                            }}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                updateCartQuantity(
                                                    product.product_id,
                                                    inCart.quantity + 1,
                                                );
                                            }}
                                            disabled={
                                                inCart.quantity >=
                                                product.max_quantity
                                            }
                                        >
                                            <Plus size={14} />
                                        </button>
                                    </div>
                                    <button
                                        className="flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-200 hover:opacity-90 active:scale-95"
                                        style={{
                                            backgroundColor:
                                                "var(--color-danger)",
                                            color: "var(--color-text-on-primary)",
                                            fontWeight: "var(--font-semibold)",
                                            fontSize: "var(--text-sm)",
                                        }}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            removeFromCart(product.product_id);
                                        }}
                                    >
                                        <Trash2 size={16} />
                                        Remove
                                    </button>
                                </div>
                            ) : (
                                <button
                                    className={`w-full flex items-center justify-center gap-2 py-3.5 px-8 rounded-lg transition-all duration-300 active:scale-98 ${
                                        product.max_quantity === 0
                                            ? "opacity-50 cursor-not-allowed"
                                            : "hover:opacity-90"
                                    } ${isAdding ? "opacity-75 cursor-wait" : ""}`}
                                    style={{
                                        backgroundColor:
                                            "var(--color-text-primary)",
                                        color: "var(--color-text-on-primary)",
                                        fontWeight: "var(--font-semibold)",
                                        fontSize: "var(--text-base)",
                                    }}
                                    onClick={handleAddToCart}
                                    disabled={
                                        isAdding || product.max_quantity === 0
                                    }
                                >
                                    <ShoppingCart size={18} />
                                    {product.max_quantity === 0
                                        ? "Out of Stock"
                                        : "Add to Cart"}
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* ========== EXTRA PRODUCT INFO (DESCRIPTIONS) ========== */}
                {productId && <SingleProductInfo />}

                {/* ========== MEDIA GALLERY (VIDEOS) ========== */}
                {product.video?.length > 0 && (
                    <div className="mt-6 space-y-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div
                                className="w-8 h-8 rounded-lg flex items-center justify-center bg-[var(--color-bg-alt)] border"
                                style={{
                                    borderColor: "var(--color-border-light)",
                                }}
                            >
                                <Film
                                    size={16}
                                    style={{ color: "var(--color-primary)" }}
                                />
                            </div>
                            <h3
                                style={{
                                    color: "var(--color-text-primary)",
                                    fontFamily: "var(--font-heading)",
                                    fontSize: "var(--text-xl)",
                                    fontWeight: "var(--font-bold)",
                                }}
                            >
                                Product Video
                            </h3>
                        </div>
                        <div className="grid gap-6">
                            {product.video.map((file, index) => {
                                const isVideo = file
                                    .toLowerCase()
                                    .endsWith(".mp4");
                                const fileUrl = `${apiUrl}/image/product/${file}`;
                                return (
                                    <div
                                        key={index}
                                        className="group relative rounded-lg border transition-all duration-300 overflow-hidden"
                                        style={{
                                            backgroundColor:
                                                "var(--color-surface)",
                                            borderColor:
                                                "var(--color-border-light)",
                                        }}
                                    >
                                        <div className="relative">
                                            {isVideo ? (
                                                <div className="relative bg-black overflow-hidden">
                                                    <video
                                                        autoPlay
                                                        muted
                                                        loop
                                                        playsInline
                                                        className="w-full h-full object-contain"
                                                    >
                                                        <source
                                                            src={fileUrl}
                                                            type="video/mp4"
                                                        />
                                                        Your browser does not
                                                        support the video tag.
                                                    </video>
                                                </div>
                                            ) : (
                                                <div
                                                    className="aspect-video flex items-center justify-center p-4 rounded-lg"
                                                    style={{
                                                        backgroundColor:
                                                            "var(--color-bg-alt)",
                                                    }}
                                                >
                                                    <img
                                                        src={fileUrl}
                                                        alt="Product media"
                                                        className="max-w-full max-h-full object-contain rounded-lg shadow-sm transition-transform duration-300 group-hover:scale-105"
                                                        loading="lazy"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* ========== SINGLE PRODUCT REVIEW ========== */}
                {productId && <SingleProductReview />}
            </div>
        </div>
    );
};

export default SingleProductViewer;
