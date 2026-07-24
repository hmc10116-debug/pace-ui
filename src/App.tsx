import { useRef, useState } from "react";
import PhoneFrame from "./components/PhoneFrame";
import GreetingScreen from "./components/GreetingScreen";
import ChatScreen from "./components/ChatScreen";
import DoneOverlay from "./components/DoneOverlay";
import type { ChatMessage } from "./types";

const MOOD_REPLIES: Record<string, string> = {
  焦慮: "聽起來心裡有點緊繃,要不要說說是什麼讓你焦慮?",
  疲憊: "一早就這麼疲憊,辛苦了。是昨晚沒睡好,還是最近事情太多?想說說也可以,不說也沒關係。",
  平靜: "能有平靜的感覺很好,想多留一會兒在這個狀態嗎?",
  放鬆: "放鬆真好,想聊聊是什麼讓你放鬆下來的嗎?",
  喜悅: "聽到你喜悅我也開心,想分享是什麼事嗎?",
};
const DEFAULT_REPLY = "我在聽,想說什麼都可以。";
const FOLLOW_UP_REPLIES = [
  "嗯,卡住的常常不是大事,想多說一點那個當下嗎?",
  "謝謝你願意說出來,這樣的感覺很不容易。",
  "我在這裡陪你,慢慢說沒關係。",
];

function makeMessage(sender: ChatMessage["sender"], text: string): ChatMessage {
  return { id: `${Date.now()}-${Math.random().toString(36).slice(2)}`, sender, text };
}

export default function App() {
  const [screen, setScreen] = useState<"greeting" | "chat">("greeting");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showDone, setShowDone] = useState(false);
  const chatInputRef = useRef<HTMLInputElement>(null);

  function triggerBotReply(text: string) {
    setIsTyping(true);
    window.setTimeout(() => {
      setMessages((prev) => [...prev, makeMessage("bot", text)]);
      setIsTyping(false);
    }, 900);
  }

  function handlePickMood(mood: string) {
    chatInputRef.current?.focus();
    setScreen("chat");
    setMessages([makeMessage("user", mood)]);
    triggerBotReply(MOOD_REPLIES[mood] ?? DEFAULT_REPLY);
  }

  function handleTypeInstead() {
    chatInputRef.current?.focus();
    setScreen("chat");
    setMessages([]);
  }

  // "先逛逛也可以" exits straight to 首頁 without entering the chat flow.
  // No home screen exists yet (see spec §7 Out of Scope) — this is the
  // reserved call site to wire up once one is designed.
  function handleSkip() {}

  function handleSend() {
    const text = draft.trim();
    if (!text) return;
    const isFirstUserMessage = messages.every((m) => m.sender !== "user");
    setMessages((prev) => [...prev, makeMessage("user", text)]);
    setDraft("");
    triggerBotReply(isFirstUserMessage ? DEFAULT_REPLY : FOLLOW_UP_REPLIES[messages.length % FOLLOW_UP_REPLIES.length]);
  }

  function handleFinish() {
    setShowDone(true);
    window.setTimeout(() => {
      setScreen("greeting");
      setMessages([]);
      setDraft("");
      setIsTyping(false);
      setShowDone(false);
    }, 1600);
  }

  return (
    <PhoneFrame>
      <div className={`absolute inset-0 ${screen === "greeting" ? "" : "pointer-events-none opacity-0"}`}>
        <GreetingScreen onPickMood={handlePickMood} onTypeInstead={handleTypeInstead} onSkip={handleSkip} />
      </div>
      <div className={`absolute inset-0 ${screen === "chat" ? "" : "pointer-events-none opacity-0"}`}>
        <ChatScreen
          messages={messages}
          isTyping={isTyping}
          draft={draft}
          onDraftChange={setDraft}
          onSend={handleSend}
          onFinish={handleFinish}
          inputRef={chatInputRef}
        />
      </div>
      {showDone && <DoneOverlay />}
    </PhoneFrame>
  );
}
