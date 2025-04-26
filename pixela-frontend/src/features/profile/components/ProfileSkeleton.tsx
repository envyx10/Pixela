'use client';

export const ProfileSkeleton = () => {
  return (
    <main className="pt-28 px-6 min-h-screen bg-gradient-to-b from-pixela-dark to-black">
      <div className="max-w-6xl mx-auto">
        <div className="h-10 w-48 bg-pixela-dark-opacity rounded-lg animate-pulse mb-8"></div>
        
        {/* Skeleton de las tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="h-10 w-32 bg-pixela-dark-opacity rounded-full animate-pulse"></div>
          ))}
        </div>
        
        {/* Skeleton del contenido */}
        <div className="bg-pixela-dark-opacity backdrop-blur-lg rounded-3xl p-8 shadow-lg">
          {/* Header con botón de editar */}
          <div className="flex justify-between items-center mb-6">
            <div className="h-8 w-48 bg-pixela-dark rounded-lg animate-pulse"></div>
            <div className="h-10 w-24 bg-pixela-dark rounded-full animate-pulse"></div>
          </div>
          
          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="w-32 h-32 rounded-full bg-pixela-dark animate-pulse"></div>
            
            <div className="flex-1 space-y-6 py-2">
              <div className="h-10 w-1/3 bg-pixela-dark rounded-lg animate-pulse"></div>
              
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-pixela-dark animate-pulse"></div>
                    <div className="space-y-2">
                      <div className="h-4 w-24 bg-pixela-dark rounded animate-pulse"></div>
                      <div className="h-6 w-48 bg-pixela-dark rounded animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}; 