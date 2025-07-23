import type { IDatocmsResponse } from '@/app/(routes)/(public)/(examples)/datocms/queries'

export interface IDatocmsViewProps {
  success?: boolean
  data?: IDatocmsResponse
  error?: string
}
