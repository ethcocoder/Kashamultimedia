export default function Badge({ color = 'green', children }) {
  const colors = {
    green: 'bg-green-400/10 text-green-400',
    amber: 'bg-amber-400/10 text-amber-400',
    red: 'bg-red-500/10 text-red-400',
    blue: 'bg-blue-500/10 text-blue-400',
  };

  const dotColors = {
    green: 'bg-green-400',
    amber: 'bg-amber-400',
    red: 'bg-red-400',
    blue: 'bg-blue-400',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${colors[color]}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dotColors[color]}`} />
      {children}
    </span>
  );
}
