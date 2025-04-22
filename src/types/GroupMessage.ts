import type {Message} from "@/types";

export interface GroupMessage {
  id: number;
  name: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}
