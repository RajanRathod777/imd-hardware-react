import React from "react";
import { useParams } from "react-router";
import RewardsClaimFrom from "./components/RewardsClaimFrom";

export default function RewardClaimPage() {
  const { rewardId } = useParams();
  return <RewardsClaimFrom rewardId={rewardId} />;
}
