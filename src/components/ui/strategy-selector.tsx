type StrategySelectorProps<T extends string> = {
  label: string;
  options: readonly T[];
  value: T;
  onChange: (value: T) => void;
  formatLabel: (value: T) => string;
};

export function StrategySelector<T extends string>({
  label,
  options,
  value,
  onChange,
  formatLabel,
}: StrategySelectorProps<T>) {
  return (
    <div className="strategy-selector">
      <span className="strategy-selector__label">{label}</span>
      <div className="strategy-selector__options" role="group" aria-label={label}>
        {options.map((option) => {
          const selected = value === option;
          return (
            <button
              key={option}
              type="button"
              aria-pressed={selected}
              onClick={() => onChange(option)}
              className={`strategy-pill ${selected ? "strategy-pill--selected" : "strategy-pill--unselected"}`}
            >
              {formatLabel(option)}
            </button>
          );
        })}
      </div>
    </div>
  );
}
