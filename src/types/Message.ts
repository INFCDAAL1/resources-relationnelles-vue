import type {User} from "@/types";
export interface Message {
  id: number;
  content: string;
  read: boolean;
  sender: Partial<User>;
  receiver: Partial<User>;
  createdAt: Date;
  updatedAt: Date;
}
