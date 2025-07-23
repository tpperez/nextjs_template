export interface IHeaderProps {
  data: IHeader
}

export interface IHeader {
  logo: {
    alt: string
    url: string
    title: string
  }
  menulinks: IMenuLink[]
}

export interface IMenuLink {
  id: string
  label: string
  url: string
}
