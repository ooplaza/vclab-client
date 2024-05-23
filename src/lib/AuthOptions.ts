import type { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { login, LoginResponse } from '@/lib/AuthenticationAPI'; // Assuming you have a type named LoginResponse

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
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials.password) {
          throw new Error('Email and password are required');
        }

        const [response, error] = await login(credentials.email, credentials.password);

        if (error) {
          throw new Error(error);
        }

        if (!response) {
          return null;
        }

        const { token, user } = response.data;

        return {
          token: token,
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          role: user.role,
          contact_number: user.contact_number || '',
        };
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
    async jwt({ token, user, account }) {

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
