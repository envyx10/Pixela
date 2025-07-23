'use client';

import { useEffect, useState } from 'react';

export default function DebugPage() {
  const [envVars, setEnvVars] = useState<{[key: string]: string | undefined}>({});
  const [apiTest, setApiTest] = useState<{status: string, data?: any, error?: string}>({ status: 'idle' });

  useEffect(() => {
    setEnvVars({
      'NEXT_PUBLIC_API_URL': process.env.NEXT_PUBLIC_API_URL,
      'NEXT_PUBLIC_BACKEND_URL': process.env.NEXT_PUBLIC_BACKEND_URL,
    });
  }, []);

  const testAPI = async () => {
    setApiTest({ status: 'loading' });
    
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://pixela.duckdns.org/api';
      const response = await fetch(`${apiUrl}/movies/trending`);
      
      if (response.ok) {
        const data = await response.json();
        setApiTest({ status: 'success', data });
      } else {
        setApiTest({ status: 'error', error: `${response.status}: ${response.statusText}` });
      }
    } catch (error) {
      setApiTest({ status: 'error', error: String(error) });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Debug Page</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Variables de Entorno</h2>
          <div className="space-y-2">
            {Object.entries(envVars).map(([key, value]) => (
              <div key={key} className="flex items-center">
                <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded mr-2">
                  {key}
                </span>
                <span className="text-sm">
                  {value || 'undefined'}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Test de API</h2>
          <button
            onClick={testAPI}
            disabled={apiTest.status === 'loading'}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
          >
            {apiTest.status === 'loading' ? 'Probando...' : 'Probar API'}
          </button>
          
          <div className="mt-4">
            <p><strong>Estado:</strong> {apiTest.status}</p>
            {apiTest.error && (
              <div className="mt-2 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                <strong>Error:</strong> {apiTest.error}
              </div>
            )}
            {apiTest.data && (
              <div className="mt-2 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                <strong>Datos recibidos:</strong>
                <pre className="mt-2 text-xs overflow-auto">
                  {JSON.stringify(apiTest.data, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
