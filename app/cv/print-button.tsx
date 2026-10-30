'use client';
export default function PrintButton() {
  return (
    <button className="button red-button" onClick={() => window.print()}>
      Print / save as PDF ↓
    </button>
  );
}
