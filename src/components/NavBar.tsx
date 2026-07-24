import homeIcon from "../assets/icon-nav-home.svg";
import profileIcon from "../assets/icon-nav-profile.svg";

export default function NavBar() {
  return (
    <div className="absolute left-1/2 top-[730px] flex h-16 w-[343px] -translate-x-1/2 items-center overflow-hidden rounded-[32px] border border-[rgba(58,52,80,0.06)] bg-white/95 shadow-[0px_6px_18px_0px_rgba(0,0,0,0.08)]">
      <div className="mx-[2px] flex h-14 flex-1 flex-col items-center justify-center gap-1 rounded-full bg-accent-tonal-bg">
        <img alt="" src={homeIcon} className="size-6" />
        <p className="text-[11px] text-accent-fill">今天</p>
      </div>
      <button type="button" className="flex h-16 flex-1 flex-col items-center justify-center gap-1">
        <div className="flex h-6 w-6 items-end justify-center gap-[3.6px]">
          <span className="h-[9px] w-[3.6px] rounded-[1px] bg-[rgba(117,107,143,0.6)]" />
          <span className="h-[15px] w-[3.6px] rounded-[1px] bg-[rgba(117,107,143,0.6)]" />
          <span className="h-[12px] w-[3.6px] rounded-[1px] bg-[rgba(117,107,143,0.6)]" />
        </div>
        <p className="text-[11px] text-[rgba(117,107,143,0.6)]">紀錄</p>
      </button>
      <button type="button" className="flex h-16 flex-1 flex-col items-center justify-center gap-1">
        <img alt="" src={profileIcon} className="size-6 opacity-60" />
        <p className="text-[11px] text-[rgba(117,107,143,0.6)]">我的</p>
      </button>
    </div>
  );
}
