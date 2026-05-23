import { ShippingOptionModel, ShippingOptionType } from "@/data/models/shipping-model";
import { ShippingOptionStrategy } from "./strategy";
import { EconomyShippingStrategy } from "./economy-shipping-strategy";
import { ExpressShippingStrategy } from "./express-shipping-strategy";
import { StorePickupShippingStrategy } from "./store-pickup-shipping-strategy";

const strategiesMap: Record<
  ShippingOptionType,
  new (shippingOption: ShippingOptionModel) => ShippingOptionStrategy
> = {
  economy: EconomyShippingStrategy,
  express: ExpressShippingStrategy,
  storePickup: StorePickupShippingStrategy,
};

export class ShippingOptionContext {
  private strategy: ShippingOptionStrategy;

  constructor(shippingOption: ShippingOptionModel) {
    const Strategy = strategiesMap[shippingOption.optionType];
    this.strategy = new Strategy(shippingOption);
  }

  renderName(): React.ReactNode {
    return this.strategy.renderName();
  }

  renderIcon(): React.ReactNode {
    return this.strategy.renderIcon();
  }

  renderDetails(): React.ReactNode {
    return this.strategy.renderDetails();
  }

  calculateShippingCost(orderTotal: number): number {
    return this.strategy.calculateShippingCost(orderTotal);
  }
}
