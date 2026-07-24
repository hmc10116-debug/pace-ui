import { useEffect, useState } from "react";

export const PHONE_WIDTH = 375;
export const PHONE_HEIGHT = 812;

function getViewportRect() {
  const vv = window.visualViewport;
  return {
    width: vv?.width ?? window.innerWidth,
    height: vv?.height ?? window.innerHeight,
    offsetTop: vv?.offsetTop ?? 0,
  };
}

/**
 * Tracks window.visualViewport so callers can react to the iOS keyboard
 * opening/closing (it shrinks visualViewport.height without resizing the
 * layout viewport). Also derives the canvas scale (width-only, so the app
 * always fills the device edge-to-edge with no letterboxing).
 */
export function useViewportRect() {
  const [viewportRect, setViewportRect] = useState(getViewportRect);

  useEffect(() => {
    const update = () => setViewportRect(getViewportRect());
    update();
    window.visualViewport?.addEventListener("resize", update);
    window.visualViewport?.addEventListener("scroll", update);
    window.addEventListener("resize", update);
    return () => {
      window.visualViewport?.removeEventListener("resize", update);
      window.visualViewport?.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const scale = viewportRect.width / PHONE_WIDTH;

  return { viewportRect, scale };
}
