import type ILayout from '@/app/types/layout'
import isDev from '@/app/utils/is-dev'
import { DevTokenSetter, NativeTokenGate } from '@/app/utils/native/components'
import NativeBridgeProvider from '@/app/utils/native/providers'

const LayoutPublic = ({ children }: ILayout) => {
  return (
    <>
      <NativeBridgeProvider />
      {isDev() && <DevTokenSetter />}
      <NativeTokenGate>
        <section className='flex min-h-screen flex-col'>{children}</section>
      </NativeTokenGate>
    </>
  )
}

export default LayoutPublic
