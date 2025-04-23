import type {Message, UserMessage} from "@/types";

export interface GroupMessage {
  id: number;
  user: UserMessage;
  unread_count: number;
  last_message: Message | null;
}
