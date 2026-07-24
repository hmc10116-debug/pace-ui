import Mascot from "./Mascot";

export default function DoneOverlay() {
  return (
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 bg-[#f7f2e7]/95">
      <Mascot />
      <p className="text-[16px] font-medium text-[#3a3450]">收好了</p>
      <p className="text-[12px] text-[#695f82]">明天見,小雲怪會在這裡等你</p>
    </div>
  );
}
