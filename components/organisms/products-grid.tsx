import Image from "next/image";
import { Card } from "@/components/ui/card";

export type ProductItem = {
  ItemId: string | number;
  Name: string;
  PictureUrl: string;
  Price: number;
  Url?: string;
};

export function ProductsGrid({ items }: { items: ProductItem[] }) {
  if (!items.length) {
    return (
      <div className="rounded-2xl border border-white/5 bg-white/5 p-6 text-center text-white/60">
        Нет товаров — попробуйте другое сочетание параметров.
      </div>
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <Card key={item.ItemId} className="relative overflow-hidden border-white/10 bg-white/5 p-4 backdrop-blur">
          <div className="flex items-start gap-4">
            <div className="relative h-28 w-28 overflow-hidden rounded-xl bg-obsidian-800/60">
              <Image
                src={item.PictureUrl}
                alt={item.Name}
                fill
                className="object-cover transition duration-300 hover:scale-110"
              />
            </div>
            <div className="space-y-2">
              <p className="text-sm font-semibold text-acid-200">#{item.ItemId}</p>
              <h3 className="font-display text-lg leading-tight text-white/90">{item.Name}</h3>
              <p className="text-xl font-bold text-acid-300">{item.Price.toLocaleString("ru-RU")} ₽</p>
              {item.Url ? (
                <a
                  href={item.Url}
                  className="inline-flex items-center text-xs font-semibold text-white/70 underline decoration-acid-300/70 hover:text-acid-200"
                  target="_blank"
                  rel="noreferrer"
                >
                  Открыть карточку
                </a>
              ) : null}
            </div>
          </div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-acid-400/5" />
        </Card>
      ))}
    </div>
  );
}
