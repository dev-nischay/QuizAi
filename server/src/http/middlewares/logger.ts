import chalk from "chalk";
import type { Request, Response, NextFunction } from "express";
export const logger = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const method = chalk.blue.bold(req.method);
  const url = chalk.green(req.originalUrl);
  const status = chalk.yellow(res.statusCode);
  const time = chalk.magenta(new Date().toLocaleTimeString());

  console.log(`${chalk.cyan("[REQ]")} ${method} ${url} → ${status} @ ${time}`);

  next();
};
