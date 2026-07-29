import type { JwtPayload } from "jsonwebtoken";

export interface Payload extends JwtPayload {
  userId: string;
  username: string;
}
