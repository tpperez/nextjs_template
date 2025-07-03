import {
  buildUrl,
  HTTP_ADAPTER_CONFIG,
  type IRestHttpAdapter,
  resolveBaseUrl,
} from '../core'

import type { IRestRequestOptions, TRestResponse } from './rest.type'

class RestClient {
  private adapter: IRestHttpAdapter

  constructor() {
    const adapterFactory = HTTP_ADAPTER_CONFIG.restAdapter
    this.adapter = adapterFactory()
  }

  async request<TResponse, TBody = unknown>(
    path: string,
    options: IRestRequestOptions<TBody> = {},
  ): Promise<TRestResponse<TResponse>> {
    const {
      method = 'GET',
      body,
      headers,
      baseUrl,
      timeout,
      tags = [],
      revalidate,
      ...restOptions
    } = options

    const finalBaseUrl = resolveBaseUrl(baseUrl)
    const url = buildUrl(finalBaseUrl, path)

    return this.adapter.request<TResponse>(url, {
      method,
      body,
      headers,
      baseUrl,
      timeout,
      tags,
      revalidate,
      ...restOptions,
    })
  }

  get<TResponse>(
    path: string,
    options?: Omit<IRestRequestOptions, 'method' | 'body'>,
  ) {
    return this.request<TResponse>(path, { ...options, method: 'GET' })
  }

  post<TResponse, TBody = unknown>(
    path: string,
    body?: TBody,
    options?: Omit<IRestRequestOptions<TBody>, 'method' | 'body'>,
  ) {
    return this.request<TResponse, TBody>(path, {
      ...options,
      method: 'POST',
      body,
    })
  }

  put<TResponse, TBody = unknown>(
    path: string,
    body?: TBody,
    options?: Omit<IRestRequestOptions<TBody>, 'method' | 'body'>,
  ) {
    return this.request<TResponse, TBody>(path, {
      ...options,
      method: 'PUT',
      body,
    })
  }

  patch<TResponse, TBody = unknown>(
    path: string,
    body?: TBody,
    options?: Omit<IRestRequestOptions<TBody>, 'method' | 'body'>,
  ) {
    return this.request<TResponse, TBody>(path, {
      ...options,
      method: 'PATCH',
      body,
    })
  }

  delete<TResponse>(
    path: string,
    options?: Omit<IRestRequestOptions, 'method' | 'body'>,
  ) {
    return this.request<TResponse>(path, { ...options, method: 'DELETE' })
  }
}

export const restClient = new RestClient()
