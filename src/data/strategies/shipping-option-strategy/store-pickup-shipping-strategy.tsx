import { ShippingOptionModel } from "@/data/models/shipping-model";
import { roundMoney } from "@/utils/cart.utils";
import { FaStore } from "react-icons/fa";
import { ShippingOptionStrategy } from "./strategy";

export class StorePickupShippingStrategy implements ShippingOptionStrategy {
  constructor(private readonly shippingOption: ShippingOptionModel) {
    this.shippingOption = shippingOption;
  }

  renderName(): React.ReactNode {
    return <span className="font-semibold">{this.shippingOption.title}</span>;
  }

  renderIcon(): React.ReactNode {
    return <FaStore className="text-2xl text-[var(--accent)]" />;
  }

  renderDetails(): React.ReactNode {
    return (
      <div className="space-y-2 text-sm muted">
        <p>{this.shippingOption.description}</p>
        <p>{this.shippingOption.details}</p>
        <p>Disponível: {this.shippingOption.deliveryTime}</p>
      </div>
    );
  }

  calculateShippingCost(orderTotal: number): number {
    return orderTotal >= 50 ? 0 : roundMoney(5.99);
  }
}
