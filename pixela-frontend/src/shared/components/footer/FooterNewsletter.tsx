'use client';

import { useState } from 'react';

// Estilos constantes para el newsletter
const STYLES = {
  container: "w-full flex flex-col",
  title: "text-white font-bold text-base md:text-lg mb-4 md:mb-5 relative inline-block [@media(min-width:820px)_and_(max-width:1180px)]:text-base [@media(min-width:820px)_and_(max-width:1180px)]:mb-4",
  titleUnderline: "absolute -bottom-1 left-0 w-12 h-0.5 bg-[#ff007f]/50 rounded-full",
  description: "text-white/60 text-xs md:text-sm mb-3 md:mb-4 [@media(min-width:820px)_and_(max-width:1180px)]:text-xs [@media(min-width:820px)_and_(max-width:1180px)]:mb-3",
  form: "flex flex-col sm:flex-row w-full max-w-md mb-4 md:mb-6 group [@media(min-width:820px)_and_(max-width:1180px)]:max-w-none [@media(min-width:820px)_and_(max-width:1180px)]:mb-4",
  inputContainer: "w-full relative z-0 group mb-2 sm:mb-0",
  input: "w-full px-4 sm:px-5 py-3 sm:py-3.5 bg-white/5 border border-white/10 text-white rounded-lg sm:rounded-l-lg sm:rounded-r-none outline-none focus:border-[#ff007f] peer transition backdrop-blur-sm shadow-lg [@media(min-width:820px)_and_(max-width:1180px)]:px-4 [@media(min-width:820px)_and_(max-width:1180px)]:py-3 [@media(min-width:820px)_and_(max-width:1180px)]:text-sm",
  label: "absolute text-xs sm:text-sm text-white/60 duration-300 transform -translate-y-6 scale-75 top-3 sm:top-4 z-10 origin-[0] left-4 sm:left-5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-[#ff007f] [@media(min-width:820px)_and_(max-width:1180px)]:text-xs [@media(min-width:820px)_and_(max-width:1180px)]:top-3 [@media(min-width:820px)_and_(max-width:1180px)]:left-4",
  button: "px-4 sm:px-6 py-3 sm:py-3.5 bg-[#ff007f] text-white text-sm font-medium hover:bg-[#ff00a2] transition-all flex items-center justify-center rounded-lg sm:rounded-l-none sm:rounded-r-lg focus:outline-none focus:ring-2 focus:ring-[#ff007f] group overflow-hidden relative shadow-lg shadow-[#ff007f]/20 [@media(min-width:820px)_and_(max-width:1180px)]:px-4 [@media(min-width:820px)_and_(max-width:1180px)]:py-3 [@media(min-width:820px)_and_(max-width:1180px)]:text-sm",
  buttonIcon: "relative z-10 transition-transform duration-300 group-hover:translate-x-1",
  buttonBackground: "absolute inset-0 bg-gradient-to-r from-[#ff007f] to-[#ff00ff] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
} as const;

export const FooterNewsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica para procesar newsletter
    alert(`¡Gracias por suscribirte a Pixela con ${email}!`);
    setEmail("");
  };

  return (
    <div className={STYLES.container}>
      <h3 className={STYLES.title}>
        Únete a la comunidad
        <div className={STYLES.titleUnderline}></div>
      </h3>
      <p className={STYLES.description}>
        Forma parte de una comunidad cinéfila que vive cada historia. Reseñas, descubrimientos y cultura audiovisual.
      </p>
      <form
        className={STYLES.form}
        onSubmit={handleSubmit}
      >
        <div className={STYLES.inputContainer}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder=" "
            className={STYLES.input}
            required
            aria-label="Correo electrónico"
          />
          <label className={STYLES.label}>
            Tu email aquí
          </label>
        </div>
        <button
          type="submit"
          className={STYLES.button}
          aria-label="Suscribirse al newsletter"
        >
          <span className={STYLES.buttonIcon}>→</span>
          <div className={STYLES.buttonBackground}></div>
        </button>
      </form>
    </div>
  );
};

export default FooterNewsletter; 