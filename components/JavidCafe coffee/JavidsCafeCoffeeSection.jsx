import React, {
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
  useCallback,
} from "react";
import "./JavidsCafeCoffeeSection.css";

// Embedded Custom Vector Icons for Premium Craft Coffee Steps
const CoffeeIcons = {
  beans: (
    <svg
      viewBox="0 0 64 64"
      className="coffee-svg-icon"
      fill="none"
      stroke="currentColor"
    >
      <path
        d="M32 10C21 10 12 19.5 12 32C12 44.5 21 54 32 54C43 54 52 44.5 52 32C52 19.5 43 10 32 10Z"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M32 12C26 20 26 44 32 52"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="2 3"
      />
      <path
        d="M22 22C26 25 28 30 26 36C24 42 21 45 22 45"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="40" cy="24" r="2" fill="currentColor" />
      <circle cx="42" cy="38" r="1.5" fill="currentColor" />
    </svg>
  ),
  roaster: (
    <svg
      viewBox="0 0 64 64"
      className="coffee-svg-icon"
      fill="none"
      stroke="currentColor"
    >
      <rect x="16" y="24" width="32" height="28" rx="6" strokeWidth="2.5" />
      <path
        d="M24 24V16C24 13.8 25.8 12 28 12H36C38.2 12 40 13.8 40 16V24"
        strokeWidth="2.5"
      />
      <path
        d="M32 30C28 34 28 38 32 42C36 38 36 34 32 30Z"
        fill="currentColor"
        opacity="0.8"
      />
      <path d="M24 48H40" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M20 12C20 8 26 8 26 4" strokeWidth="2" strokeLinecap="round" />
      <path d="M44 12C44 8 38 8 38 4" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  grinder: (
    <svg
      viewBox="0 0 64 64"
      className="coffee-svg-icon"
      fill="none"
      stroke="currentColor"
    >
      <path
        d="M20 12H44L40 28H24L20 12Z"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path d="M32 12V4M32 4H42" strokeWidth="2.5" strokeLinecap="round" />
      <rect x="22" y="28" width="20" height="24" rx="4" strokeWidth="2.5" />
      <circle cx="32" cy="40" r="4" strokeWidth="2.5" />
      <path d="M16 52H48" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  ),
  kettle: (
    <svg
      viewBox="0 0 64 64"
      className="coffee-svg-icon"
      fill="none"
      stroke="currentColor"
    >
      <path
        d="M18 24C18 20 22 16 32 16C42 16 46 20 46 24L50 48C50 51 47 54 43 54H21C17 54 14 51 14 48L18 24Z"
        strokeWidth="2.5"
      />
      <path
        d="M46 28C54 28 56 34 50 40"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M18 30C10 24 8 14 14 10C16 8.5 20 10 22 12"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path d="M32 16V10M28 10H36" strokeWidth="2.5" strokeLinecap="round" />
      <path
        d="M26 36C28 34 36 34 38 36"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ),
  pitcher: (
    <svg
      viewBox="0 0 64 64"
      className="coffee-svg-icon"
      fill="none"
      stroke="currentColor"
    >
      <path d="M20 16H44L40 52H24L20 16Z" strokeWidth="2.5" />
      <path
        d="M44 22H52C55 22 56 28 52 36H42"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path d="M20 20L12 18" strokeWidth="2.5" strokeLinecap="round" />
      <path
        d="M32 28C28 32 30 36 32 38C34 36 36 32 32 28Z"
        fill="currentColor"
      />
    </svg>
  ),
  cup: (
    <svg
      viewBox="0 0 64 64"
      className="coffee-svg-icon"
      fill="none"
      stroke="currentColor"
    >
      <path
        d="M14 22H50V36C50 45 42 50 32 50C22 50 14 45 14 36V22Z"
        strokeWidth="2.5"
      />
      <path
        d="M50 26H56C60 26 60 36 56 38H48"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path d="M10 54H54" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M24 16C24 12 28 12 28 8" strokeWidth="2" strokeLinecap="round" />
      <path d="M32 16C32 12 36 12 36 8" strokeWidth="2" strokeLinecap="round" />
      <path d="M40 16C40 12 44 12 44 8" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
};

const COFFEE_STEPS = [
  {
    id: "step-1",
    iconKey: "beans",
    title: "Selection of Origin",
    subtitle: "Single Origin Arabica",
    category: "Sourcing",
    routes: ["all", "espresso", "pourover"],
    temp: "21°C Storage",
    coarseness: "Raw Whole Bean",
    roastLevel: "Green / Unroasted",
    notes:
      "Hand-harvested Ethiopian Yirgacheffe with floral jasmine aromas and high elevation acidity.",
    metricName: "Density Score",
    metricValue: "96/100",
    color: "#E2B15E",
  },
  {
    id: "step-2",
    iconKey: "roaster",
    title: "Artisanal Roasting",
    subtitle: "Medium-Dark Drum Roast",
    category: "Transformation",
    routes: ["all", "espresso", "pourover"],
    temp: "215°C First Crack",
    coarseness: "Caramelization Peak",
    roastLevel: "City+ Roast",
    notes:
      "Controlled Maillard thermal profile unlocking dark chocolate, toasted hazelnut, and subtle berry tones.",
    metricName: "Roast Uniformity",
    metricValue: "99.4%",
    color: "#FF9E2C",
  },
  {
    id: "step-3",
    iconKey: "grinder",
    title: "Precision Burr Grind",
    subtitle: "Micron-Level Uniformity",
    category: "Preparation",
    routes: ["all", "espresso", "pourover"],
    temp: "Cool Grind (-2°C)",
    coarseness: "180µm Espresso / 400µm Pour",
    roastLevel: "Freshly Milled",
    notes:
      "Flat titanium burrs operating at low RPM to eliminate heat friction and preserve fragile aroma lipids.",
    metricName: "Distribution",
    metricValue: "Ultra-Fine",
    color: "#E87A30",
  },
  {
    id: "step-4",
    iconKey: "kettle",
    title: "Thermal Extraction",
    subtitle: "Controlled Flow Rate",
    category: "Extraction",
    routes: ["all", "pourover"],
    temp: "93.5°C Pure Water",
    coarseness: "1:15 Golden Ratio",
    roastLevel: "Bloom 45 sec",
    notes:
      "Precision gooseneck pour with balanced mineral composition water at 9 bar pressure curve.",
    metricName: "Extraction Yield",
    metricValue: "21.2%",
    color: "#D4AF37",
  },
  {
    id: "step-5",
    iconKey: "pitcher",
    title: "Velvet Microfoam",
    subtitle: "Silky Milk Texture",
    category: "Texturing",
    routes: ["all", "espresso"],
    temp: "62°C Sweet Spot",
    coarseness: "Micro-bubble Net",
    roastLevel: "Whole Cream Milk",
    notes:
      "Aerated steam wand infusion creating glossy microfoam designed for high contrast latte art.",
    metricName: "Foam Density",
    metricValue: "Silk Velvet",
    color: "#F4C476",
  },
  {
    id: "step-6",
    iconKey: "cup",
    title: "Javid's Signature Cup",
    subtitle: "Golden Crema Masterpiece",
    category: "Serving",
    routes: ["all", "espresso", "pourover"],
    temp: "65°C Serving Temp",
    coarseness: "Crema Layer 4mm",
    roastLevel: "Peak Flavor",
    notes:
      "Harmonious cup balancing sweet caramel body, rich crema, and lingering Madagascar vanilla finish.",
    metricName: "Overall Rating",
    metricValue: "5.0 ★★★★★",
    color: "#FFD700",
  },
];

export default function JavidsCafeCoffeeSection() {
  const [activeStepId, setActiveStepId] = useState("step-1");
  const [activeRoute, setActiveRoute] = useState("all");
  const [isBrewing, setIsBrewing] = useState(false);
  const [brewProgress, setBrewProgress] = useState(100);
  const [paths, setPaths] = useState([]);

  const containerRef = useRef(null);
  const nodeRefs = useRef({});

  // Filter steps by active route
  const filteredSteps = COFFEE_STEPS.filter(
    (step) => activeRoute === "all" || step.routes.includes(activeRoute),
  );

  const activeStep = COFFEE_STEPS.find((step) => step.id === activeStepId) ||
    COFFEE_STEPS[0] || {
      id: "step-1",
      category: "Sourcing",
      title: "Selection of Origin",
      subtitle: "Single Origin Arabica",
      notes:
        "Hand-harvested Ethiopian Yirgacheffe with floral jasmine aromas and high elevation acidity.",
      temp: "21°C Storage",
      coarseness: "Raw Whole Bean",
      roastLevel: "Green / Unroasted",
      metricName: "Density Score",
      metricValue: "96/100",
      color: "#E2B15E",
    };

  // Calculate SVG Connecting Path lines between sequential nodes
  const calculatePaths = useCallback(() => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const newPaths = [];

    for (let i = 0; i < filteredSteps.length - 1; i++) {
      const currentId = filteredSteps[i].id;
      const nextId = filteredSteps[i + 1].id;

      const currentEl = nodeRefs.current[currentId];
      const nextEl = nodeRefs.current[nextId];

      if (currentEl && nextEl) {
        const r1 = currentEl.getBoundingClientRect();
        const r2 = nextEl.getBoundingClientRect();

        const x1 = r1.left + r1.width / 2 - containerRect.left;
        const y1 = r1.top + r1.height / 2 - containerRect.top;
        const x2 = r2.left + r2.width / 2 - containerRect.left;
        const y2 = r2.top + r2.height / 2 - containerRect.top;

        const dx = x2 - x1;
        const dy = y2 - y1;

        let pathD = "";
        if (Math.abs(dx) > Math.abs(dy)) {
          const cx1 = x1 + dx * 0.5;
          const cy1 = y1;
          const cx2 = x1 + dx * 0.5;
          const cy2 = y2;
          pathD = `M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}`;
        } else {
          const cx1 = x1;
          const cy1 = y1 + dy * 0.5;
          const cx2 = x2;
          const cy2 = y1 + dy * 0.5;
          pathD = `M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}`;
        }

        const isActive = activeStepId === currentId || activeStepId === nextId;

        newPaths.push({
          id: `link-${currentId}-${nextId}`,
          d: pathD,
          isActive,
          fromId: currentId,
          toId: nextId,
        });
      }
    }

    setPaths((prev) => {
      const sameLength = prev.length === newPaths.length;
      const same = sameLength && prev.every((p, i) => p.d === newPaths[i].d);
      return same ? prev : newPaths;
    });
  }, [filteredSteps, activeStepId]);

  useLayoutEffect(() => {
    calculatePaths();
    const handleResize = () => calculatePaths();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [calculatePaths]);

  useEffect(() => {
    const timer = setTimeout(() => calculatePaths(), 100);
    return () => clearTimeout(timer);
  }, [calculatePaths]);

  // Brew simulation handler
  const handleSimulateBrew = () => {
    if (isBrewing) return;
    setIsBrewing(true);
    setBrewProgress(0);

    let stepIndex = 0;
    const interval = setInterval(() => {
      if (stepIndex < filteredSteps.length) {
        setActiveStepId(filteredSteps[stepIndex].id);
        setBrewProgress(
          Math.round(((stepIndex + 1) / filteredSteps.length) * 100),
        );
        stepIndex++;
      } else {
        clearInterval(interval);
        setIsBrewing(false);
      }
    }, 900);
  };

  return (
    <section className="javids-cafe-section">
      <div className="ambient-background-glow"></div>

      {/* Brand Header */}
      <header className="javids-header">
        <div className="brand-badge">
          <span className="badge-sparkle">✦</span>
          <span className="badge-text">ARTISANAL CRAFT COFFEE</span>
          <span className="badge-sparkle">✦</span>
        </div>
        <h1 className="javids-title">
          Javids <span className="highlight-text">Cafe</span>
        </h1>
        <p className="javids-subtitle">
          Interactive Coffee Alchemy & Extraction Constellation
        </p>

        {/* Route Filter Selector */}
        <div className="route-selector">
          <button
            className={`route-btn ${activeRoute === "all" ? "active" : ""}`}
            onClick={() => setActiveRoute("all")}
          >
            <span className="btn-dot"></span> All Craft Steps
          </button>
          <button
            className={`route-btn ${activeRoute === "espresso" ? "active" : ""}`}
            onClick={() => setActiveRoute("espresso")}
          >
            <span className="btn-dot"></span> Espresso Route
          </button>
          <button
            className={`route-btn ${activeRoute === "pourover" ? "active" : ""}`}
            onClick={() => setActiveRoute("pourover")}
          >
            <span className="btn-dot"></span> Pour-Over Flow
          </button>
        </div>
      </header>

      {/* Main Interactive Flow Container with SVG Lines overlay */}
      <div className="flow-interactive-container" ref={containerRef}>
        {/* SVG Connecting Paths Layer */}
        <svg className="svg-connector-overlay" aria-hidden="true">
          <defs>
            <linearGradient
              id="goldAmberGrad"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#FF9E2C" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#E2B15E" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient
              id="inactiveGrad"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="rgba(212, 175, 55, 0.2)" />
              <stop offset="100%" stopColor="rgba(255, 158, 44, 0.1)" />
            </linearGradient>
            <filter
              id="glowEffect"
              x="-20%"
              y="-20%"
              width="140%"
              height="140%"
            >
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {paths.map((path) => (
            <g key={path.id}>
              {/* Background trace line */}
              <path
                d={path.d}
                fill="none"
                stroke={
                  path.isActive ? "url(#goldAmberGrad)" : "url(#inactiveGrad)"
                }
                strokeWidth={path.isActive ? "3.5" : "2"}
                strokeDasharray={path.isActive ? "none" : "6 6"}
                className={path.isActive ? "svg-path-active" : "svg-path-idle"}
                filter={path.isActive ? "url(#glowEffect)" : undefined}
              />
              {/* Animated liquid flow pulse particle along active SVG line */}
              {path.isActive && (
                <path
                  d={path.d}
                  fill="none"
                  stroke="#FFF099"
                  strokeWidth="4"
                  strokeDasharray="12 120"
                  className="svg-flowing-particle"
                />
              )}
            </g>
          ))}
        </svg>

        {/* Nodes Grid */}
        <div className="coffee-nodes-grid">
          {filteredSteps.map((step, index) => {
            const isActive = step.id === activeStepId;
            return (
              <div
                key={step.id}
                ref={(el) => (nodeRefs.current[step.id] = el)}
                className={`coffee-node-card ${isActive ? "active-node" : ""}`}
                onClick={() => setActiveStepId(step.id)}
                onMouseEnter={() => setActiveStepId(step.id)}
                tabIndex={0}
                role="button"
                aria-pressed={isActive}
              >
                <div className="node-step-number">0{index + 1}</div>
                <div
                  className="node-icon-wrapper"
                  style={{ "--node-accent": step.color }}
                >
                  {CoffeeIcons[step.iconKey]}
                  <div className="node-pulse-ring"></div>
                </div>
                <div className="node-info">
                  <span className="node-category">{step.category}</span>
                  <h3 className="node-title">{step.title}</h3>
                  <p className="node-subtitle">{step.subtitle}</p>
                </div>
                <div className="node-active-indicator"></div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Step Detail Panel & Interactive Simulator */}
      <div className="detail-panel-container">
        <div
          className="detail-glass-card"
          style={{ "--accent-color": activeStep?.color || "#D4AF37" }}
        >
          <div className="detail-header">
            <div className="detail-badge-group">
              <span className="detail-category-tag">
                {activeStep?.category || "Craft"}
              </span>
              <span className="detail-step-badge">
                Step Node:{" "}
                {activeStep?.id ? activeStep.id.replace("step-", "") : "1"}
              </span>
            </div>
            <button
              className={`simulate-brew-btn ${isBrewing ? "brewing" : ""}`}
              onClick={handleSimulateBrew}
              disabled={isBrewing}
            >
              {isBrewing ? (
                <>
                  <span className="spinner-icon">☕</span> Brewing...{" "}
                  {brewProgress}%
                </>
              ) : (
                <>
                  <span className="btn-sparkle">✨</span> Simulate Coffee Craft
                  Journey
                </>
              )}
            </button>
          </div>

          <div className="detail-content-grid">
            {/* Title & Notes */}
            <div className="detail-main-info">
              <h2 className="detail-title">{activeStep?.title}</h2>
              <p className="detail-subtitle">
                {activeStep?.subtitle} •{" "}
                <span className="brand-credit">Javids Signature Standard</span>
              </p>
              <p className="detail-notes">{activeStep?.notes}</p>
            </div>

            {/* Quick Metrics Cards */}
            <div className="detail-metrics-grid">
              <div className="metric-box">
                <span className="metric-label">Target Temp</span>
                <span className="metric-value">{activeStep?.temp}</span>
              </div>
              <div className="metric-box">
                <span className="metric-label">Specification</span>
                <span className="metric-value">{activeStep?.coarseness}</span>
              </div>
              <div className="metric-box">
                <span className="metric-label">Stage Profile</span>
                <span className="metric-value">{activeStep?.roastLevel}</span>
              </div>
              <div className="metric-box highlight-box">
                <span className="metric-label">{activeStep?.metricName}</span>
                <span className="metric-value gold-text">
                  {activeStep?.metricValue}
                </span>
              </div>
            </div>
          </div>

          {/* Progress Bar during Brew Simulation */}
          {isBrewing && (
            <div className="brew-progress-bar-container">
              <div
                className="brew-progress-fill"
                style={{
                  width: `${brewProgress}%`,
                  backgroundColor: activeStep?.color || "#D4AF37",
                }}
              ></div>
            </div>
          )}
        </div>
      </div>

      {/* Footer Branding Banner */}
      <footer className="javids-footer">
        <p>
          Crafted with Precision for{" "}
          <span className="gold-bold">Javids Cafe</span> — Where Coffee Meets
          Art
        </p>
      </footer>
    </section>
  );
}
