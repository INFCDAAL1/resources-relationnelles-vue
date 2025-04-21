export interface Resource {
  id: number;
  name: string;
  description: string;
  category: string;
  isValid: boolean;
  isPublished: boolean;
  isFavorite: boolean;
  createdAt: Date;
  updatedAt: Date;
}
