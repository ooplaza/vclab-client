export interface Repository {
  id?: string;
  title: string;
  author: string;
  is_public?: string | boolean;
  description: string;
  category: Category | string;
  link: string;
}

export interface Category {
  name: string; 
  count?: number;
}


export interface RepositoryPaginatedData {
  results: Repository[];
  count: number;
  last_page: number;
}
 