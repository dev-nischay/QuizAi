import type { IncomingMessage } from "http";

export const getUrl = (req: IncomingMessage) => {
  const host = `http://${req.headers.host}`;

  const url = new URL(String(req.url), host);
  return url;
};
