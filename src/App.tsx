import { useMemo, useState } from "react";
import { GlassPanel } from "@/components/layout/glass-panel";
import { StrategyFlow } from "@/components/layout/strategy-flow";
import { StrategySection } from "@/components/layout/strategy-section";
import ThemeToggle from "@/components/ui/theme-toggle";
import { StrategySelector } from "@/components/ui/strategy-selector";
import {
  cartPricingStrategyFlows,
  promotionStrategyFlows,
  shippingStrategyFlows,
} from "@/constants/strategy-labels";
import { getPromotion } from "@/data/services/get-promotion.service";
import { PromotionCardContext } from "@/data/strategies/promotion-card-strategy";
import {
  formatPromotionEndLabel,
  isPromotionExpired,
} from "@/utils/date.utils";
import { getCartSubtotal, getLineTotal, roundMoney } from "@/utils/cart.utils";
import { formatToCurrency } from "@/utils/number.utils";
import { getShippingOption } from "@/data/services/get-shipping-option.service";
import { ShippingOptionContext } from "@/data/strategies/shipping-option-strategy";
import {
  getSampleOrderDescription,
  getSampleOrderSubtotal,
} from "@/data/services/get-sample-order.service";
import { getCart } from "@/data/services/get-cart.service";
import { CartPricingContext } from "@/data/strategies/cart-pricing-strategy";
import { PromotionType } from "@/data/models/promotion-model";
import { ShippingOptionType } from "@/data/models/shipping-model";
import { CartPricingType } from "@/data/models/cart-model";

const promotionOptions: PromotionType[] = ["bonus", "percentage"];
const shippingOptions: ShippingOptionType[] = [
  "economy",
  "express",
  "storePickup",
];
const cartPricingOptions: CartPricingType[] = ["standard", "bulk", "bundle"];

const promotionLabels: Record<PromotionType, string> = {
  bonus: "Bônus",
  percentage: "Porcentagem",
};

const shippingLabels: Record<ShippingOptionType, string> = {
  economy: "Econômico",
  express: "Expresso",
  storePickup: "Retirada",
};

const cartPricingLabels: Record<CartPricingType, string> = {
  standard: "Padrão",
  bulk: "Volume",
  bundle: "Combo",
};

