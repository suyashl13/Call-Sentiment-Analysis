import { signIn } from '@/actions'
import { Button } from '@nextui-org/button'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form action={signIn}>
        <Button type='submit'>Sign In</Button>
      </form>
    </main>
  )
}
