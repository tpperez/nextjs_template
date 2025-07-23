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
              className='flex flex-col items-center text-center'
            >
              <div className='relative mb-8'>
                <div className='bg-yape-teal absolute -left-4 -top-4 h-2 w-2 rounded-full'></div>
                <div className='absolute -right-6 -top-2 h-1.5 w-1.5 rounded-full bg-yellow-400'></div>
                <div className='bg-yape-purple absolute -bottom-3 -left-6 h-1.5 w-1.5 rounded-full'></div>
                <div className='bg-yape-teal absolute -bottom-4 -right-4 h-2 w-2 rounded-full'></div>
                <div className='absolute -right-8 top-6 h-1 w-1 rounded-full bg-yellow-400'></div>
                <div className='bg-yape-purple absolute -left-8 bottom-6 h-1 w-1 rounded-full'></div>

                <div className='bg-yape-light-purple relative flex h-32 w-32 items-center justify-center rounded-full'>
                  <div className='flex h-16 w-16 items-center justify-center overflow-hidden rounded-xl bg-white/20'>
                    <Image
                      src={item.image.url}
                      alt={item.title}
                      fill
                      className='object-contain'
                      quality={85}
                    />
                  </div>
                </div>
              </div>
              <h3 className='text-yape-purple mb-3 text-xl font-bold'>
                {item.title}
              </h3>
              <p className='text-muted-foreground text-base leading-relaxed'>
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
