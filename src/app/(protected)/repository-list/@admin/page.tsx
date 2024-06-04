import React, { FC } from 'react';
import { getServerSession } from 'next-auth';
import AuthOptions from '@/lib/AuthOptions';
import AppRepositoriesTable from '@/components/AppRepositoriesTable';

const page: FC = async () => {
  const session = await getServerSession(AuthOptions);

  console.log("Session", session)

  return (
    <>
      <h1 className='text-[2rem] font-bold'>Repositories</h1>
      <AppRepositoriesTable userRole={session?.user.role || ''} />
    </>
  );
};

export default page;
