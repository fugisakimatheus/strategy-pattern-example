import {
  BonusPromotionRuleModel,
  PromotionModel,
} from "@/data/models/promotion-model";
import { formatToCurrency } from "@/utils/number.utils";
import { FaGift } from "react-icons/fa6";
import { PromotionCardStrategy } from "./strategy";

export class BonusPromotionStrategy implements PromotionCardStrategy {
  constructor(
    private readonly promotion: PromotionModel<BonusPromotionRuleModel>
  ) {
    this.promotion = promotion;
  }

  renderProductInfo(): React.ReactNode {
    return (
      <div className="flex flex-col gap-2 p-3">
        <div className="flex flex-row items-center justify-center">
          <img
            src={this.promotion.product.imageUrl}
            className="w-[190px] h-[190px]"
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
    return <FaGift className="text-3xl text-indigo-500" />;
  }

  renderDetails(): React.ReactNode {
    return (
      <div className="flex flex-row items-center gap-3">
        {this.promotion.rule.bonusProducts.map((product) => (
          <div
            key={product.id}
            className="flex flex-col gap-2 bg-slate-100/80 rounded-md p-3"
          >
            <div className="flex flex-row items-center justify-center relative">
              <div className="text-white bg-green-600 flex flex-row items-center justify-center absolute top-0 right-0 rounded-[4px]">
                <span className=" text-xs font-bold px-2 py-[1px]">Grátis</span>
              </div>
              <img
                src={product.imageUrl}
                className="w-[70px] h-[70px]"
                alt={product.name}
              />
            </div>

            <div className="flex flex-col font-semibold text-sm">
              <span className="text-slate-700">{product.name}</span>
              <span className="text-green-600 line-through">
                {formatToCurrency(product.price)}
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
