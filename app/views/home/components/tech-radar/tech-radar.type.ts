export interface IRadarEntry {
  label: string
  quadrant: number
  ring: number
  moved: number
  active?: boolean
}

export interface IRadarQuadrant {
  name: string
}

export interface IRadarRing {
  name: string
  color: string
}

export interface IRadarColors {
  background: string
  grid: string
  inactive: string
}

export interface IRadarConfig {
  repo_url?: string
  svg_id: string
  width?: number
  height?: number
  scale?: number
  colors?: IRadarColors
  font_family?: string
  title?: string
  quadrants: IRadarQuadrant[]
  rings: IRadarRing[]
  print_layout?: boolean
  links_in_new_tabs?: boolean
  entries: IRadarEntry[]
}

export interface ITechRadarProps {
  config?: IRadarConfig
}
