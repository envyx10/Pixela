'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface AnimationConfig {
  duration?: number;
  ease?: string;
  delay?: number;
  stagger?: number;
}

export const useGSAPAnimations = () => {
  const containerRef = useRef<HTMLElement>(null);

  const animateIn = (
    elements: string | Element | Element[],
    config: AnimationConfig = {}
  ) => {
    const {
      duration = 1,
      ease = "power2.out",
      delay = 0,
      stagger = 0
    } = config;

    return gsap.fromTo(elements, 
      {
        opacity: 0,
        y: 50,
        scale: 0.9
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration,
        ease,
        delay,
        stagger
      }
    );
  };

  const morphCard = (element: Element, scale: number = 1.05) => {
    return gsap.to(element, {
      scale,
      rotationY: scale > 1 ? 5 : 0,
      duration: 0.3,
      ease: "power2.out",
      transformPerspective: 1000
    });
  };

  const parallaxEffect = (
    element: Element,
    trigger: string | Element,
    distance: number = -50
  ) => {
    return gsap.to(element, {
      yPercent: distance,
      ease: "none",
      scrollTrigger: {
        trigger,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
  };

  const textReveal = (element: Element, text: string[]) => {
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 3 });
    
    text.forEach((txt, index) => {
      tl.to(element, {
        duration: 0.5,
        text: txt,
        ease: "none",
        delay: index === 0 ? 0 : 2
      });
    });

    return tl;
  };

  const floatingAnimation = (elements: string | Element | Element[]) => {
    return gsap.to(elements, {
      y: -20,
      duration: 3,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1,
      stagger: 0.5
    });
  };

  const explosiveEntrance = (element: Element) => {
    const tl = gsap.timeline();
    
    tl.from(element, {
      scale: 0,
      rotation: 180,
      duration: 0.8,
      ease: "back.out(1.7)"
    })
    .to(element, {
      rotation: 0,
      duration: 0.5,
      ease: "power2.out"
    }, "-=0.3");

    return tl;
  };

  const glitchEffect = (element: Element) => {
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 5 });
    
    tl.to(element, {
      x: -2,
      duration: 0.1,
      ease: "power2.inOut"
    })
    .to(element, {
      x: 2,
      duration: 0.1,
      ease: "power2.inOut"
    })
    .to(element, {
      x: 0,
      duration: 0.1,
      ease: "power2.inOut"
    });

    return tl;
  };

  const magneticEffect = (element: Element) => {
    let xTo = gsap.quickTo(element, "x", { duration: 1, ease: "power3" });
    let yTo = gsap.quickTo(element, "y", { duration: 1, ease: "power3" });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = (element as HTMLElement).getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - centerX) * 0.3;
      const deltaY = (e.clientY - centerY) * 0.3;
      
      xTo(deltaX);
      yTo(deltaY);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  };

  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return {
    containerRef,
    animateIn,
    morphCard,
    parallaxEffect,
    textReveal,
    floatingAnimation,
    explosiveEntrance,
    glitchEffect,
    magneticEffect
  };
}; 