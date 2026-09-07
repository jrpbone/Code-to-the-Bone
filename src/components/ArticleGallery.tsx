import { useId, useRef, useState, type KeyboardEvent } from "react";
import type { ArticleImage } from "../data/articles";
import ImageArrows from "./ImageArrows";

export default function ArticleGallery({ images }: { images: ArticleImage[] }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [failedSources, setFailedSources] = useState<Set<string>>(() => new Set());
  const galleryRef = useRef<HTMLElement>(null);
  const enlargeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const pointerStartedOutside = useRef(false);
  const dialogTitleId = useId();
  const currentIndex = Math.min(selectedIndex, Math.max(0, images.length - 1));
  const selected = images[currentIndex];

  if (!selected) return null;

  const unavailable = failedSources.has(selected.src);
  const position = `Image ${currentIndex + 1} of ${images.length}`;

  function markUnavailable(src: string) {
    setFailedSources((previous) => new Set(previous).add(src));
  }

  function step(direction: number) {
    setSelectedIndex(index => (Math.min(index, images.length - 1) + direction + images.length) % images.length);
  }

  function handleDialogKey(event: KeyboardEvent<HTMLDialogElement>) {
    if (!dialogRef.current?.open || images.length < 2) return;
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      step(event.key === "ArrowLeft" ? -1 : 1);
    }
  }

  return (
    <section ref={galleryRef} tabIndex={-1} aria-label="Article images" className="min-w-0">
      <figure>
        <div className="on-dark overflow-hidden rounded-lg border border-navy-700 bg-navy-900 shadow-lg shadow-navy-900/10">
      <div className="image-frame-bar">
        <span className="text-cyan-bright">FIG. {String(currentIndex + 1).padStart(2, "0")}</span>
        <p role="status" aria-live="polite" aria-atomic="true">
          {position}
        </p>
      </div>

        <div className="image-canvas relative aspect-3/4 p-4 sm:p-6">
          {unavailable ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 p-5 text-center" role="status">
              <span className="font-display text-lg font-bold text-surface">Image unavailable</span>
              <p className="text-sm leading-relaxed text-codefg">{selected.alt}</p>
              {images.length > 1 && <p className="text-sm text-codefg">Choose another image below.</p>}
            </div>
          ) : (
            <button
              ref={enlargeRef}
              type="button"
              onClick={() => dialogRef.current?.showModal()}
              aria-label={`Enlarge ${position.toLowerCase()}: ${selected.alt}`}
              aria-haspopup="dialog"
              className="group relative block h-full w-full cursor-zoom-in rounded-sm"
            >
              <img
                key={selected.src}
                src={selected.src}
                alt={selected.alt}
                onError={() => markUnavailable(selected.src)}
                decoding="async"
                className="image-artwork h-full w-full object-contain"
              />
              <span className="absolute bottom-2 right-2 rounded-full border border-cyan/40 bg-navy-900/95 px-3 py-2 font-mono text-xs text-cyan-bright shadow-sm group-hover:border-cyan">
                Enlarge <span aria-hidden="true">↗</span>
              </span>
            </button>
          )}
          {images.length > 1 && <ImageArrows onPrevious={() => step(-1)} onNext={() => step(1)} />}
        </div>
        </div>
        {selected.caption && (
          <figcaption className="mt-4 border-l-2 border-teal/40 pl-3 text-sm leading-relaxed text-slate">
            <span className="mr-2 font-mono text-xs font-medium text-teal">{String(currentIndex + 1).padStart(2, "0")} /</span>
            {selected.caption}
          </figcaption>
        )}
      </figure>

      {images.length > 1 && (
        <div className="mt-4 flex flex-wrap gap-2" aria-label="Choose an image">
          {images.map((image, index) => (
            <button
              key={`${image.src}-${index}`}
              type="button"
              aria-label={`Show image ${index + 1}: ${image.alt}`}
              aria-pressed={index === currentIndex}
              onClick={() => setSelectedIndex(index)}
              className={`flex h-24 w-18 shrink-0 items-center justify-center rounded-md border-2 bg-navy-900 p-1 transition-colors ${
                index === currentIndex ? "border-cyan ring-2 ring-teal/25 ring-offset-2 ring-offset-mist" : "border-navy-700 hover:border-cyan-soft"
              }`}
            >
              {failedSources.has(image.src) ? (
                <span className="text-center font-mono text-xs text-codefg">{index + 1}<br />Missing</span>
              ) : (
                <img
                  src={image.src}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  onError={() => markUnavailable(image.src)}
                  className="h-full w-full object-contain"
                />
              )}
            </button>
          ))}
        </div>
      )}

      <dialog
        ref={dialogRef}
        aria-labelledby={dialogTitleId}
        onKeyDown={handleDialogKey}
        onPointerDown={(event) => {
          const bounds = event.currentTarget.getBoundingClientRect();
          pointerStartedOutside.current = event.target === event.currentTarget && (
            event.clientX < bounds.left || event.clientX > bounds.right ||
            event.clientY < bounds.top || event.clientY > bounds.bottom
          );
        }}
        onPointerCancel={() => { pointerStartedOutside.current = false; }}
        onClick={(event) => {
          const startedOutside = pointerStartedOutside.current;
          pointerStartedOutside.current = false;
          if (!startedOutside || event.target !== event.currentTarget) return;
          const bounds = event.currentTarget.getBoundingClientRect();
          if (
            event.clientX < bounds.left || event.clientX > bounds.right ||
            event.clientY < bounds.top || event.clientY > bounds.bottom
          ) {
            event.currentTarget.close();
          }
        }}
        onClose={() => {
          pointerStartedOutside.current = false;
          // Native dialog restores the opener. An image error can remove it,
          // so keep focus in the gallery if that original button no longer exists.
          if (document.activeElement === document.body) {
            (enlargeRef.current ?? galleryRef.current)?.focus({ preventScroll: true });
          }
        }}
        className="on-dark fixed inset-0 m-auto max-h-[94dvh] w-[96vw] max-w-6xl overflow-auto rounded-lg border border-navy-700 bg-navy-900 p-4 text-surface shadow-2xl backdrop:bg-navy-900/90 sm:p-6"
      >
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 id={dialogTitleId} className="font-display text-lg font-bold">Article images</h2>
          <button
            type="button"
            autoFocus
            onClick={() => dialogRef.current?.close()}
            className="min-h-11 rounded-md border border-navy-600 px-4 py-2 text-sm font-medium text-cyan-bright hover:border-cyan"
          >
            Close <span aria-hidden="true">×</span>
          </button>
        </div>
        <figure>
          <div className="relative rounded-md border border-navy-700 bg-black/20 p-3 sm:p-5">
          {unavailable ? (
            <div className="flex min-h-64 flex-col items-center justify-center gap-3 p-8 text-center" role="status">
              <p className="font-display text-xl font-bold">Image unavailable</p>
              <p className="text-slate-faint">{selected.alt}</p>
            </div>
          ) : (
            <img
              key={selected.src}
              src={selected.src}
              alt={selected.alt}
              onError={() => markUnavailable(selected.src)}
              className="mx-auto max-h-[68dvh] w-full object-contain"
            />
          )}
            {images.length > 1 && <ImageArrows onPrevious={() => step(-1)} onNext={() => step(1)} />}
          </div>
          {selected.caption && (
            <figcaption className="mx-auto mt-4 max-w-3xl text-center text-sm leading-relaxed text-codefg">
              {selected.caption}
            </figcaption>
          )}
        </figure>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-4">
          {images.length > 1 && (
            <button
              type="button"
              aria-label="Previous image"
              onClick={() => step(-1)}
              className="min-h-11 rounded-md border border-navy-600 px-4 py-2 text-cyan-bright hover:border-cyan"
            >
              <span aria-hidden="true">←</span> Previous
            </button>
          )}
          <p role="status" aria-live="polite" aria-atomic="true" className="font-mono text-xs text-codefg">{position}</p>
          {images.length > 1 && (
            <button
              type="button"
              aria-label="Next image"
              onClick={() => step(1)}
              className="min-h-11 rounded-md border border-navy-600 px-4 py-2 text-cyan-bright hover:border-cyan"
            >
              Next <span aria-hidden="true">→</span>
            </button>
          )}
        </div>
      </dialog>
    </section>
  );
}
