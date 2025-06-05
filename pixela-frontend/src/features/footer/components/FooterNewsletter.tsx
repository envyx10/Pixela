'use client';

import { useState } from 'react';

const STYLES = {
  container: "w-full flex flex-col",
  title: "text-white font-bold text-base md:text-lg mb-4 md:mb-5 relative inline-block ipad:text-base ipad:mb-4",
  titleUnderline: "absolute -bottom-1 left-0 w-12 h-0.5 bg-[#ff007f]/50 rounded-full",
  description: "text-white/60 text-xs md:text-sm mb-3 md:mb-4 ipad:text-xs ipad:mb-3",
  form: "flex flex-col sm:flex-row gap-3 sm:gap-2 ipad:flex-col ipad:gap-3",
  input: "flex-1 bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-[#ff007f] focus:ring-1 focus:ring-[#ff007f] transition-all text-sm md:text-base backdrop-blur-sm ipad:text-sm ipad:py-2.5",
  button: "bg-gradient-to-r from-[#ff007f] to-[#ff00ff] text-white px-6 py-3 rounded-lg font-medium hover:from-[#ff00ff] hover:to-[#ff007f] focus:outline-none focus:ring-2 focus:ring-[#ff007f] focus:ring-offset-2 focus:ring-offset-gray-900 transition-all transform hover:scale-105 text-sm md:text-base sm:whitespace-nowrap backdrop-blur-sm border border-transparent hover:border-white/20 shadow-lg shadow-[#ff007f]/20 hover:shadow-[#ff007f]/40 ipad:text-sm ipad:py-2.5",
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
      <form onSubmit={handleSubmit} className={STYLES.form}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Tu email aquí..."
          className={STYLES.input}
          required
        />
        <button
          type="submit"
          className={STYLES.button}
        >
          Suscribirme →
        </button>
      </form>
    </div>
  );
};

export default FooterNewsletter; 