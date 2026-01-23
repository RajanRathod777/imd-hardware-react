import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Loading from "../../../components/Loading";
import { ChevronLeft, ChevronRight } from "lucide-react";

const RewardPaymentRequest = () => {
  const token = Cookies.get("auth_token");
  const apiUrl = import.meta.env.VITE_SERVER_API_URL || "http://localhost:4444";
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPageInput, setCurrentPageInput] = useState(1); // Fixed: initialized to 1
  const limit = 5;

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalRecords: 0,
    hasNext: false,
    hasPrev: false,
  });

  useEffect(() => {
    fetchPaymentRequests(1);
  }, []);

  const fetchPaymentRequests = async (page = 1) => {
    try {
      setLoading(true);
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${token}`);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      const response = await fetch(
        `${apiUrl}/api/v1/reward-payment-request/user/my-requests?page=${page}&limit=${limit}`,
        requestOptions,
      );
      const result = await response.json();

      console.log("payment requests result", result);
      if (result.status) {
        setRequests(result.requests);
        setPagination(
          result.pagination || {
            currentPage: page,
            totalPages: 1,
            totalRecords: result.requests.length,
            hasNext: false,
            hasPrev: page > 1,
          },
        );
        setCurrentPageInput(page); // Sync input with current page
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("Failed to fetch payment requests");
      console.log("error", err);
    } finally {
      setLoading(false);
    }
  };

  // Fixed: Proper page change handler
  const handlePageChange = (page) => {
    const pageNumber = parseInt(page);
    if (pageNumber >= 1 && pageNumber <= pagination.totalPages) {
      fetchPaymentRequests(pageNumber);
    }
  };

  // Fixed: Handle page input change
  const handlePageInputChange = (e) => {
    const value = e.target.value;
    if (value === "" || (value >= 1 && value <= pagination.totalPages)) {
      setCurrentPageInput(value === "" ? "" : parseInt(value));
    }
  };

  // Fixed: Handle page input submit
  const handlePageInputSubmit = (e) => {
    if (e.key === "Enter") {
      handlePageChange(currentPageInput);
    }
  };

  // Fixed: Handle input blur
  const handleInputBlur = () => {
    if (currentPageInput === "" || currentPageInput < 1) {
      setCurrentPageInput(pagination.currentPage);
    } else if (currentPageInput > pagination.totalPages) {
      setCurrentPageInput(pagination.totalPages);
    } else {
      handlePageChange(currentPageInput);
    }
  };

  const handleNextPage = () => {
    if (pagination.hasNext) {
      fetchPaymentRequests(pagination.currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (pagination.hasPrev) {
      fetchPaymentRequests(pagination.currentPage - 1);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusStyle = (status) => {
    const baseStyle = {
      padding: "0.25rem 0.5rem",
      borderRadius: "0.5rem",
      border: "1px solid",
      fontSize: "var(--text-sm)",
      fontWeight: "var(--font-semibold)",
    };

    if (status === "Pending") {
      return {
        ...baseStyle,
        backgroundColor: "var(--color-warning-light)",
        borderColor: "var(--color-border-warning)",
        color: "var(--color-warning)",
      };
    } else if (status === "Completed" || status === "Approved") {
      return {
        ...baseStyle,
        backgroundColor: "var(--color-success-light)",
        borderColor: "var(--color-border-success)",
        color: "var(--color-success)",
      };
    } else if (status === "Rejected") {
      return {
        ...baseStyle,
        backgroundColor: "var(--color-danger-light)",
        borderColor: "var(--color-border-danger)",
        color: "var(--color-danger)",
      };
    } else {
      return {
        ...baseStyle,
        backgroundColor: "var(--color-bg-alt)",
        borderColor: "var(--color-border)",
        color: "var(--color-text-secondary)",
      };
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div
        className="max-w-4xl mx-auto p-6"
        style={{
          backgroundColor: "var(--color-bg)",
          fontFamily: "var(--font-body)",
        }}
      >
        <div
          className="text-center py-10 border"
          style={{
            color: "var(--color-danger)",
            borderColor: "var(--color-border-danger)",
            fontSize: "var(--text-base)",
            fontWeight: "var(--font-medium)",
          }}
        >
          {error}
        </div>
      </div>
    );
  }

  return (
    <div
      className="max-w-4xl mx-auto"
      style={{
        backgroundColor: "var(--color-bg)",
        color: "var(--color-text-primary)",
      }}
    >
      {/* Requests List */}
      <div className="h-[calc(100vh-135px)] max-[1035px]:h-[calc(100vh-230px)] overflow-y-auto  space-y-1 ">
        {requests.length === 0 ? (
          <div
            className="text-center py-10 border"
            style={{
              fontSize: "var(--text-base)",
              borderColor: "var(--color-border)",
              backgroundColor: "var(--color-surface)",
              color: "var(--color-text-muted)",
              fontWeight: "var(--font-normal)",
            }}
          >
            No payment requests found
          </div>
        ) : (
          requests.map((request) => (
            <div
              key={request.reward_payment_request_id}
              className="border rounded-lg p-2"
              style={{
                borderColor: "var(--color-border)",
                backgroundColor: "var(--color-surface)",
              }}
            >
              {/* Request Header */}
              <div
                className="flex justify-between items-center mb-1 pb-2 border-b"
                style={{ borderColor: "var(--color-border)" }}
              >
                <div className="flex items-center gap-3">
                  <span
                    style={{
                      fontSize: "var(--text-sm)",
                      fontWeight: "var(--font-semibold)",
                      color: "var(--color-text-primary)",
                    }}
                  >
                    ${request.amount}
                  </span>
                  <span
                    className="border px-2 py-1"
                    style={{
                      fontSize: "var(--text-sm)",
                      fontWeight: "var(--font-medium)",
                      color: "var(--color-primary)",
                      borderColor: "var(--color-border-primary)",
                      backgroundColor: "var(--color-primary-soft)",
                    }}
                  >
                    {request.payment_method}
                  </span>
                </div>

                <div style={getStatusStyle(request.status)}>
                  {request.status}
                </div>
              </div>

              {/* Request Details */}
              <div className="space-y-2">
                {request.payment_method === "BankTransfer" && (
                  <>
                    <div className="flex items-center justify-between gap-3">
                      <span
                        className="min-w-[120px]"
                        style={{
                          fontSize: "var(--text-sm)",
                          fontWeight: "var(--font-semibold)",
                          color: "var(--color-text-primary)",
                        }}
                      >
                        Account Holder Name :
                      </span>
                      <span
                        className="text-right"
                        style={{
                          fontSize: "var(--text-sm)",
                          color: "var(--color-text-secondary)",
                        }}
                      >
                        {request.payment_info.account_holder_name}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-3">
                      <span
                        className="min-w-[120px]"
                        style={{
                          fontSize: "var(--text-sm)",
                          fontWeight: "var(--font-semibold)",
                          color: "var(--color-text-primary)",
                        }}
                      >
                        Bank Name :
                      </span>
                      <span
                        className="text-right"
                        style={{
                          fontSize: "var(--text-sm)",
                          color: "var(--color-text-secondary)",
                        }}
                      >
                        {request.payment_info.bank_name}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-3">
                      <span
                        className="min-w-[120px]"
                        style={{
                          fontSize: "var(--text-sm)",
                          fontWeight: "var(--font-semibold)",
                          color: "var(--color-text-primary)",
                        }}
                      >
                        Account Number :
                      </span>
                      <span
                        className="text-right"
                        style={{
                          fontSize: "var(--text-sm)",
                          color: "var(--color-text-secondary)",
                        }}
                      >
                        {request.payment_info.account_number}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-3">
                      <span
                        className="min-w-[120px]"
                        style={{
                          fontSize: "var(--text-sm)",
                          fontWeight: "var(--font-semibold)",
                          color: "var(--color-text-primary)",
                        }}
                      >
                        Bank IFC Code :
                      </span>
                      <span
                        className="text-right"
                        style={{
                          fontSize: "var(--text-sm)",
                          color: "var(--color-text-secondary)",
                        }}
                      >
                        {request.payment_info.bank_IFC_code}
                      </span>
                    </div>
                  </>
                )}

                {request.payment_method === "UPI" && (
                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <span
                        className="min-w-[120px]"
                        style={{
                          fontSize: "var(--text-sm)",
                          fontWeight: "var(--font-semibold)",
                          color: "var(--color-text-primary)",
                        }}
                      >
                        UPI ID:
                      </span>
                      <span
                        className="text-right"
                        style={{
                          fontSize: "var(--text-sm)",
                          color: "var(--color-text-secondary)",
                        }}
                      >
                        {request.payment_info.upi_id}
                      </span>
                    </div>
                  </div>
                )}

                <div className="flex justify-between items-start">
                  <span
                    className="min-w-[120px]"
                    style={{
                      fontSize: "var(--text-sm)",
                      fontWeight: "var(--font-semibold)",
                      color: "var(--color-text-primary)",
                    }}
                  >
                    Request Date :
                  </span>
                  <span
                    className="text-right"
                    style={{
                      fontSize: "var(--text-sm)",
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    {formatDate(request.request_date)}
                  </span>
                </div>

                <p
                  className="py-2 flex border-y"
                  style={{
                    fontSize: "var(--text-sm)",
                    color: "var(--color-text-secondary)",
                    borderColor: "var(--color-border)",
                  }}
                >
                  Company message
                </p>

                <div className="flex justify-between items-start">
                  <span
                    className="min-w-[120px]"
                    style={{
                      fontSize: "var(--text-sm)",
                      fontWeight: "var(--font-semibold)",
                      color: "var(--color-text-primary)",
                    }}
                  >
                    Verified :
                  </span>
                  <span
                    className="text-right"
                    style={{
                      fontSize: "var(--text-sm)",
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    {request.is_verified
                      ? request.rejection_reason
                        ? "No"
                        : "Yes"
                      : "No"}
                  </span>
                </div>

                {request.transaction_id && request.processed_date && (
                  <div className="flex justify-between items-start">
                    <span
                      className="min-w-[120px]"
                      style={{
                        fontSize: "var(--text-sm)",
                        fontWeight: "var(--font-semibold)",
                        color: "var(--color-text-primary)",
                      }}
                    >
                      Processed Date :
                    </span>
                    <span
                      className="text-right"
                      style={{
                        fontSize: "var(--text-sm)",
                        color: "var(--color-text-secondary)",
                      }}
                    >
                      {formatDate(request.processed_date)}
                    </span>
                  </div>
                )}

                {request.transaction_id && request.processed_date && (
                  <div className="flex justify-between items-start">
                    <span
                      className="min-w-[120px]"
                      style={{
                        fontSize: "var(--text-sm)",
                        fontWeight: "var(--font-semibold)",
                        color: "var(--color-text-primary)",
                      }}
                    >
                      Transaction ID :
                    </span>
                    <span
                      className="text-right"
                      style={{
                        fontSize: "var(--text-sm)",
                        color: "var(--color-text-secondary)",
                      }}
                    >
                      {request.transaction_id}
                    </span>
                  </div>
                )}

                {request.is_verified === false && request.rejection_reason && (
                  <div
                    className="flex justify-between items-start border p-2"
                    style={{
                      borderColor: "var(--color-danger)",
                      backgroundColor: "var(--color-danger-light)",
                    }}
                  >
                    <span
                      className="min-w-[120px]"
                      style={{
                        fontSize: "var(--text-sm)",
                        color: "var(--color-danger)",
                        fontWeight: "var(--font-semibold)",
                      }}
                    >
                      Rejection Reason :
                    </span>
                    <span
                      className="text-right"
                      style={{
                        fontSize: "var(--text-sm)",
                        color: "var(--color-danger)",
                      }}
                    >
                      {request.rejection_reason}
                    </span>
                  </div>
                )}

                {request.admin_comment && (
                  <div className="flex justify-between items-start">
                    <span
                      className="min-w-[120px]"
                      style={{
                        fontSize: "var(--text-sm)",
                        fontWeight: "var(--font-semibold)",
                        color: "var(--color-text-primary)",
                      }}
                    >
                      Comment :
                    </span>
                    <span
                      className="text-right"
                      style={{
                        fontSize: "var(--text-sm)",
                        color: "var(--color-text-secondary)",
                      }}
                    >
                      {request.admin_comment}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {pagination && pagination.totalPages > 1 && (
        <div className="mt-1 flex items-center justify-center gap-5">
          {/* Previous Button */}
          <button
            onClick={handlePrevPage}
            disabled={!pagination.hasPrev || loading}
            className="w-8 h-8 items-center justify-center border flex items-center gap-2"
            style={{
              fontSize: "var(--text-sm)",
              backgroundColor:
                pagination.hasPrev && !loading
                  ? "var(--color-surface)"
                  : "var(--color-bg-alt)",
              color:
                pagination.hasPrev && !loading
                  ? "var(--color-text-primary)"
                  : "var(--color-text-muted)",
              borderColor: "var(--color-border)",
              cursor:
                pagination.hasPrev && !loading ? "pointer" : "not-allowed",
              fontWeight: "var(--font-medium)",
            }}
          >
            <ChevronLeft />
          </button>

          {/* Page Input */}
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={currentPageInput}
              min={1}
              max={pagination.totalPages}
              onChange={handlePageInputChange}
              onKeyPress={handlePageInputSubmit}
              onBlur={handleInputBlur}
              className="h-8 border text-center"
              style={{
                fontSize: "var(--text-base)",
                borderColor: "var(--color-border)",
                backgroundColor: "var(--color-surface)",
                color: "var(--color-text-primary)",
              }}
              disabled={loading}
            />
            <span
              style={{
                fontSize: "var(--text-sm)",
                color: "var(--color-text-secondary)",
              }}
            >
              / {pagination.totalPages}
            </span>
          </div>

          {/* Next Button */}
          <button
            onClick={handleNextPage}
            disabled={!pagination.hasNext || loading}
            className="w-8 h-8 border items-center justify-center flex items-center gap-2"
            style={{
              fontSize: "var(--text-sm)",
              backgroundColor:
                pagination.hasNext && !loading
                  ? "var(--color-surface)"
                  : "var(--color-bg-alt)",
              color:
                pagination.hasNext && !loading
                  ? "var(--color-text-primary)"
                  : "var(--color-text-muted)",
              borderColor: "var(--color-border)",
              cursor:
                pagination.hasNext && !loading ? "pointer" : "not-allowed",
              fontWeight: "var(--font-medium)",
            }}
          >
            <ChevronRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default RewardPaymentRequest;
