import { ShippingOptionModel, ShippingOptionType } from "@/data/models/shipping-model";

export const getShippingOption = (
  optionType: ShippingOptionType
): ShippingOptionModel => {
  const options: Record<ShippingOptionType, ShippingOptionModel> = {
    economy: {
      id: 1,
      title: "Frete Econômico",
      description: "Entrega em até 12 dias úteis com baixo custo.",
      optionType: "economy",
      baseCost: 4.99,
      deliveryTime: "10-12 dias úteis",
      details:
        "Melhor para compras planejadas: custo reduzido e prazo estendido.",
    },
    express: {
      id: 2,
      title: "Frete Expresso",
      description: "Entrega ágil em até 3 dias úteis.",
      optionType: "express",
      baseCost: 12.99,
      deliveryTime: "2-3 dias úteis",
      details:
        "Ideal para pedidos urgentes, com um pequeno adicional de preço.",
    },
    storePickup: {
      id: 3,
      title: "Retirada na Loja",
      description: "Retire o pedido em uma loja próxima sem custo de frete.",
      optionType: "storePickup",
      baseCost: 0,
      deliveryTime: "Próxima hora",
      details:
        "Grátis para pedidos a partir de R$ 50; abaixo disso, taxa fixa de R$ 5,99 na retirada.",
    },
  };

  return options[optionType];
};
