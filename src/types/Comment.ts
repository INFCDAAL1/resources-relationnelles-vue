import type {User,Resource} from "@/types";

export interface Comment {
  id: number;
  content: string;
  status: 'pending' | 'approved' | 'rejected';
  userId: User['id'];
  resourceId: Resource['id'];
  createdAt: Date;
  updatedAt: Date;
}
