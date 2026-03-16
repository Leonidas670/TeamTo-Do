export default function LoadingScreen({ text = "Cargando datos..." }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-orange-50 via-amber-50 to-rose-50 p-4">
      <div className="flex flex-col items-center gap-4 bg-white/90 backdrop-blur-md px-6 py-8 sm:px-8 sm:py-6 rounded-2xl shadow-2xl border border-orange-100 max-w-sm w-full">
        <div className="w-16 h-16 sm:w-12 sm:h-12 border-4 border-orange-300 border-t-orange-500 rounded-full animate-spin" />
        <div className="flex flex-col items-center gap-1 text-center">
          <p className="text-base sm:text-sm font-semibold text-gray-700">{text}</p>
          <p className="text-sm sm:text-xs text-gray-400">Esto puede tardar unos segundos...</p>
        </div>
      </div>
    </div>
  );
}

