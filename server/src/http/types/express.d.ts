declare namespace Express {
  export interface Request {
    user: {
      userId: string;
      username: string;
    };

    validatedBody: unknown;
    validatedParams: {
      id: string;
    };
    validatedQuery: unknown;
  }
}
