import Image from "next/image";
import { FiUser, FiMail, FiX, FiCamera, FiImage } from "react-icons/fi";
import { IoKeyOutline } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
import clsx from "clsx";

import {
  ProfileFormData,
  UpdateProfileFormProps,
} from "@/features/profile/types/profileTypes";
import { InputField } from "@/features/profile/components/form/InputField";
import { BannerSelectorModal } from "../layout/BannerSelectorModal";

/**
 * Estilos constantes para el componente UpdateProfileForm
 */
const STYLES = {
  container: "flex flex-col lg:flex-row gap-8 lg:gap-12 w-full",

  // Columna de avatar
  avatarColumn:
    "flex flex-col items-center bg-black/20 rounded-2xl p-6 shadow-md w-full lg:w-[300px] lg:flex-shrink-0 lg:sticky lg:top-8 lg:h-fit",
  avatarSection: "flex flex-col items-center mb-6",
  avatarContainer:
    "relative cursor-pointer mb-4 transition-transform duration-200 hover:scale-[1.02] group",
  avatarPreview:
    "w-[120px] h-[120px] rounded-full overflow-hidden border-2 border-pixela-accent/40",
  avatarImage: "w-full h-full object-cover",
  avatarPlaceholder:
    "w-full h-full flex items-center justify-center bg-gradient-to-br from-pixela-accent/20 to-pixela-accent/10 text-white text-5xl font-bold",
  avatarOverlay:
    "absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200",
  cameraIcon: "text-white text-2xl",
  fileInput: "hidden",
  uploadButton:
    "px-6 py-2 bg-pixela-accent/10 text-pixela-accent border border-pixela-accent/30 rounded-full hover:bg-pixela-accent/20 transition-all duration-200 text-sm font-medium",
  error: "text-pixela-accent text-xs mt-2 text-center",

  // Columna del formulario
  formColumn: "flex-1 min-w-0 bg-black/20 rounded-2xl p-6 shadow-md",
  header:
    "flex justify-between items-center mb-6 pb-3 border-b border-pixela-accent/50",
  title: "text-lg font-bold text-white m-0",
  closeButton:
    "bg-transparent border-none text-gray-400 text-lg cursor-pointer transition-colors duration-200 hover:text-pixela-accent",
  fields: "flex flex-col gap-5",
  fieldGroup: "flex flex-col gap-1",
  inputLabel: "block text-sm text-gray-400 mb-0.5",
  inputIcon: "text-base",

  // Acciones
  actions: "flex gap-3 mt-6 pt-6 border-t border-white/10",
  button: (variant: "submit" | "cancel") =>
    clsx(
      "flex-1 px-6 py-3 rounded-xl font-medium transition-all duration-200",
      variant === "submit"
        ? "bg-gradient-to-r from-pixela-accent to-pixela-accent/80 text-white hover:shadow-lg hover:shadow-pixela-accent/20"
        : "bg-white/5 text-gray-300 hover:bg-white/10",
    ),
} as const;

/**
 * Regex para validar el email y la contraseña
 */
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const STRONG_PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

/**
 * Componente de formulario para actualizar el perfil de usuario
 * @param {UpdateProfileFormProps} props - Props del componente
 * @returns {JSX.Element} Componente UpdateProfileForm
 */
export const UpdateProfileForm = ({
  initialData,
  onCancel,
  onSubmit,
}: UpdateProfileFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ProfileFormData>({
    defaultValues: {
      name: initialData.name,
      email: initialData.email,
      photo_url: initialData.photo_url,
      password: "",
      password_confirmation: "",
    },
  });

  const password = watch("password");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profileImage, setProfileImage] = useState<string | undefined>(
    initialData.photo_url,
  );
  const [imageError, setImageError] = useState<string | null>(null);
  const [showBannerModal, setShowBannerModal] = useState(false);
  const [bannerImage, setBannerImage] = useState<string | undefined>(
    initialData.cover_url,
  );

  const handleBannerSelect = (url: string) => {
    setBannerImage(url);
    setShowBannerModal(false);
  };

  /**
   * Maneja el cambio de archivo de imagen
   * @param {React.ChangeEvent<HTMLInputElement>} e - Evento de cambio
   */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setImageError("El archivo debe ser una imagen válida");
        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        setImageError("La imagen no debe superar los 2MB");
        return;
      }

      setImageError(null);
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          const img = new window.Image();
          img.onload = () => {
            const canvas = document.createElement("canvas");
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
            const ctx = canvas.getContext("2d");
            ctx?.drawImage(img, 0, 0, width, height);

            const resizedImage = canvas.toDataURL("image/jpeg", 0.7);
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
    // Construir el objeto con los campos del formulario
    const formData: Partial<ProfileFormData> = {
      name: data.name,
      email: data.email,
      photo_url: profileImage || initialData.photo_url,
      cover_url: bannerImage || initialData.cover_url,
    };

    // Solo añadir password si el usuario la ha escrito
    if (data.password && data.password.trim()) {
      formData.password = data.password;
    }

    onSubmit(formData as ProfileFormData);
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
                  <span>
                    {initialData.name
                      ? initialData.name.charAt(0).toUpperCase()
                      : "?"}
                  </span>
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
            {profileImage ? "Cambiar foto" : "Subir foto"}
          </button>

          {/* Banner Button */}
          <button
            type="button"
            onClick={() => setShowBannerModal(true)}
            className="mt-4 px-6 py-2 bg-transparent text-gray-400 border border-gray-600 rounded-full hover:border-pixela-accent hover:text-pixela-accent transition-all duration-200 text-sm font-medium flex items-center gap-2"
          >
            <FiImage />
            {bannerImage ? "Cambiar Portada" : "Seleccionar Portada"}
          </button>

          {imageError && <p className={STYLES.error}>{imageError}</p>}
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
              register={register("name", {
                required: "El nombre es requerido",
                minLength: {
                  value: 3,
                  message: "El nombre debe tener al menos 3 caracteres",
                },
                maxLength: {
                  value: 50,
                  message: "El nombre no puede exceder los 50 caracteres",
                },
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
              register={register("email", {
                required: "El email es requerido",
                pattern: {
                  value: EMAIL_REGEX,
                  message: "Formato de email inválido",
                },
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
              register={register("password", {
                minLength: {
                  value: 8,
                  message: "La contraseña debe tener al menos 8 caracteres",
                },
                pattern: {
                  value: STRONG_PASSWORD_REGEX,
                  message:
                    "Debe incluir mayúscula, minúscula, número y símbolo.",
                },
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
              register={register("password_confirmation", {
                validate: (value) => {
                  if (
                    password &&
                    password.trim() &&
                    (!value || !value.trim())
                  ) {
                    return "Debes confirmar la contraseña";
                  }
                  if (value && value !== password) {
                    return "Las contraseñas no coinciden";
                  }
                  return true;
                },
              })}
              icon={<IoKeyOutline className={STYLES.inputIcon} />}
              error={errors.password_confirmation}
              helperText="Confirma tu nueva contraseña si la has cambiado."
            />
          </div>

          <div className={STYLES.actions}>
            <button type="submit" className={STYLES.button("submit")}>
              Guardar Cambios
            </button>
            <button
              type="button"
              onClick={onCancel}
              className={STYLES.button("cancel")}
            >
              Descartar
            </button>
          </div>
        </form>
      </div>

      <BannerSelectorModal
        isOpen={showBannerModal}
        onClose={() => setShowBannerModal(false)}
        onSelect={handleBannerSelect}
        currentBanner={bannerImage}
      />
    </div>
  );
};
