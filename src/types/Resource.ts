export interface Resource {
  id: number;
  name: string;
  description: string;
  published: boolean;
  validated: boolean;
  link: string | null;
  file_path: string | null;
  file_type: string | null;
  file_size: number | null;
  download_url: string | null;
  created_at: string;
  updated_at: string;
  type: string | null;
  category: {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
  };
  visibility: {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
  };
  origin: string | null;
  user: {
    id: number;
    name: string;
    email: string;
    created_at: string;
    updated_at: string;
  };
}

// API response pagination data
export interface ResourceApiResponse {
  data: Resource[];
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    links: Array<{
      url: string | null;
      label: string;
      active: boolean;
    }>;
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
}

export type FilterResource = "all" | "favorite" | "published" | "unpublished";
