import type {Message, User} from "@/types";

export interface GroupMessage {
  id: number;
  name: string;
  message: Message;
}
