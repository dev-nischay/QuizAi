import type { AuthWebSocket } from "../ws.types.js";

import type { HostMessageType } from "../ws.types.js";
export const hostRouter = (socket: AuthWebSocket, message: HostMessageType) => {
  const typeResponse = message.type;

  switch (typeResponse) {
    case "JOIN_ROOM":
      console.log("ROOM JOINED");
      break;

    case "START_QUIZ":
      console.log("QUIZ STARTED");
      break;

    case "SHOW_QUESTION":
      console.log("QUESTION DISPLA");
      break;

    case "SHOW_RESULT":
      console.log("DISPLAY RESULT");
      break;

    default:
      console.log("Error response not valid");
  }
};

export default hostRouter;
