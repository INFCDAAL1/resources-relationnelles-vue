export interface UserMessage {
  id: number;
  name: string;
}

export interface User {
  id: number;
  name: string;
}

export interface Message {
  id: number;
  content: string;
  read: boolean;
  sender: UserMessage;
  receiver?: UserMessage;
  created_at: string;
  updated_at: string;
}

export interface Conversation {
  user: UserMessage;
  last_message: Message | null;
  unread_count: number;
  last_activity: string | null;
}

export interface GroupMessage {
  id: number;
  user: UserMessage;
  unread_count: number;
  last_message: Message | null;
}

// API response types
export interface MessageApiResponse {
  data: Message[];
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    links: Array<{
      url: string | null;
      label: string;
      active: boolean;
    }>;
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
}

export interface ConversationsResponse {
  conversations: Conversation[];
}

export interface RouteParams {
  id: string;
}
