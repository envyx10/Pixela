import { FaInstagram, FaXTwitter, FaYoutube } from "react-icons/fa6";

/**
 * Configuración de enlaces y contenido del footer
 */
export const FOOTER_CONTENT = {
  links: {
    explorer: [
      { name: "Inicio", href: "/" },
      { name: "Tendencias", href: "/" },
      { name: "Categorías", href: "/" },
    ],
    company: [
      { name: "Sobre nosotros", href: "/sobre-nosotros" },
      { name: "Privacidad", href: "/privacidad" },
      { name: "Términos", href: "/terminos" },
      { name: "Contacto", href: "/contacto" }
    ],
    social: [
      { Icon: FaInstagram, label: "Instagram", title: "Síguenos en Instagram", href: "https://instagram.com/pixela" },
      { Icon: FaXTwitter, label: "X", title: "Síguenos en X (Twitter)", href: "https://x.com/pixela" },
      { Icon: FaYoutube, label: "YouTube", title: "Nuestro canal de YouTube", href: "https://youtube.com/pixela" },
    ]
  },
  contact: {
    email: "pixel@pixela.io",
    location: "Málaga, España"
  },
  description: "Descubriendo historias que nos conectan. Pixela une a los amantes del cine y las series en una experiencia visual donde compartir, opinar y disfrutar del séptimo arte es parte del viaje."
} as const; 