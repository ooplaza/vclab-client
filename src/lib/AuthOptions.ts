import type { AuthOptions, User as NextAuthUser } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { login } from '@/lib/AuthenticationAPI';
import User from '@/types/User';

const AuthOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'example@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials, req) => {
        if (!credentials || !credentials.email || !credentials.password) {
          throw new Error('Email and password are required');
        }

        const [response, error] = await login(credentials.email, credentials.password);

        if (error) {
          throw new Error(error);
        }

        if (response && response.data && response.data.user) {
          const user: User = {
            id: response.data.user.id || '',
            first_name: response.data.user.first_name || '',
            last_name: response.data.user.last_name || '',
            email: response.data.user.email || '',
            role: response.data.user.role || 'user',
            token: response.data.token || '',
          };

          return user as unknown as NextAuthUser;
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
    error: '/unauthenticated',
  },
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user = {
          ...session.user,
          id: token.id || '',
          role: token.role || '',
          token: token.token || '',
          name: `${token.first_name || ''} ${token.last_name || ''}`,
          first_name: token.first_name || '',
          last_name: token.last_name || '',
        };
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id || '';
        token.role = user.role || '';
        token.token = user.token || '';
        token.first_name = user.first_name || '';
        token.last_name = user.last_name || '';
      }
      return token;
    },
  },
};

export default AuthOptions;
