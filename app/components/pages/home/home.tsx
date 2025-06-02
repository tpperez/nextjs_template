import Link from 'next/link'

const ComponentPageHome = () => {
  return (
    <div>
      <ul>
        <li>
          <h1>Home</h1>
        </li>
        <li>
          <Link href='/about'>About</Link>
        </li>
        <li>
          <Link href='/nonce-example'>Nonce Example</Link>
        </li>
      </ul>
    </div>
  )
}

export default ComponentPageHome
