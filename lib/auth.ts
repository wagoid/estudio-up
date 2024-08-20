import NextAuth from 'next-auth'
import AuthentikProvider from 'next-auth/providers/authentik'

const { AUTHENTIK_URL, AUTHENTIK_ID, AUTHENTIK_SECRET } = process.env

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  providers: [
    AuthentikProvider({
      clientId: AUTHENTIK_ID,
      clientSecret: AUTHENTIK_SECRET,
      issuer: `${AUTHENTIK_URL}/application/o/estudio-up/`,
      // Necessário passar o url de cada endpoint (authorization, token, userinfo) porquê dá erro quando passa só o issuer
      // (authentik retorna com trailing slash, next-auth remove trailing slash do issuer)
      authorization: {
        params: { scope: 'openid email profile offline_access' },
        url: `${AUTHENTIK_URL}/application/o/authorize/`,
      },
      token: {
        url: `${AUTHENTIK_URL}/application/o/token/`,
      },
      userinfo: {
        url: `${AUTHENTIK_URL}/application/o/userinfo/`,
      },
    }),
  ],
  callbacks: {
    authorized: async ({ auth }) => {
      // Usuários logados são authenticados, caso contrário é redirecionado para a tela de login
      return !!auth
    },
  },
  pages: {
    signIn: '/api/signin',
  },
})
