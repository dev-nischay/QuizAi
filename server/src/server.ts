import http from "http";
import app from "./app.js";
const PORT = Number(process.env.PORT);
import { connectDb } from "./http/utils/connectDb.js";

const server = http.createServer(app);
// websockets init
server.listen(PORT, "0.0.0.0", async () => {
  await connectDb();
  console.log(`server running on port ${PORT}`);
});
