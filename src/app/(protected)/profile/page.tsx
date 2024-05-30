import React from 'react';
import User from '@/types/User';
import { api } from '@/lib/api';
import ProfileForm from './components/ProfileForm';

const page = async () => {
  try {
    const response = await api.get<User>(`/api/auth/profile`);
    const userData = response.data;

    return (
      <>
        <h1 className='text-[2rem] font-bold'>Edit Profile</h1>
        <ProfileForm user={userData} />
      </>
    );
  } catch (error) {
    console.error('Error fetching profile:', error);
    return (
      <>
        <h1 className='text-[2rem] font-bold'>Edit Profile</h1>
        <p>Error fetching profile. Please try again.</p>
      </>
    );
  }
};

export default page;
