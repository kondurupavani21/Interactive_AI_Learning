export default function ProgressRing({ value, label }) {
  const clamped = Math.min(100, Math.max(0, value));
  return (
    <div className="progress-ring" style={{ '--progress': `${clamped}%` }}>
      <div>
        <strong>{clamped}%</strong>
        <span>{label}</span>
      </div>
    </div>
  );
}
