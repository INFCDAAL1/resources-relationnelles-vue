import type {User} from "@/types";

export interface Message {
  id: number,
  content: string,
  created_at: string,
  sender: Partial<User>,
  is_sender: boolean,
  read: boolean
}

export interface MessageResponse {
  data: Message[];
}
