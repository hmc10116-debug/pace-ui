// Pace 對話 Spec v1 — 情緒引導開場對話與安全邊界
// v1 架構限制:沒有 AI 後端,「動態生成」在此以「情緒 × 時段 × 首次/重複」
// 的固定文案表(~40 筆)近似,而非真正逐次生成。ToneChip / ×連續3次特殊
// 回應 / 直接打字語意理解,依 spec 第 0 節皆不在本輪範圍內。

export type Emotion = "焦慮" | "疲憊" | "平靜" | "放鬆" | "喜悅";
export type TimeOfDay = "早" | "午" | "晚" | "深夜";

const NEGATIVE_EMOTIONS: Emotion[] = ["焦慮", "疲憊"];

export function getTimeOfDay(date: Date = new Date()): TimeOfDay {
  const hour = date.getHours();
  if (hour >= 5 && hour < 12) return "早";
  if (hour >= 12 && hour < 18) return "午";
  if (hour >= 18 && hour < 23) return "晚";
  return "深夜";
}

// 開場鏡映句 = f(情緒, 時段, 首次/重複)。首次不帶呼應詞,重複可帶「又是」「這次也」。
const MIRROR_LINES: Record<Emotion, Record<TimeOfDay, { first: string; repeat: string }>> = {
  焦慮: {
    早: { first: "早安,是有什麼一早就掛心的事嗎?", repeat: "又是一早就開始掛心了嗎?" },
    午: { first: "這個時間點,是有什麼讓你心裡不安嗎?", repeat: "這次也是被什麼事懸著心嗎?" },
    晚: { first: "晚上了,心裡好像還是懸著什麼。", repeat: "又是這種懸在心上的感覺嗎?" },
    深夜: { first: "這麼晚了,是有什麼讓你睡不著嗎?", repeat: "這次也是半夜想著什麼睡不著嗎?" },
  },
  疲憊: {
    早: { first: "一早就這麼疲憊,辛苦了。", repeat: "又是一早就覺得累了嗎?" },
    午: { first: "這個時候感覺累了,辛苦了。", repeat: "這次也是撐到現在有點累了嗎?" },
    晚: { first: "忙了一天,辛苦了。", repeat: "又是這樣忙一整天才喘口氣嗎?" },
    深夜: { first: "這麼晚了還醒著,一定很累了吧。", repeat: "這次也是累到這麼晚才停下來嗎?" },
  },
  平靜: {
    早: { first: "早上能感覺平靜,真好。", repeat: "又是這樣平靜的早晨,真好。" },
    午: { first: "這個時候還能平靜,真好。", repeat: "這次也一樣平靜,真好。" },
    晚: { first: "晚上能靜下來,真好。", repeat: "又是這樣安穩的晚上,真好。" },
    深夜: { first: "這麼晚了還能感覺平靜,真好。", repeat: "這次也是這樣的平靜,真好。" },
  },
  放鬆: {
    早: { first: "一早就能放鬆,真好。", repeat: "又是這樣放鬆的早晨,真好。" },
    午: { first: "這個時候能放鬆下來,真好。", repeat: "這次也一樣放鬆,真好。" },
    晚: { first: "晚上能鬆下來,真好。", repeat: "又是這樣鬆一口氣的晚上。" },
    深夜: { first: "這麼晚了還覺得放鬆,真好。", repeat: "這次也是這樣放鬆地醒著。" },
  },
  喜悅: {
    早: { first: "一早就這麼開心,真好。", repeat: "又是這樣開心的早晨,真好。" },
    午: { first: "這個時候感覺喜悅,真好。", repeat: "這次也一樣開心,真好。" },
    晚: { first: "晚上還能這麼開心,真好。", repeat: "又是這樣的好心情。" },
    深夜: { first: "這麼晚了還這麼開心,真好。", repeat: "這次也帶著這樣的好心情。" },
  },
};

// 猜測式假設:僅負向情緒(焦慮/疲憊)觸發,f(情緒, 時段) ——「連續3次」的歷史
// 介入本輪暫緩,故不含 first/repeat 差異。深夜語氣更留白,不追問細節。
const HYPOTHESIS_LINES: Record<"焦慮" | "疲憊", Record<TimeOfDay, string>> = {
  焦慮: {
    早: "是今天有什麼要面對的事,還是心裡一直有件事放不下?",
    午: "是工作上有狀況,還是有什麼一直在腦子裡打轉?",
    晚: "是白天發生了什麼事,還是單純今天特別不安?",
    深夜: "是有什麼事一直繞著,還是單純這個時間容易多想?",
  },
  疲憊: {
    早: "是昨晚沒睡好,還是最近事情太多?",
    午: "是今天特別忙,還是這陣子一直很緊繃?",
    晚: "是今天特別累,還是最近一直都這樣?",
    深夜: "是還沒準備睡,還是單純捨不得放下今天?",
  },
};

const CLOSING_LINE = "想說也可以,不說也沒關係,我在這裡。";
const CLOSING_LINE_LATE_NIGHT = "很晚了,想說也可以,想休息也可以,我都在。";

export function buildEmotionOpeningReply(
  emotion: Emotion,
  isFirstTime: boolean,
  timeOfDay: TimeOfDay = getTimeOfDay(),
): string {
  const mirror = MIRROR_LINES[emotion][timeOfDay][isFirstTime ? "first" : "repeat"];
  const isNegative = NEGATIVE_EMOTIONS.includes(emotion);
  const hypothesis = isNegative ? HYPOTHESIS_LINES[emotion as "焦慮" | "疲憊"][timeOfDay] : null;
  const closing = timeOfDay === "深夜" ? CLOSING_LINE_LATE_NIGHT : CLOSING_LINE;
  return [mirror, hypothesis, closing].filter(Boolean).join("\n");
}

// 中性承接式回覆:路徑B(直接打字)在無 AI 架構下無法真正判斷語意,依 spec
// edge case「直接打字但語意模糊,無法判斷情緒」一律採中性回覆,不猜測情緒類別。
export const NEUTRAL_OPENING_REPLY = "我在聽,想說什麼都可以。";
export const NEUTRAL_FOLLOW_UP_REPLIES = [
  "嗯,卡住的常常不是大事,想多說一點那個當下嗎?",
  "謝謝你願意說出來,這樣的感覺很不容易。",
  "我在這裡陪你,慢慢說沒關係。",
];

// 高風險語意偵測(安全邊界,優先權最高)—— v1 以關鍵字比對實作,非真正語意
// 判斷,無法涵蓋所有表達方式,清單需要專人定期檢視維護(見 spec 第7節 open Q)。
const RISK_KEYWORDS = [
  "自殺",
  "自殘",
  "自傷",
  "想死",
  "不想活",
  "活不下去",
  "不如死了",
  "結束生命",
  "割腕",
  "傷害自己",
  "消失就好",
  "想離開這個世界",
  "沒有存在的意義",
];

export function containsRiskKeywords(text: string): boolean {
  return RISK_KEYWORDS.some((keyword) => text.includes(keyword));
}

// 降級處理:溫暖但不過度反應的承接語句 + 邀請(非強迫)尋求真人資源;不假裝
// 具備危機評估能力,不追問方法/細節。1925 為台灣衛福部 24 小時安心專線。
export const SAFETY_RESPONSE =
  "聽到你這麼說,我很在意你現在的狀態。這不是我能單獨陪你走過的事,要不要我陪你看看可以找誰聊聊?\n如果需要立即協助,可以撥打安心專線 1925(24 小時),會有人陪你說話。";
