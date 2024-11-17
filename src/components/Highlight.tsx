export function Highlight({ num = 0 }) {
  if (num < 2) return null;

  return (
    <div className="absolute size-5 md:scale-150 lg:scale-[1.75] text-white text-sm font-medium bg-orange-500 rounded-full flex items-center justify-center -right-1.5 -top-1.5 z-[100]">
      {num}
    </div>
  );
}
