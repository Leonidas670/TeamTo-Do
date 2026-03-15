import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Users from "./pages/Users";
import Teams from "./pages/Teams";
import PrivateRoute from "./components/PrivateRoute";
import { useAuth } from "./context/AuthContext";

function App() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-rose-50 text-gray-800">
      {user && (
        <header className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b-2 border-orange-100">
          <nav className="container mx-auto px-3 sm:px-4 py-3 sm:py-4 flex justify-between items-center gap-2">
            <Link to="/" className="flex items-center gap-2 sm:gap-3 shrink-0" onClick={() => setMenuOpen(false)}>
              <div className="p-1.5 sm:p-2 bg-gradient-to-br from-orange-500 via-rose-500 to-amber-500 rounded-xl shadow-lg transform hover:scale-105 transition-transform">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <span className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-orange-600 via-rose-600 to-amber-600 bg-clip-text text-transparent truncate">
                Team To-Do
              </span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-2 lg:gap-4">
              <Link to="/teams" className="px-3 py-2 text-sm font-semibold text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors">
                Equipos
              </Link>
              <div className="flex items-center gap-2 lg:gap-3 bg-gradient-to-r from-orange-50 to-amber-50 px-3 lg:px-4 py-2 rounded-xl border-2 border-orange-200">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-rose-400 rounded-full flex items-center justify-center shadow-md shrink-0">
                  <span className="text-white font-bold text-sm">{user.name.charAt(0).toUpperCase()}</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs text-gray-500">Hola,</span>
                  <span className="text-sm font-bold text-gray-800 truncate">{user.name}</span>
                </div>
              </div>
              <button
                onClick={logout}
                className="px-3 lg:px-4 py-2 bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white rounded-xl font-semibold transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span className="hidden lg:inline">Salir</span>
              </button>
            </div>

            {/* Mobile: hamburger + menu */}
            <div className="flex md:hidden items-center gap-2">
              <button
                type="button"
                onClick={() => setMenuOpen((o) => !o)}
                className="p-2 rounded-lg text-gray-700 hover:bg-orange-50 border border-orange-200"
                aria-label="Abrir menú"
              >
                {menuOpen ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
              <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-rose-400 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0">
                {user.name.charAt(0).toUpperCase()}
              </div>
            </div>
          </nav>

          {/* Mobile dropdown */}
          {menuOpen && (
            <div className="md:hidden border-t border-orange-100 bg-white/95 backdrop-blur-sm px-4 py-3 shadow-inner">
              <div className="flex flex-col gap-1">
                <Link
                  to="/"
                  onClick={() => setMenuOpen(false)}
                  className="px-3 py-2.5 rounded-lg font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-700"
                >
                  Tareas
                </Link>
                <Link
                  to="/teams"
                  onClick={() => setMenuOpen(false)}
                  className="px-3 py-2.5 rounded-lg font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-700"
                >
                  Equipos
                </Link>
                <Link
                  to="/users"
                  onClick={() => setMenuOpen(false)}
                  className="px-3 py-2.5 rounded-lg font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-700"
                >
                  Usuarios
                </Link>
                <button
                  onClick={() => { setMenuOpen(false); logout(); }}
                  className="mt-2 px-3 py-2.5 rounded-lg font-medium text-left text-red-600 hover:bg-red-50 flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Salir
                </button>
              </div>
            </div>
          )}
        </header>
      )}

      <main className="container mx-auto p-4 md:p-6">
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/users"
            element={
              <PrivateRoute>
                <Users />
              </PrivateRoute>
            }
          />
          <Route
            path="/teams"
            element={
              <PrivateRoute>
                <Teams />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
}

export default App;