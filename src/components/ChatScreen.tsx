import { useEffect, useRef } from "react";
import Mascot from "./Mascot";
import StatusBar from "./StatusBar";
import sleepIcon from "../assets/icon-sleep.svg";
import micIcon from "../assets/icon-mic.svg";
import type { ChatMessage } from "../types";

function TypingDots() {
  return (
    <div className="flex h-[44px] w-[72px] items-center justify-center gap-[6px] rounded-[16px] bg-white">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="size-2 animate-bounce rounded-full bg-[#c9c2e0]"
          style={{ animationDelay: `${i * 0.12}s` }}
        />
      ))}
    </div>
  );
}

export default function ChatScreen({
  messages,
  isTyping,
  showNudge,
  draft,
  onDraftChange,
  onSend,
  onFinish,
}: {
  messages: ChatMessage[];
  isTyping: boolean;
  showNudge: boolean;
  draft: string;
  onDraftChange: (value: string) => void;
  onSend: () => void;
  onFinish: () => void;
}) {
  const listEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isTyping]);

  return (
    <div className="relative flex size-full flex-col">
      <StatusBar time="14:10" />

      <button
        type="button"
        onClick={onFinish}
        className="absolute left-1/2 top-[53px] z-10 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-[#b7a6de] px-[14px] py-[6px] text-[12px] text-[#b7a6de]"
      >
        <img alt="" src={sleepIcon} className="size-3" />
        完成對話進入首頁
      </button>

      <div className="flex flex-col items-center gap-3 px-6 pb-2 pt-[100px]">
        <Mascot />
        <p className="text-center text-[12px] text-[#9a93b8]">我在聽,想說什麼都可以</p>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto px-6 pb-2 pt-2">
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
            <p
              className={`max-w-[260px] rounded-[16px] px-[14px] py-[12px] text-[13px] leading-[1.45] ${
                m.sender === "user"
                  ? "bg-[rgba(183,166,222,0.14)] text-[#3a3450]"
                  : "rounded-tl-[6px] bg-white text-[#3a3450]"
              }`}
            >
              {m.text}
            </p>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <TypingDots />
          </div>
        )}
        <div ref={listEndRef} />
      </div>

      <div className="flex flex-col gap-2 p-[10px] pb-4">
        <div className="flex h-[46px] items-center justify-between rounded-[14px] border-[1.5px] border-[rgba(111,90,168,0.5)] bg-[#262838] pl-4 pr-2">
          <input
            value={draft}
            onChange={(e) => onDraftChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") onSend();
            }}
            placeholder="想說什麼都可以…"
            className="flex-1 bg-transparent text-[13px] text-[#ece7de] placeholder:text-[#918cab] focus:outline-none"
          />
          {draft.trim() ? (
            <button
              type="button"
              onClick={onSend}
              className="flex size-[30px] shrink-0 items-center justify-center rounded-full bg-[#6f5aa8] text-[13px] font-medium text-white"
            >
              ↑
            </button>
          ) : (
            <img alt="" src={micIcon} className="size-[18px] shrink-0" />
          )}
        </div>

        {showNudge && (
          <button
            type="button"
            onClick={onFinish}
            className="flex h-11 w-full items-center justify-center rounded-xl bg-[#6f5aa8] text-[13px] text-[#f6f3fa]"
          >
            說完了,幫我收著
          </button>
        )}
      </div>
    </div>
  );
}
