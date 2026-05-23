import { roundMoney } from "@/utils/cart.utils";

/** Pedido de referência do Ex. 1 — alinhado ao produto da promoção (Coca 355ml). */
const SAMPLE_PRODUCT_PRICE = 4.99;
const SAMPLE_PRODUCT_QUANTITY = 18;

export const getSampleOrderSubtotal = (): number =>
  roundMoney(SAMPLE_PRODUCT_PRICE * SAMPLE_PRODUCT_QUANTITY);

export const getSampleOrderDescription = (): string =>
  `${SAMPLE_PRODUCT_QUANTITY} unidades de Coca cola lata 355ml`;
