import { CartModel } from "@/data/models/cart-model";
import { getCartSubtotal, roundMoney } from "@/utils/cart.utils";
import { formatToCurrency } from "@/utils/number.utils";
import { FaRegCalendarCheck } from "react-icons/fa";
import { CartPricingStrategy } from "./strategy";

const STANDARD_DISCOUNT_THRESHOLD = 100;
const STANDARD_DISCOUNT_RATE = 0.05;

export class StandardCartPricingStrategy implements CartPricingStrategy {
  constructor(private readonly cart: CartModel) {
    this.cart = cart;
  }

  private getDiscount(subtotal: number): number {
    return subtotal >= STANDARD_DISCOUNT_THRESHOLD
      ? roundMoney(subtotal * STANDARD_DISCOUNT_RATE)
      : 0;
  }

  renderTitle(): React.ReactNode {
    return <span>Precificação Padrão</span>;
  }

  renderDescription(): React.ReactNode {
    return (
      <p className="text-sm muted">
        Desconto de 5% quando o subtotal do carrinho atinge{" "}
        {formatToCurrency(STANDARD_DISCOUNT_THRESHOLD)} ou mais. Regra simples e
        previsível para pedidos grandes.
      </p>
    );
  }

  renderBreakdown(): React.ReactNode {
    const subtotal = getCartSubtotal(this.cart);
    const discount = this.getDiscount(subtotal);
    const total = roundMoney(subtotal - discount);

    return (
      <div className="space-y-4 text-sm">
        <div className="surface-inset">
          <div className="flex items-center gap-2 font-semibold">
            <FaRegCalendarCheck />
            <span>Resumo de preços</span>
          </div>
          <div className="mt-3 space-y-2">
            <div className="flex items-center justify-between">
              <span>Subtotal</span>
              <span>{formatToCurrency(subtotal)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>
                Desconto padrão (5% acima de{" "}
                {formatToCurrency(STANDARD_DISCOUNT_THRESHOLD)})
              </span>
              <span className={discount > 0 ? "price-positive" : ""}>
                {discount > 0 ? `-${formatToCurrency(discount)}` : formatToCurrency(0)}
              </span>
            </div>
            <div className="totals-row totals-row--emphasis !text-sm">
              <span>Total final</span>
              <span>{formatToCurrency(total)}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  calculateTotal(): number {
    const subtotal = getCartSubtotal(this.cart);
    return roundMoney(subtotal - this.getDiscount(subtotal));
  }
}
