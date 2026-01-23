import React from "react";

export function APL_DoorLock() {
  return (
    <div
      className="w-full py-6 md:py-8 lg:py-12 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundColor: "var(--color-bg)",
        fontFamily: "var(--font-body)",
        minHeight: "100vh",
      }}
    >
      {/* Main Container */}
      <div
        className="max-w-7xl mx-auto rounded-xl p-4 sm:p-6 lg:p-8"
        style={{
          backgroundColor: "var(--color-surface)",
          boxShadow: "0 4px 20px var(--shadow-soft)",
          border: "1px solid var(--color-border-light)",
        }}
      >
        {/* Mobile: Stacked Layout */}
        <div className="block lg:hidden">
          {/* Header */}
          <div className="mb-6">
            <div className="flex justify-between items-start">
              <div>
                <span
                  className="inline-block px-2 py-1 rounded-full text-xs font-semibold mb-2"
                  style={{
                    backgroundColor: "var(--color-primary-soft)",
                    color: "var(--color-primary-dark)",
                    letterSpacing: "var(--tracking-wide)",
                  }}
                >
                  PREMIUM
                </span>
                <h1
                  className="text-2xl font-bold mb-1"
                  style={{
                    color: "var(--color-text-primary)",
                    fontFamily: "var(--font-heading)",
                    fontWeight: "var(--font-bold)",
                    lineHeight: "var(--leading-tight)",
                  }}
                >
                  APL SmartPro Door Lock
                </h1>
              </div>

              {/* Mobile Price */}
              <div className="text-right">
                <div className="flex flex-col items-end">
                  <span
                    className="text-3xl font-extrabold mb-1"
                    style={{
                      background: "var(--gradient-primary)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    ₹12,999
                  </span>
                  <span
                    className="text-sm line-through"
                    style={{
                      color: "var(--color-text-light)",
                    }}
                  >
                    ₹16,999
                  </span>
                </div>
              </div>
            </div>

            <p
              className="text-base mt-2"
              style={{
                color: "var(--color-text-secondary)",
                fontWeight: "var(--font-medium)",
              }}
            >
              Military-Grade Smart Security Lock
            </p>
          </div>

          {/* Main Video - Mobile */}
          <div className="mb-6">
            <div className="mb-2 flex justify-between items-center">
              <h3
                className="text-base font-semibold"
                style={{
                  color: "var(--color-text-primary)",
                  fontFamily: "var(--font-heading)",
                }}
              >
                Product Demo
              </h3>
              <span
                className="text-xs px-2 py-1 rounded-full"
                style={{
                  backgroundColor: "var(--color-primary-soft)",
                  color: "var(--color-primary-dark)",
                  fontWeight: "var(--font-semibold)",
                }}
              >
                2:45
              </span>
            </div>
            <div
              className="w-full rounded-lg overflow-hidden bg-black aspect-video"
              style={{
                border: "1px solid var(--color-border-dark)",
              }}
            >
              <div
                className="w-full h-full flex items-center justify-center"
                style={{
                  backgroundColor: "var(--color-bg-alt)",
                }}
              >
                <div className="text-center">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 cursor-pointer hover:scale-105 transition-transform"
                    role="button"
                    aria-label="Play Product Demo Video"
                    style={{
                      background: "var(--gradient-primary)",
                      boxShadow: "0 4px 12px var(--shadow-strong)",
                    }}
                  >
                    <svg
                      className="w-6 h-6"
                      style={{ fill: "var(--color-text-on-primary)" }}
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <p
                    className="text-xs"
                    style={{
                      color: "var(--color-text-on-primary)",
                      fontWeight: "var(--font-medium)",
                    }}
                  >
                    Play Demo
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Gallery - Mobile (Horizontal Scroll) */}
          <div className="mb-8">
            <h3
              className="text-base font-semibold mb-3"
              style={{
                color: "var(--color-text-primary)",
                fontFamily: "var(--font-heading)",
              }}
            >
              Product Gallery
            </h3>
            <div className="flex space-x-4 overflow-x-auto pb-4 -mx-2 px-2">
              {[
                {
                  label: "Front",
                  color: "var(--color-primary-soft)",
                },
                {
                  label: "Install",
                  color: "var(--color-secondary-light)",
                },
                {
                  label: "Interior",
                  color: "var(--color-surface-alt)",
                },
                {
                  label: "App",
                  color: "var(--color-success-light)",
                },
                {
                  label: "Kit",
                  color: "var(--color-border-lighter)",
                },
                {
                  label: "Warranty",
                  color: "var(--color-warning-light)",
                },
              ].map((item, index) => (
                <div key={index} className="flex-shrink-0 w-28">
                  <div
                    className="w-full aspect-square rounded-lg overflow-hidden border-2 mb-2"
                    role="img"
                    aria-label={`Product view: ${item.label}`}
                    style={{
                      backgroundColor: item.color,
                      borderColor: "var(--color-border)",
                    }}
                  >
                    <div className="w-full h-full flex items-center justify-center">
                      <span
                        className="text-xl font-bold"
                        style={{
                          color: "var(--color-text-secondary)",
                        }}
                      >
                        {index + 1}
                      </span>
                    </div>
                  </div>
                  <p
                    className="text-xs text-center font-medium truncate"
                    style={{
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tablet & Desktop: Grid Layout */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-12 gap-8">
            {/* Left Column: Media */}
            <div className="col-span-7">
              {/* Main Video - Desktop */}
              <div className="mb-6">
                <div className="mb-3 flex justify-between items-center">
                  <h2
                    className="text-xl font-semibold"
                    style={{
                      color: "var(--color-text-primary)",
                      fontFamily: "var(--font-heading)",
                    }}
                  >
                    Product Demonstration
                  </h2>
                  <div className="flex items-center gap-4">
                    <span
                      className="text-sm px-3 py-1 rounded-full"
                      style={{
                        backgroundColor: "var(--color-primary-soft)",
                        color: "var(--color-primary-dark)",
                        fontWeight: "var(--font-semibold)",
                      }}
                    >
                      2:45 min video
                    </span>
                    <span
                      className="text-sm"
                      style={{
                        color: "var(--color-text-muted)",
                      }}
                    >
                      HD Quality • 360° View
                    </span>
                  </div>
                </div>
                <div
                  className="w-full rounded-xl overflow-hidden bg-black aspect-video"
                  style={{
                    border: "1px solid var(--color-border-dark)",
                  }}
                >
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{
                      backgroundColor: "var(--color-bg-alt)",
                    }}
                  >
                    <div className="text-center">
                      <div
                        className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 cursor-pointer hover:scale-110 transition-transform"
                        style={{
                          background: "var(--gradient-primary)",
                          boxShadow: "0 6px 25px var(--shadow-strong)",
                        }}
                      >
                        <svg
                          className="w-10 h-10"
                          style={{ fill: "var(--color-text-on-primary)" }}
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                      <p
                        className="text-base"
                        style={{
                          color: "var(--color-text-on-primary)",
                          fontWeight: "var(--font-medium)",
                        }}
                      >
                        Click to play full product demonstration
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Gallery Grid - Desktop */}
              <div>
                <h3
                  className="text-lg font-semibold mb-4"
                  style={{
                    color: "var(--color-text-primary)",
                    fontFamily: "var(--font-heading)",
                  }}
                >
                  Product Gallery
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    {
                      label: "Front View",
                      desc: "Complete unit",
                    },
                    {
                      label: "Installation",
                      desc: "Step-by-step",
                    },
                    {
                      label: "Interior Side",
                      desc: "Internal mechanism",
                    },
                    {
                      label: "Mobile App",
                      desc: "Smart controls",
                    },
                    {
                      label: "Accessories",
                      desc: "Full kit",
                    },
                    {
                      label: "Warranty Card",
                      desc: "3 years coverage",
                    },
                  ].map((item, index) => (
                    <div key={index} className="group cursor-pointer">
                      <div
                        className="w-full aspect-square rounded-lg overflow-hidden border-2 mb-2 transition-all duration-300 group-hover:border-primary group-hover:shadow-md"
                        style={{
                          backgroundColor:
                            index % 2 === 0
                              ? "var(--color-primary-soft)"
                              : "var(--color-surface-alt)",
                          borderColor: "var(--color-border)",
                        }}
                      >
                        <div className="w-full h-full flex items-center justify-center">
                          <span
                            className="text-2xl font-bold group-hover:scale-110 transition-transform"
                            style={{
                              color: "var(--color-text-secondary)",
                            }}
                          >
                            {index + 1}
                          </span>
                        </div>
                      </div>
                      <div>
                        <p
                          className="text-sm font-semibold"
                          style={{
                            color: "var(--color-text-primary)",
                          }}
                        >
                          {item.label}
                        </p>
                        <p
                          className="text-xs"
                          style={{
                            color: "var(--color-text-muted)",
                          }}
                        >
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Product Info */}
            <div className="col-span-5">
              {/* Product Header */}
              <div className="mb-8">
                <span
                  className="inline-block px-3 py-1 rounded-full text-sm font-semibold mb-4"
                  style={{
                    backgroundColor: "var(--color-primary-soft)",
                    color: "var(--color-primary-dark)",
                    letterSpacing: "var(--tracking-wide)",
                  }}
                >
                  MILITARY GRADE SECURITY
                </span>

                <h1
                  className="text-3xl font-bold mb-3"
                  style={{
                    color: "var(--color-text-primary)",
                    fontFamily: "var(--font-heading)",
                    fontWeight: "var(--font-bold)",
                    lineHeight: "var(--leading-tight)",
                  }}
                >
                  APL SmartPro Digital Door Lock
                </h1>

                <p
                  className="text-xl mb-6"
                  style={{
                    color: "var(--color-text-secondary)",
                    fontWeight: "var(--font-medium)",
                  }}
                >
                  Advanced biometric security with smart home integration
                </p>

                {/* Price Section */}
                <div
                  className="mb-8 p-6 rounded-xl"
                  style={{
                    backgroundColor: "var(--color-surface-alt)",
                  }}
                >
                  <p
                    className="text-sm mb-2"
                    style={{
                      color: "var(--color-text-muted)",
                      fontWeight: "var(--font-medium)",
                    }}
                  >
                    Starting Price
                  </p>
                  <div className="flex items-baseline gap-3 mb-3">
                    <span
                      className="text-5xl font-extrabold"
                      style={{
                        background: "var(--gradient-primary)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        fontFamily: "var(--font-heading)",
                      }}
                    >
                      ₹12,999
                    </span>
                    <span
                      className="text-xl line-through"
                      style={{
                        color: "var(--color-text-light)",
                      }}
                    >
                      ₹16,999
                    </span>
                  </div>
                  <div
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg"
                    style={{
                      backgroundColor: "var(--color-success-light)",
                      color: "var(--color-success)",
                      border: "1px solid var(--color-border-success)",
                    }}
                  >
                    <span className="font-bold">24% OFF</span>
                    <span className="text-sm">• Limited Time Offer</span>
                  </div>
                </div>
              </div>

              {/* Quick Features */}
              <div className="mb-8">
                <h3
                  className="text-lg font-semibold mb-4"
                  style={{
                    color: "var(--color-text-primary)",
                    fontFamily: "var(--font-heading)",
                  }}
                >
                  Key Features
                </h3>
                <div className="space-y-3">
                  {[
                    {
                      icon: "🔒",
                      feature: "IP68 Water & Dust Proof",
                      detail: "All-weather protection",
                    },
                    {
                      icon: "📱",
                      feature: "Mobile App Control",
                      detail: "Remote access & monitoring",
                    },
                    {
                      icon: "👆",
                      feature: "Fingerprint Scanner",
                      detail: "0.3s recognition time",
                    },
                    {
                      icon: "🏠",
                      feature: "Smart Home Ready",
                      detail: "Alexa & Google Home",
                    },
                    {
                      icon: "🔋",
                      feature: "12 Month Battery",
                      detail: "Low power indicator",
                    },
                    {
                      icon: "🚨",
                      feature: "Anti-Tamper Alarm",
                      detail: "Instant notifications",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-surface-alt transition-colors"
                      style={{
                        border: "1px solid var(--color-border-light)",
                      }}
                    >
                      <span className="text-xl">{item.icon}</span>
                      <div>
                        <p
                          className="font-semibold"
                          style={{
                            color: "var(--color-text-primary)",
                          }}
                        >
                          {item.feature}
                        </p>
                        <p
                          className="text-sm"
                          style={{
                            color: "var(--color-text-muted)",
                          }}
                        >
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Specifications */}
              <div>
                <h3
                  className="text-lg font-semibold mb-4"
                  style={{
                    color: "var(--color-text-primary)",
                    fontFamily: "var(--font-heading)",
                  }}
                >
                  Specifications
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div
                    className="p-4 rounded-lg"
                    style={{
                      backgroundColor: "var(--color-surface-alt)",
                    }}
                  >
                    <p
                      className="text-sm font-semibold mb-1"
                      style={{
                        color: "var(--color-text-muted)",
                      }}
                    >
                      Material
                    </p>
                    <p
                      style={{
                        color: "var(--color-text-primary)",
                      }}
                    >
                      Zinc Alloy
                    </p>
                  </div>
                  <div
                    className="p-4 rounded-lg"
                    style={{
                      backgroundColor: "var(--color-surface-alt)",
                    }}
                  >
                    <p
                      className="text-sm font-semibold mb-1"
                      style={{
                        color: "var(--color-text-muted)",
                      }}
                    >
                      Weight
                    </p>
                    <p
                      style={{
                        color: "var(--color-text-primary)",
                      }}
                    >
                      2.4 kg
                    </p>
                  </div>
                  <div
                    className="p-4 rounded-lg"
                    style={{
                      backgroundColor: "var(--color-surface-alt)",
                    }}
                  >
                    <p
                      className="text-sm font-semibold mb-1"
                      style={{
                        color: "var(--color-text-muted)",
                      }}
                    >
                      Warranty
                    </p>
                    <p
                      style={{
                        color: "var(--color-text-primary)",
                      }}
                    >
                      3 Years
                    </p>
                  </div>
                  <div
                    className="p-4 rounded-lg"
                    style={{
                      backgroundColor: "var(--color-surface-alt)",
                    }}
                  >
                    <p
                      className="text-sm font-semibold mb-1"
                      style={{
                        color: "var(--color-text-muted)",
                      }}
                    >
                      Colors
                    </p>
                    <p
                      style={{
                        color: "var(--color-text-primary)",
                      }}
                    >
                      4 Options
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Common Sections for All Devices */}

        {/* Features Grid - Responsive */}
        <div className="mt-8 lg:mt-12">
          <h2
            className="text-xl lg:text-2xl font-bold mb-6 pb-3 border-b"
            style={{
              color: "var(--color-text-primary)",
              borderColor: "var(--color-border-light)",
              fontFamily: "var(--font-heading)",
            }}
          >
            Advanced Features
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {[
              {
                title: "Biometric Security",
                desc: "Store up to 100 fingerprints with 99.9% accuracy",
                icon: "👁️",
              },
              {
                title: "Emergency Power",
                desc: "USB-C backup charging during battery failure",
                icon: "⚡",
              },
              {
                title: "Auto Lock",
                desc: "Automatically locks after 30 seconds for safety",
                icon: "⏱️",
              },
              {
                title: "Guest Access",
                desc: "Create temporary access codes for visitors",
                icon: "👥",
              },
              {
                title: "Activity Log",
                desc: "Track all access with timestamps in app",
                icon: "📊",
              },
              {
                title: "Child Lock",
                desc: "Prevent unauthorized access by children",
                icon: "🔐",
              },
              {
                title: "Weather Proof",
                desc: "Operates in -20°C to 60°C temperature",
                icon: "🌡️",
              },
              {
                title: "Easy Install",
                desc: "Fits standard doors, DIY installation guide",
                icon: "🔧",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-4 lg:p-5 rounded-xl border transition-all hover:shadow-sm"
                style={{
                  borderColor: "var(--color-border)",
                  backgroundColor: "var(--color-surface)",
                }}
              >
                <div className="text-2xl lg:text-3xl mb-3">{feature.icon}</div>
                <h3
                  className="text-base lg:text-lg font-semibold mb-2"
                  style={{
                    color: "var(--color-text-primary)",
                  }}
                >
                  {feature.title}
                </h3>
                <p
                  className="text-xs lg:text-sm"
                  style={{
                    color: "var(--color-text-secondary)",
                    lineHeight: "var(--leading-relaxed)",
                  }}
                >
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Product Description - Responsive */}
        <div className="mt-8 lg:mt-12">
          <h2
            className="text-xl lg:text-2xl font-bold mb-4 lg:mb-6"
            style={{
              color: "var(--color-text-primary)",
              fontFamily: "var(--font-heading)",
            }}
          >
            Detailed Description
          </h2>
          <div
            className="space-y-4 lg:space-y-6 text-justify"
            style={{
              color: "var(--color-text-secondary)",
              lineHeight: "var(--leading-relaxed)",
              fontSize: "var(--text-base)",
            }}
          >
            <p>
              The{" "}
              <strong style={{ color: "var(--color-primary-dark)" }}>
                APL SmartPro Digital Door Lock
              </strong>{" "}
              represents the pinnacle of home security technology, combining
              military-grade protection with seamless smart home integration.
              Engineered with a <strong>Grade-1 Security Certification</strong>{" "}
              and <strong>IP68 waterproof rating</strong>, this lock is built to
              withstand extreme conditions while providing unparalleled
              security.
            </p>

            <p>
              Featuring a <strong>multilayer security system</strong> that
              includes advanced capacitive fingerprint recognition (with
              anti-spoofing technology), encrypted 6-12 digit PIN codes, RFID
              card access, and mobile app control via Bluetooth 5.0. The lock's
              intelligent algorithm learns and improves fingerprint recognition
              accuracy over time.
            </p>

            {/* Specifications Table - Responsive */}
            <div className="overflow-x-auto mt-6">
              <table className="w-full min-w-full">
                <thead>
                  <tr
                    style={{
                      backgroundColor: "var(--color-surface-alt)",
                    }}
                  >
                    <th
                      className="text-left p-3 lg:p-4 font-semibold"
                      style={{
                        color: "var(--color-text-primary)",
                        borderBottom: "2px solid var(--color-border)",
                      }}
                    >
                      Specification
                    </th>
                    <th
                      className="text-left p-3 lg:p-4 font-semibold"
                      style={{
                        color: "var(--color-text-primary)",
                        borderBottom: "2px solid var(--color-border)",
                      }}
                    >
                      Details
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      spec: "Power Supply",
                      detail: "4 x AAA batteries (12+ months) + USB-C backup",
                    },
                    {
                      spec: "Fingerprint Capacity",
                      detail: "100 fingerprints",
                    },
                    {
                      spec: "PIN Codes",
                      detail: "50 unique codes",
                    },
                    {
                      spec: "Operating Temp",
                      detail: "-20°C to 60°C",
                    },
                    {
                      spec: "Recognition Time",
                      detail: "0.3 seconds",
                    },
                    {
                      spec: "Mobile App",
                      detail: "iOS & Android, Bluetooth 5.0",
                    },
                    {
                      spec: "Warranty",
                      detail: "3 years comprehensive warranty",
                    },
                    {
                      spec: "Installation",
                      detail: "Fits 35-55mm doors, professional kit included",
                    },
                  ].map((row, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "" : ""}
                      style={{
                        borderBottom: "1px solid var(--color-border-light)",
                        backgroundColor:
                          index % 2 === 0
                            ? "var(--color-surface)"
                            : "var(--color-surface-alt)",
                      }}
                    >
                      <td
                        className="p-3 lg:p-4 font-medium"
                        style={{
                          color: "var(--color-text-primary)",
                        }}
                      >
                        {row.spec}
                      </td>
                      <td
                        className="p-3 lg:p-4"
                        style={{
                          color: "var(--color-text-secondary)",
                        }}
                      >
                        {row.detail}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Package Contents */}
            <div className="mt-8">
              <h4
                className="text-lg lg:text-xl font-semibold mb-4"
                style={{ color: "var(--color-text-primary)" }}
              >
                📦 What's in the Box
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  "Main Lock Unit (Front & Back)",
                  "Stainless Steel Interior Handle",
                  "Emergency Mechanical Keys (2 pcs)",
                  "AAA Alkaline Batteries (4 pcs)",
                  "Complete Installation Kit",
                  "RFID Cards (2 pcs)",
                  "User Manual (Multi-language)",
                  "Warranty Card & Registration",
                  "Installation Template Guide",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center p-3 rounded-lg"
                    style={{
                      backgroundColor: "var(--color-surface-alt)",
                    }}
                  >
                    <span
                      className="w-2 h-2 rounded-full mr-3 flex-shrink-0"
                      style={{
                        backgroundColor: "var(--color-primary)",
                      }}
                    ></span>
                    <span
                      style={{
                        color: "var(--color-text-secondary)",
                      }}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Warranty & Support - Responsive */}
        <div
          className="mt-8 lg:mt-12 p-6 lg:p-8 rounded-xl"
          style={{
            background:
              "linear-gradient(135deg, var(--color-primary-soft) 0%, var(--color-surface-alt) 100%)",
            border: "1px solid var(--color-border-light)",
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="text-center lg:text-left">
              <div className="text-4xl mb-4">🛡️</div>
              <h4
                className="text-lg font-bold mb-2"
                style={{ color: "var(--color-primary-dark)" }}
              >
                3-Year Warranty
              </h4>
              <p style={{ color: "var(--color-text-secondary)" }}>
                Comprehensive coverage on all components
              </p>
            </div>

            <div className="text-center lg:text-left">
              <div className="text-4xl mb-4">🔧</div>
              <h4
                className="text-lg font-bold mb-2"
                style={{ color: "var(--color-primary-dark)" }}
              >
                Free Installation Support
              </h4>
              <p style={{ color: "var(--color-text-secondary)" }}>
                Video guides & technical assistance
              </p>
            </div>

            <div className="text-center lg:text-left">
              <div className="text-4xl mb-4">📞</div>
              <h4
                className="text-lg font-bold mb-2"
                style={{ color: "var(--color-primary-dark)" }}
              >
                24/7 Customer Support
              </h4>
              <p style={{ color: "var(--color-text-secondary)" }}>
                Dedicated support team available
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
