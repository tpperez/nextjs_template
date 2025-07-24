import type ILayout from '@/app/types/layout'
import isDev from '@/app/utils/is-dev'
import { DevTokenSetter } from '@/app/utils/native/dev-token-setter'
import { NativeBridgeProvider } from '@/app/utils/native/native-bridge-provider'
import { NativeTokenGate } from '@/app/utils/native/native-token-gate'

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
