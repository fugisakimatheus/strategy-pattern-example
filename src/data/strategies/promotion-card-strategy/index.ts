import { PromotionModel, PromotionType } from "@/data/models/promotion-model";
import { PromotionCardStrategy } from "./strategy";
import { BonusPromotionStrategy } from "./bonus-promotion-strategy";
import { PercentagePromotionStrategy } from "./percentage-promotion-strategy";

type PromotionStrategies =
  | typeof BonusPromotionStrategy
  | typeof PercentagePromotionStrategy;

export class PromotionCardContext {
  private strategy: PromotionCardStrategy;

  constructor(promotion: PromotionModel) {
    const strategiesMap: Record<PromotionType, PromotionStrategies> = {
      bonus: BonusPromotionStrategy,
      percentage: PercentagePromotionStrategy,
    };
    const Strategy = strategiesMap[promotion.discountType];
    this.strategy = new Strategy(promotion);
  }

  renderProductInfo(): React.ReactNode {
    return this.strategy.renderProductInfo();
  }

  renderIcon(): React.ReactNode {
    return this.strategy.renderIcon();
  }

  renderDetails(): React.ReactNode {
    return this.strategy.renderDetails();
  }
}
