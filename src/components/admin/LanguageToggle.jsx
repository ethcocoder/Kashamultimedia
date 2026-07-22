export default function LanguageToggle({ value, onChange }) {
  return (
    <div className="flex rounded-xl bg-white/5 p-0.5">
      <button
        type="button"
        onClick={() => onChange('en')}
        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
          value === 'en'
            ? 'bg-primary text-white'
            : 'text-white/40 hover:text-white/60'
        }`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => onChange('am')}
        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
          value === 'am'
            ? 'bg-primary text-white'
            : 'text-white/40 hover:text-white/60'
        }`}
      >
        አማ
      </button>
    </div>
  );
}
