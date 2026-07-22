import { useEffect, useState, type ReactNode } from "react";

const PHONE_WIDTH = 375;
const PHONE_HEIGHT = 812;

export default function PhoneFrame({ children }: { children: ReactNode }) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      const padding = 48;
      const availableWidth = window.innerWidth - padding;
      const availableHeight = window.innerHeight - padding;
      const next = Math.min(1, availableWidth / PHONE_WIDTH, availableHeight / PHONE_HEIGHT);
      setScale(next);
    };
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#444444] p-6">
      <div style={{ width: PHONE_WIDTH * scale, height: PHONE_HEIGHT * scale }}>
        <div
          className="relative overflow-hidden rounded-[36px] bg-[#f7f2e7] shadow-2xl"
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
