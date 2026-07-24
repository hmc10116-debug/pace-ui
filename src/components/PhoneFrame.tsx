import { useEffect, useState, type ReactNode } from "react";

const PHONE_WIDTH = 375;
const PHONE_HEIGHT = 812;

function getViewportRect() {
  const vv = window.visualViewport;
  return {
    width: vv?.width ?? window.innerWidth,
    height: vv?.height ?? window.innerHeight,
    offsetTop: vv?.offsetTop ?? 0,
  };
}

export default function PhoneFrame({ children }: { children: ReactNode }) {
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

  // Fill the real viewport edge-to-edge — scale the fixed-coordinate
  // 375x812 design canvas by width only, no shrink-to-fit letterboxing.
  const scale = viewportRect.width / PHONE_WIDTH;

  return (
    <div
      className="h-dvh w-full overflow-hidden bg-bg-base"
      style={{
        position: "fixed",
        top: viewportRect.offsetTop,
        left: 0,
        width: viewportRect.width,
        height: viewportRect.height,
      }}
    >
      <div
        className="relative bg-bg-base"
        style={{
          width: PHONE_WIDTH,
          height: PHONE_HEIGHT,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        {children}
      </div>
    </div>
  );
}
