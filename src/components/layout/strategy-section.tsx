import type { ReactNode } from "react";

type StrategySectionProps = {
  number: string;
  title: string;
  description: string;
  children: ReactNode;
};

export function StrategySection({
  number,
  title,
  description,
  children,
}: StrategySectionProps) {
  return (
    <section className="strategy-section">
      <header className="strategy-section__header">
        <span className="strategy-section__number">{number}</span>
        <div>
          <h2 className="strategy-section__title">{title}</h2>
          <p className="strategy-section__description">{description}</p>
        </div>
      </header>
      {children}
    </section>
  );
}
