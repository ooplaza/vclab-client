import AppRepositoriesTable from '@/components/AppRepositoriesTable';
import React from 'react';

const page = () => {
  return (
    <>
      <h1 className='text-[2rem] font-bold'>Repositories</h1>
      <AppRepositoriesTable />
    </>
  );
};

export default page;
