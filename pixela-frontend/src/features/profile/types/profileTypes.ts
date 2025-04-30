
// Interfaz para los datos del formulario de perfil
export interface ProfileFormData {
  name: string;
  email: string;
  lastname: string;
  password: string;
  profileImage?: string;
}

// Interfaz para el formulario de perfil
export interface UpdateProfileFormProps {
  initialData: {
    name: string;
    email: string;
    profile_image?: string;
  };
  onCancel: () => void;
  onSubmit: (data: ProfileFormData) => void;
}

// Interfaz para el error del formulario de perfil
export interface ProfileErrorProps {
  message?: string;
} 