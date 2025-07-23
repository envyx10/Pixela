// Test script para verificar la API
const testAPI = async () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://pixela.duckdns.org/api';
  
  console.log('Testing API connection to:', API_URL);
  
  try {
    // Test básico de conectividad
    const response = await fetch(`${API_URL}/movies/trending`);
    console.log('Response status:', response.status);
    console.log('Response headers:', [...response.headers.entries()]);
    
    if (response.ok) {
      const data = await response.json();
      console.log('API Response:', data);
    } else {
      console.error('API Error:', response.statusText);
    }
  } catch (error) {
    console.error('Network Error:', error);
  }
};

// Exportar para uso en el navegador
if (typeof window !== 'undefined') {
  (window as any).testAPI = testAPI;
}

export default testAPI;
