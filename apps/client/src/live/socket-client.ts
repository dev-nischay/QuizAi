import type { ClientResponse, ServerResponse } from "@common/contracts";

import { messageRouter } from "./router";

const baseUrl = import.meta.env.VITE_API_URL;

export class SocketControls {
  private ws: WebSocket | null = null;
  private connectPromise: Promise<void> | null = null;

  connect = (token: string, role: string, quizId: string): Promise<void> => {
    if (this.ws?.readyState === WebSocket.OPEN) {
      return Promise.resolve();
    }

    if (this.ws?.readyState === WebSocket.CONNECTING && this.connectPromise) {
      return this.connectPromise;
    }

    this.connectPromise = new Promise<void>((resolve, reject) => {
      let connected = false;

      this.ws = new WebSocket(`${baseUrl}?jwtToken=${token}&role=${role}&quizId=${quizId}`);

      this.ws.onopen = () => {
        connected = true;
        this.connectPromise = null;
        resolve();
      };

      this.ws.onmessage = (event) => {
        try {
          const data: ServerResponse = JSON.parse(event.data);
          this.onMessage(data);
        } catch (e) {
          console.error("Failed to parse socket message", e);
        }
      };

      this.ws.onerror = (error) => {
        console.error("WebSocket Error:", error);

        if (!connected) {
          this.connectPromise = null;
          reject(new Error("Failed to connect to WebSocket."));
        }
      };

      this.ws.onclose = (event) => {
        console.log(`Socket closed: ${event.reason}`);

        this.ws = null;

        if (!connected) {
          this.connectPromise = null;
          reject(new Error(`Socket closed before opening: ${event.code}`));
        } else {
          this.connectPromise = null;
        }
      };
    });

    return this.connectPromise;
  };

  disconnect = () => {
    this.ws?.close(1000, JSON.stringify("normal closure"));
    this.ws = null;
    this.connectPromise = null;
  };

  sendMessage = (data: ClientResponse) => {
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
