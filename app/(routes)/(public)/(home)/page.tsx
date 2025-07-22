import { Metadata } from 'next'

import ViewHome from '@/app/views/home'

export const metadata: Metadata = {
  title: 'Home',
  description: 'This is home',
}

const PageHome = () => {
  return <ViewHome />
}

export default PageHome
