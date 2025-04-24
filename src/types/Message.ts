import type {User} from "@/types";

export interface Message {
  id: number,
  content: string,
  created_at: string,
  sender: Partial<User>,
  read: boolean
}

export interface MessageResponse {
  data: Message[];
}
