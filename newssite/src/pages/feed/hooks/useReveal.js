// Reveal-on-scroll. Any element inside `ref` with a [data-reveal] attribute
// fades + slides up as it enters the viewport. Re-runs when `deps` change
// (needed because feed cards arrive after the API responds).
import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useReveal(ref, deps = []) {
  useLayoutEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray("[data-reveal]");
      items.forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 44,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        });
      });
    }, ref);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
