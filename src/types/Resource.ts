export interface Resource {
  id: number;
  name: string;
  description: string;
  category: string;
  isValid: boolean;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}
