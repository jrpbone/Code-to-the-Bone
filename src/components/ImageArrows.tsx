export default function ImageArrows({ onPrevious, onNext }: {
  onPrevious: () => void;
  onNext: () => void;
}) {
  const style = "absolute top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-cyan/40 bg-navy-900/95 text-2xl text-cyan-bright shadow-lg transition-colors hover:border-cyan hover:bg-navy-700 focus-visible:outline-cyan";
  return (
    <>
      <button type="button" aria-label="Previous image" onClick={onPrevious} className={`${style} left-2`}><span aria-hidden="true">‹</span></button>
      <button type="button" aria-label="Next image" onClick={onNext} className={`${style} right-2`}><span aria-hidden="true">›</span></button>
    </>
  );
}
