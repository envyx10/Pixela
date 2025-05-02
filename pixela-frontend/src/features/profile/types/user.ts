export interface User {
  id: number;
  name: string;
  surname: string;
  email: string;
  created_at?: string;
  is_admin?: boolean;
  photo_url?: string;
} 