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
  // Columna de visuales (Mini Hero)
  avatarColumn: "flex flex-col gap-4 w-full lg:w-[400px] flex-shrink-0",
  previewCard:
    "relative w-full h-[280px] rounded-2xl overflow-hidden bg-[#1A1A1A] group border border-white/5 shadow-2xl",

  // Banner Area
  bannerArea: "h-[160px] w-full relative cursor-pointer group/banner",
  bannerImage:
    "w-full h-full object-cover transition-transform duration-700 group-hover/banner:scale-105",
  bannerOverlay:
    "absolute inset-0 bg-black/20 transition-all duration-300 flex items-center justify-center backdrop-blur-[1px]",
  coverButton:
    "px-4 py-2 bg-black/60 text-white rounded-full text-sm font-medium border border-white/20 flex items-center gap-2 hover:bg-pixela-accent hover:border-pixela-accent transition-all shadow-lg",

  // Avatar Area (Overlapping)
  avatarArea: "absolute left-6 bottom-6 cursor-pointer group/avatar",
  avatarWrapper:
    "relative w-32 h-32 rounded-full border-4 border-[#1A1A1A] overflow-hidden bg-[#2A2A2A] shadow-xl",
  avatarImage: "w-full h-full object-cover",
  avatarOverlay:
    "absolute inset-0 bg-black/30 transition-all duration-300 flex items-center justify-center backdrop-blur-[1px]",
  cameraIcon: "text-white w-6 h-6",

  // Inputs ocultos
  fileInput: "hidden",
  error:
    "text-red-400 text-xs mt-2 text-center bg-red-500/10 py-2 px-3 rounded-lg border border-red-500/20",

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
      {/* Columna de visuales (Mini Hero) */}
      <div className={STYLES.avatarColumn}>
        <div className={STYLES.previewCard}>
          {/* Banner Edit Area */}
          <div
            className={STYLES.bannerArea}
            onClick={() => setShowBannerModal(true)}
          >
            <Image
              src={
                bannerImage ||
                "https://images.unsplash.com/photo-1574267432553-4b4628081c31?q=80&w=2831&auto=format&fit=crop"
              }
              alt="Banner de portada"
              fill
              className={STYLES.bannerImage}
            />
            <div className={STYLES.bannerOverlay}>
              <span className={STYLES.coverButton}>
                <FiImage className="w-4 h-4" />
                Cambiar Portada
              </span>
            </div>
          </div>

          {/* Avatar Edit Area */}
          <div className={STYLES.avatarArea} onClick={handleAvatarClick}>
            <div className={STYLES.avatarWrapper}>
              {profileImage ? (
                <Image
                  src={profileImage}
                  alt="Avatar"
                  fill
                  className={STYLES.avatarImage}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-600 text-white text-3xl font-bold">
                  {initialData.name?.charAt(0).toUpperCase() || "?"}
                </div>
              )}
              <div className={STYLES.avatarOverlay}>
                <FiCamera className={STYLES.cameraIcon} />
              </div>
            </div>
          </div>
        </div>

        {/* Hidden inputs & Validations */}
        <input
          type="file"
          accept="image/*"
          className={STYLES.fileInput}
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        {imageError && <p className={STYLES.error}>{imageError}</p>}

        <p className="text-xs text-gray-500 text-center px-4 font-outfit">
          Haz clic en la portada o en tu avatar para actualizarlos.
        </p>
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
