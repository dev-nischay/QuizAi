declare namespace Express {
  export interface Request {
    user: {
      id: string;
      role: "user" | "admin";
    };

    validatedBody: unknown;
    validatedParams: {
      id: string;
    };
    validatedQuery: unkown;
  }
}
