"use client"
import { api } from '@/lib/api';
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

type Category = string | { name: string };

interface ResultItem {
  category: Category;
}

interface ApiResponse {
  results: ResultItem[];
}

const page = async () => {
  const { data } = await api.get<ApiResponse>('/api/auth/repositories');

  if (!data || !Array.isArray(data.results)) {
    return <div>No data available</div>;
  }

  const aggregateCategories = () => {
    const categoryMap = new Map<string, number>();

    data.results.forEach((item: ResultItem) => {
      let categoryName = '';

      if (typeof item.category === 'string') {
        categoryName = item.category;
      } else if (item.category && item.category.name) {
        categoryName = item.category.name;
      } else {
        categoryName = 'Unknown';
      }

      if (categoryMap.has(categoryName)) {
        categoryMap.set(categoryName, categoryMap.get(categoryName)! + 1);
      } else {
        categoryMap.set(categoryName, 1);
      }
    });

    return Array.from(categoryMap.entries());
  };

  const categories = aggregateCategories();

  return (
    <div className='flex space-x-5'>
      {categories.map(([category, count], index) => (
        <div key={index} className='w-1/3'>
          <Card className='relative h-[17.8rem] rounded-[24px] border-[6px] border-primary shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]'>
            <CardContent className='flex h-full items-center justify-center p-6 text-center'>
              <div className='space-y-5'>
                <h4 className='text-[2rem] font-semibold'>{category}</h4>
                <p className='text-5xl font-bold'>{count}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default page;
