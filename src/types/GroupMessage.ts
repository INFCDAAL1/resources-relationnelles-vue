import type {Message} from "@/types";

export interface GroupMessage {
  id: number;
  name: string;
  last_message: Message[];
}

export interface GroupMessageResponse {
  data: GroupMessage[];
}
