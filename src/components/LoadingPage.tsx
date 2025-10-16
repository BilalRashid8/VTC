import { Link } from "react-router-dom";

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[9999] grid place-items-center bg-white">
      <div className="flex flex-col items-center gap-4">
        {/* Logo + marque */}
        <Link to="/" aria-label="Transfert Royal Paris" className="flex items-center gap-3">
          <img
            src="/transfert-royal-logo.png"
            alt="Transfert Royal Paris"
            className="h-10 w-auto"
            loading="eager"
            decoding="async"
          />
          <span className="text-xl font-semibold text-gray-900">Transfert Royal</span>
        </Link>

        {/* Spinner doré */}
        <div className="relative h-10 w-10">
          <span className="absolute inset-0 rounded-full border-4 border-[#FEB21A] opacity-30"></span>
          <span className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#FEB21A] animate-spin"></span>
        </div>

        {/* Tagline */}
        <p className="text-sm text-gray-500">Chargement…</p>
      </div>
    </div>
  );
}
