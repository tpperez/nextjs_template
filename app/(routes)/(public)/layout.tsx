import { DevTokenSetter } from '@/app/utils/native/dev-token-setter'
import { NativeBridgeProvider } from '@/app/utils/native/native-bridge-provider'
import { NativeTokenGate } from '@/app/utils/native/native-token-gate'

const isDev = process.env.NODE_ENV === 'development'

const LayoutPublic = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NativeBridgeProvider />
      {isDev && <DevTokenSetter />}
      <NativeTokenGate>
        <section className='flex min-h-screen flex-col'>{children}</section>
      </NativeTokenGate>
    </>
  )
}

export default LayoutPublic
