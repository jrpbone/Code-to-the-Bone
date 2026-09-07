import { useEffect, useId, useRef, useState } from "react";
import { copyText } from "../lib/copyText";

export default function DownloadChecksum({ zip, hash, filename }: { zip: string; hash?: string; filename?: string }) {
  const [message, setMessage] = useState("");
  const [commandMessage, setCommandMessage] = useState("");
  const command = `Get-FileHash -LiteralPath '.\\${(filename ?? "").replace(/'/g, "''")}' -Algorithm SHA256`;
  const dialogRef = useRef<HTMLDialogElement>(null);
  const startedOutside = useRef(false);
  const panelId = useId();

  useEffect(() => {
    if (message !== "Checksum copied.") return;
    const timer = window.setTimeout(() => setMessage(""), 2000);
    return () => window.clearTimeout(timer);
  }, [message]);

  useEffect(() => {
    if (commandMessage !== "Command copied.") return;
    const timer = window.setTimeout(() => setCommandMessage(""), 2000);
    return () => window.clearTimeout(timer);
  }, [commandMessage]);

  function openVerification() {
    setMessage("");
    setCommandMessage("");
    dialogRef.current?.showModal();
  }

  async function copyChecksum() {
    try {
      await copyText(hash ?? "", dialogRef.current!);
      setMessage("Checksum copied.");
    } catch {
      setMessage("Copy unavailable. Select and copy the checksum above.");
    }
  }

  async function copyCommand() {
    try {
      await copyText(command, dialogRef.current!);
      setCommandMessage("Command copied.");
    } catch {
      setCommandMessage("Copy unavailable. Select and copy the command above.");
    }
  }

  return (
    <div className="mt-5">
      <div className="flex flex-wrap items-center gap-3">
        <a href={zip} download onClick={openVerification} className="inline-flex min-h-11 items-center gap-2 rounded-md bg-navy-800 px-5 py-3 text-sm font-medium text-surface transition-colors hover:bg-teal">
          <span aria-hidden="true">↓</span> Download code <span className="font-mono text-xs">ZIP</span>
        </a>
        {hash && filename && <button type="button" aria-haspopup="dialog" aria-controls={panelId} onClick={openVerification} className="min-h-11 rounded-md px-2 text-sm font-medium text-teal hover:underline">
          Verify download
        </button>}
      </div>
      {hash && filename && <dialog
        ref={dialogRef}
        id={panelId}
        aria-labelledby={`${panelId}-title`}
        onPointerDown={(event) => {
          const rect = event.currentTarget.getBoundingClientRect();
          startedOutside.current = event.target === event.currentTarget && (
            event.clientX < rect.left || event.clientX > rect.right ||
            event.clientY < rect.top || event.clientY > rect.bottom
          );
        }}
        onPointerCancel={() => { startedOutside.current = false; }}
        onClick={(event) => {
          const outside = startedOutside.current;
          startedOutside.current = false;
          const rect = event.currentTarget.getBoundingClientRect();
          if (outside && event.target === event.currentTarget && (
            event.clientX < rect.left || event.clientX > rect.right ||
            event.clientY < rect.top || event.clientY > rect.bottom
          )) event.currentTarget.close();
        }}
        onClose={() => { startedOutside.current = false; }}
        className="fixed inset-0 m-auto max-h-[90dvh] w-[calc(100%-2rem)] max-w-xl overflow-y-auto rounded-2xl border border-navy-700 bg-surface p-0 text-navy-800 shadow-2xl backdrop:bg-navy-900/80 backdrop:backdrop-blur-sm"
      >
        <header className="image-canvas on-dark border-b border-navy-700 px-5 py-6 sm:px-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-cyan-bright">Download / Integrity check</p>
              <h2 id={`${panelId}-title`} className="mt-3 font-display text-2xl font-bold tracking-tight text-surface">Verify your code.</h2>
              <p className="mt-2 text-sm text-codefg">A quick check before you run it.</p>
            </div>
            <button type="button" autoFocus onClick={() => dialogRef.current?.close()} aria-label="Close verification" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-navy-600 text-codefg transition-colors hover:border-cyan hover:bg-navy-800 hover:text-cyan-bright">
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5"><path d="m6 6 12 12M18 6 6 18" /></svg>
            </button>
          </div>
          <div className="mt-5 inline-flex max-w-full items-center gap-2 rounded-md border border-navy-600 bg-navy-900 px-3 py-2 font-mono text-xs text-cyan-soft">
            <span aria-hidden="true" className="text-slate-faint">FILE</span>
            <span className="min-w-0 break-all">{filename}</span>
          </div>
        </header>
        <div className="space-y-6 p-5 sm:p-7">
          <section aria-labelledby={`${panelId}-step-one`}>
            <h3 id={`${panelId}-step-one`} className="flex items-center gap-3 text-sm font-semibold">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-paleblue font-mono text-xs text-teal">01</span>
              Get the file's fingerprint
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate">Extract the ZIP. Open PowerShell in the folder containing the Python file, then run:</p>
            <div className="on-dark mt-3 overflow-hidden rounded-lg border border-navy-700 bg-navy-900">
              <div className="flex items-center justify-between border-b border-navy-700 pl-4 pr-2 text-cyan-soft">
                <span className="font-mono text-[10px] uppercase tracking-widest">PowerShell</span>
                <button type="button" onClick={copyCommand} aria-label="Copy PowerShell command" title="Copy PowerShell command" className="flex h-11 w-11 items-center justify-center rounded-md transition-colors hover:bg-navy-700 hover:text-cyan-bright">
                  <CopyIcon copied={commandMessage === "Command copied."} dark />
                </button>
              </div>
              <code className="block select-all break-all p-4 font-mono text-xs leading-6 text-codefg">{command}</code>
            </div>
            <p role="status" className={commandMessage === "Command copied." ? "sr-only" : "mt-2 text-xs leading-relaxed text-teal"}>{commandMessage}</p>
          </section>
          <section aria-labelledby={`${panelId}-step-two`}>
            <h3 id={`${panelId}-step-two`} className="flex items-center gap-3 text-sm font-semibold">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-paleblue font-mono text-xs text-teal">02</span>
              Compare the values
            </h3>
            <div className="mt-3 rounded-lg border border-linecool bg-mist p-4">
              <p className="font-mono text-[10px] font-medium uppercase tracking-widest text-teal">Expected SHA-256</p>
              <code className="mt-3 block select-all break-all font-mono text-xs leading-6 text-navy-800">{hash}</code>
              <button type="button" onClick={copyChecksum} className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-md border border-linecool bg-surface px-3 text-sm font-medium text-teal transition-colors hover:border-teal hover:bg-paleblue">
                <CopyIcon copied={message === "Checksum copied."} />
                Copy checksum
              </button>
              <p role="status" className={message === "Checksum copied." ? "sr-only" : "mt-2 text-xs leading-relaxed text-teal"}>{message}</p>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-slate">Every character should match; letter casing does not matter. This checks the extracted Python file only.</p>
          </section>
        </div>
      </dialog>}
    </div>
  );
}

function CopyIcon({ copied, dark = false }: { copied: boolean; dark?: boolean }) {
  return copied ? (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`copy-success h-4 w-4 ${dark ? "text-green-400" : "text-green-700"}`}>
      <path d="m5 12 4 4L19 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ) : (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4"><rect x="8" y="8" width="12" height="12" rx="2" /><path d="M16 8V4H4v12h4" /></svg>
  );
}
