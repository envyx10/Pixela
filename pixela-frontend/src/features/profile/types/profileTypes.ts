
// Interfaz para los datos del formulario de perfil
export interface ProfileFormData {
  name: string;
  email: string;
  password?: string;
  created_at: string;
  is_admin: boolean;
  photo_url?: string;
}

// Interfaz para el formulario de perfil
export interface UpdateProfileFormProps {
  initialData: {
    name: string;
    email: string;
    password?: string;
    photo_url?: string;
  };
  onCancel: () => void;
  onSubmit: (data: ProfileFormData) => void;
}

// Interfaz para el error del formulario de perfil
export interface ProfileErrorProps {
  message?: string;
} 