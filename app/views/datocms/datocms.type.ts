import type {
  IDatocmsResponse,
  IFooter,
  IHeader,
} from '@/app/(routes)/(public)/(examples)/datocms/queries'

export interface IDatocmsViewProps {
  success?: boolean
  data?: IDatocmsResponse
  error?: string
}

export interface IHeaderProps {
  data: IHeader
}

export interface IFooterProps {
  data: IFooter
}
