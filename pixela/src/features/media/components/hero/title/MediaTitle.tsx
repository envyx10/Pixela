"use client";

interface MediaTitleProps {
  title: string;
  score: number;
}

const STYLES = {
  container: "flex flex-col gap-4 mb-4",
  title: "text-4xl md:text-6xl font-bold text-white",
  ratingContainer: "flex items-center gap-2",
  ratingBadge: "flex items-center bg-[#FF2D55]/10 px-3 py-1 rounded-full",
  score: "text-[#FF2D55] text-xl font-bold",
  star: "text-[#FF2D55] ml-1",
  topPixela: {
    container: "relative group",
    background: "absolute inset-0 bg-[#FF2D55] rounded-full blur-sm opacity-20 group-hover:opacity-30 transition-opacity duration-300",
    badge: "relative bg-[#FF2D55]/10 backdrop-blur-sm px-3 py-1 rounded-full border border-[#FF2D55]/20",
    text: "text-[#FF2D55] text-sm font-light tracking-wider"
  }
} as const;

export const MediaTitle = ({ title, score }: MediaTitleProps) => (
  <div className={STYLES.container}>
    <h1 className={STYLES.title}>
      {title}
    </h1>
    <div className={STYLES.ratingContainer}>
      <div className={STYLES.ratingBadge}>
        <span className={STYLES.score}>{score.toFixed(1)}</span>
        <span className={STYLES.star}>★</span>
      </div>
      {score >= 8.0 && (
        <div className={STYLES.topPixela.container}>
          <div className={STYLES.topPixela.background}></div>
          <div className={STYLES.topPixela.badge}>
            <span className={STYLES.topPixela.text}>TOP PIXELA</span>
          </div>
        </div>
      )}
    </div>
  </div>
); 