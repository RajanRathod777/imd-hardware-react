import { useEffect, useState } from "react";
import {
  Gift,
  Star,
  DollarSign,
  Code,
  AlertCircle,
  Eye,
  EyeOff,
} from "lucide-react";
import { Link } from "react-router";
import Loading from "../../../components/Loading";
import { useNavigate } from "react-router";

const RewardsList = () => {
  const apiUrl = import.meta.env.VITE_SERVER_API_URL;

  const navigate = useNavigate();
  const [rewards, setRewards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDetails, setShowDetails] = useState({});

  useEffect(() => {
    const fetchRewards = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/v1/reward/get/all`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("reward data", data);

        if (data.status) {
          setRewards(data.rewards);
          // Initialize showDetails state for each reward
          const initialDetailsState = {};
          data.rewards.forEach((reward) => {
            initialDetailsState[reward.reward_id] = false;
          });
          setShowDetails(initialDetailsState);
        } else {
          setError(data.message || "Failed to fetch rewards");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRewards();
  }, []);

  const handleMoveClaimRewardForm = (reward_id) => {
    navigate(`/reward-claim/${reward_id}`);
  };

  const toggleDetails = (rewardId) => {
    setShowDetails((prev) => ({
      ...prev,
      [rewardId]: !prev[rewardId],
    }));
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <AlertCircle
            className="w-8 h-8 mx-auto mb-3"
            style={{ color: "var(--color-text-primary)" }}
          />
          <p
            className="font-medium"
            style={{ color: "var(--color-text-primary)" }}
          >
            Error: {error}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6">
      {/* Rewards Grid */}
      <div className="grid grid-cols-1 gap-4 ">
        {rewards.map((reward) => (
          <div
            key={reward.reward_id}
            className="border rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg"
            style={{
              backgroundColor: "var(--color-surface)",
              borderColor: "var(--color-border)",
            }}
          >
            {/* Reward Header */}
            <div className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                {/* Reward Info */}
                <div className="flex-1">
                  <h3
                    className="text-lg sm:text-xl font-semibold mb-2"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    {reward.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm">
                    {/* Reward Code */}
                    <div className="flex items-center">
                      <Code
                        className="w-4 h-4 mr-2"
                        style={{ color: "var(--color-text-muted)" }}
                      />
                      <code
                        className="px-2 py-1 text-xs font-mono border rounded"
                        style={{
                          backgroundColor: "var(--color-bg-alt)",
                          borderColor: "var(--color-border)",
                          color: "var(--color-text-primary)",
                        }}
                      >
                        {reward.reward_code}
                      </code>
                    </div>

                    {/* Points */}
                    <div className="flex items-center">
                      <Star
                        className="w-4 h-4 mr-2"
                        style={{ color: "var(--color-text-secondary)" }}
                      />
                      <span
                        className="font-medium"
                        style={{ color: "var(--color-text-primary)" }}
                      >
                        {reward.point} pts
                      </span>
                    </div>

                    {/* Rupees */}
                    <div className="flex items-center">
                      <DollarSign
                        className="w-4 h-4 mr-2"
                        style={{ color: "var(--color-text-secondary)" }}
                      />
                      <span
                        className="font-medium"
                        style={{ color: "var(--color-text-primary)" }}
                      >
                        ₹{reward.money}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                  {/* Details Toggle */}
                  <button
                    onClick={() => toggleDetails(reward.reward_id)}
                    className="flex items-center px-3 py-2 border rounded-lg transition-all duration-200 text-sm hover:shadow-md"
                    style={{
                      backgroundColor: "var(--color-bg-alt)",
                      borderColor: "var(--color-border)",
                      color: "var(--color-text-primary)",
                    }}
                  >
                    {showDetails[reward.reward_id] ? (
                      <>
                        <EyeOff className="w-4 h-4 mr-2" />
                        Hide
                      </>
                    ) : (
                      <>
                        <Eye className="w-4 h-4 mr-2" />
                        Show
                      </>
                    )}
                  </button>

                  {/* Claim Button */}
                  <button
                    onClick={() => handleMoveClaimRewardForm(reward.reward_id)}
                    className="py-2 px-4 font-semibold transition-all duration-200 rounded-lg text-sm whitespace-nowrap hover:scale-[1.02] active:scale-95"
                    style={{
                      backgroundColor: "var(--color-primary)",
                      color: "var(--color-text-on-primary)",
                    }}
                  >
                    Claim
                  </button>
                </div>
              </div>
            </div>

            {/* Details Section */}
            {showDetails[reward.reward_id] && (
              <div
                className="border-t"
                style={{
                  borderColor: "var(--color-border)",
                }}
              >
                <div className="p-4 sm:p-6">
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <h5
                        className="font-medium mb-2"
                        style={{ color: "var(--color-text-primary)" }}
                      >
                        <strong>Title</strong>
                      </h5>
                      <p style={{ color: "var(--color-text-secondary)" }}>
                        {reward.title}
                      </p>
                    </div>
                    <div>
                      <h5
                        className="font-medium mb-2"
                        style={{ color: "var(--color-text-primary)" }}
                      >
                        <strong>Description</strong>
                      </h5>
                      <p style={{ color: "var(--color-text-secondary)" }}>
                        {reward.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Empty State */}
      {rewards.length === 0 && (
        <div
          className="text-center py-12 border rounded-lg"
          style={{
            backgroundColor: "var(--color-surface)",
            borderColor: "var(--color-border)",
          }}
        >
          <Gift
            className="w-16 h-16 mx-auto mb-4"
            style={{ color: "var(--color-text-muted)" }}
          />
          <h3
            className="text-xl font-semibold mb-2"
            style={{ color: "var(--color-text-secondary)" }}
          >
            No Rewards Available
          </h3>
          <p style={{ color: "var(--color-text-muted)" }}>
            Check back later for new rewards and promotions.
          </p>
        </div>
      )}
    </div>
  );
};

export default RewardsList;
