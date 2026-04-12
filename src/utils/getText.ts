import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/es-mx";

dayjs.extend(relativeTime);
dayjs.locale("es-mx");

export type TextFormat =
  | "iso"
  | "age"
  | "date-long"
  | "date-short"
  | "time"
  | "time-ago"
  | "currency"
  | "currency-no-decimals"
  | "thousands"
  | "round"
  | "percent"
  | "capitalize-first"
  | "capitalize-all"
  | "truncate-20"
  | "yesno";

//eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getText(value: any, format: TextFormat): string {
  if (value === null || value === undefined || value === "") return "";

  switch (format) {
    // --- FECHAS ---
    case "iso":
      return dayjs(value).startOf("day").toISOString();

    case "date-long": {
      const formatted = dayjs(value).format("dddd, D [de] MMMM [de] YYYY");
      return formatted.charAt(0).toUpperCase() + formatted.slice(1);
    }

    case "date-short":
      return dayjs(value).format("DD/MM/YYYY");

    case "time-ago":
      return dayjs(value).fromNow();

    case "time":
      return new Date(value).toLocaleTimeString("es-MX", {
        hour: "2-digit",
        minute: "2-digit",
      });

    // --- NÚMEROS ---
    case "currency":
      return new Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: "MXN",
      }).format(Number(value));

    case "currency-no-decimals":
      return new Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: "MXN",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(Number(value));

    case "thousands":
      return Number(value).toLocaleString("es-MX");

    case "round":
      return Math.round(Number(value)).toString();

    case "percent":
      return `${(Number(value) * 100).toFixed(2)}%`;

    // --- TEXTO ---
    case "capitalize-first":
      return (
        String(value).toLowerCase().charAt(0).toUpperCase() +
        String(value).toLowerCase().slice(1)
      );

    case "capitalize-all":
      return String(value)
        .toLowerCase()
        .split(" ")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");

    case "truncate-20":
      return String(value).length > 20
        ? String(value).slice(0, 20) + "..."
        : String(value);

    case "age": {
      const birthDate = dayjs(value);
      return dayjs().diff(birthDate, "year").toString();
    }

    // --- BOOLEANOS ---
    case "yesno":
      return value ? "Si" : "No";

    default:
      return String(value);
  }
}
