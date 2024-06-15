import React from 'react';
import { UserResponse } from '@/types/User';
import { api } from '@/lib/api';
import ProfileForm from './components/ProfileForm';

const page = async () => {
  const response = await api.get<UserResponse>(`/api/auth/profile`);
  const userData = response.data.data;

  if (!userData)
    return (
      <>
        <h1 className='text-[2rem] font-bold'>Edit Profile</h1>
        <p>Error fetching profile. Please try again.</p>
      </>
    );

  return (
    <>
      <h1 className='text-[2rem] font-bold'>Edit Profile</h1>
      <ProfileForm user={userData} />
    </>
  );
};


export default page;
