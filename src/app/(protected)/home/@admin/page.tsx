import { api } from '@/lib/api';
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const page = async () => {
  /* const { data } = await api.get<{
    repositories_count: number; 
  }>('/api/admin/dashboard'); */

  return (
    <div className='flex space-x-5'>
      <div className='w-1/3'>
        <Card className='relative h-[17.8rem] rounded-[24px] border-[6px] border-primary shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]'>
          <CardContent className='flex h-full items-center justify-center p-6 text-center'>
            <div className='space-y-5'>
              <h4 className='text-[2rem] font-semibold'>Number of Repositories</h4>
              <p className='text-5xl font-bold'>1</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default page;
