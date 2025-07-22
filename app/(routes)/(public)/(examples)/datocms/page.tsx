import type { Metadata } from 'next'

import ViewDatocms from '@/app/views/datocms'

import getDatocmsData from './queries'

export const metadata: Metadata = {
  title: 'Datocms',
  description: 'Data from datocms',
}

const PageDatocms = async () => {
  const datocmsData = await getDatocmsData()

  return <ViewDatocms {...datocmsData} />
}

export default PageDatocms
