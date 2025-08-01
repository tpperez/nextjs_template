export interface IDatoFooterProps {
  data: IDatoFooter
}

export interface IDatoFooter {
  copyrighttext: string
  footerlinks: IDatoFooterLink[]
}

export interface IDatoFooterLink {
  id: string
  label: string
  url: string
}
