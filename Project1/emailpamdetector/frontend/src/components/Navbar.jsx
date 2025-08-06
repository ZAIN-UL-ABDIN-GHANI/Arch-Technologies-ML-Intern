export default function Header() {
  return (
    <header className="w-full bg-gradient-to-br from-sky-500 via-blue-500 to-cyan-400 backdrop-blur-sm border-b ">
      <div className="max-w-8xl mx-auto px-6">
        <div className="flex justify-between items-center py-6">
          {/* ZYN Logo */}
          <div className="flex items-center">
            <div className=" ">

            </div>
            <h1 className="text-5xl font-bold text-white tracking-wider">
              ZYN
            </h1>
          </div>
          
          {/* Optional tagline */}
          <div className="text-white/80 text-3xl">
            Spam Detector
          </div>
        </div>
      </div>
    </header>
  );
}