import Mascot from "./Mascot";
import StatusBar from "./StatusBar";
import Button from "./Button";

const MOOD_ROWS = [
  ["焦慮", "疲憊", "平靜"],
  ["放鬆", "喜悅"],
];

function greetingText() {
  const now = new Date();
  const hour = now.getHours();
  const weekday = ["週日", "週一", "週二", "週三", "週四", "週五", "週六"][now.getDay()];
  const greeting = hour < 12 ? "早安" : hour < 18 ? "午安" : "晚安";
  return `${greeting} · ${weekday}`;
}

export default function GreetingScreen({
  onPickMood,
  onTypeInstead,
  onSkip,
}: {
  onPickMood: (mood: string) => void;
  onTypeInstead: () => void;
  onSkip: () => void;
}) {
  return (
    <div className="relative size-full">
      <StatusBar time="8:04" />
      <p className="absolute left-6 top-[58px] text-[13px] text-[#9a93b8]">{greetingText()}</p>

      <Mascot className="absolute left-[135.5px] top-[171px]" />

      <p className="absolute left-1/2 top-[340px] w-[327px] -translate-x-1/2 text-center text-[18px] font-medium text-[#3a3450]">
        嗨,我是小雲怪
      </p>
      <div className="absolute left-1/2 top-[376px] w-[327px] -translate-x-1/2 text-center text-[13px] leading-[1.45] text-[#9a93b8]">
        <p>有什麼放在心上的,都可以跟我說。</p>
        <p>不知道從哪開始?先挑一個今天的感覺。</p>
      </div>

      <div className="absolute left-1/2 top-[434px] flex w-[247px] -translate-x-1/2 flex-col items-center gap-2">
        {MOOD_ROWS.map((row, i) => (
          <div key={i} className="flex w-full items-center justify-center gap-2">
            {row.map((mood) => (
              <button
                key={mood}
                type="button"
                onClick={() => onPickMood(mood)}
                className="flex-1 rounded-[21px] border border-[#b7a6de] bg-[#262838] px-[18px] py-[13.5px] text-[14px] font-medium text-[#9a93b8] transition-colors hover:bg-[#31324a] active:scale-[0.97]"
              >
                {mood}
              </button>
            ))}
          </div>
        ))}
      </div>

      <Button
        variant="text"
        onClick={onTypeInstead}
        className="absolute left-1/2 top-[554px] -translate-x-1/2"
      >
        或,直接打字跟我說
      </Button>

      <p className="absolute left-1/2 top-[640px] w-[327px] -translate-x-1/2 text-center text-[11px] text-[#918cab]">
        說完我幫你收進心事盒,只有你和小雲怪看得到
      </p>

      <Button
        variant="secondary"
        size="sm"
        onClick={onSkip}
        className="absolute left-1/2 top-[694px] -translate-x-1/2"
      >
        先逛逛也可以
      </Button>
    </div>
  );
}
