const Footer = () => {
  return (
    <footer className='border-t border-gray-200 bg-gradient-to-r from-gray-100 to-gray-50'>
      <div className='container mx-auto px-4 py-8'>
        <div className='text-center'>
          <p className='text-gray-500'>{new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
