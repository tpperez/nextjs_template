const LayoutDatocms = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100'>
      <main className='flex-1'>{children}</main>
    </div>
  )
}

export default LayoutDatocms
