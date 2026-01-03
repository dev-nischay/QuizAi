import type { AuthWebSocket } from "../ws.types.js";

import type { GuestMessageType } from "../ws.types.js";

export const guestRouter = (socket: AuthWebSocket, message: GuestMessageType) => {
  const typeResponse = message.type;

  switch (typeResponse) {
    case "SUBMIT_ANSWER":
      console.log("ROOM JOINED");
      break;

    case "LEAVE_ROOM":
      console.log("QUIZ STARTED");
      break;

    default:
      console.log("Error response not valid");
  }
};

export default guestRouter;
