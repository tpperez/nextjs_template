import Image from 'next/image'

import type { IContentSection } from '@/app/(routes)/(public)/(examples)/datocms/queries'

const SectionWithContent = ({ title, description, image }: IContentSection) => {
  return (
    <section className='mx-auto max-w-5xl px-4 text-center'>
      <h2 className='mb-4 text-3xl font-bold text-black'>{title}</h2>
      <p className='mb-6 text-gray-600'>{description}</p>

      <div className='relative mx-auto aspect-video max-w-full overflow-hidden rounded-lg'>
        <Image
          src={image.url}
          alt={title}
          fill
          className='object-contain'
          sizes='(max-width: 768px) 100vw, 800px'
          quality={85}
        />
      </div>
    </section>
  )
}

export default SectionWithContent
