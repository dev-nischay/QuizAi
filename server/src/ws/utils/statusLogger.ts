import type { AuthWebSocket } from "../types/ws.types.js";
import chalk from "chalk";
export const statusLogger = (socket: AuthWebSocket) => {
  const userId = chalk.green(socket.user);
  switch (socket.readyState) {
    case socket.OPEN:
      `${chalk.red("User:")}${userId} ==> status:${chalk.blue("OPEN")}`;
      break;
    case socket.CLOSING:
      `${chalk.red("User:")}${userId} ==> status:${chalk.blue("CLOSING")}`;
      break;
    case socket.CONNECTING:
      `${chalk.red("User:")}${userId} ==> status:${chalk.blue("CONNECTING")}`;
      break;

    case socket.CLOSED:
      `${chalk.red("User:")}${userId} ==> status:${chalk.blue("CLOSED")}`;
      break;

    default:
      "Invalid status";
      break;
  }
};
