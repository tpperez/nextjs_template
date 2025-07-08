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
  nonce?: string
}

export interface ID3Selection {
  selectAll: (selector: string) => ID3Selection
  remove: () => ID3Selection
}

export interface ID3Symbol {
  type: (symbolType: unknown) => ID3Symbol
  size: (size: number) => ID3Symbol
}

export interface ID3Force {
  radius: (radius: number) => ID3Force
}

export interface ID3Simulation {
  nodes: (nodes: unknown[]) => ID3Simulation
  force: (name: string, force: ID3Force) => ID3Simulation
  on: (event: string, callback: () => void) => ID3Simulation
}

export interface ID3Library {
  select: (selector: string) => ID3Selection
  symbol: () => ID3Symbol
  symbolStar: unknown
  forceSimulation: () => ID3Simulation
  forceCollide: () => ID3Force
}
