import { Roboto } from 'next/font/google'

import type { Metadata } from 'next'

import { HttpProvider } from './services/http'

import '@/app/styles/globals.css'

export type TRootLayout = Readonly<{
  children: React.ReactNode
}>

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  variable: '--font-roboto',
})

export const metadata: Metadata = {
  title: {
    template: '%s | Next.js Base Template',
    default: 'Next.js Base Template',
  },
  description: 'Here you can find our defitions and examples.',
}

const LayoutRoot = ({ children }: TRootLayout) => {
  return (
    <html lang='es-PE'>
      <body
        className={`${roboto.variable} font-roboto antialiased`}
        suppressHydrationWarning={true}
      >
        <HttpProvider>{children}</HttpProvider>
      </body>
    </html>
  )
}

export default LayoutRoot
