import { formatDistanceToNow, isPast } from "date-fns";
import { ptBR } from "date-fns/locale";

export type DateType = string | number | Date;

export function formatFriendlyDateDifference(date: DateType): string {
  return formatDistanceToNow(date, { addSuffix: true, locale: ptBR });
}

export function isPromotionExpired(endDate: DateType): boolean {
  return isPast(new Date(endDate));
}

export function formatPromotionEndLabel(endDate: DateType): string {
  const distance = formatFriendlyDateDifference(endDate);
  return isPromotionExpired(endDate) ? `Encerrada ${distance}` : `Termina ${distance}`;
}
