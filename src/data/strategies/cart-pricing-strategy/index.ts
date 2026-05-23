import { CartModel, CartPricingType } from "@/data/models/cart-model";
import { CartPricingStrategy } from "./strategy";
import { StandardCartPricingStrategy } from "./standard-cart-pricing-strategy";
import { BulkCartPricingStrategy } from "./bulk-cart-pricing-strategy";
import { BundleCartPricingStrategy } from "./bundle-cart-pricing-strategy";

const strategiesMap: Record<CartPricingType, new (cart: CartModel) => CartPricingStrategy> = {
  standard: StandardCartPricingStrategy,
  bulk: BulkCartPricingStrategy,
  bundle: BundleCartPricingStrategy,
};

export class CartPricingContext {
  private strategy: CartPricingStrategy;

  constructor(type: CartPricingType, cart: CartModel) {
    const Strategy = strategiesMap[type];
    this.strategy = new Strategy(cart);
  }

  renderTitle(): React.ReactNode {
    return this.strategy.renderTitle();
  }

  renderDescription(): React.ReactNode {
    return this.strategy.renderDescription();
  }

  renderBreakdown(): React.ReactNode {
    return this.strategy.renderBreakdown();
  }

  calculateTotal(): number {
    return this.strategy.calculateTotal();
  }
}
