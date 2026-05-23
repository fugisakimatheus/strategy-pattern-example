import { CartPricingType } from "@/data/models/cart-model";
import { PromotionType } from "@/data/models/promotion-model";
import { ShippingOptionType } from "@/data/models/shipping-model";

export type StrategyFlow = {
  context: string;
  strategy: string;
  methods: string[];
};

export const promotionStrategyFlows: Record<PromotionType, StrategyFlow> = {
  bonus: {
    context: "PromotionCardContext",
    strategy: "BonusPromotionStrategy",
    methods: ["renderProductInfo()", "renderIcon()", "renderDetails()"],
  },
  percentage: {
    context: "PromotionCardContext",
    strategy: "PercentagePromotionStrategy",
    methods: ["renderProductInfo()", "renderIcon()", "renderDetails()"],
  },
};

export const shippingStrategyFlows: Record<ShippingOptionType, StrategyFlow> = {
  economy: {
    context: "ShippingOptionContext",
    strategy: "EconomyShippingStrategy",
    methods: [
      "renderName()",
      "renderIcon()",
      "renderDetails()",
      "calculateShippingCost()",
    ],
  },
  express: {
    context: "ShippingOptionContext",
    strategy: "ExpressShippingStrategy",
    methods: [
      "renderName()",
      "renderIcon()",
      "renderDetails()",
      "calculateShippingCost()",
    ],
  },
  storePickup: {
    context: "ShippingOptionContext",
    strategy: "StorePickupShippingStrategy",
    methods: [
      "renderName()",
      "renderIcon()",
      "renderDetails()",
      "calculateShippingCost()",
    ],
  },
};

export const cartPricingStrategyFlows: Record<CartPricingType, StrategyFlow> = {
  standard: {
    context: "CartPricingContext",
    strategy: "StandardCartPricingStrategy",
    methods: ["renderTitle()", "renderDescription()", "renderBreakdown()", "calculateTotal()"],
  },
  bulk: {
    context: "CartPricingContext",
    strategy: "BulkCartPricingStrategy",
    methods: ["renderTitle()", "renderDescription()", "renderBreakdown()", "calculateTotal()"],
  },
  bundle: {
    context: "CartPricingContext",
    strategy: "BundleCartPricingStrategy",
    methods: ["renderTitle()", "renderDescription()", "renderBreakdown()", "calculateTotal()"],
  },
};
