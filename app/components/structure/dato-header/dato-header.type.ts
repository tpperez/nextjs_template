export interface IDatoHeaderProps {
  data: IDatoHeader
}

export interface IDatoHeader {
  logo: {
    alt: string
    url: string
    title: string
  }
  menulinks: IDatoMenuLink[]
}

export interface IDatoMenuLink {
  id: string
  label: string
  url: string
}
