import { useState } from "react";

function App() {
  const [user, setUser] = useState({ name: "Juan Pérez" }); // Demo user
  const [showMenu, setShowMenu] = useState(false);

  const logout = () => {
    setUser(null);
    alert("Sesión cerrada");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-rose-50">
      {/* Header con diseño cálido */}
      <header className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b-2 border-orange-100">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-orange-500 via-rose-500 to-amber-500 rounded-xl shadow-lg transform hover:scale-105 transition-transform">
                <svg 
                  className="w-6 h-6 text-white" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" 
                  />
                </svg>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 via-rose-600 to-amber-600 bg-clip-text text-transparent">
                Team To-Do
              </span>
            </div>

            {/* Desktop Navigation */}
            {user ? (
              <div className="hidden md:flex items-center gap-4">
                {/* User info */}
                <div className="flex items-center gap-3 bg-gradient-to-r from-orange-50 to-amber-50 px-4 py-2 rounded-xl border-2 border-orange-200">
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-rose-400 rounded-full flex items-center justify-center shadow-md">
                    <span className="text-white font-bold text-sm">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500">Hola,</span>
                    <span className="text-sm font-bold text-gray-800">{user.name}</span>
                  </div>
                </div>

                {/* Logout button */}
                <button
                  onClick={logout}
                  className="px-4 py-2 bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white rounded-xl font-semibold transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Salir
                </button>
              </div>
            ) : (
              <div className="hidden md:flex gap-3">
                <button className="px-4 py-2 text-gray-700 hover:text-orange-600 font-semibold transition-colors">
                  Iniciar Sesión
                </button>
                <button className="px-4 py-2 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white rounded-xl font-semibold transition-all shadow-md hover:shadow-lg">
                  Registrarse
                </button>
              </div>
            )}

            {/* Mobile menu button */}
            <button 
              className="md:hidden p-2 hover:bg-orange-50 rounded-lg transition-colors"
              onClick={() => setShowMenu(!showMenu)}
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {showMenu ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile menu */}
          {showMenu && (
            <div className="md:hidden mt-4 pt-4 border-t-2 border-orange-100 space-y-3 animate-fade-in">
              {user ? (
                <>
                  <div className="flex items-center gap-3 bg-gradient-to-r from-orange-50 to-amber-50 p-3 rounded-xl border-2 border-orange-200">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-rose-400 rounded-full flex items-center justify-center shadow-md">
                      <span className="text-white font-bold">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-500">Hola,</span>
                      <span className="text-sm font-bold text-gray-800">{user.name}</span>
                    </div>
                  </div>
                  <button
                    onClick={logout}
                    className="w-full px-4 py-3 bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white rounded-xl font-semibold transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Cerrar Sesión
                  </button>
                </>
              ) : (
                <div className="space-y-2">
                  <button className="w-full px-4 py-3 text-gray-700 hover:bg-orange-50 rounded-xl font-semibold transition-colors">
                    Iniciar Sesión
                  </button>
                  <button className="w-full px-4 py-3 bg-gradient-to-r from-orange-500 to-rose-500 text-white rounded-xl font-semibold transition-all shadow-md">
                    Registrarse
                  </button>
                </div>
              )}
            </div>
          )}
        </nav>
      </header>

      {/* Main content demo */}
      <main className="container mx-auto p-4 md:p-6">
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-xl p-8 border-2 border-orange-100">
          <div className="text-center">
            <div className="inline-block p-4 bg-gradient-to-br from-orange-400 to-rose-400 rounded-2xl mb-4 shadow-lg">
              <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-rose-600 bg-clip-text text-transparent mb-4">
              Bienvenido a Team To-Do
            </h1>
            <p className="text-gray-600 text-lg">
              Organiza tus tareas en equipo de manera eficiente y colorida
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;