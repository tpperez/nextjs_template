import { NativeBridgeProvider } from '@/app/utils/native/native-bridge-provider'
import { NativeTokenGate } from '@/app/utils/native/native-token-gate'

const LayoutPublic = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NativeBridgeProvider />
      <NativeTokenGate>
        <section className='flex min-h-screen flex-col'>{children}</section>
      </NativeTokenGate>
    </>
  )
}

export default LayoutPublic
