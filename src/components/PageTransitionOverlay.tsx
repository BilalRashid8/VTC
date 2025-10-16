export default function PageTransitionOverlay() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[9998] grid place-items-center bg-white/90 backdrop-blur-sm animate-fade">
      <div className="h-8 w-8">
        <div className="h-8 w-8 rounded-full border-4 border-[#FEB21A] border-t-transparent animate-spin" />
      </div>
    </div>
  );
}
