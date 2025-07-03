import type { ICoreRequestOptions } from '../core'

export interface IRestRequestOptions<TBody = unknown>
  extends ICoreRequestOptions {
  body?: TBody
}

export type TRestResponse<T> = T
