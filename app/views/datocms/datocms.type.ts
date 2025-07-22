import type { IDatocms } from '@/app/(routes)/(public)/(examples)/datocms/queries'

export interface IDatocmsViewProps {
  success?: boolean
  data?: IDatocms
  error?: string
}
