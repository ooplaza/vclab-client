"use client"
import { api } from '@/lib/api';
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface CategoryData {
  category_name: string;
  count: number;
}

const Page = () => {
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await api.get<{ status: boolean, message: string, data: CategoryData[] }>('/api/auth/dashboard/category-counts');

        if (data.status) {
          setCategories(data.data);
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError('Error fetching category counts');
      }
    };

    fetchCategories();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (categories.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <div className='flex space-x-5'>
      {categories.map(({ category_name, count }, index) => (
        <div key={index} className='w-1/3'>
          <Card className='relative h-[17.8rem] rounded-[24px] border-[6px] border-primary shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]'>
            <CardContent className='flex h-full items-center justify-center p-6 text-center'>
              <div className='space-y-5'>
                <h4 className='text-[2rem] font-semibold'>{category_name}</h4>
                <p className='text-5xl font-bold'>{count}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default Page;
