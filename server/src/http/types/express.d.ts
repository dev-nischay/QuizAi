declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };

    validatedBody: unknown;
    validatedParams: {
      id: string;
    };
    validatedQuery: unknown;
  }
}
