import { relative } from 'path'

const buildFormatCommand = (filenames) => {
  return `prettier --write ${filenames
    .map((f) => {
      return relative(process.cwd(), f)
    })
    .join(' --file ')}`
}

const buildLintCommand = (filenames) => {
  return `next lint --fix --no-cache --file ${filenames
    .map((f) => {
      return relative(process.cwd(), f)
    })
    .join(' --file ')}`
}

const lintStagedConfig = {
  '*.{js,jsx,ts,tsx}': [buildFormatCommand, buildLintCommand],
}

export default lintStagedConfig
