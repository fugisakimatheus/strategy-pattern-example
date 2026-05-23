export type CartPricingType = "standard" | "bulk" | "bundle";

export interface CartProductModel {
  id: number;
  name: string;
  price: number;
  quantity: number;
  category: string;
  imageUrl: string;
}

export interface CartModel {
  membership: "regular" | "premium";
  products: CartProductModel[];
}
