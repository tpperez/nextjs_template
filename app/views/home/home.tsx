import { headers } from 'next/headers'

import TechRadar from './components/tech-radar'

const ViewHome = async () => {
  const nonce = (await headers()).get('x-nonce') ?? undefined

  return <TechRadar nonce={nonce} />
}

export default ViewHome
