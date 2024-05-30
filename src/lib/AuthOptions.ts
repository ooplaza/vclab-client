import type { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { LoginResponse, login } from '@/lib/AuthenticationAPI';
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

        if (response?.data) {
          return {
            ...response.data.user,
            token: response.data.token,
          } as any;
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
          id: token.id,
          role: token.role,
          token: token.token,
          name: `${token.first_name} ${token.last_name}`,
          first_name: token.first_name,
          last_name: token.last_name,
        };
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.token = user.token;
        token.first_name = user.first_name;
        token.last_name = user.last_name;
      }
      return token;
    },
  },
};

export default AuthOptions;
