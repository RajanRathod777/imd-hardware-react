import { useEffect, useState } from "react";

const CompanyOverview = () => {
  const stats = [
    { value: 15000, label: "Products in Catalog", suffix: "+" },
    { value: 50000, label: "Satisfied Clients", suffix: "+" },
    { value: 15, label: "Years of Excellence", suffix: "+" },
    { value: 24, label: "Expert Support", suffix: "/7" },
  ];

  // Simple counter animation hook
  const useCounter = (end, duration = 2000) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      let startTime = null;
      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        setCount(Math.floor(progress * end));

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCount(end);
        }
      };
      requestAnimationFrame(animate);
    }, [end, duration]);

    return count;
  };

  return (
    <section className="py-20 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Optional subtle top accent line */}
        <div
          className="h-1 rounded-full mb-16 mx-auto w-32"
          style={{ background: "var(--gradient-primary)" }}
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-16">
          {stats.map((stat, index) => {
            const displayedValue = useCounter(stat.value);

            return (
              <div key={index} className="text-center group relative">
                {/* Hover glow effect */}
                <div
                  className="absolute inset-0 -z-10 scale-0 rounded-3xl opacity-0 transition-all duration-700 group-hover:scale-150 group-hover:opacity-30"
                  style={{ backgroundColor: "var(--color-primary)" }}
                />

                <div className="relative">
                  {/* Animated Number */}
                  <h3
                    className="mb-3 transition-all duration-500 group-hover:translate-y-[-4px]"
                    style={{
                      fontSize: "var(--text-5xl)",
                      fontFamily: "var(--font-heading)",
                      color: "var(--color-primary)",
                      lineHeight: "1",
                      fontWeight: "var(--font-black)",
                    }}
                  >
                    {displayedValue.toLocaleString()}
                    <span
                      className="inline-block ml-1"
                      style={{
                        fontSize: "var(--text-3xl)",
                        color: "var(--color-primary-dark)",
                        fontWeight: "var(--font-bold)",
                      }}
                    >
                      {stat.suffix}
                    </span>
                  </h3>

                  {/* Label */}
                  <p
                    className="uppercase tracking-wider transition-colors duration-300 group-hover:text-[var(--color-primary)]"
                    style={{
                      fontSize: "var(--text-sm)",
                      letterSpacing: "var(--tracking-wide)",
                      color: "var(--color-text-muted)",
                      fontWeight: "var(--font-semibold)",
                    }}
                  >
                    {stat.label}
                  </p>
                </div>

                {/* Bottom decorative line on hover */}
                <div
                  className="h-0.5 mt-4 mx-auto w-0 transition-all duration-700 group-hover:w-16"
                  style={{ backgroundColor: "var(--color-primary)" }}
                />
              </div>
            );
          })}
        </div>

        {/* Optional bottom accent */}
        <div
          className="h-px mt-16 rounded-full"
          style={{
            background:
              "linear-gradient(90deg, transparent, var(--color-primary), transparent)",
            opacity: 0.3,
          }}
        />
      </div>
    </section>
  );
};

export default CompanyOverview;
