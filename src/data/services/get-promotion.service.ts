import {
  BonusPromotionRuleModel,
  PercentagePromotionRuleModel,
  PromotionModel,
  PromotionType,
} from "@/data/models/promotion-model";

export const getPromotion = (promotionType: PromotionType) => {
  const bonusPromotion: PromotionModel<BonusPromotionRuleModel> = {
    id: 1,
    title: "Compre 1 ganhe outro",
    description:
      "Na compra de uma coca cola lata 355ml, ganhe um dos produtos listados.",
    discountType: "bonus",
    product: {
      id: 1,
      name: "Coca cola lata 355ml",
      price: 4.99,
      imageUrl: "/products/coca-cola-350ML.png",
    },
    rule: {
      minQuantity: 1,
      maxBonusQuantity: 1,
      bonusProducts: [
        {
          id: 2,
          name: "Fanta laranja 2L",
          price: 8.69,
          imageUrl: "/products/fanta-laranja-2l.png",
        },
        {
          id: 3,
          name: "Schweppes 1,5L",
          price: 9.47,
          imageUrl: "/products/schweppes-1.5L.png",
        },
        {
          id: 4,
          name: "Del Valle uva 1L",
          price: 8.5,
          imageUrl: "/products/del-valle-1l-uva.png",
        },
      ],
    },
    endDate: "2026-08-20T23:59",
    createdAt: "2026-05-01T10:00",
  };

  const percentagePromotion: PromotionModel<PercentagePromotionRuleModel> = {
    id: 2,
    title: "Desconto de 25%",
    description:
      "Desconto de 25% na compra de 2 ou mais Coca colas lata 355ml.",
    discountType: "percentage",
    product: {
      id: 1,
      name: "Coca cola lata 355ml",
      price: 4.99,
      imageUrl: "/products/coca-cola-350ML.png",
    },
    rule: {
      discountPercent: 0.25,
      minQuantity: 2,
    },
    endDate: "2026-09-15T23:59",
    createdAt: "2026-05-01T10:00",
  };

  return promotionType === "bonus" ? bonusPromotion : percentagePromotion;
};
