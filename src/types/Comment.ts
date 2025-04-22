import type {Resource, User} from "@/types";

export interface Comment {
  id: number;
  content: string;
  status: 'pending' | 'approved' | 'rejected';
  user: Partial<User>;
  resourceId: Resource['id'];
  createdAt: Date;
  updatedAt: Date;
}
