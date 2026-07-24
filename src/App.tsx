import { useRef, useState } from "react";
import PhoneFrame from "./components/PhoneFrame";
import GreetingScreen from "./components/GreetingScreen";
import ChatScreen from "./components/ChatScreen";
import DoneOverlay from "./components/DoneOverlay";
import type { ChatMessage } from "./types";
import {
  buildEmotionOpeningReply,
  containsRiskKeywords,
  NEUTRAL_FOLLOW_UP_REPLIES,
  NEUTRAL_OPENING_REPLY,
  SAFETY_RESPONSE,
  type Emotion,
} from "./lib/replyContent";
import { isFirstTimeUser, recordEmotionPick } from "./lib/history";

function makeMessage(sender: ChatMessage["sender"], text: string): ChatMessage {
  return { id: `${Date.now()}-${Math.random().toString(36).slice(2)}`, sender, text };
}

export default function App() {
  const [screen, setScreen] = useState<"greeting" | "home" | "chat">("greeting");
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
    const emotion = mood as Emotion;
    const isFirstTime = isFirstTimeUser();
    recordEmotionPick(emotion);
    chatInputRef.current?.focus({ preventScroll: true });
    setScreen("chat");
    setMessages([makeMessage("user", mood)]);
    triggerBotReply(buildEmotionOpeningReply(emotion, isFirstTime));
  }

  function handleTypeInstead() {
    chatInputRef.current?.focus({ preventScroll: true });
    setScreen("chat");
    setMessages([]);
  }

  function handleSkip() {
    setScreen("home");
  }

  function handleSend() {
    const text = draft.trim();
    if (!text) return;
    setMessages((prev) => [...prev, makeMessage("user", text)]);
    setDraft("");

    // 安全邊界優先權最高,覆蓋情緒/時段/歷史等所有其他規則。
    if (containsRiskKeywords(text)) {
      triggerBotReply(SAFETY_RESPONSE);
      return;
    }

    const isFirstUserMessage = messages.every((m) => m.sender !== "user");
    triggerBotReply(
      isFirstUserMessage ? NEUTRAL_OPENING_REPLY : NEUTRAL_FOLLOW_UP_REPLIES[messages.length % NEUTRAL_FOLLOW_UP_REPLIES.length],
    );
  }

  function handleFinish() {
    setShowDone(true);
    window.setTimeout(() => {
      setScreen("home");
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
      <div className={`absolute inset-0 ${screen === "home" ? "" : "pointer-events-none opacity-0"}`}>
        <GreetingScreen variant="home" onPickMood={handlePickMood} onTypeInstead={handleTypeInstead} />
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
