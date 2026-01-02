export type Client = {
  id: string;
  role: "host" | "guest";
};

export type AuthWebSocket = WebSocket & {
  user: Client;
};
