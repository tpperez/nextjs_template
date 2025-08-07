import DatoHeader from '@/app/components/structure/dato-header'

import getHeaderData from './queries'

const Header = async () => {
  const { success, data, error } = await getHeaderData()

  if (!success || !data) {
    console.error('error loading header data:', error)
    return null
  }

  const { header } = data

  return <DatoHeader data={header} />
}

export default Header
