import type { StrategyFlow } from "@/constants/strategy-labels";

type StrategyFlowProps = {
  flow: StrategyFlow;
};

export function StrategyFlow({ flow }: StrategyFlowProps) {
  return (
    <div className="strategy-flow" role="note" aria-label="Fluxo do padrão Strategy">
      <div className="strategy-flow__row">
        <span className="strategy-flow__label">Context</span>
        <code className="strategy-flow__code">{flow.context}</code>
        <span className="strategy-flow__arrow" aria-hidden>
          →
        </span>
        <span className="strategy-flow__label">Strategy</span>
        <code className="strategy-flow__code strategy-flow__code--accent">
          {flow.strategy}
        </code>
      </div>
      <div className="strategy-flow__methods">
        {flow.methods.map((method) => (
          <code key={method} className="strategy-flow__method">
            {method}
          </code>
        ))}
      </div>
    </div>
  );
}
