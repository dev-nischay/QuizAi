import type { JwtPayload } from "jsonwebtoken";

export interface Payload extends JwtPayload {
  userId: string;
}

export type Questions = {
  _id: string;
  text: string;
  options: [string, string, string, string];
  correctOptionIndex: 0 | 1 | 2 | 3;
};
