import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { API_CONFIG } from './api.config';
import { storageUtils } from '@/shared/utils/storage.utils';

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
                const token = storageUtils.getAccessToken();
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        this.api.interceptors.response.use(
            (response: AxiosResponse) => response,
            async (error: AxiosError) => {
                const originalRequest = error.config as any;

                if (error.response?.status === 401 && !originalRequest._retry){
                    originalRequest._retry = true;

                    try{
                        const refreshToken = storageUtils.getRefreshToken();
                        if (refreshToken) {
                            const response = await this.api.post('/auth/refresh', {
                                refreshToken,
                              });

                              const { accessToken } = response.data;
                              storageUtils.setAccessToken(accessToken);

                              originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                              return this.api(originalRequest);
                        }
                    }catch (refreshError) {
                        storageUtils.clearTokens();
                        window.location.href = '/auth/login';
                        return Promise.reject(refreshError);
                    }
                }

                return Promise.reject(error);
            }
        );
    }

    public geInstance(): AxiosInstance {
        return this.api;
    }
}

export const apiInterceptor = new ApiInterceptor();