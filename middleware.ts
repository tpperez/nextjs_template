import { NextRequest, NextResponse } from 'next/server'

const isDev = process.env.NODE_ENV === 'development'

export const middleware = (request: NextRequest) => {
  if (!isDev) {
    const nonce = Buffer.from(crypto.randomUUID()).toString('base64')
    const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic';
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: https://raw.githubusercontent.com https://graphql-pokeapi.graphcdn.app https://pokeapi.co https://www.datocms-assets.com;
    font-src 'self' data:;
    connect-src 'self' https://api.open-meteo.com https://graphqlpokemon.favware.tech https://graphql-pokeapi.graphcdn.app https://pokeapi.co;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-src 'self' js2ios:;
    frame-ancestors 'none';
    upgrade-insecure-requests;
  `

    const contentSecurityPolicyHeaderValue = cspHeader
      .replace(/\s{2,}/g, ' ')
      .trim()

    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-nonce', nonce)
    requestHeaders.set(
      'Content-Security-Policy',
      contentSecurityPolicyHeaderValue,
    )

    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })

    response.headers.set(
      'Content-Security-Policy',
      contentSecurityPolicyHeaderValue,
    )

    return response
  }
}

export const config = {
  matcher: [
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
}
