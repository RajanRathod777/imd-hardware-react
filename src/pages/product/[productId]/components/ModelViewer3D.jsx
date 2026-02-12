import { Box, RotateCcw, Smartphone } from "lucide-react";

const ModelViewer3D = ({ product, apiUrl }) => {
    if (!product?.models_3d?.[0]) return null;

    return (
        <div className="h-full space-y-4">
            {/* Model Viewer Container */}
            <div className="group relative rounded-lg overflow-hidden">
                {/* Model Viewer */}
                <div
                    className="w-full aspect-square"
                    style={{
                        backgroundColor: "var(--color-bg-alt)",
                    }}
                >
                    <model-viewer
                        src={`${apiUrl}/image/product/${product.models_3d[0]}`}
                        alt={`3D Model of ${product.title}`}
                        auto-rotate
                        camera-controls
                        ar
                        ar-modes="webxr scene-viewer quick-look"
                        shadow-intensity="1"
                        environment-image="neutral"
                        exposure="1"
                        camera-orbit="0deg 75deg 105%"
                        className="w-full h-full aspect-square"
                        style={{
                            backgroundColor: "var(--color-bg)",
                        }}
                    ></model-viewer>
                </div>
            </div>
        </div>
    );
};

export default ModelViewer3D;
