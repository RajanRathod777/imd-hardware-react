import ProductViewer from "./components/ProductsViwer";
import CategoryViewer from "./components/CategoryViwer";
import AdvertiseSlider from "./components/AdvertiseSlider";
import ProductReviewCarousel from "./components/ProductReviewCarousel";
import HeroSection from "./components/HeroSection";

import SEO from "../../components/SEO";
import { homePageMetadata } from "../../seo/homeSeo";

const Home = () => {
  return (
    <div>
      <SEO metadata={homePageMetadata} />
      <HeroSection />
      <CategoryViewer />
      <ProductViewer />
      <AdvertiseSlider />
      <ProductReviewCarousel />
    </div>
  );
};

export default Home;
