import { headers } from 'next/headers'
import Link from 'next/link'
import Script from 'next/script'

const ComponentPageNonceExample = async () => {
  const nonce = (await headers()).get('x-nonce') ?? undefined

  return (
    <>
      <Script
        src='https://www.googletagmanager.com/gtag/js'
        strategy='afterInteractive'
        nonce={nonce}
      />

      <Script src='https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js' />

      <div>
        <ul>
          <li>
            <h1>Nonce Example</h1>
          </li>
          <li>
            <Link href='/'>Home</Link>
          </li>
          <li>
            <Link href='/about'>About</Link>
          </li>
        </ul>
      </div>

      <div>
        <p>
          Nonce: <span className='text-red-700'>{nonce}</span>
        </p>
      </div>
    </>
  )
}

export default ComponentPageNonceExample
