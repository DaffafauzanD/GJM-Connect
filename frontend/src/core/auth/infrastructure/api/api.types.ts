export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface RequestConfig {
    method: HttpMethod;
    url: string;
    data?: any;
    params?: Record<string, any>;
    headers?: Record<string, string>;
    timeout?: number;
    withCredentials?: boolean;
}

export interface ApiRequestConfig extends Omit<RequestConfig, 'url'> {
    endpoint: string;
    requiresAuth?: boolean;
    retryOnError?: boolean;
  }
  
  export interface UploadConfig {
    file: File;
    onProgress?: (progress: number) => void;
    onSuccess?: (response: any) => void;
    onError?: (error: any) => void;
  }