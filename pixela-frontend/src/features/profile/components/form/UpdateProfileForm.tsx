import Image from 'next/image';
import { FiUser, FiMail, FiX, FiCamera } from 'react-icons/fi';
import { IoKeyOutline } from 'react-icons/io5';
import { useForm } from 'react-hook-form';
import { useRef, useState } from 'react';
import clsx from 'clsx';

import { ProfileFormData, UpdateProfileFormProps } from '@/features/profile/types/profileTypes';
import { InputField } from '@/features/profile/components/form/InputField';

/**
 * Estilos constantes para el componente UpdateProfileForm
 */
const STYLES = {
  container: 'profile-edit',
  avatarColumn: 'profile-edit__avatar-column',
  avatarSection: 'profile-edit__avatar-section',
  avatarContainer: 'profile-edit__avatar-container',
  avatarPreview: 'profile-edit__avatar-preview',
  avatarImage: 'profile-edit__avatar-image',
  avatarPlaceholder: 'profile-edit__avatar-placeholder',
  avatarOverlay: 'profile-edit__avatar-overlay',
  cameraIcon: 'profile-edit__camera-icon',
  fileInput: 'profile-edit__file-input',
  uploadButton: 'profile-edit__upload-button',
  error: 'profile-edit__error',
  formColumn: 'profile-edit__form-column',
  header: 'profile-edit__header',
  title: 'profile-edit__title',
  closeButton: 'profile-edit__close-button',
  fields: 'profile-edit__fields',
  fieldGroup: 'profile-edit__field-group',
  inputLabel: 'profile-input__label',
  inputIcon: 'profile-input__icon',
  actions: 'profile-edit__actions',
  button: (variant: 'submit' | 'cancel') => clsx(
    'profile-edit__button',
    `profile-edit__button--${variant}`
  )
} as const;

/**
 * Regex para validar el email y la contraseña
 */
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const STRONG_PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

/**
 * Componente de formulario para actualizar el perfil de usuario
 * @param {UpdateProfileFormProps} props - Props del componente
 * @returns {JSX.Element} Componente UpdateProfileForm
 */
