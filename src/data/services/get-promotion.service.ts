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
      imageUrl:
        "https://www.imagensempng.com.br/wp-content/uploads/2022/01/2442.png",
    },
    rule: {
      minQuantity: 1,
      maxBonusQuantity: 1,
      bonusProducts: [
        {
          id: 2,
          name: "Fanta laranja 2L",
          price: 8.69,
          imageUrl:
            "https://media.soujusto.com.br/products/Refrigerante_Fanta_Laranja_1500Ml.jpg",
        },
        {
          id: 3,
          name: "Schweppes 1,5L",
          price: 9.47,
          imageUrl:
            "https://rafasupervarejao.com.br/28255/7894900321753-refrigerante-citrus-schweppes-15l.jpg",
        },
        {
          id: 4,
          name: "Del Valle uva 1L",
          price: 12.73,
          imageUrl:
            "https://media.soujusto.com.br/products/DEL_VALLE_N%C3%A9ctar_Uva_Sem_A%C3%A7%C3%BAcar_TP_1_Litro.png",
        },
      ],
    },
    endDate: "2024-08-20T23:59",
    createdAt: "2024-07-24T10:56",
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
      imageUrl:
        "https://www.imagensempng.com.br/wp-content/uploads/2022/01/2442.png",
    },
    rule: {
      discountPercent: 0.25,
      minQuantity: 2,
    },
    endDate: "2024-08-20T23:59",
    createdAt: "2024-07-24T10:56",
  };

  return promotionType === "bonus" ? bonusPromotion : percentagePromotion;
};
