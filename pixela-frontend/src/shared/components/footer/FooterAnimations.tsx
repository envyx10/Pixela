
// Componente de animaciones CSS para el footer
export const FooterAnimations = () => {
  return (
    <style jsx global>{`
      @keyframes pixelPulse {
        0% { opacity: 0.05; }
        50% { opacity: 0.12; }
        100% { opacity: 0.08; }
      }
      
      @keyframes floatParticle {
        0%, 100% { transform: translateY(0) translateX(0); }
        25% { transform: translateY(-20px) translateX(10px); }
        50% { transform: translateY(-10px) translateX(-15px); }
        75% { transform: translateY(-25px) translateX(5px); }
      }
      
      @keyframes pulseAndFloat {
        0%, 100% { transform: translateY(0) scale(1); opacity: 0.2; }
        50% { transform: translateY(-20px) translateX(15px) scale(1.2); opacity: 0.5; }
      }
      
      @keyframes glowAndFloat {
        0%, 100% { transform: translateY(0) scale(1); filter: blur(1px); }
        50% { transform: translateY(-30px) translateX(10px) scale(1.5); filter: blur(2px); }
      }
      
      @keyframes pixelFloat {
        0%, 100% { transform: translateY(0) rotate(0deg); }
        33% { transform: translateY(-15px) translateX(10px) rotate(45deg); }
        66% { transform: translateY(-25px) translateX(-15px) rotate(-45deg); }
      }
      
      @keyframes spinFloat {
        0% { transform: translateY(0) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(180deg); }
        100% { transform: translateY(0) rotate(360deg); }
      }
      
      @keyframes flowLine {
        0% { transform: translateX(0) rotate(0deg); opacity: 0; width: 10%; }
        50% { opacity: 0.3; width: 25%; }
        100% { transform: translateX(50px) rotate(0deg); opacity: 0; width: 10%; }
      }
      
      @keyframes riseUp {
        0% { transform: translateY(20px); opacity: 0; }
        25% { opacity: 0.6; }
        75% { opacity: 0.3; }
        100% { transform: translateY(-50px); opacity: 0; }
      }
      
      .animate-pulse-slow {
        animation: pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
      }
      
      .animation-delay-1000 {
        animation-delay: 1s;
      }
      
      .animation-delay-2000 {
        animation-delay: 2s;
      }
    `}</style>
  );
};

export default FooterAnimations; 