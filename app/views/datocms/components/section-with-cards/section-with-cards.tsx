import Image from 'next/image'

import type { ICardSection } from '@/app/(routes)/(public)/(examples)/datocms/queries'

const SectionWithCards = ({ title, description, items }: ICardSection) => {
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
              className='rounded border p-4 shadow-sm transition hover:shadow-md'
            >
              <div className='relative aspect-[4/3] w-full overflow-hidden rounded'>
                <Image
                  src={item.image.url}
                  alt={item.title}
                  fill
                  className='object-cover'
                  sizes='(max-width: 768px) 100vw, 400px'
                  quality={85}
                />
              </div>
              <h3 className='mb-2 text-xl font-semibold text-black'>
                {item.title}
              </h3>
              <p className='text-gray-600'>{item.description}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default SectionWithCards
