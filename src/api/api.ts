// Типизация всех ответов API

// Отзыв
export interface Review {
  id: string;
  text: string;
  label: "positive" | "neutral" | "negative";
  confidence: number;
}

// Группа отзывов
export interface Group {
  id: string;
  name: string;
  date: string;
  reviews: Review[];
  generalScore: number; // 0–1
}

// Ответ сервера с группами
export type GroupsResponse = Group[];

// Запрос на анализ текста
export interface ReviewRequest {
  review: string;
}

// Ответ на анализ текста
export interface ReviewResponse {
  id: string;
  text: string;
  label: "positive" | "neutral" | "negative";
  confidence: number;
  groupId: string;
}

// Ответ при загрузке файла
export interface FileUploadResponse {
  id: string;
  name: string;
  date: string;
}
