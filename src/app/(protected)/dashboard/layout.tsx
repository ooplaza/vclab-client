import AuthOptions from '@/lib/AuthOptions';
import { getServerSession } from 'next-auth';
import React, { ReactNode, useEffect, useState } from 'react';

interface LayoutProps {
  admin: ReactNode;
  user: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ admin, user }) => {
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const sessionData = await getServerSession(AuthOptions);
        setSession(sessionData);
      } catch (error) {
        console.error('Error fetching session:', error);
      }
    };
    fetchSession();
  }, []);

  const renderContent = () => {
    switch (session?.user?.role) {
      case 'admin':
        return admin;
      case 'user':
        return user;
      default:
        return null;
    }
  };

  return <>{renderContent()}</>;
};

export default Layout;
