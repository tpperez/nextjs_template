import Image from 'next/image'

import type { ICardSection } from '@/app/(routes)/(public)/(examples)/datocms/queries'

const SectionWithIcons = ({ title, description, items }: ICardSection) => {
  return (
    <section className='mx-auto max-w-6xl px-6 py-12'>
      <h2 className='text-foreground mb-4 text-center text-4xl font-bold'>
        {title}
      </h2>
      <p className='text-muted-foreground mx-auto mb-12 max-w-4xl text-center text-lg'>
        {description}
      </p>
      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {items.map((item) => {
          return (
            <div
              key={item.id}
              className='border-border bg-card flex items-center gap-4 rounded-2xl border p-6 transition-all hover:scale-105 hover:shadow-lg'
            >
              <div className='relative h-12 w-12 overflow-hidden rounded-xl'>
                <Image
                  src={item.image.url}
                  alt={item.title}
                  fill
                  className='object-contain'
                  unoptimized
                />
              </div>
              <h3 className='text-card-foreground text-lg font-semibold'>
                {item.title}
              </h3>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default SectionWithIcons
