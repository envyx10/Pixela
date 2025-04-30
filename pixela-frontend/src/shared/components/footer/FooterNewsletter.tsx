import { useState } from 'react';

export const FooterNewsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica para procesar newsletter
    alert(`¡Gracias por suscribirte a Pixela con ${email}!`);
    setEmail("");
  };

  return (
    <div className="w-full flex flex-col">
      <h3 className="text-white font-bold text-lg mb-5 relative inline-block">
        Únete a la comunidad
        <div className="absolute -bottom-1 left-0 w-12 h-0.5 bg-[#ff007f]/50 rounded-full"></div>
      </h3>
      <p className="text-white/60 text-sm mb-4">
        Forma parte de una comunidad cinéfila que vive cada historia. Reseñas, descubrimientos y cultura audiovisual.
      </p>
      <form
        className="flex w-full max-w-md mb-6 group"
        onSubmit={handleSubmit}
      >
        <div className="w-full relative z-0 group">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder=" "
            className="w-full px-5 py-3.5 bg-white/5 border border-white/10 text-white rounded-l-lg outline-none focus:border-[#ff007f] peer transition backdrop-blur-sm shadow-lg"
            required
            aria-label="Correo electrónico"
          />
          <label 
            className="absolute text-sm text-white/60 duration-300 transform -translate-y-6 scale-75 top-4 z-10 origin-[0] left-5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-[#ff007f]"
          >
            Tu email creativo
          </label>
        </div>
        <button
          type="submit"
          className="px-6 py-3.5 bg-[#ff007f] text-white font-medium hover:bg-[#ff00a2] transition-all flex items-center rounded-r-lg focus:outline-none focus:ring-2 focus:ring-[#ff007f] group overflow-hidden relative shadow-lg shadow-[#ff007f]/20"
          aria-label="Suscribirse al newsletter"
        >
          <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">→</span>
          <div className="absolute inset-0 bg-gradient-to-r from-[#ff007f] to-[#ff00ff] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>
      </form>
    </div>
  );
};

export default FooterNewsletter; 