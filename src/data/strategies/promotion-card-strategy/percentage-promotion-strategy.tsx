import {
  PercentagePromotionRuleModel,
  PromotionModel,
} from "@/data/models/promotion-model";
import { roundMoney } from "@/utils/cart.utils";
import { formatToCurrency } from "@/utils/number.utils";
import { RiDiscountPercentFill } from "react-icons/ri";
import { PromotionCardStrategy } from "./strategy";
import { Progress } from "@/components/ui/progress";

export class PercentagePromotionStrategy implements PromotionCardStrategy {
  constructor(
    private readonly promotion: PromotionModel<PercentagePromotionRuleModel>
  ) {
    this.promotion = promotion;
  }

  renderProductInfo(): React.ReactNode {
    return (
      <div className="flex flex-col gap-2 p-3">
        <div className="flex flex-row items-center justify-center">
          <img
            src={this.promotion.product.imageUrl}
            className="h-[120px] w-[120px] object-contain"
            alt={this.promotion.product.name}
          />
        </div>

        <div className="flex flex-col font-semibold">
          <span className="text-lg">{this.promotion.product.name}</span>
          <span className="text-lg price-positive">
            {formatToCurrency(this.promotion.product.price)}
          </span>
        </div>
      </div>
    );
  }

  renderIcon(): React.ReactNode {
    return <RiDiscountPercentFill className="text-3xl" />;
  }

  renderDetails(): React.ReactNode {
    const { discountPercent, minQuantity } = this.promotion.rule;
    const unitPrice = this.promotion.product.price;
    const discountedUnitPrice = roundMoney(
      unitPrice * (1 - discountPercent)
    );

    return (
      <div className="flex w-full flex-col gap-2">
        <p className="text-xs muted">
          Preço por unidade com desconto (mín. {minQuantity} un. no pedido):
        </p>
        <div className="flex flex-row items-center justify-between gap-4">
          <span className="price-strike font-semibold">
            {formatToCurrency(unitPrice)}
          </span>
          <span className="price-positive font-semibold">
            {formatToCurrency(discountedUnitPrice)}
          </span>
        </div>
        <div className="flex items-center justify-between text-xs muted">
          <span>Desconto aplicado</span>
          <span>{Math.round(discountPercent * 100)}%</span>
        </div>
        <Progress
          value={discountPercent * 100}
          className="w-full"
          aria-label={`Desconto de ${Math.round(discountPercent * 100)}%`}
        />
      </div>
    );
  }
}
