'use client'

import { useCallback, useEffect, useState } from 'react'

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
  const areBothScriptsLoaded = useCallback((): boolean => {
    return d3Loaded && radarScriptLoaded
  }, [d3Loaded, radarScriptLoaded])

  const isWindowAvailable = (): boolean => {
    return typeof window !== 'undefined'
  }

  const areAllDependenciesReady = useCallback((): boolean => {
    return (
      isWindowAvailable() &&
      isD3Available() &&
      isRadarVisualizationAvailable() &&
      areBothScriptsLoaded()
    )
  }, [areBothScriptsLoaded])

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
  }, [
    config,
    d3Loaded,
    radarScriptLoaded,
    areAllDependenciesReady,
    areBothScriptsLoaded,
  ])

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
    <div className='flex min-h-screen w-full items-center justify-center overflow-hidden'>
      <Script
        src='https://d3js.org/d3.v7.min.js'
        strategy='afterInteractive'
        onLoad={handleD3Load}
        onError={(e) => {
          return console.error('Failed to load D3:', e)
        }}
      />
      <Script
        src='/js/tech-radar.js'
        strategy='afterInteractive'
        onLoad={handleRadarScriptLoad}
        onError={(e) => {
          return console.error('Failed to load tech-radar script:', e)
        }}
      />

      <svg
        id={config.svg_id}
        viewBox={`0 0 ${config.width || 1450} ${config.height || 1000}`}
        className='max-h-full max-w-full'
        preserveAspectRatio='xMidYMid meet'
      />
    </div>
  )
}

export default TechRadar
