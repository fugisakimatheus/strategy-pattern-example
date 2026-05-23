import { CartModel } from "@/data/models/cart-model";
import { getCartSubtotal, roundMoney } from "@/utils/cart.utils";
import { formatToCurrency } from "@/utils/number.utils";
import { FaBoxes } from "react-icons/fa";
import { CartPricingStrategy } from "./strategy";

export class BulkCartPricingStrategy implements CartPricingStrategy {
  constructor(private readonly cart: CartModel) {
    this.cart = cart;
  }

  renderTitle(): React.ReactNode {
    return <span>Desconto por Volume</span>;
  }

  renderDescription(): React.ReactNode {
    return (
      <p className="text-sm muted">
        Desconto por item: 12% a partir de 5 unidades e 20% a partir de 10
        unidades do mesmo produto.
      </p>
    );
  }

  private calculateDiscountForItem(price: number, quantity: number): number {
    const lineTotal = price * quantity;
    if (quantity >= 10) return roundMoney(lineTotal * 0.2);
    if (quantity >= 5) return roundMoney(lineTotal * 0.12);
    return 0;
  }

  renderBreakdown(): React.ReactNode {
    const productRows = this.cart.products.map((product) => {
      const itemTotal = roundMoney(product.price * product.quantity);
      const discount = this.calculateDiscountForItem(
        product.price,
        product.quantity
      );
      const finalPrice = roundMoney(itemTotal - discount);

      return (
        <div key={product.id} className="strategy-inset-item grid grid-cols-[1fr_auto] gap-4">
          <div>
            <div className="font-semibold">{product.name}</div>
            <div className="text-xs muted">
              {product.quantity} × {formatToCurrency(product.price)}
              {discount > 0 && (
                <span className="price-positive">
                  {" "}
                  · {product.quantity >= 10 ? "20%" : "12%"} off
                </span>
              )}
            </div>
          </div>
          <div className="text-right">
            <div>{formatToCurrency(finalPrice)}</div>
            {discount > 0 && (
              <div className="text-xs price-positive">-{formatToCurrency(discount)}</div>
            )}
          </div>
        </div>
      );
    });

    const subtotal = getCartSubtotal(this.cart);
    const totalDiscount = roundMoney(
      this.cart.products.reduce(
        (acc, product) =>
          acc + this.calculateDiscountForItem(product.price, product.quantity),
        0
      )
    );
    const finalTotal = roundMoney(subtotal - totalDiscount);

    return (
      <div className="space-y-4 text-sm">
        <div className="surface-inset space-y-3">
          <div className="flex items-center gap-2 font-semibold">
            <FaBoxes />
            Detalhamento por produto
          </div>
          {productRows}
          <div className="totals-row border-t pt-3">
            <span>Subtotal</span>
            <span>{formatToCurrency(subtotal)}</span>
          </div>
          <div className="totals-row price-positive">
            <span>Total desconto</span>
            <span>-{formatToCurrency(totalDiscount)}</span>
          </div>
          <div className="totals-row totals-row--emphasis !text-sm">
            <span>Total final</span>
            <span>{formatToCurrency(finalTotal)}</span>
          </div>
        </div>
      </div>
    );
  }

  calculateTotal(): number {
    const subtotal = getCartSubtotal(this.cart);
    const totalDiscount = this.cart.products.reduce(
      (acc, product) =>
        acc + this.calculateDiscountForItem(product.price, product.quantity),
      0
    );
    return roundMoney(subtotal - totalDiscount);
  }
}
