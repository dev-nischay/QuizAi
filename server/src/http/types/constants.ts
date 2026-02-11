export type ApiResponse<T> = {
  success: true;
  message?: string;
  data?: T;
};

export type ApiError = {
  success: false;
  error: string;
  fieldErrors?: {};
};
