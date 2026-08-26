// Signature visual element: the two interlocking rings from the Duran
// Imports emblem, rendered as ambient line-art. Purely decorative.
export default function RingMotif({ className = "" }) {
  return (
    <svg
      viewBox="0 0 400 400"
      className={className}
      aria-hidden="true"
      fill="none"
    >
      <circle
        cx="170"
        cy="200"
        r="150"
        stroke="var(--color-gold)"
        strokeWidth="1.5"
        opacity="0.55"
      />
      <circle
        cx="230"
        cy="200"
        r="150"
        stroke="var(--color-silver)"
        strokeWidth="1.5"
        opacity="0.35"
      />
    </svg>
  );
}
