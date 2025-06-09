  "use client";

  import { useRouter } from 'next/navigation';

  const STYLES = {
    container: "min-h-screen bg-gradient-to-br from-[#0F0F0F] via-[#1A1A1A] to-[#0F0F0F] flex flex-col items-center justify-center p-4 relative overflow-hidden pt-20",
    background: {
      particles: "absolute inset-0 opacity-10",
      gradient: "absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20"
    },
    content: {
      wrapper: "relative z-10 text-center max-w-2xl mx-auto",
      errorCode: "text-8xl md:text-9xl font-black bg-gradient-to-r from-pixela-accent via-pixela-accent to-pixela-accent bg-clip-text text-transparent mb-6 drop-shadow-[0_0_50px_rgba(236,27,105,0.6)] animate-slow-pulse",
      title: "text-3xl md:text-4xl font-bold text-white mb-4",
      description: "text-gray-300 text-lg leading-relaxed mb-8 max-w-lg mx-auto",
      quote: {
        container: "border-l-4 border-pixela-accent bg-black/30 backdrop-blur-sm p-4 rounded-r-lg mb-8 italic",
        text: "text-pixela-accent text-base md:text-lg",
        attribution: "text-gray-400 text-sm mt-2 not-italic"
      }
    },
    buttons: {
      container: "flex flex-col sm:flex-row gap-4 justify-center items-center",
      primary: "inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pixela-accent to-pixela-accent hover:from-pixela-accent/90 hover:to-pixela-accent/90 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-pixela-accent/25",
      secondary: "inline-flex items-center gap-2 px-6 py-3 bg-gray-800/80 hover:bg-gray-700/80 text-gray-300 hover:text-white font-medium rounded-lg transition-all duration-300 backdrop-blur-sm border border-gray-600/50"
    },
    decorative: {
      glow: "absolute -top-20 -left-20 w-40 h-40 bg-pixela-accent/20 rounded-full blur-3xl animate-pulse",
      glow2: "absolute -bottom-20 -right-20 w-60 h-60 bg-pixela-accent/10 rounded-full blur-3xl animate-pulse delay-1000"
    }
  } as const;

  export default function NotFound() {
    const router = useRouter();

    const handleGoBack = () => {
      if (typeof window !== 'undefined' && window.history.length > 1) {
        router.back();
      } else {
        router.push('/');
      }
    };

    return (
      <>
        {/* Estilos CSS personalizados para la animación lenta */}
        <style jsx>{`
          @keyframes slow-pulse {
            0%, 100% {
              opacity: 1;
              filter: drop-shadow(0 0 40px rgba(236, 27, 105, 0.5));
            }
            50% {
              opacity: 0.85;
              filter: drop-shadow(0 0 60px rgba(236, 27, 105, 0.7));
            }
          }
          
          .animate-slow-pulse {
            animation: slow-pulse 5s ease-in-out infinite;
          }
        `}</style>
        
        <div className={STYLES.container}>
          {/* Efectos decorativos de fondo */}
          <div className={STYLES.decorative.glow}></div>
          <div className={STYLES.decorative.glow2}></div>
          
          {/* Gradiente de fondo */}
          <div className={STYLES.background.gradient}></div>
          
          <div className={STYLES.content.wrapper}>
            {/* Código de error 404 */}
            <h1 className={STYLES.content.errorCode}>
              404
            </h1>
            
            {/* Título */}
            <h2 className={STYLES.content.title}>
              ¡Página No Encontrada!
            </h2>
            
            {/* Descripción */}
            <p className={STYLES.content.description}>
              Parece que la página que buscas se perdió en el multiverso cinematográfico.
              Tal vez fue cancelada como una secuela que nadie pidió.
            </p>
            
            {/* Cita cinematográfica */}
            <blockquote className={STYLES.content.quote.container}>
              <p className={STYLES.content.quote.text}>
                &ldquo;Este lugar es como el recuerdo de alguien de un pueblo, y el recuerdo se está desvaneciendo&rdquo;
              </p>
              <cite className={STYLES.content.quote.attribution}>
                - True Detective, página perdida en el tiempo
              </cite>
            </blockquote>

            {/* Botones de navegación */}
            <div className={STYLES.buttons.container}>
              <button
                onClick={() => router.push('/')}
                className={STYLES.buttons.primary}
              >
                🏠 Volver al Inicio
              </button>
              
              <button
                onClick={handleGoBack}
                className={STYLES.buttons.secondary}
              >
                ← Volver Atrás
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
