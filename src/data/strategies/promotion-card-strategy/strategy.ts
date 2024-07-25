export interface PromotionCardStrategy {
  renderProductInfo(): React.ReactNode;
  renderIcon(): React.ReactNode;
  renderDetails(): React.ReactNode;
}
