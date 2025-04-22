export interface Message {
  id: number;
  content: string;
  read: boolean;
  senderId: number;
  receiverId: number;
  createdAt: Date;
  updatedAt: Date;
}
