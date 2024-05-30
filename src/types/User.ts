// MAIN
export default interface User {
  id?: string;
  name?: string;
  first_name: string;
  last_name: string;
  email: string;
  role?: string;
  contact_number?: string;
  token?: string;
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
