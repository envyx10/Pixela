'use client';

import { useState, useEffect } from 'react';
import { API_URL, BACKEND_URL } from '@/api/shared/apiEndpoints';

export default function ApiTestPage() {
  const [results, setResults] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});

  const testEndpoint = async (name: string, url: string) => {
    setLoading(prev => ({ ...prev, [name]: true }));
    try {
      console.log(`Testing ${name}: ${url}`);
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
      
      const data = await response.json();
      setResults(prev => ({ 
        ...prev, 
        [name]: { 
          status: response.status, 
          success: response.ok,
          data: data,
          url: url
        } 
      }));
    } catch (error) {
      setResults(prev => ({ 
        ...prev, 
        [name]: { 
          error: error instanceof Error ? error.message : 'Unknown error',
          url: url
        } 
      }));
    } finally {
      setLoading(prev => ({ ...prev, [name]: false }));
    }
  };

  const testAll = () => {
    testEndpoint('Backend Health', `${BACKEND_URL}/health`);
    testEndpoint('Movies Trending', `${API_URL}/movies/trending`);
    testEndpoint('Series Trending', `${API_URL}/series/trending`);
    testEndpoint('Categories', `${API_URL}/categories`);
  };

  useEffect(() => {
    testAll();
  }, []);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">API Test Dashboard</h1>
      
      <div className="mb-6">
        <p><strong>Backend URL:</strong> {BACKEND_URL}</p>
        <p><strong>API URL:</strong> {API_URL}</p>
      </div>

      <button 
        onClick={testAll}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-6 hover:bg-blue-600"
      >
        Test All Endpoints
      </button>

      <div className="grid gap-6">
        {Object.entries(results).map(([name, result]) => (
          <div key={name} className="border rounded-lg p-4 bg-gray-50">
            <h3 className="text-xl font-semibold mb-2 flex items-center">
              {name}
              {loading[name] && <span className="ml-2 text-blue-500">Loading...</span>}
            </h3>
            
            {result.url && (
              <p className="text-sm text-gray-600 mb-2">
                <strong>URL:</strong> {result.url}
              </p>
            )}
            
            {result.error ? (
              <div className="text-red-600">
                <strong>Error:</strong> {result.error}
              </div>
            ) : (
              <div>
                <div className={`mb-2 ${result.success ? 'text-green-600' : 'text-red-600'}`}>
                  <strong>Status:</strong> {result.status} - {result.success ? 'Success' : 'Failed'}
                </div>
                
                {result.data && (
                  <div>
                    <strong>Response:</strong>
                    <pre className="bg-gray-100 p-2 rounded mt-2 text-xs overflow-auto max-h-64">
                      {JSON.stringify(result.data, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
