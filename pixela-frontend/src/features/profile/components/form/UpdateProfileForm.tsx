import Image from 'next/image';
import { FiUser, FiMail, FiX } from 'react-icons/fi';
import { IoKeyOutline } from 'react-icons/io5';

import { useForm } from 'react-hook-form';
import { useRef, useState } from 'react';

import { ProfileFormData, UpdateProfileFormProps } from '@/features/profile/types/profileTypes';
import { InputField } from '@/features/profile/components/form/InputField';

export const UpdateProfileForm = ({
  initialData,
  onCancel,
  onSubmit
}: UpdateProfileFormProps) => {
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validar que el archivo sea una imagen
      if (!file.type.startsWith('image/')) {
        setImageError('El archivo debe ser una imagen válida');
        return;
      }
      
      // Validar el tamaño del archivo (máximo 2MB)
      if (file.size > 2 * 1024 * 1024) {
        setImageError('La imagen no debe superar los 2MB');
        return;
      }
      
      setImageError(null);
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          // Redimensionar la imagen antes de guardarla
          const img = new window.Image();
          img.onload = () => {
            const canvas = document.createElement('canvas');
            const MAX_SIZE = 300; // Tamaño máximo en píxeles
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
            
            // Convertir a base64 con calidad reducida
            const resizedImage = canvas.toDataURL('image/jpeg', 0.7);
            setProfileImage(resizedImage);
          };
          img.src = e.target.result as string;
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const onFormSubmit = (data: ProfileFormData) => {
    // Asegurarse de que la imagen se envíe solo si ha cambiado
    const formData = {
      ...data,
      photo_url: profileImage !== initialData.photo_url ? profileImage : undefined
    };
    onSubmit(formData);
  };

  return (
    <div className="profile-edit">
      {/* Columna del avatar */}
      <div className="profile-edit__avatar-column">
        <div className="profile-edit__avatar-section">
          <div className="profile-edit__avatar-container" onClick={handleAvatarClick}>
            <div className="profile-edit__avatar-preview">
              {profileImage ? (
                <Image
                  src={profileImage}
                  alt="Foto de perfil"
                  className="profile-edit__avatar-image"
                  width={120}
                  height={120}
                  priority
                />
              ) : (
                <div className="profile-edit__avatar-placeholder">
                  <span>{initialData.name.charAt(0).toUpperCase()}</span>
                </div>
              )}
            </div>
            <div className="profile-edit__avatar-overlay" />
            <input
              type="file"
              accept="image/*"
              className="profile-edit__file-input"
              ref={fileInputRef}
              onChange={handleFileChange}
              aria-label="Subir foto de perfil"
            />
          </div>
          <button
            type="button"
            onClick={handleAvatarClick}
            className="profile-edit__upload-button"
          >
            {profileImage ? 'Cambiar foto' : 'Subir foto'}
          </button>
          {imageError && (
            <p className="profile-edit__error">{imageError}</p>
          )}
        </div>
      </div>

      {/* Columna del formulario */}
      <div className="profile-edit__form-column">
        <div className="profile-edit__header">
          <h2 className="profile-edit__title">
            Editar Perfil
          </h2>
          <button
            type="button"
            onClick={onCancel}
            className="profile-edit__close-button"
            aria-label="Cerrar"
          >
            <FiX />
          </button>
        </div>

        {/* Campos del formulario */}
        <form onSubmit={handleSubmit(onFormSubmit)} className="profile-edit__fields">
          {/* Campo de username */}
          <div className="profile-edit__field-group">
            <label className="profile-input__label">Username</label>
            <InputField
              type="text"
              name="name"
              placeholder="Username"
              register={register('name', { required: true })}
              icon={<FiUser className="profile-input__icon" />}
              error={errors.name}
            />
          </div>

          <div className="profile-edit__field-group">
            <label className="profile-input__label">Email</label>
            <InputField
              type="email"
              name="email"
              placeholder="Email"
              register={register('email', { 
                required: true,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Formato de email inválido"
                }
              })}
              icon={<FiMail className="profile-input__icon" />}
              error={errors.email}
            />
          </div>

          <div className="profile-edit__field-group">
            <label className="profile-input__label">Contraseña</label>
            <InputField
              type="password"
              name="password"
              placeholder="Contraseña"
              register={register('password')}
              icon={<IoKeyOutline className="profile-input__icon" />}
              helperText="Deja este campo vacío si no deseas cambiar tu contraseña actual"
            />
          </div>

          <div className="profile-edit__actions">
            <button
              type="submit"
              className="profile-edit__button profile-edit__button--submit"
            >
              Guardar Cambios
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="profile-edit__button profile-edit__button--cancel"
            >
              Descartar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}; 