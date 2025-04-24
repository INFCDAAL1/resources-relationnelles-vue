import type {Message} from "@/types";

export interface GroupMessage {
  id: number;
  name: string;
  message: Message;
}
