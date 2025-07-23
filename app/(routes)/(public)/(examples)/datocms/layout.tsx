import FooterContainer from '@/app/views/datocms/components/footer'
import HeaderContainer from '@/app/views/datocms/components/header'

const LayoutDatocms = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <HeaderContainer />
      <main className='flex-1'>{children}</main>
      <FooterContainer />
    </>
  )
}

export default LayoutDatocms
