import { useHeroStore } from "../store";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { SliderNavButton } from "@/shared/components/SliderNavButton";

export const NavigationControls = () => {
  const { prevImage, nextImage } = useHeroStore();

  return (
    <>
      <SliderNavButton 
        direction="prev"
        onClick={prevImage}
        ariaLabel="Imagen anterior"
        icon={<FiChevronLeft className="h-7 w-7" />}
        className="left-4"
      />
      
      <SliderNavButton 
        direction="next"
        onClick={nextImage}
        ariaLabel="Imagen siguiente"
        icon={<FiChevronRight className="h-7 w-7" />}
        className="right-4"
      />
    </>
  );
}; 