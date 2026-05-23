export type ShippingOptionType = "economy" | "express" | "storePickup";

export interface ShippingOptionModel {
  id: number;
  title: string;
  description: string;
  optionType: ShippingOptionType;
  baseCost: number;
  deliveryTime: string;
  details: string;
}
