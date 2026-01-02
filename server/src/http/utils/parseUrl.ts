import type { IncomingMessage } from "http";

export const getUrl = (req: IncomingMessage, host: string) => {
  return new URL(String(req.url), host);
};
