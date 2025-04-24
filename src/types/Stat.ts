import type {Resource} from "@/types/Resource.ts";
import type {User} from "@/types/User.ts";

export interface GeneralStats {
  users_count: number;
  resources_count: number;
  categories_count: number;
  types_count: number;
  messages_count: number;
  comments_count: number;
}

export interface ResourceCategory {
  name: string;
  count: number;
}

export interface ResourceActivity {
  id: number;
  name: string;
  created_at: string;
  download_url: string | null;
}

export interface ResourcesStats {
  total: number;
  published: number;
  validated: number;
  by_category: ResourceCategory[];
  recent_activity: ResourceActivity[];
}

export interface InvitationStatus {
  status: string;
  count: number;
}

export interface EngagementStats {
  favorites_count: number;
  saved_count: number;
  exploited_count: number;
  comments_count: number;
  invitations_count: number;
  invitations_by_status: InvitationStatus[];
  top_resources: Resource[];
}

export interface RecentComment {
  content: string;
  user: string;
  resource: string;
  date: string;
}

export interface ActivityStats {
  new_users_last_month: number;
  resources_added_last_month: number;
  messages_sent_last_month: number;
  recent_comments: RecentComment[];
  most_active_users: User[];
}

