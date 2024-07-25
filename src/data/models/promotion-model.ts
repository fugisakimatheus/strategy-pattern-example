/* eslint-disable @typescript-eslint/no-explicit-any */
export type PromotionType = "percentage" | "bonus";

export interface PromotionProductModel {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

export interface BonusPromotionRuleModel {
  minQuantity: number;
  maxBonusQuantity: number;
  bonusProducts: PromotionProductModel[];
}

export interface PercentagePromotionRuleModel {
  discountPercent: number;
  minQuantity: number;
}

export interface PromotionModel<Rule = any> {
  id: number;
  title: string;
  description: string;
  product: PromotionProductModel;
  discountType: PromotionType;
  rule: Rule;
  endDate: string;
  createdAt: string;
}
