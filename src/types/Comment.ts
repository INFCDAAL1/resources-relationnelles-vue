import type {Resource, User} from "@/types";

export interface Comment {
  id: number;
  content: string;
  status: 'pending' | 'approved' | 'rejected'| 'published'|'hidden';
  user_id: User['id'];
  user: Partial<User>;
  resource_id: Resource['id'];
  resource: Partial<Resource>;
  created_at: Date;
  updated_at: Date;
}

export type FilterComment = 'pending' | 'approved' | 'rejected' | 'all'
