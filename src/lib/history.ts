import type { Emotion } from "./replyContent";

// 歷史狀態(spec 2.3):首次使用 = 完全無歷史記錄;重複使用 = 有記錄但同一
// 情緒未達連續3次。連續3次的統計窗口本輪暫緩,故這裡只需要記錄「是否用過」。
const STORAGE_KEY = "pace_emotion_history";

interface HistoryEntry {
  emotion: Emotion;
  timestamp: number;
}

function readHistory(): HistoryEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as HistoryEntry[]) : [];
  } catch {
    return [];
  }
}

export function isFirstTimeUser(): boolean {
  return readHistory().length === 0;
}

export function recordEmotionPick(emotion: Emotion): void {
  try {
    const history = readHistory();
    history.push({ emotion, timestamp: Date.now() });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch {
    // localStorage unavailable (e.g. private mode) — degrade to "always first-time"
  }
}
