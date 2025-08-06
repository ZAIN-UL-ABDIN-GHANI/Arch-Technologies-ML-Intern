import { FaHeart } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-r from-sky-600 via-blue-600 to-cyan-600 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Content */}
        <div className="text-center space-y-4">

          {/* Copyright */}
          <div className="w-full h-40 flex items-center justify-center">
            <div className="space-y-2 text-center">
              <p className="text-xl md:text-[28px] text-white/90">
                © 2025 <span className="font-semibold">ZAIN UL ABDIN GHANI </span>
              </p>
              <p className="text-lg md:text-[18px] text-white/70 flex items-center justify-center gap-1">
                All rights reserved. Crafted with{" "}
                <FaHeart className="text-red-500 inline" /> for better email security
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
    </footer>
  );
}
