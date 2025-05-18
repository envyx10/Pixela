import type { FC } from 'react';
import Image from 'next/image';
import { FiUser, FiMail, FiX } from 'react-icons/fi';
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
 * Validación de email usando regex
 */
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

/**
 * Componente de formulario para actualizar el perfil de usuario
 * @param {UpdateProfileFormProps} props - Props del componente
 * @returns {JSX.Element} Componente UpdateProfileForm
 */
export const UpdateProfileForm: FC<UpdateProfileFormProps> = ({
  initialData,
  onCancel,
  onSubmit
}) => {
  const { register, handleSubmit, formState: { errors } } = useForm<ProfileFormData>({
    defaultValues: {
      name: initialData.name,
      email: initialData.email,
      photo_url: initialData.photo_url,
      password: ''
    }
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profileImage, setProfileImage] = useState<string | undefined>(initialData.photo_url);
  const [imageError, setImageError] = useState<string | null>(null);

  /**
   * Maneja el cambio de archivo de imagen
   * @param {React.ChangeEvent<HTMLInputElement>} e - Evento de cambio
   */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setImageError('El archivo debe ser una imagen válida');
      return;
    }
    
    setImageError(null);
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setProfileImage(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
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
    // Asegurarse de que la imagen se envíe solo si ha cambiado
    const formData = {
      ...data,
      photo_url: profileImage !== initialData.photo_url ? profileImage : undefined
    };
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
                  <span>{initialData.name.charAt(0).toUpperCase()}</span>
                </div>
              )}
            </div>
            <div className={STYLES.avatarOverlay} />
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
              register={register('name', { required: true })}
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
                required: true,
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
              register={register('password')}
              icon={<IoKeyOutline className={STYLES.inputIcon} />}
              helperText="Deja este campo vacío si no deseas cambiar tu contraseña actual"
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