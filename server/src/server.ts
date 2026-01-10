import http from "http";
import app from "./app.js";
const PORT = Number(process.env.PORT);
import { connectDb } from "./http/utils/connectDb.js";
import { initWebSocket } from "./ws/index.js";
const server = http.createServer(app);

initWebSocket(server);

server.listen(PORT, "0.0.0.0", async () => {
  await connectDb();
  console.log(`server running on port ${PORT}`);
});
