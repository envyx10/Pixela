export interface User {
  id: number;
  name: string;
  lastname?: string;
  email: string;
  created_at?: string;
  is_admin?: boolean;
  profile_image?: string;
} 