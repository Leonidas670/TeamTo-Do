import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  // Validación de contraseña
  const validatePassword = (pass) => {
    const minLength = pass.length >= 8;
    const hasUpperCase = /[A-Z]/.test(pass);
    const hasLowerCase = /[a-z]/.test(pass);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pass);
    
    return {
      isValid: minLength && hasUpperCase && hasLowerCase && hasSpecialChar,
      minLength,
      hasUpperCase,
      hasLowerCase,
      hasSpecialChar
    };
  };

  const passwordValidation = validatePassword(password);
  const showValidation = password.length > 0;
  const passwordsMatch = password === confirmPassword && confirmPassword.length > 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      return;
    }
    
    if (!passwordValidation.isValid) {
      return;
    }
    
    if (password !== confirmPassword) {
      return;
    }

    // Llamar a la función de registro del contexto
    await register(name.trim(), email.trim(), password.trim());
    
    // Redirigir al login después del registro exitoso
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-rose-50 to-amber-50 flex items-center justify-center p-4">
      <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-2xl w-full max-w-md border border-orange-100">
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-gradient-to-br from-orange-400 to-rose-400 rounded-full mb-4 shadow-lg">
            <svg 
              className="w-8 h-8 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" 
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-500 via-rose-500 to-amber-500 bg-clip-text text-transparent mb-2">
            Crear Cuenta
          </h1>
          <p className="text-gray-600">
            Regístrate para comenzar a organizar tus tareas
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Nombre */}
          <div className="relative">
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
              Nombre completo
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <input
                id="name"
                type="text"
                className="w-full pl-10 pr-4 py-3 border-2 border-orange-200 rounded-xl shadow-sm focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all duration-200 outline-none bg-white"
                placeholder="Tu nombre completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          {/* Email */}
          <div className="relative">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
              Correo electrónico
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </div>
              <input
                id="email"
                type="email"
                className="w-full pl-10 pr-4 py-3 border-2 border-orange-200 rounded-xl shadow-sm focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all duration-200 outline-none bg-white"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Contraseña */}
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

            {/* Indicadores de validación */}
            {showValidation && (
              <div className="mt-2 space-y-1">
                <ValidationItem valid={passwordValidation.minLength} text="Mínimo 8 caracteres" />
                <ValidationItem valid={passwordValidation.hasUpperCase} text="Una letra mayúscula" />
                <ValidationItem valid={passwordValidation.hasLowerCase} text="Una letra minúscula" />
                <ValidationItem valid={passwordValidation.hasSpecialChar} text="Un carácter especial" />
              </div>
            )}
          </div>

          {/* Confirmar Contraseña */}
          <div className="relative">
            <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
              Confirmar contraseña
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <input
                id="confirmPassword"
                type="password"
                className="w-full pl-10 pr-4 py-3 border-2 border-orange-200 rounded-xl shadow-sm focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all duration-200 outline-none bg-white"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            
            {/* Mensaje de contraseñas */}
            {confirmPassword.length > 0 && (
              <div className="mt-2 flex items-center gap-2 text-xs">
                {passwordsMatch ? (
                  <>
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-green-600 font-medium">Las contraseñas coinciden</span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <span className="text-red-600 font-medium">Las contraseñas no coinciden</span>
                  </>
                )}
              </div>
            )}
          </div>

          <button
            className="w-full mt-2 bg-gradient-to-r from-orange-500 via-rose-500 to-amber-500 hover:from-orange-600 hover:via-rose-600 hover:to-amber-600 text-white font-bold py-3.5 px-4 rounded-xl transition-all duration-300 disabled:from-gray-300 disabled:via-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none"
            type="submit"
            disabled={!name.trim() || !email.trim() || !passwordValidation.isValid || !passwordsMatch}
          >
            Registrarse
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            ¿Ya tienes una cuenta?{" "}
            <Link to="/login" className="text-orange-500 hover:text-orange-600 font-semibold transition-colors">
              Inicia sesión aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

// Componente auxiliar para validación
function ValidationItem({ valid, text }) {
  return (
    <div className="flex items-center gap-2 text-xs">
      {valid ? (
        <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      ) : (
        <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
      )}
      <span className={valid ? "text-green-600 font-medium" : "text-gray-500"}>
        {text}
      </span>
    </div>
  );
}