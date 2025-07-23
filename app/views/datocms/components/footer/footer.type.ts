export interface IFooterProps {
  data: IFooter
}

export interface IFooter {
  copyrighttext: string
  footerlinks: IFooterLink[]
}

export interface IFooterLink {
  id: string
  label: string
  url: string
}
