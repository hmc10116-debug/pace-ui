import type { ReactNode } from "react";
import { PHONE_HEIGHT, PHONE_WIDTH, useViewportRect } from "../hooks/useViewportRect";

export default function PhoneFrame({ children }: { children: ReactNode }) {
  const { viewportRect, scale } = useViewportRect();

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
