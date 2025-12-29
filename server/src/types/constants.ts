export enum httpStatus {
  Ok = 200,
  NotFound = 404,
  Unauthorized = 401,
  BadRequest = 400,
  InternalServerError = 500,
}

export type ApiResponse<T> = {
  success: true;
  message?: string;
  data?: T;
};

export type ApiError = {
  success: false;
  error: string;
};
