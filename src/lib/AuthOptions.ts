import type { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { LoginResponse, login, loginWithGoogle } from '@/lib/AuthenticationAPI';
import { api } from './api';
import axios from 'axios';

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
        const [response, error] = await login(
          credentials?.email!,
          credentials?.password!
        );

        if (error) {
          throw new Error(error);
        }

        if (response?.data) {
          return {
            ...response.data.user,
            token: response.data.token,
          };
        }

        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!,
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
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.token = token.token;
        session.user.name = token.first_name + ' ' + token.last_name;
        session.user.first_name = token.first_name;
        session.user.last_name = token.last_name;
        session.user.contact_number = token.contact_number;
      }
      return session;
    },
    async jwt({ token, user, account }) {
      if (account && account.provider == 'google' && account.access_token) {
        const [response, error] = await loginWithGoogle(
          'google',
          account.access_token
        );

        if (error) {
          throw new Error(error);
        }

        if (response?.data) {
          user = {
            ...response.data.user,
            token: response.data.token,
          };
        }
      }

      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.token = user.token;
        token.first_name = user.first_name;
        token.last_name = user.last_name;
        token.contact_number = user.contact_number;
      }
      return token;
    },
  },
};

export default AuthOptions;
