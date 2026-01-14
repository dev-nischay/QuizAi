declare namespace Express {
  export interface Request {
    user: {
      userId: string;
    };

    validatedBody: unknown;
    validatedParams: {
      id: string;
    };
    validatedQuery: unknown;
  }
}
