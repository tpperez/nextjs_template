'use client'

import { useEffect } from 'react'
import Script from 'next/script'
import { RadarConfig } from './tech-radar.type'

declare global {
  interface Window {
    radar_visualization: (config: RadarConfig) => void
  }
}

const ViewTechRadar = () => {
  useEffect(() => {
    const initRadar = () => {
      if (typeof window !== 'undefined' && window.radar_visualization) {
        window.radar_visualization({
          repo_url: 'https://github.com/zalando/tech-radar',
          svg_id: 'radar',
          width: 1450,
          height: 1000,
          scale: 1.0,
          colors: {
            background: '#fff',
            grid: '#bbb',
            inactive: '#ddd',
          },
          font_family: 'Arial, Helvetica',
          title: 'My Tech Radar',
          quadrants: [
            { name: 'Languages & Frameworks' }, // Bottom Right (0)
            { name: 'Data & APIs' }, // Bottom Left (1)
            { name: 'Testing & Quality' }, // Top Left (2)
            { name: 'Tools & Infrastructure' }, // Top Right (3)
          ],
          rings: [
            { name: 'ADOPT', color: '#5ba300' },
            { name: 'TRIAL', color: '#009eb0' },
            { name: 'ASSESS', color: '#c7ba00' },
            { name: 'HOLD', color: '#e09b96' },
          ],
          print_layout: true,
          links_in_new_tabs: true,
          entries: [
            // Quadrant 0 (Bottom Right) - Languages & Core Frameworks
            {
              label: 'React',
              quadrant: 0,
              ring: 0, // ADOPT
              moved: 0,
            },
            {
              label: 'Next.js',
              quadrant: 0,
              ring: 0, // ADOPT
              moved: 1,
            },
            {
              label: 'TypeScript',
              quadrant: 0,
              ring: 0, // ADOPT
              moved: 0,
            },
            {
              label: 'JavaScript',
              quadrant: 0,
              ring: 0, // ADOPT
              moved: 0,
            },

            // Quadrant 1 (Bottom Left) - Data & API Technologies
            {
              label: 'GraphQL',
              quadrant: 1,
              ring: 1, // TRIAL
              moved: 1,
            },
            {
              label: 'GraphQL Request',
              quadrant: 1,
              ring: 1, // TRIAL
              moved: 0,
            },
            {
              label: 'Axios',
              quadrant: 1,
              ring: 0, // ADOPT
              moved: 0,
            },
            {
              label: 'React Query',
              quadrant: 1,
              ring: 0, // ADOPT
              moved: 1,
            },
            {
              label: 'Zustand',
              quadrant: 1,
              ring: 1, // TRIAL
              moved: 1,
            },

            // Quadrant 2 (Top Left) - Testing & Quality Assurance
            {
              label: 'Jest',
              quadrant: 2,
              ring: 0, // ADOPT
              moved: 0,
            },
            {
              label: 'React Testing Library',
              quadrant: 2,
              ring: 0, // ADOPT
              moved: 0,
            },
            {
              label: 'ESLint',
              quadrant: 2,
              ring: 0, // ADOPT
              moved: 0,
            },
            {
              label: 'Prettier',
              quadrant: 2,
              ring: 0, // ADOPT
              moved: 0,
            },
            {
              label: 'Commitlint',
              quadrant: 2,
              ring: 1, // TRIAL
              moved: 0,
            },
            {
              label: 'Husky',
              quadrant: 2,
              ring: 1, // TRIAL
              moved: 0,
            },
            {
              label: 'Lint-staged',
              quadrant: 2,
              ring: 1, // TRIAL
              moved: 0,
            },

            // Quadrant 3 (Top Right) - Tools & Infrastructure
            {
              label: 'Tailwind CSS',
              quadrant: 3,
              ring: 0, // ADOPT
              moved: 1,
            },
            {
              label: 'PostCSS',
              quadrant: 3,
              ring: 0, // ADOPT
              moved: 0,
            },
            {
              label: 'Node.js',
              quadrant: 3,
              ring: 0, // ADOPT
              moved: 0,
            },
            {
              label: 'npm',
              quadrant: 3,
              ring: 0, // ADOPT
              moved: 0,
            },
            {
              label: 'Turbopack',
              quadrant: 3,
              ring: 1, // TRIAL
              moved: 2, // NEW
            },
            {
              label: 'JSX A11y',
              quadrant: 3,
              ring: 1, // TRIAL
              moved: 0,
            },
            {
              label: 'Conventional Changelog',
              quadrant: 3,
              ring: 2, // ASSESS
              moved: 0,
            },
          ],
        })
      }
    }

    const timer = setTimeout(initRadar, 100)
    return () => {
      return clearTimeout(timer)
    }
  }, [])

  return (
    <div style={{ width: '100%', height: '100vh', overflow: 'hidden' }}>
      <Script
        src='https://d3js.org/d3.v7.min.js'
        strategy='beforeInteractive'
      />
      <Script
        src='/utils/tech-radar.js'
        strategy='afterInteractive'
      />

      <svg
        id='radar'
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  )
}

export default ViewTechRadar
