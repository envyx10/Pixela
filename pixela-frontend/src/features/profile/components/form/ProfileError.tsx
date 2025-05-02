import { ProfileErrorProps} from "@/features/profile/types/profileTypes";
import { FiAlertTriangle } from 'react-icons/fi';

export const ProfileError = ({ 
  message = "No se pudo cargar la información del usuario." 
}: ProfileErrorProps) => {
  return (
    <div className="profile-error">
      <FiAlertTriangle className="profile-error__icon" />
      <h2 className="profile-error__title">Ha ocurrido un error</h2>
      <p className="profile-error__message">{message}</p>
      <button className="profile-error__button" onClick={() => window.location.reload()}>
        Intentar de nuevo
      </button>
    </div>
  );
}; 