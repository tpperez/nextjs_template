import ViewHome from '@/app/views/home'

import getHomeData from './queries'

const PageHome = async () => {
  const homeData = await getHomeData()

  console.log(homeData)

  return <ViewHome />
}

export default PageHome
