import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

export type DateType = string | number | Date;

export function formatFriendlyDateDifference(date: DateType): string {
  return formatDistanceToNow(date, { addSuffix: true, locale: ptBR });
}
