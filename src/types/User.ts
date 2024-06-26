// MAIN
export default interface User {
  id?: string;
  name?: string;
  first_name: string;
  last_name: string;
  email: string;
  username?: string;
  role?: string;
  contact_number?: string;
  dob?: string;
  token?: string;
  is_active?: boolean,
  is_superuser?: boolean,
  password?: string
  new_password?: string
  confirm_password?: string
}

export interface UserPaginatedData {
  results: User[];
  last_page: number;
}

// STATE
export interface UserStateDefinition {
  data: User | null;
}

// ACTIONS
export interface UserStateActions {
  setUser: (user: User) => void;
}


export interface UserResponse {
  message: string;
  status: boolean;
  data: User;
}