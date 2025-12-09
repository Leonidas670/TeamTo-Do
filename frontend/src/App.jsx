import { useState } from "react";

// Simulación del LoginForm
function LoginForm() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const submit = () => {
    if (!name.trim() || !password.trim()) return;
    alert("Login enviado!");
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-2xl w-full max-w-md border border-orange-100">
      <div className="text-center mb-8">
        <div className="inline-block p-3 bg-gradient-to-br from-orange-400 to-rose-400 rounded-full mb-4 shadow-lg">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-500 via-rose-500 to-amber-500 bg-clip-text text-transparent mb-2">
          Bienvenido
        </h1>
        <p className="text-gray-600">Inicia sesión o regístrate para continuar</p>
      </div>

      <div className="flex flex-col gap-5">
        <div className="relative">
          <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
            Nombre de usuario
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <input
              id="username"
              className="w-full pl-10 pr-4 py-3 border-2 border-orange-200 rounded-xl shadow-sm focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all duration-200 outline-none bg-white"
              placeholder="Tu nombre de usuario"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        <div className="relative">
          <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
            Contraseña
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <input
              id="password"
              type="password"
              className="w-full pl-10 pr-4 py-3 border-2 border-orange-200 rounded-xl shadow-sm focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all duration-200 outline-none bg-white"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <button
          className="w-full mt-2 bg-gradient-to-r from-orange-500 via-rose-500 to-amber-500 hover:from-orange-600 hover:via-rose-600 hover:to-amber-600 text-white font-bold py-3.5 px-4 rounded-xl transition-all duration-300 disabled:from-gray-300 disabled:via-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none"
          onClick={submit}
          disabled={!name.trim() || !password.trim()}
        >
          Entrar / Registrarse
        </button>
      </div>
    </div>
  );
}

function App() {
  const [user, setUser] = useState(null); // null = no autenticado, objeto = autenticado
  
  const login = () => {
    setUser({ name: "Juan Pérez" });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-rose-50">
      {/* Header solo se muestra cuando hay usuario autenticado */}
      {user && (
        <header className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b-2 border-orange-100">
          <nav className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              {/* Logo */}
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-orange-500 via-rose-500 to-amber-500 rounded-xl shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 via-rose-600 to-amber-600 bg-clip-text text-transparent">
                  Team To-Do
                </span>
              </div>

              {/* User info y logout */}
              <div className="flex items-center gap-4">
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
            </div>
          </nav>
        </header>
      )}

      {/* Main content */}
      <main className="container mx-auto p-4 md:p-6">
        {user ? (
          // Contenido cuando está autenticado
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-xl p-8 border-2 border-orange-100">
            <div className="text-center">
              <div className="inline-block p-4 bg-gradient-to-br from-orange-400 to-rose-400 rounded-2xl mb-4 shadow-lg">
                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-rose-600 bg-clip-text text-transparent mb-4">
                ¡Bienvenido, {user.name}!
              </h1>
              <p className="text-gray-600 text-lg">
                Aquí irían tus tareas y componentes (Home, TodoList, etc.)
              </p>
            </div>
          </div>
        ) : (
          // LoginForm cuando NO está autenticado
          <div className="min-h-[calc(100vh-2rem)] flex items-center justify-center">
            <LoginForm />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;