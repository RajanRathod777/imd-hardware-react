import { useRef } from "react";
import { Download } from "lucide-react";

/**
 * DownloadBill Component
 * Uses HTML-to-PDF conversion (html2pdf.js)
 */
const DownloadBill = ({ data }) => {
  const invoiceRef = useRef(null);

  const handleDownloadPDF = async () => {
    const element = invoiceRef.current;

    // Check if element exists
    if (!element) {
      console.error("Invoice element not found");
      return;
    }

    // Debug: Log the data to ensure it's populated
    console.log("Downloading PDF for data:", data);

    // Dynamically import html2pdf.js to avoid SSR issues
    const html2pdf = (await import("html2pdf.js")).default;

    // Configuration for html2pdf
    const opt = {
      margin: 0, // No margin, as we handle padding inside the HTML
      filename: data.tracking_number
        ? `Invoice_${data.tracking_number}.pdf`
        : `Invoice_Order_${data.order_id}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        logging: true, // Enable logging for debugging
      },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    // Generate and download
    html2pdf().set(opt).from(element).save();
  };

  // Helper to format currency
  const formatCurrency = (amount) => {
    // Safety check for null/undefined amounts
    if (amount === null || amount === undefined) return "0.00";
    return parseFloat(amount).toFixed(2);
  };

  return (
    <>
      <button
        onClick={handleDownloadPDF}
        className="inline-flex items-center gap-2 px-0 py-1 transition-colors duration-200  hover:opacity-90 active:scale-95"
        style={{
          fontSize: "var(--text-sm)",
          color: "var(--color-text-primary)",
          fontWeight: "var(--font-medium)",
        }}
      >
        <Download className="w-4 h-4" />
        <span>Download Invoice</span>
      </button>

      <div
        style={{
          display: "none",
        }}
      >
        <div
          ref={invoiceRef}
          style={{
            fontFamily: "Helvetica, Arial, sans-serif",
            backgroundColor: "var(--color-surface)",
            color: "var(--color-text-primary)",
            minHeight: "297mm", // A4 Height - Critical for html2canvas
            height: "auto", // Allow it to grow if content exceeds A4
            padding: "0", // Ensure padding is handled by inner elements
          }}
        >
          {/* 1. HEADER */}
          <div
            className="flex justify-between px-[15mm] py-[6mm]"
            style={{
              backgroundColor: "var(--color-primary-dark)",
              color: "var(--color-text-on-primary)",
            }}
          >
            <div>
              <h1
                className="leading-none mb-1"
                style={{
                  fontSize: "var(--text-2xl)",
                  fontWeight: "var(--font-bold)",
                }}
              >
                IMD Hardware
              </h1>
              <p className="opacity-90" style={{ fontSize: "var(--text-xs)" }}>
                Near Vaikunthdham Temple,
                <br />
                Himatnagar Shamlaji Road,
                <br />
                Sabarkantha, Gujarat - 383001
              </p>
            </div>
            <div className="text-right">
              <h2
                className="leading-none mb-1"
                style={{
                  fontSize: "var(--text-3xl)",
                  fontWeight: "var(--font-bold)",
                }}
              >
                INVOICE
              </h2>
              <p style={{ fontSize: "var(--text-xs)" }}>
                GSTIN: 24BPYPR7738J1ZU
              </p>
              <p style={{ fontSize: "var(--text-xs)" }}>
                Invoice No: {data.tracking_number || `ORD-${data.order_id}`}
              </p>
              <p style={{ fontSize: "var(--text-xs)" }}>
                Date: {new Date(data.created_at).toLocaleDateString("en-IN")}
              </p>
              <p style={{ fontSize: "var(--text-xs)" }}>
                Status:{" "}
                <span style={{ textTransform: "uppercase" }}>
                  {data.order_status}
                </span>
              </p>
            </div>
          </div>

          {/* 2. ADDRESSES */}
          <div
            className="px-[15mm] py-4 border-b-2"
            style={{ borderColor: "var(--color-primary-dark)" }}
          >
            <h3
              className="mb-2"
              style={{
                fontSize: "var(--text-sm)",
                color: "var(--color-primary-dark)",
                fontWeight: "var(--font-bold)",
              }}
            >
              BILL TO & SHIP TO
            </h3>

            <div
              className="flex justify-between"
              style={{ fontSize: "var(--text-sm)" }}
            >
              <div>
                <p
                  style={{
                    color: "var(--color-text-muted)",
                    fontSize: "var(--text-xs)",
                  }}
                >
                  Customer Phone:
                </p>
                <p style={{ fontWeight: "var(--font-medium)" }}>
                  {data.phone_code} {data.phone}
                </p>

                <p
                  style={{
                    color: "var(--color-text-muted)",
                    fontSize: "var(--text-xs)",
                    marginTop: "0.5rem",
                  }}
                >
                  Payment Method:
                </p>
                <p style={{ fontWeight: "var(--font-medium)" }}>
                  {data.payment_method}
                </p>
              </div>

              <div className="text-right w-1/2">
                <p
                  style={{
                    fontWeight: "var(--font-bold)",
                    color: "var(--color-text-primary)",
                  }}
                >
                  Shipping Address:
                </p>
                <p
                  className="mt-1 leading-tight"
                  style={{
                    fontSize: "var(--text-xs)",
                    color: "var(--color-text-secondary)",
                  }} // gray-600
                >
                  {data.shipping_address}
                  <br />
                  {data.city}, {data.state} - {data.pincode}
                </p>
              </div>
            </div>
          </div>

          {/* 3. ITEMS TABLE */}
          <div className="px-[15mm] mt-4">
            <table
              className="w-full text-left border-collapse"
              style={{ fontSize: "var(--text-sm)" }}
            >
              <thead>
                <tr
                  style={{
                    backgroundColor: "var(--color-primary-dark)",
                    color: "var(--color-text-on-primary)",
                    textTransform: "uppercase",
                    fontSize: "var(--text-xs)",
                    fontWeight: "var(--font-bold)",
                  }}
                >
                  <th className="py-2 px-1 w-1/2 text-left">
                    Item Description
                  </th>
                  <th className="py-2 px-1 text-center w-12">Qty</th>
                  <th className="py-2 px-1 text-right w-16">Rate</th>
                  <th className="py-2 px-1 text-right w-16">Tax</th>
                  <th
                    className="py-2 px-1 text-right w-20"
                    style={{ paddingRight: "1rem" }}
                  >
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.items && data.items.length > 0 ? (
                  data.items.map((item, index) => (
                    <tr
                      key={index}
                      className=""
                      style={{
                        fontSize: "var(--text-xs)",
                        backgroundColor:
                          index % 2 === 0
                            ? "var(--color-bg-alt)"
                            : "var(--color-surface)",
                      }}
                    >
                      <td className="py-2 px-1 align-top pt-3">
                        {item.product_name}
                      </td>
                      <td className="py-2 px-1 text-center align-top pt-3">
                        {item.quantity}
                      </td>
                      <td className="py-2 px-1 text-right align-top pt-3">
                        {formatCurrency(item.price)}
                      </td>
                      <td className="py-2 px-1 text-right align-top pt-3">
                        {formatCurrency(item.gst_amount || 0)}
                      </td>
                      <td
                        className="py-2 px-1 text-right align-top pt-3"
                        style={{
                          paddingRight: "1rem",
                          fontWeight: "var(--font-medium)",
                        }}
                      >
                        {formatCurrency(item.total)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="py-4 text-center"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      No items found in this invoice.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* 4. SUMMARY SECTION */}
          <div className="px-[15mm] mt-6 flex justify-end">
            <div className="w-[80mm]">
              {/* Subtotal & Tax Calculations */}
              <div
                className="flex justify-between mb-1"
                style={{ fontSize: "var(--text-xs)" }}
              >
                <span style={{ color: "var(--color-text-secondary)" }}>
                  Subtotal:
                </span>
                <span className="text-right w-24">
                  {formatCurrency(
                    data.items
                      ? data.items.reduce(
                          (acc, item) =>
                            acc +
                            (parseFloat(item.price) || 0) *
                              (item.quantity || 0),
                          0
                        )
                      : 0
                  )}
                </span>
              </div>

              <div
                className="flex justify-between mb-1"
                style={{ fontSize: "var(--text-xs)" }}
              >
                <span style={{ color: "var(--color-text-secondary)" }}>
                  Total Tax (GST):
                </span>
                <span className="text-right w-24">
                  {formatCurrency(
                    data.items
                      ? data.items.reduce(
                          (acc, item) =>
                            acc + (parseFloat(item.gst_amount) || 0),
                          0
                        )
                      : 0
                  )}
                </span>
              </div>

              {data.discount_value > 0 && (
                <div
                  className="flex justify-between mb-1"
                  style={{
                    fontSize: "var(--text-xs)",
                    color: "var(--color-danger)",
                  }}
                >
                  <span>Discount (-):</span>
                  <span className="text-right w-24">
                    {formatCurrency(data.discount_value)}
                  </span>
                </div>
              )}

              {/* GRAND TOTAL BLOCK */}
              <div
                className="flex justify-between items-center mt-3 pt-3"
                style={{ borderTop: "2px solid var(--color-border-dark)" }}
              >
                <span
                  className="tracking-wide"
                  style={{
                    fontSize: "var(--text-lg)",
                    color: "var(--color-text-primary)",
                    fontWeight: "var(--font-normal)",
                  }}
                >
                  GRAND TOTAL:
                </span>
                <span
                  className="w-24 text-right pr-2"
                  style={{
                    fontSize: "var(--text-xl)",
                    color: "var(--color-text-primary)",
                    fontWeight: "var(--font-normal)",
                  }}
                >
                  {formatCurrency(data.final_amount)}
                </span>
              </div>
            </div>
          </div>

          {/* 5. FOOTER */}
          <div className="absolute bottom-[15mm] left-[15mm] right-[15mm]">
            <div
              className="mb-4"
              style={{
                fontSize: "var(--text-xs)",
                color: "var(--color-text-muted)",
              }}
            >
              <p
                style={{
                  fontSize: "var(--text-xs)",
                  color: "var(--color-text-secondary)",
                  fontWeight: "var(--font-bold)",
                }}
              >
                Terms & Conditions:
              </p>
              <p>1. Goods once sold will not be taken back.</p>
              <p>2. Subject to jurisdiction of Gujarat, India.</p>
            </div>

            <div className="flex justify-end">
              <div className="text-center">
                <div
                  className="w-[40mm] mb-1"
                  style={{ borderBottom: "1px solid var(--color-border)" }}
                ></div>
                <p
                  style={{
                    fontSize: "var(--text-xs)",
                    color: "var(--color-text-secondary)",
                    fontWeight: "var(--font-bold)",
                  }}
                >
                  Authorized Signatory
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DownloadBill;
