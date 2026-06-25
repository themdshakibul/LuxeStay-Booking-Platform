// app/not-found.jsx
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="fixed inset-0 bg-[#080818] flex flex-col items-center justify-center overflow-hidden z-50">
      {/* Grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(106,90,205,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(106,90,205,0.05) 1px, transparent 1px)
          `,
          backgroundSize: "44px 44px",
        }}
      />

      {/* Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(106,90,205,0.10) 0%, transparent 70%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-6 text-center px-6">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-2">
          <div
            className="w-10 h-10 rounded-xl bg-[#6a5acd] flex items-center justify-center"
            style={{ boxShadow: "0 0 24px #6a5acd55" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-white"
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
          <span className="text-xl font-medium text-[#f0f0f0]">LuxeStay</span>
        </div>

        {/* 404 */}
        <div className="flex items-center gap-5">
          <span
            className="text-[110px] font-bold leading-none tracking-tighter select-none"
            style={{
              color: "transparent",
              WebkitTextStroke: "2px #6a5acd",
              animation: "float 3s ease-in-out infinite",
            }}
          >
            4
          </span>

          {/* House icon middle */}
          <div
            className="w-22 h-22 rounded-full bg-[#12122a] border-2 border-[#6a5acd] flex items-center justify-center shrink-0"
            style={{
              animation: "float 3s ease-in-out infinite",
              animationDelay: "0.15s",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-10 text-[#8b7fe8]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <line x1="4" y1="4" x2="20" y2="20" />
            </svg>
          </div>

          <span
            className="text-[110px] font-bold leading-none tracking-tighter select-none"
            style={{
              color: "transparent",
              WebkitTextStroke: "2px #6a5acd",
              animation: "float 3s ease-in-out infinite",
              animationDelay: "0.3s",
            }}
          >
            4
          </span>
        </div>

        {/* Divider */}
        <div
          className="w-16 h-0.5 rounded-full"
          style={{
            background:
              "linear-gradient(90deg, transparent, #6a5acd, transparent)",
          }}
        />

        <p className="text-xl font-medium text-[#f0f0f0]">Page not found</p>
        <p className="text-sm text-[#6a6a8a] max-w-xs leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back home.
        </p>

        {/* Buttons */}
        <div className="flex gap-3 mt-2 flex-wrap justify-center">
          <Link
            href="/"
            className="flex items-center gap-2 px-5 py-2.5 bg-[#6a5acd] hover:bg-[#7c6ed9] text-white text-sm font-medium rounded-lg transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
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
            Go to Home
          </Link>
          <Link
            href="#"
            onClick={() => history.back()}
            className="flex items-center gap-2 px-5 py-2.5 bg-transparent hover:border-[#6a5acd] hover:text-[#b0a8f0] text-[#8b8ba8] text-sm border border-[#2a2a40] rounded-lg transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Go back
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-12px); }
        }
      `}</style>
    </div>
  );
}
