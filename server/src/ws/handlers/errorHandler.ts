import { wsError } from "../utils/wsError.js";
import type { AuthWebSocket } from "../types/ws.types.js";
import { wsSend } from "../utils/wsSend.js";

export const handleError = async (socket: AuthWebSocket, error: unknown) => {
  if (error instanceof wsError) {
    const errorCode = error.errorCode ?? 1008;
    console.log("Expected Error in websockets", error.message);

    if (error.closeSocket) {
      console.log("closing socket connection");
      return socket.close(errorCode, error.message);
    } else {
      return wsSend(socket, {
        type: "ERROR",
        error: error.message,
      });
    }
  }

  if (error instanceof Error) {
    console.log("Unexpected Error in websockets", error.message);
    console.log("closing socket connection");

    return socket.close(
      1011,
      JSON.stringify({
        type: "Error",
        error: "Something went wrong try again later",
      })
    );
  }
};
