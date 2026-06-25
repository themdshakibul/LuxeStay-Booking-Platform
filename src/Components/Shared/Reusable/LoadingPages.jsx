export default function LoadingPages() {
  return (
    <div className="fixed inset-0 bg-[#0d0d1a] flex flex-col items-center justify-center overflow-hidden z-50">
      {/* Grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(106,90,205,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(106,90,205,0.06) 1px, transparent 1px)
          `,
          backgroundSize: "44px 44px",
        }}
      />

      {/* Purple glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-100 h-100 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(106,90,205,0.12) 0%, transparent 70%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-[#6a5acd] flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </div>
          <span className="text-2xl font-medium text-[#f0f0f0] tracking-tight">
            LuxeStay
          </span>
        </div>

        {/* Triple ring spinner */}
        <div className="relative w-16 h-16">
          <div
            className="absolute inset-0 rounded-full border-[2.5px] border-transparent animate-spin"
            style={{
              borderTopColor: "#6a5acd",
              borderRightColor: "#6a5acd",
              animationDuration: "1.2s",
            }}
          />
          <div
            className="absolute rounded-full border-[2.5px] border-transparent"
            style={{
              inset: "8px",
              borderTopColor: "#8b7fe8",
              borderLeftColor: "#8b7fe8",
              animation: "spin 0.9s linear infinite reverse",
            }}
          />
          <div
            className="absolute rounded-full border-[2.5px] border-transparent animate-spin"
            style={{
              inset: "18px",
              borderTopColor: "#b0a8f0",
              animationDuration: "0.6s",
            }}
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#6a5acd] animate-pulse" />
        </div>

        {/* Loading text */}
        <p className="text-xs uppercase tracking-widest text-[#6a6a8a] animate-pulse">
          Loading...
        </p>

        {/* Progress bar */}
        <div className="w-44 h-0.75 bg-[#1e1e30] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{
              background: "linear-gradient(90deg, #6a5acd, #b0a8f0)",
              animation: "fillbar 2.5s ease-in-out infinite",
            }}
          />
        </div>

        {/* Tagline */}
        <p className="text-xs text-[#44445a]">Find your perfect stay</p>
      </div>

      <style>{`
        @keyframes fillbar {
          0%   { width: 0%;   opacity: 1; }
          75%  { width: 100%; opacity: 1; }
          100% { width: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
}
