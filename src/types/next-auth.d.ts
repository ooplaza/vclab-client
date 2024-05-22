import { DefaultSession, DefaultUser } from 'next-auth';
import { DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: string;
      token: string;
      first_name: string;
      last_name: string;
      contact_number: string;
    } & DefaultSession['user'];
  }

  interface User extends DefaultUser {
    role: string;
    token: string;
    first_name: string;
    last_name: string;
    contact_number: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    token: string;
    role: string;
    id: string;
    first_name: string;
    last_name: string;
    contact_number: string;
  }
}
