import Image from 'next/image'

import type { ICardSection } from '@/app/(routes)/(public)/(examples)/datocms/queries'

const SectionWithIcons = ({ title, description, items }: ICardSection) => {
  return (
    <section className='mx-auto max-w-6xl'>
      <h2 className='mb-2 text-center text-3xl font-bold text-black'>
        {title}
      </h2>
      <p className='mb-8 text-center text-gray-600'>{description}</p>
      <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3'>
        {items.map((item) => {
          return (
            <div
              key={item.id}
              className='flex flex-col items-center rounded border p-6 text-center shadow-sm transition hover:shadow-md'
            >
              <div className='relative mb-4 h-24 w-24'>
                <Image
                  src={item.image.url}
                  alt={item.title}
                  width={100}
                  height={100}
                  unoptimized
                />
              </div>
              <h3 className='text-lg font-semibold text-black'>{item.title}</h3>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default SectionWithIcons
