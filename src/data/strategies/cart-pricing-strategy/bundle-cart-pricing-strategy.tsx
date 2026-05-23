import { CartModel } from "@/data/models/cart-model";
import { getCartSubtotal, roundMoney } from "@/utils/cart.utils";
import { formatToCurrency } from "@/utils/number.utils";
import { FaGift } from "react-icons/fa";
import { CartPricingStrategy } from "./strategy";

const BUNDLE_DISCOUNT_RATE = 0.15;
const PREMIUM_DISCOUNT_RATE = 0.05;

export class BundleCartPricingStrategy implements CartPricingStrategy {
  constructor(private readonly cart: CartModel) {
    this.cart = cart;
  }

  renderTitle(): React.ReactNode {
    return <span>Precificação de Combo Premium</span>;
  }

  renderDescription(): React.ReactNode {
    return (
      <p className="text-sm muted">
        15% de desconto nos itens Coca + Fanta quando comprados juntos. Clientes
        premium ganham mais 5% sobre o subtotal do carrinho.
      </p>
    );
  }

  private hasBundle(): boolean {
    const productNames = this.cart.products.map((product) =>
      product.name.toLowerCase()
    );
    return (
      productNames.some((name) => name.includes("coca")) &&
      productNames.some((name) => name.includes("fanta"))
    );
  }

  private getBundleDiscount(): number {
    if (!this.hasBundle()) return 0;
    const bundleItems = this.cart.products.filter(
      (product) =>
        product.name.toLowerCase().includes("coca") ||
        product.name.toLowerCase().includes("fanta")
    );
    const bundleTotal = bundleItems.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0
    );
    return roundMoney(bundleTotal * BUNDLE_DISCOUNT_RATE);
  }

  private getPremiumDiscount(subtotal: number): number {
    return this.cart.membership === "premium"
      ? roundMoney(subtotal * PREMIUM_DISCOUNT_RATE)
      : 0;
  }

  renderBreakdown(): React.ReactNode {
    const subtotal = getCartSubtotal(this.cart);
    const bundleDiscount = this.getBundleDiscount();
    const premiumDiscount = this.getPremiumDiscount(subtotal);
    const total = roundMoney(subtotal - bundleDiscount - premiumDiscount);

    return (
      <div className="space-y-4 text-sm">
        <div className="surface-inset">
          <div className="flex items-center gap-2 font-semibold">
            <FaGift />
            Promoção de combo e benefícios premium
          </div>
          <div className="mt-3 space-y-2">
            <div className="flex items-center justify-between">
              <span>Subtotal</span>
              <span>{formatToCurrency(subtotal)}</span>
            </div>
            <div className="totals-row price-positive">
              <span>Desconto de combo (15% Coca + Fanta)</span>
              <span>
                {bundleDiscount > 0
                  ? `-${formatToCurrency(bundleDiscount)}`
                  : formatToCurrency(0)}
              </span>
            </div>
            {this.cart.membership === "premium" && (
              <div className="totals-row price-positive">
                <span>Bônus premium (5% do subtotal)</span>
                <span>-{formatToCurrency(premiumDiscount)}</span>
              </div>
            )}
            <div className="totals-row totals-row--emphasis !text-sm">
              <span>Total final</span>
              <span>{formatToCurrency(total)}</span>
            </div>
          </div>
          {this.hasBundle() && (
            <div className="strategy-callout mt-4 rounded-xl p-4 text-sm">
              <strong>Brinde incluído:</strong> Schweppes 1,5L grátis na compra
              do combo Coca + Fanta (benefício promocional, não altera o total).
            </div>
          )}
        </div>
      </div>
    );
  }

  calculateTotal(): number {
    const subtotal = getCartSubtotal(this.cart);
    return roundMoney(
      subtotal - this.getBundleDiscount() - this.getPremiumDiscount(subtotal)
    );
  }
}
