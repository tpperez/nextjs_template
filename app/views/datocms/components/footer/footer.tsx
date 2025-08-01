import DatoFooter from '@/app/components/structure/dato-footer'

import getFooterData from './queries'

const Footer = async () => {
  const { success, data, error } = await getFooterData()

  if (!success || !data) {
    console.error('error loading footer data:', error)
    return null
  }

  const { footer } = data

  return <DatoFooter data={footer} />
}

export default Footer
