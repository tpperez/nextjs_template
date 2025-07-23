import Header from '../header/header'
import getHeaderData from '../header/queries'

const HeaderContainer = async () => {
  const { success, data, error } = await getHeaderData()

  if (!success || !data) {
    console.error('error loading header data:', error)
    return null
  }

  const { header } = data

  return <Header data={header} />
}

export default HeaderContainer
