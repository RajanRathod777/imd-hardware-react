import Reward from "./components/Reward";
import { rewardsPageMetadata } from "../../seo/rewardsSeo";
import SEO from "../../components/SEO";

export default function RewardsPage() {
  return (
    <>
      <SEO metadata={rewardsPageMetadata} />
      <Reward />
    </>
  );
}
