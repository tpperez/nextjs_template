import Link from 'next/link'

const ComponentPageAbout = () => {
  return (
    <div>
      <ul>
        <li>
          <h1>About</h1>
        </li>
        <li>
          <Link href='/'>Home</Link>
        </li>
        <li>
          <Link href='/nonce-example'>Nonce Example</Link>
        </li>
      </ul>
    </div>
  )
}

export default ComponentPageAbout
