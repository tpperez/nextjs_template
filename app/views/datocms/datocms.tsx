import SectionWithCards from './components/section-with-cards'
import SectionWithContent from './components/section-with-content'
import SectionWithIcons from './components/section-with-icons'
import type { IDatocmsViewProps } from './datocms.type'

const ViewDatocms = ({ success, data, error }: IDatocmsViewProps) => {
  if (!success || !data) {
    return (
      <section className='py-12 text-center'>
        <h2 className='text-xl font-semibold text-red-600'>
          Error al cargar el contenido
        </h2>
        <p>{error || 'Tente novamente mais tarde.'}</p>
      </section>
    )
  }

  const { sectionone, sectiontwo, sectionthree } = data.home

  return (
    <>
      <SectionWithContent {...sectiontwo} />

      <SectionWithCards
        title={sectionone.title}
        description={sectionone.description}
        items={sectionone.items}
      />

      <SectionWithIcons
        title={sectionthree.title}
        description={sectionthree.description}
        items={sectionthree.items}
      />
    </>
  )
}

export default ViewDatocms
