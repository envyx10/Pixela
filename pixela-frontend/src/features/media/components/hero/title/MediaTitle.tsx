"use client";

interface MediaTitleProps {
  title: string;
  score: number;
}

export const MediaTitle = ({ title, score }: MediaTitleProps) => (
  <div className="flex flex-col gap-4 mb-4">
    <h1 className="text-4xl md:text-6xl font-bold text-white">
      {title}
    </h1>
    <div className="flex items-center gap-2">
      <div className="flex items-center bg-[#FF2D55]/10 px-3 py-1 rounded-full">
        <span className="text-[#FF2D55] text-xl font-bold">{score.toFixed(1)}</span>
        <span className="text-[#FF2D55] ml-1">★</span>
      </div>
      {score >= 8.5 && (
        <div className="relative group">
          <div className="absolute inset-0 bg-[#FF2D55] rounded-full blur-sm opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
          <div className="relative bg-[#FF2D55]/10 backdrop-blur-sm px-3 py-1 rounded-full border border-[#FF2D55]/20">
            <span className="text-[#FF2D55] text-sm font-light tracking-wider">TOP PIXELA</span>
          </div>
        </div>
      )}
    </div>
  </div>
); 