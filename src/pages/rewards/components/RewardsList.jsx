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
import { useNavigate } from "react-router";
import Loading from "../../../components/Loading";

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
        const res = await fetch(`${apiUrl}/api/v1/reward/get/all`, {
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) throw new Error("Failed to load rewards");

        const data = await res.json();
        if (data.status) {
          setRewards(data.rewards || []);
          // Initialize toggle state
          const initialState = {};
          data.rewards.forEach((r) => {
            initialState[r.reward_id] = false;
          });
          setShowDetails(initialState);
        } else {
          setError(data.message || "No rewards found");
        }
      } catch (err) {
        setError("Something went wrong. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchRewards();
  }, [apiUrl]);

  const toggleDetails = (id) => {
    setShowDetails((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  if (loading) return <Loading />;

  if (error) {
    return (
      <div className="text-center py-12">
        <AlertCircle
          className="w-10 h-10 mx-auto mb-4"
          style={{ color: "var(--color-danger)" }}
        />
        <p
          className=""
          style={{
            color: "var(--color-text-primary)",
            fontWeight: "var(--font-medium)",
          }}
        >
          {error}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1
        className="mb-8"
        style={{
          fontSize: "var(--text-3xl)",
          fontFamily: "var(--font-heading)",
          color: "var(--color-text-primary)",
          fontWeight: "var(--font-bold)",
        }}
      >
        Available Rewards
      </h1>

      {rewards.length === 0 ? (
        <div
          className="text-center py-16 border rounded-xl"
          style={{
            backgroundColor: "var(--color-surface)",
            borderColor: "var(--color-border-light)",
          }}
        >
          <Gift
            className="w-12 h-12 mx-auto mb-4 opacity-60"
            style={{ color: "var(--color-text-muted)" }}
          />
          <h3
            className="mb-2"
            style={{
              color: "var(--color-text-secondary)",
              fontWeight: "var(--font-semibold)",
            }}
          >
            No rewards available right now
          </h3>
          <p
            style={{
              color: "var(--color-text-muted)",
              fontSize: "var(--text-sm)",
            }}
          >
            Check back soon — new rewards are added regularly!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {rewards.map((reward) => (
            <div
              key={reward.reward_id}
              className="rounded-xl border overflow-hidden transition-all duration-300 hover:shadow-md hover:border-[var(--color-primary-light)]"
              style={{
                backgroundColor: "var(--color-surface)",
                borderColor: "var(--color-border-light)",
              }}
            >
              {/* Main Content */}
              <div className="p-5 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3
                      className="mb-3 truncate"
                      style={{
                        fontSize: "var(--text-lg)",
                        color: "var(--color-text-primary)",
                        fontWeight: "var(--font-semibold)",
                      }}
                    >
                      {reward.title}
                    </h3>

                    <div
                      className="flex flex-wrap gap-4"
                      style={{ fontSize: "var(--text-sm)" }}
                    >
                      <div className="flex items-center gap-2">
                        <Code
                          className="w-4 h-4"
                          style={{ color: "var(--color-text-muted)" }}
                        />
                        <code
                          className="px-2 py-0.5 font-mono rounded"
                          style={{
                            backgroundColor: "var(--color-bg-alt)",
                            color: "var(--color-primary)",
                            fontSize: "var(--text-xs)",
                          }}
                        >
                          {reward.reward_code}
                        </code>
                      </div>

                      <div className="flex items-center gap-2">
                        <Star
                          className="w-4 h-4"
                          style={{ color: "var(--color-secondary)" }}
                        />
                        <span style={{ color: "var(--color-text-primary)" }}>
                          {reward.point} pts
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <DollarSign
                          className="w-4 h-4"
                          style={{ color: "var(--color-success)" }}
                        />
                        <span
                          style={{
                            color: "var(--color-text-primary)",
                            fontWeight: "var(--font-semibold)",
                          }}
                        >
                          ₹{reward.money}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <button
                      onClick={() => toggleDetails(reward.reward_id)}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg border transition hover:bg-[var(--color-surface-alt)]"
                      style={{
                        borderColor: "var(--color-border-light)",
                        color: "var(--color-text-primary)",
                        fontSize: "var(--text-sm)",
                        fontWeight: "var(--font-medium)",
                      }}
                    >
                      {showDetails[reward.reward_id] ? (
                        <>
                          <EyeOff className="w-4 h-4" />
                          Hide
                        </>
                      ) : (
                        <>
                          <Eye className="w-4 h-4" />
                          Details
                        </>
                      )}
                    </button>

                    <button
                      onClick={() =>
                        navigate(`/reward-claim/${reward.reward_id}`)
                      }
                      className="px-6 py-2 rounded-lg transition hover:opacity-90 active:scale-[0.98]"
                      style={{
                        backgroundColor: "var(--color-primary)",
                        color: "var(--color-text-on-primary)",
                        fontWeight: "var(--font-semibold)",
                      }}
                    >
                      Claim
                    </button>
                  </div>
                </div>
              </div>

              {/* Expandable Details */}
              {showDetails[reward.reward_id] && (
                <div
                  className="border-t px-5 sm:px-6 py-5"
                  style={{ borderColor: "var(--color-border-light)" }}
                >
                  <h4
                    className="mb-3"
                    style={{
                      color: "var(--color-text-primary)",
                      fontWeight: "var(--font-medium)",
                    }}
                  >
                    Description
                  </h4>
                  <p
                    className=""
                    style={{
                      color: "var(--color-text-secondary)",
                      fontSize: "var(--text-sm)",
                      lineHeight: "var(--leading-relaxed)",
                    }}
                  >
                    {reward.description}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RewardsList;
