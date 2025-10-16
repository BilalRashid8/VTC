import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

type RouteItem = { from: string; to: string; berline: number; van: number };

const TOP5: RouteItem[] = [
  { from: "Paris",             to: "Charles de Gaulle", berline: 90,  van: 110 },
  { from: "Paris",             to: "Orly",              berline: 80,  van: 100 },
  { from: "Paris",             to: "Disneyland",        berline: 75,  van: 100 },
  { from: "Charles de Gaulle", to: "Disneyland",        berline: 70,  van: 90  },
  { from: "Orly",              to: "Disneyland",        berline: 90,  van: 110 },
];

// util: affiche "Paris ↔ CDG"
const twoWay = (a: string, b: string) => `${a} ↔ ${b}`;

export default function TopRoutes() {
  const { t } = useTranslation();

  return (
    <section id="prices" className="scroll-mt-24 py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Titre + sous-titre */}
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            {t("topRoutes.title")}
          </h2>
          <p className="mt-2 text-gray-600">
            {t("topRoutes.subtitle")}
          </p>
        </div>

        {/* Grid cartes */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TOP5.map((r) => (
            <article
              key={twoWay(r.from, r.to)}
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-lg font-semibold text-gray-900">
                {twoWay(r.from, r.to)}
              </h3>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center rounded-full border px-3 py-1 text-sm">
                  <span className="font-medium">{t("topRoutes.sedan")}</span>
                  <span className="mx-1 text-gray-300">•</span>
                  <span className="text-gray-800">
                    {t("topRoutes.from")} {r.berline} €
                  </span>
                </span>
                <span className="inline-flex items-center rounded-full border px-3 py-1 text-sm">
                  <span className="font-medium">{t("topRoutes.van")}</span>
                  <span className="mx-1 text-gray-300">•</span>
                  <span className="text-gray-800">
                    {t("topRoutes.from")} {r.van} €
                  </span>
                </span>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <p className="text-xs text-gray-500">
                  {t("topRoutes.badge")}
                </p>
                <Link
                  to={`/book?from=${encodeURIComponent(r.from)}&to=${encodeURIComponent(r.to)}`}
                  className="inline-flex items-center justify-center rounded-full bg-[#FEB21A] text-brown-900 font-semibold px-4 py-2 hover:brightness-95 transition"
                  aria-label={`${t("topRoutes.reserve")} ${twoWay(r.from, r.to)}`}
                >
                  {t("topRoutes.reserve")}
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Bandeau réassurance */}
        <div className="mt-8 rounded-2xl bg-amber-50 border border-amber-200 p-4 text-center text-sm text-amber-900">
          {t("topRoutes.reassurance")}
        </div>
      </div>
    </section>
  );
}
