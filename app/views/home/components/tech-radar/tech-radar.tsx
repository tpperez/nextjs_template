'use client'

import { useEffect, useState } from 'react'

import Script from 'next/script'

import { TECH_RADAR_CONFIG } from './tech-radar.const'
import { ID3Library, IRadarConfig, ITechRadarProps } from './tech-radar.type'

declare global {
  interface Window {
    radar_visualization: (config: IRadarConfig) => void
    d3: ID3Library
  }
}

const TechRadar = ({ config = TECH_RADAR_CONFIG }: ITechRadarProps) => {
  const [d3Loaded, setD3Loaded] = useState(false)
  const [radarScriptLoaded, setRadarScriptLoaded] = useState(false)

  const isD3Available = (): boolean => {
    return Boolean(window?.d3)
  }
  const isRadarVisualizationAvailable = (): boolean => {
    return Boolean(window && typeof window.radar_visualization === 'function')
  }
  const areBothScriptsLoaded = (): boolean => {
    return d3Loaded && radarScriptLoaded
  }
  const isWindowAvailable = (): boolean => {
    return typeof window !== 'undefined'
  }
  const areAllDependenciesReady = (): boolean => {
    return (
      isWindowAvailable() &&
      isD3Available() &&
      isRadarVisualizationAvailable() &&
      areBothScriptsLoaded()
    )
  }

  useEffect(() => {
    if (isD3Available()) {
      setD3Loaded(true)
    }
    if (isRadarVisualizationAvailable()) {
      setRadarScriptLoaded(true)
    }
  }, [])

  useEffect(() => {
    const initRadar = () => {
      if (areAllDependenciesReady()) {
        try {
          const svg = window.d3.select(`svg#${config.svg_id}`)
          svg.selectAll('*').remove()

          window.radar_visualization(config)
        } catch (error) {
          console.error('Failed to initialize tech radar:', error)
        }
      }
    }

    if (areBothScriptsLoaded()) {
      const timer = setTimeout(initRadar, 100)
      return () => {
        return clearTimeout(timer)
      }
    }
  }, [config, d3Loaded, radarScriptLoaded])

  const handleD3Load = () => {
    if (isD3Available()) {
      setD3Loaded(true)
    }
  }

  const handleRadarScriptLoad = () => {
    if (isRadarVisualizationAvailable()) {
      setRadarScriptLoaded(true)
    }
  }

  return (
    <div className='h-screen w-full overflow-hidden'>
      <Script
        src='https://d3js.org/d3.v7.min.js'
        strategy='afterInteractive'
        onLoad={handleD3Load}
        onError={(e) => {
          return console.error('Failed to load D3:', e)
        }}
      />
      <Script
        src='/utils/tech-radar.js'
        strategy='afterInteractive'
        onLoad={handleRadarScriptLoad}
        onError={(e) => {
          return console.error('Failed to load tech-radar script:', e)
        }}
      />

      <svg
        id={config.svg_id}
        className='h-full w-full'
      />
    </div>
  )
}

export default TechRadar
