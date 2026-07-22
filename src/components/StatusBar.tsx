import wifi from "../assets/icon-wifi.svg";

export default function StatusBar({ time }: { time: string }) {
  return (
    <div className="absolute left-6 top-5 flex h-[18px] w-[327px] items-center justify-between px-0.5">
      <p className="text-[13px] text-[#3a3450]">{time}</p>
      <div className="flex items-center gap-[5px]">
        <div className="flex h-[11px] w-[17px] items-end gap-[2px]">
          <span className="h-[3px] w-[2.5px] rounded-[0.8px] bg-[#3a3450]" />
          <span className="h-[5px] w-[2.5px] rounded-[0.8px] bg-[#3a3450]" />
          <span className="h-[7px] w-[2.5px] rounded-[0.8px] bg-[#3a3450]" />
          <span className="h-[9px] w-[2.5px] rounded-[0.8px] bg-[#3a3450]" />
        </div>
        <img alt="" src={wifi} className="h-[11px] w-[15px]" />
        <div className="relative h-[12px] w-[26px]">
          <div className="absolute left-0 top-[0.5px] h-[11px] w-[23px] rounded-[3px] border border-[rgba(58,52,80,0.5)]" />
          <div className="absolute left-[2px] top-[2.5px] h-[7px] w-4 rounded-[1.5px] bg-[#3a3450]" />
        </div>
      </div>
    </div>
  );
}
