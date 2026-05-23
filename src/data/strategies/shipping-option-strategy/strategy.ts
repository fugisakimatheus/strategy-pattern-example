export interface ShippingOptionStrategy {
  renderName(): React.ReactNode;
  renderIcon(): React.ReactNode;
  renderDetails(): React.ReactNode;
  calculateShippingCost(orderTotal: number): number;
}

export type ShippingOptionStrategyConstructor = new (
  shippingOption: import("@/data/models/shipping-model").ShippingOptionModel
) => ShippingOptionStrategy;
