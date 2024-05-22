import React from 'react';
import {
  Home,
  Inbox,
  User,
  Album,
  CalendarDays,
  File,
  ShoppingCart,
  Youtube,
  BadgeCheck,
  UserSquare,
  BookUser,
  BookCheck,
  Users,
  Wallet,
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
    route: '/home',
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
    roles: ['admin'],
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
    child_routes: [
      {
        route: '/verification',
        title: 'Verification',
        icon: <BadgeCheck />,
        roles: ['ob_gyne'],
        isSidebarVisible: true,
        child_routes: [],
      },
      {
        route: '/display-information',
        title: 'Display Information',
        icon: <UserSquare />,
        roles: ['ob_gyne'],
        isSidebarVisible: true,
        child_routes: [],
      },
    ],
  },
];

export default routes;
