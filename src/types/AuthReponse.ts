import type {User} from "@/types/User.ts";

export interface AuthReponse {
  token: string
  user: User
}
