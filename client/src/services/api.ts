import axios from "axios";
const baseUrl = import.meta.env.VITE_API_URL;

if (!baseUrl) {
  console.log("url not found");
}

export type ApiError<T> = {
  success: false;
  error: string;
  fieldErrors?: T;
};

export type ApiResponse<T> = {
  success: true;
  message?: string;
  data?: T;
};

export const api = axios.create({
  baseURL: baseUrl,
  timeout: 5000,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    if (token && String(token).length > 0) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status: number = error.response?.status;
    const errorBody = error.response?.data;

    switch (status) {
      case 400:
        if (errorBody) {
          return Promise.reject(errorBody); // send this to frontend validator
        } else {
          // since no fieldError
          // display the error Modal
        }
        break;

      case 401:
        // can display modal with unauthorized error
        console.log("Unauthorized");
        localStorage.removeItem("acessToken");
        window.location.href = "/login";
        break;

      case 409:
        // will occurs when user data is in correct format but  theris an issue with the behaviour
        if (errorBody) {
          return Promise.reject(errorBody);
        } else {
          // display error modal
        }
        break;
      case 404:
        // display the 404 page
        break;
      case 500:
        // display the 500 something went wrong try again later page
        break;

      default:
        // this will run if nothing is responsed basically backend is down
        return Promise.reject(error);
    }
  },
);
