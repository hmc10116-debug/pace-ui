import Mascot from "./Mascot";

export default function DoneOverlay() {
  return (
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 bg-bg-base/95">
      <Mascot />
      <p className="text-[16px] font-medium text-text-primary">收好了</p>
      <p className="text-[12px] text-text-tertiary">明天見,小雲怪會在這裡等你</p>
    </div>
  );
}
