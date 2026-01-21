import type { QuizRoom } from "./types/ws.types.js";

export const QuizMemory = new Map<string, QuizRoom>();
export let CounterMemory: number = 0;

export function increment() {
  CounterMemory += 1;
}
