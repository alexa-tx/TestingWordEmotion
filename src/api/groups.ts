// src/api/groups.ts
export interface Review {
  id: string;
  text: string;
  label: "positive" | "neutral" | "negative";
  confidence: number;
}

export interface Group {
  id: string;
  name: string;
  date: string;
  reviews: Review[];
  generalScore: number; // от 0 до 1
}

export interface GroupResponse {
  result: {
    groups: Group[];
    percentagePositiveReview: number; // 0-100
  };
  errorMessage: string | null;
}

// Отправка текста на анализ
export async function uploadTextAndGetAnalysis(text: string): Promise<GroupResponse> {
  const reviewRes = await fetch("https://api.reviewanalyzer.mixdev.me/api/Review", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ review: text }),
  });
  const reviewData = await reviewRes.json();

  // Получаем группу (в твоем случае можно сразу получить последнюю созданную)
  const groupRes = await fetch("https://api.reviewanalyzer.mixdev.me/api/Group");
  const groupData: GroupResponse = await groupRes.json();
  return groupData;
}

export async function fetchGroups(): Promise<GroupResponse> {
  const res = await fetch("https://api.reviewanalyzer.mixdev.me/api/Group");
  if (!res.ok) throw new Error("Ошибка при получении групп");
  const data: GroupResponse = await res.json();
  return data;
}