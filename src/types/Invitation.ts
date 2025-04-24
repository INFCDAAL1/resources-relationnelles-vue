import type {Resource, User} from "@/types";

export interface Invitation {
  id: number;
  status: "pending" | "accepted" | "rejected";
  sender: Partial<User>;
  receiver: Partial<User>;
  resource: Partial<Resource>;
  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
}

export interface InvitationResponse {
  data: Invitation[];
}

export type FilterInvitation = "pending" | "accepted" | "rejected" | "all";