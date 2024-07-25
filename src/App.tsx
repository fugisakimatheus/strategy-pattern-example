import { getPromotion } from "@/data/services/get-promotion.service";
import { PromotionCardContext } from "@/data/strategies/promotion-card-strategy";
import { formatFriendlyDateDifference } from "@/utils/date.utils";
import { MdSchedule } from "react-icons/md";

function App() {
  const promotion = getPromotion("bonus");

  const promotionCardContext = new PromotionCardContext(promotion);

  return (
    <div className="flex flex-row justify-center p-6 w-full h-full">
      <div className="flex flex-row gap-4 border border-slate-300 bg-white shadow-sm rounded-md p-4 relative">
        <div className="flex flex-row items-center justify-center absolute top-0 right-0 bg-red-500 text-white font-bold px-2 py-1 rounded-bl-md rounded-tr-md">
          <MdSchedule className="mr-1.5 h-5 w-5" />
          Termina {formatFriendlyDateDifference(new Date(promotion.endDate))}
        </div>

        <div className="absolute top-0 left-0 p-4">
          {promotionCardContext.renderIcon()}
        </div>

        {promotionCardContext.renderProductInfo()}

        <div className="flex flex-col justify-between">
          <div className="flex flex-col gap-2 pt-6">
            <span className="text-2xl font-bold text-slate-600">
              Promoção: {promotion.title}
            </span>
            <span className="text-slate-500 font-semibold">
              {promotion.description}
            </span>
          </div>

          <div className="mb-4">{promotionCardContext.renderDetails()}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
