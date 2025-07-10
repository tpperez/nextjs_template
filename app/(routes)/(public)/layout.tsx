import Footer from '@/app/components/structure/footer'
import Header from '@/app/components/structure/header'

const LayoutPublic = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className='flex min-h-screen flex-col'>
      <Header />
      <main className='flex-1'>{children}</main>
      <Footer />
    </section>
  )
}

export default LayoutPublic
