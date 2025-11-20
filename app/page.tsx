"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import { ParameterForm, type ParameterValues } from "@/components/molecules/parameter-form";
import { ProductsGrid, type ProductItem } from "@/components/organisms/products-grid";
import { apiServer, operations, type ApiOperation } from "@/data/operations";
import { cn } from "@/lib/utils";
import { Sparkles, Wand2, RefreshCw } from "lucide-react";

async function fetchProductDetails({
  partnerId,
  stockId,
  ids
}: {
  partnerId: string;
  stockId?: string;
  ids: number[];
}): Promise<ProductItem[]> {
  if (!ids.length) return [];
  const idsStr = ids.join(",");
  const query = new URLSearchParams({ itemsIds: idsStr, format: "json" });
  if (stockId) {
    query.set("stock", stockId);
  }
  const url = `https://api.retailrocket.ru/api/1.0/partner/${partnerId}/items/?${query.toString()}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("Не удалось получить карточки товаров");
  const data = await response.json();
  return (data as ProductItem[]).map((item) => ({
    ...item,
    Price: Number(item.Price)
  }));
}

async function fetchRecommendations(operation: ApiOperation, values: ParameterValues) {
  const params = new URLSearchParams();
  operation.parameters.forEach((parameter) => {
    const value = values[parameter.name];
    if (value !== undefined && value !== "") {
      params.set(parameter.name, value);
    }
  });
  const url = `${apiServer}${operation.path}?${params.toString()}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("Запрос по спецификации вернул ошибку");
  const payload = await response.json();
  const ids = (payload?.recommendations || [])
    .map((item: { productId?: number | string }) => Number(item.productId))
    .filter(Boolean);
  return ids;
}

export default function HomePage() {
  const [selectedOperationId, setSelectedOperationId] = useState<string>(operations[0].id);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<ProductItem[]>([]);

  const selectedOperation = useMemo(
    () => operations.find((op) => op.id === selectedOperationId) ?? operations[0],
    [selectedOperationId]
  );

  const handleSubmit = async (values: ParameterValues) => {
    if (!selectedOperation) return;
    setLoading(true);
    setError(null);

    try {
      const ids = await fetchRecommendations(selectedOperation, values);
      const partnerId = values.partnerId ?? "";
      const stockId = values.stockId ?? "";
      const items = await fetchProductDetails({ partnerId, stockId, ids });
      setProducts(items);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Неизвестная ошибка");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const renderHeroBadge = () => (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-acid-200">
      <Sparkles className="h-4 w-4 text-acid-300" />
      Retail Rocket API playground
    </div>
  );

  return (
    <main className="relative mx-auto max-w-7xl px-6 py-10">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(115,245,23,0.12),transparent_25%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.08),transparent_30%),radial-gradient(circle_at_60%_80%,rgba(93,210,0,0.14),transparent_30%)]" />
      <div className="absolute left-16 top-24 -z-10 h-72 w-72 rounded-full bg-acid-500/10 blur-3xl" />

      <section className="mesh-panel gradient-border mb-10 rounded-3xl p-8 shadow-neon">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-4">
            {renderHeroBadge()}
            <h1 className="font-display text-4xl leading-tight text-white drop-shadow-[0_10px_35px_rgba(0,0,0,0.45)] lg:text-5xl">
              Курируйте выдачу рекомендаций <br />
              и смотрите живые карточки товара
            </h1>
            <p className="max-w-3xl text-lg text-white/70">
              Сборка в стиле ночного неонового пульта: выбирайте endpoint из OpenAPI, подкручивайте параметры,
              отправляйте запросы и сразу видьте, как рекомендации превращаются в карточки мерча.
            </p>
            <div className="flex flex-wrap gap-3 text-xs text-accent-300">
              <span className="highlight-pill rounded-full px-4 py-2">Atomic design · App Router · shadcn/tailwind</span>
              <span className="rounded-full border border-white/10 px-4 py-2 text-white/70">Нулевая персонализация · только алгоритмы</span>
            </div>
          </div>
          <div className="rounded-2xl border border-acid-400/30 bg-obsidian-900/60 p-5 shadow-neon backdrop-blur-lg">
            <div className="flex items-center gap-3 text-acid-100">
              <Wand2 className="h-6 w-6" />
              <div>
                <p className="font-display text-lg">Эстетика: Acid Noir</p>
                <p className="text-sm text-white/70">Моноширинные титулы, резкие градиенты, стеклянные карты.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[360px_1fr]">
        <Card className="mesh-panel border-white/10 p-6 shadow-neon">
          <CardHeader className="mb-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-white/50">OpenAPI endpoint</p>
              <CardTitle className="text-2xl">Выбор алгоритма</CardTitle>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setProducts([])}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Очистить выдачу
            </Button>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-white/70">Endpoint</p>
              <Select
                value={selectedOperationId}
                onChange={(event) => setSelectedOperationId(event.target.value)}
                className="w-full"
              >
                {operations.map((operation) => (
                  <option key={operation.id} value={operation.id}>
                    [{operation.tag}] {operation.summary}
                  </option>
                ))}
              </Select>
            </div>

            <div className="rounded-2xl border border-white/5 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-white/60">Параметры запроса</p>
              <p className="text-sm text-white/70">Используем значения по умолчанию из спецификации, вы можете их изменить.</p>
            </div>

            <ParameterForm parameters={selectedOperation.parameters} onSubmit={handleSubmit} loading={loading} />
          </CardContent>
        </Card>

        <div className="space-y-4">
          <div className={cn("mesh-panel gradient-border relative overflow-hidden rounded-3xl p-6 shadow-neon")}>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(115,245,23,0.1),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.08),transparent_35%)]" />
            <div className="relative space-y-3">
              <p className="text-xs uppercase tracking-[0.2em] text-white/60">Результат</p>
              <h2 className="font-display text-3xl text-white">Карточки товаров</h2>
              <p className="max-w-2xl text-sm text-white/70">
                API {selectedOperation.tag} → рекомендации → lookup карточек → витрина. Нейтральная сетка адаптируется под количество
                ответов и подсказывает, если ничего не найдено.
              </p>
              {error ? (
                <div className="rounded-2xl border border-red-400/40 bg-red-400/10 px-4 py-3 text-sm text-red-100">
                  {error}
                </div>
              ) : null}
            </div>
          </div>

          <ProductsGrid items={products} />
        </div>
      </section>
    </main>
  );
}
