import type { ClientResponse, ServerResponse } from "@common/contracts";

import { messageRouter } from "./router";
import { resetQuizState } from "../utils/resetQuizState";
const baseUrl = import.meta.env.VITE_API_URL;

export class SocketControls {
  private ws: WebSocket | null = null;

  connect = (token: string, role: string, quizId: string) => {
    if (this.ws?.readyState === WebSocket.OPEN || this.ws?.readyState === WebSocket.CONNECTING) return;

    // Prevent multiple simultaneous connections

    this.ws = new WebSocket(`${baseUrl}?jwtToken=${token}&role=${role}&quizId=${quizId}`);

    // Hook up the listeners
    this.ws.onmessage = (event) => {
      try {
        const data: ServerResponse = JSON.parse(event.data);
        this.onMessage(data);
      } catch (e) {
        console.error("Failed to parse socket message", e);
      }
    };

    this.ws.onclose = (event) => {
      console.log(`Socket closed: ${event.reason}`);
      this.ws = null;
      resetQuizState();

      // Logic for auto-reconnect would go here
    };

    this.ws.onerror = (error) => {
      console.error("WebSocket Error:", error);
      // toast error
    };
  };

  disconnect = () => {
    this.ws?.close(1000, "Normal Closure User disconnected");
  };

  sendMessage = (data: ClientResponse) => {
    console.log("ran");
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data));
    } else {
      console.warn("Socket is not open. Message not sent.");
    }
  };

  private onMessage = (data: ServerResponse) => {
    messageRouter(data);
  };
}

export const socketService = new SocketControls();
