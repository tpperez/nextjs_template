'use client'

import { useEffect } from 'react'

import Script from 'next/script'

import { TECH_RADAR_CONFIG } from './tech-radar.const'
import { RadarConfig, TechRadarProps } from './tech-radar.type'

declare global {
  interface Window {
    radar_visualization: (config: RadarConfig) => void
  }
}

const TechRadar = ({ config = TECH_RADAR_CONFIG }: TechRadarProps) => {
  useEffect(() => {
    const initRadar = () => {
      if (typeof window !== 'undefined' && window.radar_visualization) {
        window.radar_visualization(config)
      }
    }

    const timer = setTimeout(initRadar, 100)
    return () => {
      return clearTimeout(timer)
    }
  }, [config])

  return (
    <div className='h-screen w-full overflow-hidden'>
      <Script
        src='https://d3js.org/d3.v7.min.js'
        strategy='beforeInteractive'
      />
      <Script
        src='/utils/tech-radar.js'
        strategy='afterInteractive'
      />

      <svg
        id={config.svg_id}
        className='h-full w-full'
      />
    </div>
  )
}

export default TechRadar
