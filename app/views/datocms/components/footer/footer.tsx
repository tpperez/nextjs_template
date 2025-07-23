import Link from 'next/link'

import type { IFooterProps } from './footer.type'

const Footer = ({ data }: IFooterProps) => {
  return (
    <footer className='border-t border-gray-200 bg-gradient-to-r from-gray-100 to-gray-50'>
      <div className='container mx-auto px-4 py-8'>
        <div className='space-y-4 text-center'>
          <div className='flex flex-wrap justify-center gap-4'>
            {data.footerlinks.map((link) => {
              return (
                <Link
                  key={link.id}
                  href={link.url}
                  className='text-sm text-blue-600 hover:underline'
                >
                  {link.label}
                </Link>
              )
            })}
          </div>

          <p className='text-sm text-gray-500'>{data.copyrighttext}</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
