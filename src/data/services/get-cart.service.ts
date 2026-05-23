import { CartModel } from "@/data/models/cart-model";

/**
 * Carrinho de demonstração:
 * - Subtotal ~R$ 101,85 (ativa desconto padrão de 5% acima de R$ 100)
 * - Coca + Fanta permitem combo na estratégia bundle
 * - Quantidades distintas para descontos por volume (bulk)
 */
export const getCart = (): CartModel => ({
  membership: "premium",
  products: [
    {
      id: 1,
      name: "Coca cola lata 355ml",
      price: 4.99,
      quantity: 10,
      category: "refrigerante",
      imageUrl: "/products/coca-cola-350ML.png",
    },
    {
      id: 2,
      name: "Fanta laranja 2L",
      price: 8.69,
      quantity: 5,
      category: "refrigerante",
      imageUrl: "/products/fanta-laranja-2l.png",
    },
    {
      id: 3,
      name: "Del Valle uva 1L",
      price: 8.5,
      quantity: 1,
      category: "suco",
      imageUrl: "/products/del-valle-1l-uva.png",
    },
  ],
});
