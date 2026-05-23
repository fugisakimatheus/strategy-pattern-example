import { CartModel } from "@/data/models/cart-model";

export interface CartPricingStrategy {
  renderTitle(): React.ReactNode;
  renderDescription(): React.ReactNode;
  renderBreakdown(): React.ReactNode;
  calculateTotal(): number;
}

export type CartPricingStrategyConstructor = new (cart: CartModel) => CartPricingStrategy;
