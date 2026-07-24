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

  const padding = 48;
  const scale = Math.min(
    1,
    (viewportRect.width - padding) / PHONE_WIDTH,
    (viewportRect.height - padding) / PHONE_HEIGHT,
  );

  return (
    <div
      className="flex items-center justify-center bg-[#444444] p-6"
      style={{
        position: "fixed",
        top: viewportRect.offsetTop,
        left: 0,
        width: viewportRect.width,
        height: viewportRect.height,
      }}
    >
      <div style={{ width: PHONE_WIDTH * scale, height: PHONE_HEIGHT * scale }}>
        <div
          className="relative overflow-hidden rounded-[36px] bg-bg-base shadow-2xl"
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
    </div>
  );
}
