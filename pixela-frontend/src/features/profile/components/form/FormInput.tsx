import { ReactNode } from 'react';
import clsx from 'clsx';

interface FormInputProps {
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  required?: boolean;
  icon: ReactNode;
  helperText?: string;
}

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
      <div className="relative group overflow-hidden">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none z-10">
          {icon}
        </div>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={clsx(
            "w-full border border-transparent bg-[#181818] hover:border-gray-500 focus:border-gray-500",
            "hover:border-opacity-70 focus:border-opacity-90 rounded-[49px] transition-all duration-200",
            "ease-out outline-none focus:outline-none focus:ring-0 px-6 pl-12 h-12",
            "placeholder-gray-500/50 placeholder-shown:text-[16px] focus:placeholder-gray-500/30",
            "text-white/90 font-outfit"
          )}
          required={required}
        />
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gray-400 to-transparent translate-y-full opacity-0 group-hover:opacity-80 group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:translate-y-0 transition-all duration-300 ease-out"></div>
      </div>
      {helperText && (
        <p className="mt-1 text-xs text-gray-500 font-outfit">{helperText}</p>
      )}
    </div>
  );
}; 