import {
  PercentagePromotionRuleModel,
  PromotionModel,
} from "@/data/models/promotion-model";
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
            className="w-[120px] h-[120px]"
            alt={this.promotion.product.name}
          />
        </div>

        <div className="flex flex-col font-semibold">
          <span className="text-slate-700 text-lg">
            {this.promotion.product.name}
          </span>
          <span className="text-green-600 text-lg">
            {formatToCurrency(this.promotion.product.price)}
          </span>
        </div>
      </div>
    );
  }

  renderIcon(): React.ReactNode {
    return <RiDiscountPercentFill className="text-3xl text-green-600" />;
  }

  renderDetails(): React.ReactNode {
    const discountValue =
      this.promotion.product.price * this.promotion.rule.discountPercent;

    const newPrice = this.promotion.product.price - discountValue;

    return (
      <div className="flex flex-col w-full justify-start h-[66px]">
        <div className="flex flex-row items-center justify-between gap-4">
          <span className="text-green-600 font-semibold line-through">
            {formatToCurrency(this.promotion.product.price)}
          </span>
          <span className="text-green-600 font-semibold">
            {formatToCurrency(newPrice)}
          </span>
        </div>
        <Progress value={50} className="w-full" />
      </div>
    );
  }
}
