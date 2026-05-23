import { CartModel, CartProductModel } from "@/data/models/cart-model";

/** Arredonda valores monetários para 2 casas decimais (evita drift de ponto flutuante). */
export function roundMoney(value: number): number {
  return Math.round(value * 100) / 100;
}

export function getLineTotal(product: CartProductModel): number {
  return roundMoney(product.price * product.quantity);
}

export function getCartSubtotal(cart: CartModel): number {
  return roundMoney(
    cart.products.reduce((acc, product) => acc + getLineTotal(product), 0)
  );
}
