export interface RadarEntry {
  label: string
  quadrant: number
  ring: number
  moved: number
  active?: boolean
}

export interface RadarQuadrant {
  name: string
}

export interface RadarRing {
  name: string
  color: string
}

export interface RadarColors {
  background: string
  grid: string
  inactive: string
}

export interface RadarConfig {
  repo_url?: string
  svg_id: string
  width?: number
  height?: number
  scale?: number
  colors?: RadarColors
  font_family?: string
  title?: string
  quadrants: RadarQuadrant[]
  rings: RadarRing[]
  print_layout?: boolean
  links_in_new_tabs?: boolean
  entries: RadarEntry[]
}

export interface TechRadarProps {
  config?: RadarConfig
}
