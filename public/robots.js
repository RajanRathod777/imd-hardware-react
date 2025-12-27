import { homePageMetadata } from "../src/seo/homeSeo";
import { metadata as aboutMetadata } from "../src/seo/aboutSeo";
import { contactPageMetadata } from "../src/seo/contactSeo";
import { productsPageMetadata } from "../src/seo/productsSeo";
import { rewardsPageMetadata } from "../src/seo/rewardsSeo";
import { cartPageMetadata } from "../src/seo/cartSeo";
import { loginPageMetadata } from "../src/seo/loginSeo";
import { registerPageMetadata } from "../src/seo/registerSeo";
import { resetPasswordPageMetadata } from "../src/seo/resetPasswordSeo";
import { updatePasswordPageMetadata } from "../src/seo/updatePasswordSeo";
import { profilePageMetadata } from "../src/seo/profileSeo";
import { checkoutPageMetadata } from "../src/seo/checkoutSeo";

export default function robots() {
  const allMetadata = [
    { path: "/", metadata: homePageMetadata },
    { path: "/about", metadata: aboutMetadata },
    { path: "/contact", metadata: contactPageMetadata },
    { path: "/products", metadata: productsPageMetadata },
    { path: "/rewards", metadata: rewardsPageMetadata },
    { path: "/cart", metadata: cartPageMetadata },
    { path: "/login", metadata: loginPageMetadata },
    { path: "/register", metadata: registerPageMetadata },
    { path: "/resetpassword", metadata: resetPasswordPageMetadata },
    { path: "/updatepassword", metadata: updatePasswordPageMetadata },
    { path: "/profile", metadata: profilePageMetadata },
    { path: "/checkout", metadata: checkoutPageMetadata },
  ];

  const disallowList = ["/review/*", "/reward-claim/*"];

  allMetadata.forEach((item) => {
    const robots = item.metadata?.robots;
    let isNoIndex = false;

    if (typeof robots === "string") {
      if (robots.includes("noindex")) {
        isNoIndex = true;
      }
    } else if (typeof robots === "object") {
      if (robots.index === false) {
        isNoIndex = true;
      }
    }

    if (isNoIndex) {
      disallowList.push(item.path);
    }
  });

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: disallowList,
      },
      {
        userAgent: ["GPTBot", "CCBot", "Google-Extended"],
        allow: "/",
      },
    ],
    sitemap: "https://imdhardware.com/sitemap.xml",
  };
}
