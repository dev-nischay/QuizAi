import { wsError } from "../utils/wsError.js";
import type { AuthWebSocket } from "../ws.types.js";

export const handleError = async (socket: AuthWebSocket, error: unknown) => {
  if (error instanceof wsError) {
    const errorCode = error.errorCode ?? 1008;
    console.log("Expected Error in websockets", error);
    console.log("closing socket connection");

    return socket.close(
      errorCode,
      JSON.stringify({
        type: "Error",
        error: error.message,
      })
    );
  }

  if (error instanceof Error) {
    console.log("Unexpected Error in websockets", error);
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
// generic differntiator between closing a socket and sending a response is pending
