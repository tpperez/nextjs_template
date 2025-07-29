import Link from 'next/link'

import getFooterData from './queries'

const Footer = async () => {
  const { success, data, error } = await getFooterData()

  if (!success || !data) {
    console.error('error loading footer data:', error)
    return null
  }

  const { footer } = data

  return (
    <footer className='border-t border-gray-200 bg-gradient-to-r from-gray-100 to-gray-50'>
      <div className='container mx-auto px-4 py-8'>
        <div className='space-y-4 text-center'>
          <div className='flex flex-wrap justify-center gap-4'>
            {footer.footerlinks.map((link) => {
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

          <p className='text-sm text-gray-500'>{footer.copyrighttext}</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
