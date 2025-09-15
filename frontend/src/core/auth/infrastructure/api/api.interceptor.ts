import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";
import { API_CONFIG } from "./api.config";

class ApiInterceptor {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_CONFIG.BASE_URL,
      timeout: API_CONFIG.TIMEOUT,
      withCredentials: true,
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    this.api.interceptors.request.use(
      (config) => {
        // attach headers here if needed
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.api.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error: AxiosError) => {
        if (error.response?.status === 401) {
          // optional: clear app state here
          if (window.location.pathname !== "/auth/sign-in") {
            window.location.href = "/auth/sign-in";
          }
        }
        return Promise.reject(error);
      }
    );
  }

  public getInstance(): AxiosInstance {
    return this.api;
  }
}

export const apiInterceptor = new ApiInterceptor();
// NOTE: do NOT export an apiService from here; use ApiService (api.service.ts) everywhere else