function App() {
  const [selectedPromotion, setSelectedPromotion] =
    useState<PromotionType>("bonus");
  const [selectedShipping, setSelectedShipping] =
    useState<ShippingOptionType>("economy");
  const [selectedCartPricing, setSelectedCartPricing] =
    useState<CartPricingType>("standard");

  const promotion = getPromotion(selectedPromotion);
  const promotionCardContext = useMemo(
    () => new PromotionCardContext(promotion),
    [promotion]
  );

  const shippingOption = getShippingOption(selectedShipping);
  const shippingContext = useMemo(
    () => new ShippingOptionContext(shippingOption),
    [shippingOption]
  );

  const cart = useMemo(() => getCart(), []);
  const cartPricingContext = useMemo(
    () => new CartPricingContext(selectedCartPricing, cart),
    [selectedCartPricing, cart]
  );

  const sampleOrderTotal = getSampleOrderSubtotal();
  const sampleOrderDescription = getSampleOrderDescription();
  const shippingCost = shippingContext.calculateShippingCost(sampleOrderTotal);
  const cartSubtotal = getCartSubtotal(cart);
  const cartTotal = cartPricingContext.calculateTotal();
  const hasCartAdjustment = cartSubtotal !== cartTotal;
  const promotionExpired = isPromotionExpired(promotion.endDate);
  const orderGrandTotal = roundMoney(sampleOrderTotal + shippingCost);

  return (
    <div className="page-shell">
      <div className="page-content space-y-14 animate-fade-up">
        <header className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">
              Padrão Strategy · React + TypeScript
            </p>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Comportamentos intercambiáveis no front-end
            </h1>
            <p className="max-w-2xl text-sm leading-relaxed sm:text-base muted">
              Troque a estratégia com os seletores abaixo. Cada{" "}
              <strong className="font-medium text-[var(--text-secondary)]">
                Context
              </strong>{" "}
              delega renderização e regras de negócio para uma implementação
              concreta — sem alterar o componente que consome o contexto.
            </p>
          </div>
          <ThemeToggle />
        </header>

        <StrategySection
          number="01"
          title="UI e regras com estratégias distintas"
          description="Promoções com layout diferente por tipo e frete com cálculo próprio por modalidade. O App só instancia o Context e chama os métodos expostos."
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <GlassPanel className="demo-panel glass-panel--strong">
              <p className="demo-panel__title">Cartão de promoção</p>

              <StrategyFlow flow={promotionStrategyFlows[selectedPromotion]} />

              <StrategySelector
                label="DiscountType → Estratégia"
                options={promotionOptions}
                value={selectedPromotion}
                onChange={setSelectedPromotion}
                formatLabel={(type) => promotionLabels[type]}
              />

              <GlassPanel className="promotion-preview">
                <div className="promotion-preview__top">
                  <div className="flex items-center gap-3 text-[var(--accent)]">
                    {promotionCardContext.renderIcon()}
                    <div
                      className={`promotion-preview__badge ${
                        promotionExpired
                          ? "promotion-preview__badge--expired"
                          : "promotion-preview__badge--active"
                      }`}
                    >
                      {formatPromotionEndLabel(promotion.endDate)}
                    </div>
                  </div>
                </div>

                {promotionCardContext.renderProductInfo()}

                <div className="promotion-preview__footer">
                  <h3 className="text-lg font-semibold">{promotion.title}</h3>
                  <p className="text-sm muted">{promotion.description}</p>
                  {promotionCardContext.renderDetails()}
                </div>
              </GlassPanel>
            </GlassPanel>

            <GlassPanel className="demo-panel glass-panel--strong">
              <p className="demo-panel__title">Opção de frete</p>

              <StrategyFlow flow={shippingStrategyFlows[selectedShipping]} />

              <StrategySelector
                label="OptionType → Estratégia"
                options={shippingOptions}
                value={selectedShipping}
                onChange={setSelectedShipping}
                formatLabel={(type) => shippingLabels[type]}
              />

              <GlassPanel className="p-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl glass-inset text-xl">
                    {shippingContext.renderIcon()}
                  </div>
                  <div>
                    <div className="text-lg font-semibold">
                      {shippingContext.renderName()}
                    </div>
                    <p className="mt-1 text-sm muted">
                      Pedido de referência ({sampleOrderDescription}):{" "}
                      {formatToCurrency(sampleOrderTotal)}
                    </p>
                  </div>
                </div>

                <div className="mt-4">{shippingContext.renderDetails()}</div>

                <GlassPanel variant="inset" className="mt-5 space-y-3 p-4">
                  <div className="totals-row">
                    <span>Subtotal do pedido</span>
                    <span>{formatToCurrency(sampleOrderTotal)}</span>
                  </div>
                  <div className="totals-row font-medium">
                    <span>Custo de frete</span>
                    <span className="price-positive">
                      {formatToCurrency(shippingCost)}
                    </span>
                  </div>
                  <div className="totals-row totals-row--emphasis">
                    <span>Total estimado</span>
                    <span>{formatToCurrency(orderGrandTotal)}</span>
                  </div>
                </GlassPanel>
              </GlassPanel>
            </GlassPanel>
          </div>
        </StrategySection>

        <StrategySection
          number="02"
          title="Precificação de carrinho (caso avançado)"
          description="Três estratégias de preço sobre o mesmo CartModel: desconto simples, volume por item e combo premium. A troca altera título, breakdown e total."
        >
          <GlassPanel className="demo-panel glass-panel--strong">
            <StrategyFlow flow={cartPricingStrategyFlows[selectedCartPricing]} />

            <StrategySelector
              label="CartPricingType → Estratégia"
              options={cartPricingOptions}
              value={selectedCartPricing}
              onChange={setSelectedCartPricing}
              formatLabel={(type) => cartPricingLabels[type]}
            />

            <div className="grid gap-6 xl:grid-cols-[1.2fr_1fr]">
              <div className="space-y-3">
                <GlassPanel className="flex flex-col gap-2 p-4 sm:flex-row sm:items-end sm:justify-between sm:p-5">
                  <div>
                    <p className="font-semibold">Produtos no carrinho</p>
                    <p className="text-sm muted">
                      Cliente{" "}
                      {cart.membership === "premium" ? "Premium" : "Regular"}
                      {" · "}
                      Subtotal itens {formatToCurrency(cartSubtotal)}
                    </p>
                  </div>
                  <div className="text-right">
                    {hasCartAdjustment && (
                      <p className="text-xs muted line-through">
                        {formatToCurrency(cartSubtotal)}
                      </p>
                    )}
                    <p className="text-2xl font-bold tabular-nums">
                      {formatToCurrency(cartTotal)}
                    </p>
                    <p className="text-xs muted">
                      Total ({cartPricingLabels[selectedCartPricing]})
                    </p>
                  </div>
                </GlassPanel>

                <div className="space-y-3">
                  {cart.products.map((product) => (
                    <GlassPanel key={product.id} className="product-row">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="product-row__image"
                      />
                      <div>
                        <p className="font-semibold">{product.name}</p>
                        <p className="text-sm muted">
                          {product.quantity} × {formatToCurrency(product.price)}{" "}
                          · {product.category}
                        </p>
                      </div>
                      <p className="text-right font-semibold tabular-nums">
                        {formatToCurrency(getLineTotal(product))}
                        <span className="mt-0.5 block text-xs font-normal muted">
                          tabela
                        </span>
                      </p>
                    </GlassPanel>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <GlassPanel className="surface-panel !p-5">
                  <h3 className="text-lg font-semibold">
                    {cartPricingContext.renderTitle()}
                  </h3>
                  <div className="mt-2">{cartPricingContext.renderDescription()}</div>
                </GlassPanel>

                <GlassPanel className="surface-panel !p-5">
                  {cartPricingContext.renderBreakdown()}
                </GlassPanel>
              </div>
            </div>
          </GlassPanel>
        </StrategySection>

        <footer className="glass-panel p-5 text-sm leading-relaxed muted sm:p-6">
          <p>
            <strong className="font-medium text-[var(--text-secondary)]">
              Como estender:
            </strong>{" "}
            crie uma nova classe que implementa a interface da estratégia,
            registre no mapa do Context em{" "}
            <code>index.ts</code> e exponha o novo tipo no seletor — o{" "}
            <code>App.tsx</code> permanece estável.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
