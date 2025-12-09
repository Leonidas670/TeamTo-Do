import { Routes, Route, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Users from "./pages/Users";
import PrivateRoute from "./components/PrivateRoute";
import { useAuth } from "./context/AuthContext";

function App() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-rose-50 text-gray-800">
      <header className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b-2 border-orange-100">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3">
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
          </Link>

          {user ? (
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
          ) : (
            <div className="flex gap-4">
              <Link to="/" className="text-gray-600 hover:text-orange-700">
              </Link>
              <Link to="/users" className="text-gray-600 hover:text-orange-700">
              </Link>
            </div>
          )}
        </nav>
      </header>

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
          <Route
            path="/users"
            element={
              <PrivateRoute>
                <Users />
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