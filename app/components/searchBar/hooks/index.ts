import { useEffect, useRef } from "react";
import { useSearchBar } from "../reducer/searchBarContext";
import { useSpring } from "react-spring";

export function useCheckAdjacentHoverFeature() {
  const context = useSearchBar();
  const { state } = context;
  const { categoryStatus, activeFeature, hoveredFeature } = state;
  const hoverRippleDivRefs = {
    Location: categoryStatus === "Stay" ? "Check-In" : "Date",
    "Check-In": ["Check-Out", "Location"],
    "Check-Out": ["Check-In", "Guests"],
    Date: ["Location", "Guests"],
    Guests: categoryStatus === "Stay" ? "Check-Out" : "Date",
  };
  if (!activeFeature || !hoveredFeature) return false;
  const allowedHoverFeature = hoverRippleDivRefs[activeFeature];
  return Array.isArray(allowedHoverFeature)
    ? allowedHoverFeature.includes(hoveredFeature)
    : hoveredFeature === allowedHoverFeature;
}

export function useHoverHighlight() {
  const context = useSearchBar();
  const { state } = context;
  const { activeFeature, hoveredFeature } = state;
  const hoveredHighlightCheck = useCheckAdjacentHoverFeature();

  const buttonRefs = {
    Location: useRef<HTMLDivElement>(null),
    "Check-In": useRef<HTMLDivElement>(null),
    "Check-Out": useRef<HTMLDivElement>(null),
    Date: useRef<HTMLDivElement>(null),
    Guests: useRef<HTMLDivElement>(null),
  };

  const [hoverHighlightSpring, hoverHighlightApi] = useSpring(() => ({
    left: 0,
    width: 0,
    height: 0,
    opacity: 0,
    background: "rgb(223 223 223)",
    borderRadius: 32,
    position: "absolute",
    top: 0,
  }));

  useEffect(() => {
    if (!activeFeature) return;
    if (hoveredHighlightCheck && hoveredFeature) {
      const hoverEl = buttonRefs[hoveredFeature]?.current;
      const activeEl = buttonRefs[activeFeature]?.current;
      if (!hoverEl || !activeEl) return;
      const {
        offsetLeft: hoverLeft,
        offsetWidth: hoverWidth,
        // offsetHeight: hoverHeight,
      } = hoverEl;
      const {
        offsetLeft: activeLeft,
        offsetWidth: activeWidth,
        offsetHeight: activeHeight,
      } = activeEl;

      const left = Math.min(activeLeft, hoverLeft);
      const right = Math.max(activeLeft + activeWidth, hoverLeft + hoverWidth);
      const width = right - left;
      const height = activeHeight; // or hoverHeight, both should match

      hoverHighlightApi.start({
        to: async (next) => {
          await next({
            left,
            width,
            height,
            immediate: true,
          });

          await next({
            opacity: 1,
          });
        },
      });
    } else {
      hoverHighlightApi.start({ opacity: 0 });
    }
  }, [hoveredFeature, activeFeature]);

  return { hoverHighlightSpring, buttonRefs };
}
