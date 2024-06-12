import React from 'react';
import { GetServerSideProps } from 'next';
import { UserResponse } from '@/types/User';
import { api } from '@/lib/api';
import ProfileForm from './components/ProfileForm';

interface ProfilePageProps {
  user: UserResponse['data'];
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user }) => {
  return (
    <>
      <h1 className='text-[2rem] font-bold'>Edit Profile</h1>
      <ProfileForm user={user} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const response = await api.get<UserResponse>(`/api/auth/profile`, {
      headers: {
        cookie: context.req.headers.cookie || '',
      },
    });

    const userData = response.data.data;

    return {
      props: {
        user: userData,
      },
    };
  } catch (error) {
    console.error('Error fetching profile:', error);
    return {
      props: {
        user: null,
      },
    };
  }
};

export default ProfilePage;
