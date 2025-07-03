import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios'

import { IHttpRequestConfig, IRestHttpAdapter } from '../../core'

export class AxiosRestAdapter implements IRestHttpAdapter {
  readonly name = 'axios-rest'
  private axiosInstance: AxiosInstance

  constructor() {
    this.axiosInstance = axios.create({
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  async request<TResponse>(
    url: string,
    config: IHttpRequestConfig,
  ): Promise<TResponse> {
    const { method, body, headers, timeout, signal, ...restOptions } = config

    const axiosConfig: AxiosRequestConfig = {
      method,
      url,
      data: body,
      headers: headers
        ? headers instanceof Headers
          ? Object.fromEntries(headers.entries())
          : Array.isArray(headers)
            ? Object.fromEntries(headers)
            : headers
        : undefined,
      timeout,
      signal,
      ...restOptions,
    }

    const response = await this.axiosInstance.request<TResponse>(axiosConfig)
    return response.data
  }
}
