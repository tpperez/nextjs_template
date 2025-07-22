export interface IHomeResponse {
  header: IHeader
  home: IHome
  footer: IFooter
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

export interface IHome {
  sectionone: ICardSection
  sectiontwo: IContentSection
  sectionthree: ICardSection
}

export interface ICardSection {
  title: string
  description: string
  items: ICardItem[]
}

export interface ICardItem {
  id: string
  title: string
  description: string
  image: {
    url: string
  }
}

export interface IContentSection {
  title: string
  description: string
  image: {
    url: string
  }
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
