import clsx from 'clsx';
import { FormInputProps } from '@/features/profile/types/form';

/**
 * Estilos constantes para el componente FormInput
 */
const STYLES = {
  // Contenedor principal del input
  container: 'relative group overflow-hidden',
  
  // Contenedor del icono
  iconWrapper: 'absolute inset-y-0 left-3 flex items-center pointer-events-none z-10',
  
  // Estilos del input
  input: clsx(
    // Dimensiones y espaciado
    'w-full h-12 px-6 pl-12',
    
    // Bordes y fondo
    'border border-transparent bg-[#181818]',
    'hover:border-gray-500 focus:border-gray-500',
    'hover:border-opacity-70 focus:border-opacity-90',
    
    // Forma y transiciones
    'rounded-[49px] transition-all duration-200 ease-out',
    
    // Estados de focus
    'outline-none focus:outline-none focus:ring-0',
    
    // Texto y placeholder
    'placeholder-gray-500/50 placeholder-shown:text-[16px]',
    'focus:placeholder-gray-500/30 text-white/90 font-outfit'
  ),
  
  // Línea decorativa inferior
  bottomLine: clsx(
    // Posicionamiento
    'absolute bottom-0 left-0 right-0 h-[1px]',
    
    // Gradiente y opacidad
    'bg-gradient-to-r from-transparent via-gray-400 to-transparent',
    'translate-y-full opacity-0',
    
    // Estados hover y focus
    'group-hover:opacity-80 group-hover:translate-y-0',
    'group-focus-within:opacity-100 group-focus-within:translate-y-0',
    
    // Transición
    'transition-all duration-300 ease-out'
  ),
  
  // Texto de ayuda
  helperText: 'mt-1 text-xs text-gray-500 font-outfit'
} as const;

/**
 * Componente de input de formulario con estilo personalizado
 * @param {FormInputProps} props - Props del componente
 * @returns {JSX.Element} Componente FormInput
 */
export const FormInput = ({
  type,
  name,
  value,
  onChange,
  placeholder,
  required = false,
  icon,
  helperText,
}: FormInputProps) => {
  return (
    <div>
      <div className={STYLES.container}>
        <div className={STYLES.iconWrapper}>
          {icon}
        </div>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={STYLES.input}
          required={required}
        />
        <div className={STYLES.bottomLine} />
      </div>
      {helperText && (
        <p className={STYLES.helperText}>{helperText}</p>
      )}
    </div>
  );
}; 