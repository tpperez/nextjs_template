import {
  resolveBaseUrl,
  buildUrl,
  HTTP_ADAPTER_CONFIG,
  type RestHttpAdapter,
} from '../core'
import type { RestRequestOptions, RestResponse } from './rest.type'

class RestClient {
  private adapter: RestHttpAdapter

  constructor() {
    const adapterFactory = HTTP_ADAPTER_CONFIG.restAdapter
    this.adapter = adapterFactory()
  }

  async request<TResponse, TBody = unknown>(
    path: string,
    options: RestRequestOptions<TBody> = {},
  ): Promise<RestResponse<TResponse>> {
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
    options?: Omit<RestRequestOptions, 'method' | 'body'>,
  ) {
    return this.request<TResponse>(path, { ...options, method: 'GET' })
  }

  post<TResponse, TBody = unknown>(
    path: string,
    body?: TBody,
    options?: Omit<RestRequestOptions<TBody>, 'method' | 'body'>,
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
    options?: Omit<RestRequestOptions<TBody>, 'method' | 'body'>,
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
    options?: Omit<RestRequestOptions<TBody>, 'method' | 'body'>,
  ) {
    return this.request<TResponse, TBody>(path, {
      ...options,
      method: 'PATCH',
      body,
    })
  }

  delete<TResponse>(
    path: string,
    options?: Omit<RestRequestOptions, 'method' | 'body'>,
  ) {
    return this.request<TResponse>(path, { ...options, method: 'DELETE' })
  }
}

export const restClient = new RestClient()
