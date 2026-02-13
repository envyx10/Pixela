export const HEADER_LAYOUT_STYLES = {
  container:
    "relative w-full bg-pixela-dark flex flex-col pt-8 md:pt-20 2k:pt-12 min-h-[50vh]",
  content:
    "flex-grow flex flex-col justify-center md:justify-start relative z-10 pb-16 md:pb-0 2k:pb-8",
  headerWrapper:
    "relative w-full bg-pixela-dark flex flex-col justify-center overflow-hidden items-stretch gap-8 px-4 py-12 lg:w-[85%] xl:w-[80%] 2k:w-[70%] lg:mx-auto lg:flex-row lg:items-end lg:justify-between lg:gap-0 lg:px-0 lg:py-0 2k:py-6 lg:overflow-visible lg:bg-transparent lg:relative",
  carouselWrapper: "w-full",
  slides: "flex gap-0",
  slide:
    "relative w-[280px] min-w-[280px] max-w-[280px] md:w-[375px] md:min-w-[375px] md:max-w-[375px] flex-none",
} as const;

export const HEADER_TYPOGRAPHY_STYLES = {
  titleBase:
    "font-black font-outfit tracking-wider uppercase leading-none w-full md:w-auto break-words text-pixela-accent",
  titleMobileBase: "block sm:hidden text-[64px] leading-[0.95]",
  titleDesktopBase:
    "hidden sm:block text-[64px] md:text-[96px] lg:text-[128px] 2k:text-[100px]",
} as const;
