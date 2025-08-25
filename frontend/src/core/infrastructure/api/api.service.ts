import { AxiosInstance } from "axios";
import { apiInterceptor } from "./api.interceptor";
import { ApiRequestConfig, UploadConfig } from "./api.types";
import { ApiResponse, ApiError } from "@/core/domain/entities";

export class ApiService {
    private api: AxiosInstance;

    constructor() {
        this.api = apiInterceptor.geInstance();
    }

    async get<T = any>(endpoint: string, config?: Partial<ApiRequestConfig>): Promise<ApiResponse<T>> {
        try {
            const response = await this.api.get(endpoint, config);
            return response.data;
          } catch (error) {
            throw this.handleError(error);
          }
    }

    async post<T = any>(endpoint: string, data?: any, config?: Partial<ApiRequestConfig>): Promise<ApiResponse<T>> {
        try {
          const response = await this.api.post(endpoint, data, config);
          return response.data;
        } catch (error) {
          throw this.handleError(error);
        }
      }
    
      async put<T = any>(endpoint: string, data?: any, config?: Partial<ApiRequestConfig>): Promise<ApiResponse<T>> {
        try {
          const response = await this.api.put(endpoint, data, config);
          return response.data;
        } catch (error) {
          throw this.handleError(error);
        }
      }
    
      async delete<T = any>(endpoint: string, config?: Partial<ApiRequestConfig>): Promise<ApiResponse<T>> {
        try {
          const response = await this.api.delete(endpoint, config);
          return response.data;
        } catch (error) {
          throw this.handleError(error);
        }
      }
    
      async upload<T = any>(endpoint: string, config: UploadConfig): Promise<ApiResponse<T>> {
        const formData = new FormData();
        formData.append('file', config.file);
    
        try {
          const response = await this.api.post(endpoint, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            onUploadProgress: (progressEvent) => {
              if (config.onProgress && progressEvent.total) {
                const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                config.onProgress(progress);
              }
            },
          });
    
          if (config.onSuccess) {
            config.onSuccess(response.data);
          }
    
          return response.data;
        } catch (error) {
          if (config.onError) {
            config.onError(error);
          }
          throw this.handleError(error);
        }
      }
    
      async download(endpoint: string, filename?: string): Promise<void> {
        try {
          const response = await this.api.get(endpoint, {
            responseType: 'blob',
          });
    
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', filename || 'download');
          document.body.appendChild(link);
          link.click();
          link.remove();
          window.URL.revokeObjectURL(url);
        } catch (error) {
          throw this.handleError(error);
        }
      }

    private handleError(error: any): ApiError {
        if (error.response) {
          return {
            message: error.response.data?.message || 'An error occurred',
            code: error.response.data?.code || 'UNKNOWN_ERROR',
            status: error.response.status,
            details: error.response.data,
          };
        }
    
        if (error.request) {
          return {
            message: 'Network error. Please check your connection.',
            code: 'NETWORK_ERROR',
            status: 0,
          };
        }
    
        return {
          message: error.message || 'An unexpected error occurred',
          code: 'UNKNOWN_ERROR',
          status: 0,
        };
      }
}

export const apiService = new ApiService();