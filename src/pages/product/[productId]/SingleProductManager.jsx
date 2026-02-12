import React from "react";
import { useParams } from "react-router";
import SingleProductViewer from "./components/SingleProductViewer";
import SEO from "../../../components/SEO";
import { generateProductMetadata } from "../../../seo/singleProductSeo";

export default function SingleProductManager() {
    const { productId } = useParams();
    const [metadata, setMetadata] = React.useState(null);

    React.useEffect(() => {
        generateProductMetadata({ params: { productId } }).then(setMetadata);
    }, [productId]);

    return (
        <>
            {metadata && <SEO metadata={metadata} />}
            <SingleProductViewer />
        </>
    );
}