export const UpdateProfileForm = ({
  initialData,
  onCancel,
  onSubmit
}: UpdateProfileFormProps) => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<ProfileFormData>({
    defaultValues: {
      name: initialData.name,
      email: initialData.email,
      photo_url: initialData.photo_url,
      password: '',
      password_confirmation: ''
    }
  });

  const password = watch('password');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profileImage, setProfileImage] = useState<string | undefined>(initialData.photo_url);
  const [imageError, setImageError] = useState<string | null>(null);

  /**
   * Maneja el cambio de archivo de imagen
   * @param {React.ChangeEvent<HTMLInputElement>} e - Evento de cambio
   */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {

      if (!file.type.startsWith('image/')) {
        setImageError('El archivo debe ser una imagen válida');
        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        setImageError('La imagen no debe superar los 2MB');
        return;
      }
      
      setImageError(null);
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {

          const img = new window.Image();
          img.onload = () => {
            const canvas = document.createElement('canvas');
            const MAX_SIZE = 300;
            let width = img.width;
            let height = img.height;
            
            if (width > height) {
              if (width > MAX_SIZE) {
                height = Math.round((height * MAX_SIZE) / width);
                width = MAX_SIZE;
              }
            } else {
              if (height > MAX_SIZE) {
                width = Math.round((width * MAX_SIZE) / height);
                height = MAX_SIZE;
              }
            }
            
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx?.drawImage(img, 0, 0, width, height);
            
            const resizedImage = canvas.toDataURL('image/jpeg', 0.7);
            setProfileImage(resizedImage);
          };
          img.src = e.target.result as string;
        }
      };
      reader.readAsDataURL(file);
    }
  };

  /**
   * Maneja el clic en el avatar para abrir el selector de archivos
   */
  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  /**
   * Maneja el envío del formulario
   * @param {ProfileFormData} data - Datos del formulario
   */
  const onFormSubmit = (data: ProfileFormData) => {
    // Construir el objeto solo con los campos necesarios
    const formData: ProfileFormData = {
      name: data.name,
      email: data.email,
      photo_url: profileImage !== initialData.photo_url ? profileImage : undefined,
      created_at: data.created_at,
      is_admin: data.is_admin,
    };

    // Solo añadir password si el usuario la ha escrito
    if (data.password && data.password.trim()) {
      formData.password = data.password;
    }

    onSubmit(formData);
  };

  return (
    <div className={STYLES.container}>
      {/* Columna del avatar */}
      <div className={STYLES.avatarColumn}>
        <div className={STYLES.avatarSection}>
          <div className={STYLES.avatarContainer} onClick={handleAvatarClick}>
            <div className={STYLES.avatarPreview}>
              {profileImage ? (
                <Image
                  src={profileImage}
                  alt="Foto de perfil"
                  className={STYLES.avatarImage}
                  width={120}
                  height={120}
                  priority
                />
              ) : (
                <div className={STYLES.avatarPlaceholder}>
                  <span>{initialData.name ? initialData.name.charAt(0).toUpperCase() : '?'}</span>
                </div>
              )}
            </div>
            <div className={STYLES.avatarOverlay}>
              <FiCamera className={STYLES.cameraIcon} />
            </div>
            <input
              type="file"
              accept="image/*"
              className={STYLES.fileInput}
              ref={fileInputRef}
              onChange={handleFileChange}
              aria-label="Subir foto de perfil"
            />
          </div>
          <button
            type="button"
            onClick={handleAvatarClick}
            className={STYLES.uploadButton}
          >
            {profileImage ? 'Cambiar foto' : 'Subir foto'}
          </button>
          {imageError && (
            <p className={STYLES.error}>{imageError}</p>
          )}
        </div>
      </div>

      {/* Columna del formulario */}
      <div className={STYLES.formColumn}>
        <div className={STYLES.header}>
          <h2 className={STYLES.title}>Editar Perfil</h2>
          <button
            type="button"
            onClick={onCancel}
            className={STYLES.closeButton}
            aria-label="Cerrar"
          >
            <FiX />
          </button>
        </div>

        <form onSubmit={handleSubmit(onFormSubmit)} className={STYLES.fields}>
          <div className={STYLES.fieldGroup}>
            <label className={STYLES.inputLabel}>Username</label>
            <InputField
              type="text"
              name="name"
              placeholder="Username"
              register={register('name', { 
                required: 'El nombre es requerido',
                minLength: { value: 3, message: 'El nombre debe tener al menos 3 caracteres' },
                maxLength: { value: 50, message: 'El nombre no puede exceder los 50 caracteres' }
              })}
              icon={<FiUser className={STYLES.inputIcon} />}
              error={errors.name}
            />
          </div>

          <div className={STYLES.fieldGroup}>
            <label className={STYLES.inputLabel}>Email</label>
            <InputField
              type="email"
              name="email"
              placeholder="Email"
              register={register('email', { 
                required: 'El email es requerido',
                pattern: {
                  value: EMAIL_REGEX,
                  message: "Formato de email inválido"
                }
              })}
              icon={<FiMail className={STYLES.inputIcon} />}
              error={errors.email}
            />
          </div>

          <div className={STYLES.fieldGroup}>
            <label className={STYLES.inputLabel}>Contraseña</label>
            <InputField
              type="password"
              name="password"
              placeholder="Contraseña"
              register={register('password', {
                minLength: {
                  value: 8,
                  message: 'La contraseña debe tener al menos 8 caracteres'
                },
                pattern: {
                  value: STRONG_PASSWORD_REGEX,
                  message: 'Debe incluir mayúscula, minúscula, número y símbolo.'
                }
              })}
              icon={<IoKeyOutline className={STYLES.inputIcon} />}
              helperText="Deja este campo vacío si no deseas cambiar tu contraseña actual"
              error={errors.password}
            />
          </div>

          <div className={STYLES.fieldGroup}>
            <label className={STYLES.inputLabel}>Confirmar Contraseña</label>
            <InputField
              type="password"
              name="password_confirmation"
              placeholder="Confirmar nueva contraseña"
              register={register('password_confirmation', {
                validate: (value) => {
                  if (password && password.trim() && (!value || !value.trim())) {
                    return 'Debes confirmar la contraseña';
                  }
                  if (value && value !== password) {
                    return 'Las contraseñas no coinciden';
                  }
                  return true;
                }
              })}
              icon={<IoKeyOutline className={STYLES.inputIcon} />}
              error={errors.password_confirmation}
              helperText="Confirma tu nueva contraseña si la has cambiado."
            />
          </div>

          <div className={STYLES.actions}>
            <button
              type="submit"
              className={STYLES.button('submit')}
            >
              Guardar Cambios
            </button>
            <button
              type="button"
              onClick={onCancel}
              className={STYLES.button('cancel')}
            >
              Descartar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}; 