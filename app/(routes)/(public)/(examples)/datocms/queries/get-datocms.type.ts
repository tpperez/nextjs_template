export interface IDatocmsResponse {
  home: IDatocms
}

export interface IDatocms {
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
