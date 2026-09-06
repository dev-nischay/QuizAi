declare namespace Express {
  export interface Request {
    user: {
      userId: string;
      username: string;
    };

    name: "nischay";

    validatedBody: unknown;
    validatedParams: {
      id: string;
    };
    validatedQuery: unknown;
  }
}
