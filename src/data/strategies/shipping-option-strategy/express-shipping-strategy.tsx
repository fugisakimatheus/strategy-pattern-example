import { ShippingOptionModel } from "@/data/models/shipping-model";
import { roundMoney } from "@/utils/cart.utils";
import { FaBolt } from "react-icons/fa";
import { ShippingOptionStrategy } from "./strategy";

export class ExpressShippingStrategy implements ShippingOptionStrategy {
  constructor(private readonly shippingOption: ShippingOptionModel) {
    this.shippingOption = shippingOption;
  }

  renderName(): React.ReactNode {
    return <span className="font-semibold">{this.shippingOption.title}</span>;
  }

  renderIcon(): React.ReactNode {
    return <FaBolt className="text-2xl text-amber-500" />;
  }

  renderDetails(): React.ReactNode {
    return (
      <div className="space-y-2 text-sm muted">
        <p>{this.shippingOption.description}</p>
        <p>{this.shippingOption.details}</p>
        <p>Prazo: {this.shippingOption.deliveryTime}</p>
      </div>
    );
  }

  calculateShippingCost(orderTotal: number): number {
    return roundMoney(this.shippingOption.baseCost + orderTotal * 0.03);
  }
}
