import { signIn } from '@/lib/auth'

export async function GET(req: Request) {
  const searchParams = new URL(req.url).searchParams
  // Redireciona diretamente para o authentik, sem utilizar uma tela de login neste app
  return signIn('authentik', {
    redirectTo: searchParams.get('callbackUrl') ?? '',
  })
}
