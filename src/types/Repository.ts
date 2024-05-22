export interface Repository {
  id: string;
  title: string;
  author: string;
  is_public: string;
  description: string;
  user_id: string;
  category: Category;
  link: string;
}

export interface Category {
  name: string;
}

export interface RepositoryPaginatedData {
  results: Repository[];
  last_page: number;
}
