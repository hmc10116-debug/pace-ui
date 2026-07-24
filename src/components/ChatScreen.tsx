import { useEffect, useRef, useState, type RefObject } from "react";
import Mascot from "./Mascot";
import StatusBar from "./StatusBar";
import Button from "./Button";
import sleepIcon from "../assets/icon-sleep.svg";
import micIcon from "../assets/icon-mic.svg";
import type { ChatMessage } from "../types";
import { useViewportRect } from "../hooks/useViewportRect";

function TypingDots({ tone = "bot" }: { tone?: "bot" | "user" }) {
  return (
    <div
      className={`flex h-[44px] w-[72px] items-center justify-center gap-[6px] rounded-[16px] ${
        tone === "user" ? "bg-accent-tonal-bg" : "bg-surface-card"
      }`}
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={`size-2 animate-bounce rounded-full ${tone === "user" ? "bg-accent-fill" : "bg-[#c9c2e0]"}`}
          style={{ animationDelay: `${i * 0.12}s` }}
        />
      ))}
    </div>
  );
}

export default function ChatScreen({
  messages,
  isTyping,
  draft,
  onDraftChange,
  onSend,
  onFinish,
  inputRef,
}: {
  messages: ChatMessage[];
  isTyping: boolean;
  draft: string;
  onDraftChange: (value: string) => void;
  onSend: () => void;
  onFinish: () => void;
  inputRef: RefObject<HTMLInputElement | null>;
}) {
  const listEndRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const showSend = isFocused || draft.trim().length > 0;
  const isUserTyping = draft.trim().length > 0;

  // visualViewport.height shrinks when the iOS keyboard opens without
  // resizing the layout viewport, so the design-space canvas (fixed height,
  // scaled by width only) doesn't shrink with it. Bind the content column's
  // own height to the currently visible area (in design-space px) so its
  // flex-1 message list — and therefore the input row right after it —
  // naturally resize to sit flush above the keyboard, with no manual gap
  // math needed.
  const { viewportRect, scale } = useViewportRect();
  const contentHeight = viewportRect.height / scale;

  useEffect(() => {
    if (messages.length === 0 && !isTyping && !isUserTyping) return;
    listEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isTyping, isUserTyping]);

  return (
    <div className="relative size-full">
      <StatusBar time="14:10" />

      <Button
        variant="secondary"
        size="sm"
        icon={<img alt="" src={sleepIcon} className="size-3" />}
        onClick={onFinish}
        className={`absolute left-1/2 top-[53px] z-10 -translate-x-1/2 transition-colors ${
          isScrolled ? "bg-surface-card" : ""
        }`}
      >
        完成對話進入首頁
      </Button>

      <div className="flex flex-col overflow-hidden" style={{ height: contentHeight }}>
        <div
          className="min-h-0 flex-1 space-y-3 overflow-y-auto px-6 pb-2 pt-2"
          onScroll={(e) => setIsScrolled(e.currentTarget.scrollTop > 0)}
        >
          <div className="flex flex-col items-center gap-3 pb-2 pt-[92px]">
            <Mascot />
            <p className="text-center text-[12px] text-text-secondary">我在聽,想說什麼都可以</p>
          </div>

          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
              <p
                className={`max-w-[260px] whitespace-pre-line rounded-[16px] px-[14px] py-[12px] text-[13px] leading-[1.45] ${
                  m.sender === "user"
                    ? "bg-accent-tonal-bg text-text-primary"
                    : "rounded-tl-[6px] bg-surface-card text-text-primary"
                }`}
              >
                {m.text}
              </p>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <TypingDots tone="bot" />
            </div>
          )}
          {isUserTyping && (
            <div className="flex justify-end">
              <TypingDots tone="user" />
            </div>
          )}
          <div ref={listEndRef} />
        </div>

        <div className="flex flex-col gap-2 p-[10px] pb-4">
          <div
            className={`flex h-[46px] items-center justify-between rounded-full border bg-surface-card pl-4 pr-2 shadow-sm transition-colors ${
              isFocused ? "border-[1.5px] border-accent-fill" : "border-[rgba(111,90,168,0.25)]"
            }`}
          >
            <input
              ref={inputRef}
              value={draft}
              onChange={(e) => onDraftChange(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onKeyDown={(e) => {
                if (e.key === "Enter") onSend();
              }}
              placeholder="想說什麼都可以…"
              className="flex-1 bg-transparent text-[13px] text-text-primary placeholder:text-text-secondary focus:outline-none"
            />
            {showSend ? (
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={onSend}
                className="flex size-[30px] shrink-0 items-center justify-center rounded-full bg-accent-fill text-[13px] font-medium text-text-on-accent"
              >
                ↑
              </button>
            ) : (
              <img alt="" src={micIcon} className="size-[18px] shrink-0" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
