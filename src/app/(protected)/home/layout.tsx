import AuthOptions from '@/lib/AuthOptions';
import { getServerSession } from 'next-auth';
import React, { FC } from 'react';

const Layout: FC<{
  admin: React.ReactNode;
  mother: React.ReactNode;
  ob: React.ReactNode;
}> = async ({ admin, mother, ob }) => {
  const session = await getServerSession(AuthOptions);

  const renderContent = () => {
    switch (session?.user.role) {
      case 'admin':
        return admin;
      case 'mother':
        return mother;
      case 'ob_gyne':
        return ob;
      default:
        return null;
    }
  };

  return <>{renderContent()}</>;
};

export default Layout;
