import axios, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';

interface IRequestOptions<D> {
    data?: D
}

type THttpVerb = 'GET' | 'POST' | 'PUT' | 'DELETE';

class ApiService {

    constructor(private baseUrl: string) { };

    get<T = any>(url: string) {
        return this.request<T>('GET', url);
    }

    post<T, D = any>(url: string, data: D) {
        return this.request<T>('POST', url, { data });
    }

    put<T, D = any>(url: string, data: D) {
        return this.request<T>('PUT', url, { data });
    }

    delete<T, D = any>(url: string, data: D) {
        return this.request<T>('DELETE', url, { data });
    }

    request<T, D = any>(method: THttpVerb, url: string, options: IRequestOptions<D> = {}) {
        const headers: AxiosRequestHeaders = {}

        const axiosConfig: AxiosRequestConfig = {
            ...options,
            method,
            baseURL: this.baseUrl,
            url,
            headers
        };

        return axios.request<T>(axiosConfig);
    }
}

export const apiService = new ApiService(`http://localhost:3333`);
