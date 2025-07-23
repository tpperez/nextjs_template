import Image from 'next/image'

import type { ICardSection } from '@/app/(routes)/(public)/(examples)/datocms/queries'

const SectionWithCards = ({ title, description, items }: ICardSection) => {
  return (
    <section className='mx-auto max-w-6xl px-6 py-16'>
      <h2 className='text-foreground mb-4 text-center text-4xl font-bold'>
        {title}
      </h2>
      <p className='text-muted-foreground mx-auto mb-16 max-w-4xl text-center text-lg'>
        {description}
      </p>
      <div className='grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3'>
        {items.map((item) => {
          return (
            <div
              key={item.id}
              className='flex flex-col items-center gap-2 rounded-lg border p-4 text-center'
            >
              <div className='flex w-full items-center justify-center'>
                <Image
                  src={item.image.url}
                  alt={item.title}
                  width={128}
                  height={128}
                  className='object-contain'
                  quality={85}
                />
              </div>
              <h3 className='flex w-full items-center justify-center text-xl font-bold'>
                {item.title}
              </h3>
              <p className='flex w-full items-center justify-center text-base leading-relaxed'>
                {item.description}
              </p>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default SectionWithCards
