import type { CoreRequestOptions } from '../core'

export interface RestRequestOptions<TBody = unknown>
  extends CoreRequestOptions {
  body?: TBody
}

export type RestResponse<T> = T
