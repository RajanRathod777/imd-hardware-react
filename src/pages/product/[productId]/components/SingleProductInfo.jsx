// components/SingleProductInfo.jsx
import React, { useState, useEffect } from "react";
import { FileText, Loader2 } from "lucide-react";
import { useParams } from "react-router";

const SingleProductInfo = () => {
    const params = useParams();
    const productId = params?.productId;
    const apiUrl = import.meta.env.VITE_SERVER_API_URL;

    const [extraDetails, setExtraDetails] = useState(null);
    const [loadingExtra, setLoadingExtra] = useState(true);

    // Fetch extra details
    useEffect(() => {
        if (!productId) return;

        const fetchExtraDetails = async () => {
            try {
                setLoadingExtra(true);
                const res = await fetch(
                    `${apiUrl}/api/v1/product/${productId}`,
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            requireField: ["short_description", "description"],
                        }),
                    },
                );
                if (!res.ok) throw new Error("Failed to fetch extra details");
                const data = await res.json();
                setExtraDetails(data.product || {});
            } catch (err) {
                console.error("Error fetching extra product details:", err);
            } finally {
                setLoadingExtra(false);
            }
        };

        fetchExtraDetails();
    }, [productId, apiUrl]);

    if (loadingExtra) {
        return (
            <div className="mt-6">
                <div
                    className="flex items-center justify-center gap-3 p-8 rounded-2xl border shadow-sm"
                    style={{
                        color: "var(--color-text-muted)",
                        backgroundColor: "var(--color-surface)",
                        borderColor: "var(--color-border-light)",
                    }}
                >
                    <Loader2
                        size={16}
                        className="animate-spin"
                        style={{ color: "var(--color-text-muted)" }}
                    />
                    <span
                        style={{
                            color: "var(--color-text-secondary)",
                            fontWeight: "var(--font-medium)",
                            fontSize: "var(--text-sm)",
                        }}
                    >
                        Loading product details...
                    </span>
                </div>
            </div>
        );
    }

    if (!extraDetails) return null;

    return (
        <div className="mt-6 space-y-6">
            {extraDetails.short_description && (
                <div
                    className="rounded-lg p-1 sm:p-6 border"
                    style={{
                        backgroundColor: "var(--color-surface)",
                        borderColor: "var(--color-border-light)",
                    }}
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[var(--color-bg-alt)]">
                            <FileText
                                size={16}
                                style={{
                                    color: "var(--color-primary)",
                                }}
                            />
                        </div>
                        <div>
                            <h3
                                style={{
                                    color: "var(--color-text-primary)",
                                    fontFamily: "var(--font-heading)",
                                    fontSize: "var(--text-lg)",
                                    fontWeight: "var(--font-bold)",
                                }}
                            >
                                Product Highlights
                            </h3>
                            <p
                                style={{
                                    color: "var(--color-primary)",
                                    fontSize: "var(--text-sm)",
                                    fontWeight: "var(--font-medium)",
                                }}
                            >
                                Key features & benefits
                            </p>
                        </div>
                    </div>
                    <div
                        className="rounded-lg p-4 border"
                        style={{
                            color: "var(--color-text-secondary)",
                            backgroundColor: "var(--color-bg)",
                            borderColor: "var(--color-border-light)",
                            lineHeight: "var(--leading-relaxed)",
                            fontSize: "var(--text-base)",
                        }}
                        dangerouslySetInnerHTML={{
                            __html: extraDetails.short_description,
                        }}
                    />
                </div>
            )}

            {extraDetails.description && (
                <div
                    className="rounded-lg p-1 sm:p-6 border"
                    style={{
                        backgroundColor: "var(--color-surface)",
                        borderColor: "var(--color-border-light)",
                    }}
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[var(--color-bg-alt)]">
                            <FileText
                                size={16}
                                style={{
                                    color: "var(--color-text-secondary)",
                                }}
                            />
                        </div>
                        <div>
                            <h3
                                style={{
                                    color: "var(--color-text-primary)",
                                    fontFamily: "var(--font-heading)",
                                    fontSize: "var(--text-lg)",
                                    fontWeight: "var(--font-bold)",
                                }}
                            >
                                Detailed Description
                            </h3>
                            <p
                                style={{
                                    color: "var(--color-text-secondary)",
                                    fontSize: "var(--text-sm)",
                                    fontWeight: "var(--font-medium)",
                                }}
                            >
                                Complete product information
                            </p>
                        </div>
                    </div>
                    <div
                        className="prose max-w-none rounded-lg p-4 border"
                        style={{
                            color: "var(--color-text-secondary)",
                            backgroundColor: "var(--color-bg)",
                            borderColor: "var(--color-border-light)",
                            lineHeight: "var(--leading-relaxed)",
                            fontSize: "var(--text-base)",
                        }}
                        dangerouslySetInnerHTML={{
                            __html: extraDetails.description,
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default SingleProductInfo;
