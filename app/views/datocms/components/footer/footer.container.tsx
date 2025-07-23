import Footer from '../footer/footer'
import getFooterData from '../footer/queries'

const FooterContainer = async () => {
  const { success, data, error } = await getFooterData()

  if (!success || !data) {
    console.error('error loading footer data:', error)
    return null
  }

  const { footer } = data

  return <Footer data={footer} />
}

export default FooterContainer
