import Image from 'next/image'

import type { IContentSection } from '@/app/(routes)/(public)/(examples)/datocms/queries'

const SectionWithContent = ({ title, description, image }: IContentSection) => {
  return (
    <section className='mx-auto max-w-6xl px-6 py-16'>
      <div className='grid grid-cols-1 items-center gap-12 lg:grid-cols-2'>
        <div className='relative order-2 lg:order-1'>
          <div className='relative mx-auto aspect-video w-full max-w-md'>
            <Image
              src={image.url}
              alt={title}
              fill
              className='object-contain'
              quality={85}
            />
          </div>
        </div>

        <div className='order-1 text-left lg:order-2 lg:pl-8'>
          <h2 className='text-foreground mb-6 text-4xl font-bold leading-tight lg:text-5xl'>
            {title}
          </h2>

          <p className='text-muted-foreground mb-8 text-lg leading-relaxed'>
            {description}
          </p>
        </div>
      </div>
    </section>
  )
}

export default SectionWithContent
