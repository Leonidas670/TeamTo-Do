export default function LoadingScreen({ text = "Cargando datos..." }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-orange-50 via-amber-50 to-rose-50">
      <div className="flex flex-col items-center gap-4 bg-white/80 backdrop-blur-md px-8 py-6 rounded-2xl shadow-2xl border border-orange-100">
        <div className="w-12 h-12 border-4 border-orange-300 border-t-orange-500 rounded-full animate-spin" />
        <div className="flex flex-col items-center gap-1">
          <p className="text-sm font-semibold text-gray-700">{text}</p>
          <p className="text-xs text-gray-400">Esto puede tardar unos segundos...</p>
        </div>
      </div>
    </div>
  );
}

