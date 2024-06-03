import React from 'react';
import {
  Home,
  User,
  Users,
  FolderKanban
} from 'lucide-react';

interface Route {
  route: string;
  title: string;
  icon: React.ReactElement | null;
  roles: string[];
  isSidebarVisible: boolean;
  child_routes: Route[] | [];
}
const routes: Route[] = [
  {
    route: '/dashboard',
    title: 'Home',
    icon: <Home />,
    roles: ['admin', 'user'],
    isSidebarVisible: true,
    child_routes: [],
  },
  {
    route: '/repository-list',
    title: 'Repository',
    icon: <FolderKanban />,
    roles: ['user', 'admin'],
    isSidebarVisible: true,
    child_routes: [],
  },

  {
    route: '/users-list',
    title: 'Users List',
    icon: <Users />,
    roles: ['admin',],
    isSidebarVisible: true,
    child_routes: [],
  },
  {
    route: '/profile',
    title: 'Profile',
    icon: <User />,
    roles: ['admin', 'user',],
    isSidebarVisible: true,
    child_routes: [],
  },
];

export default routes;
