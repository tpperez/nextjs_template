import Header from '@/app/views/datocms/components/footer'
import Footer from '@/app/views/datocms/components/header'

const LayoutDatocms = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main className='flex-1'>{children}</main>
      <Footer />
    </>
  )
}

export default LayoutDatocms
