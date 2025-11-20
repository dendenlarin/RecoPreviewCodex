export type ApiParameter = {
  name: string;
  description?: string;
  required?: boolean;
  defaultValue?: string | number | boolean | Array<string | number>;
};

export type ApiOperation = {
  id: string;
  summary: string;
  path: string;
  tag: string;
  parameters: ApiParameter[];
};

const baseParams = {
  apiKey: {
    name: "apiKey",
    description: "Ключ авторизации",
    required: true,
    defaultValue: "5b333f5697a528b0184b6017"
  },
  partnerId: {
    name: "partnerId",
    description: "Идентификатор интернет-магазина",
    required: true,
    defaultValue: "59908d02c7d013ce40de715a"
  },
  linkName: {
    name: "link.name",
    description: "Название сессии",
    required: true,
    defaultValue: "session"
  },
  linkValue: {
    name: "link.value",
    description: "ID сессии",
    required: true,
    defaultValue: "a83642d5-da3b-4831-beed-e4bc182fec17"
  },
  stockId: {
    name: "stockId",
    description: "ID склада / региона",
    defaultValue: ""
  },
  productIds: {
    name: "productIds",
    description: "Список ID товаров через запятую",
    required: true,
    defaultValue: "80636175,80636177,80639468"
  },
  categoryPath: {
    name: "categoryPath",
    description: "Путь категории",
    required: true,
    defaultValue: "clothes/skirts"
  },
  categoryIds: {
    name: "categoryIds",
    description: "ID категорий (CSV)",
    required: true,
    defaultValue: "543,345"
  },
  categoryPaths: {
    name: "categoryPaths",
    description: "Пути категорий (CSV)",
    required: true,
    defaultValue: "clothes/skirts"
  },
  vendor: {
    name: "vendor",
    description: "Бренд / вендор",
    required: true,
    defaultValue: "Zanzung"
  },
  searchPhrase: {
    name: "searchPhrase",
    description: "Поисковая фраза",
    required: true,
    defaultValue: "подгузники"
  },
  isProductIdString: {
    name: "IsProductIdString",
    description: "Использовать строковый ID",
    defaultValue: false
  }
} satisfies Record<string, ApiParameter>;

export const apiServer = "https://externalapi.retailrocket.ru/api/3.0";

export const operations: ApiOperation[] = [
  {
    id: "popular",
    summary: "Популярные товары",
    path: "/partnerRecommendations/popular",
    tag: "Store",
    parameters: [baseParams.apiKey, baseParams.partnerId, baseParams.linkName, baseParams.linkValue, baseParams.stockId, baseParams.isProductIdString]
  },
  {
    id: "popular-by-vendor",
    summary: "Популярные по вендору",
    path: "/partnerRecommendations/popularByVendor",
    tag: "Vendor",
    parameters: [baseParams.apiKey, baseParams.partnerId, baseParams.linkName, baseParams.linkValue, baseParams.vendor, baseParams.stockId]
  },
  {
    id: "alternatives",
    summary: "Похожие товары",
    path: "/productRecommendations/alternatives",
    tag: "Products",
    parameters: [baseParams.apiKey, baseParams.partnerId, baseParams.linkName, baseParams.linkValue, baseParams.productIds, baseParams.stockId]
  },
  {
    id: "upsell",
    summary: "Upsell",
    path: "/productRecommendations/upsell",
    tag: "Products",
    parameters: [baseParams.apiKey, baseParams.partnerId, baseParams.linkName, baseParams.linkValue, baseParams.productIds, baseParams.stockId]
  },
  {
    id: "accessories",
    summary: "Аксессуары",
    path: "/productRecommendations/accessories",
    tag: "Products",
    parameters: [baseParams.apiKey, baseParams.partnerId, baseParams.linkName, baseParams.linkValue, baseParams.productIds, baseParams.stockId]
  },
  {
    id: "related",
    summary: "Сопутствующие",
    path: "/productRecommendations/related",
    tag: "Products",
    parameters: [baseParams.apiKey, baseParams.partnerId, baseParams.linkName, baseParams.linkValue, baseParams.productIds, baseParams.stockId]
  },
  {
    id: "search-recoms",
    summary: "Поиск: рекомендации",
    path: "/searchRecommendations/search",
    tag: "Search phrase",
    parameters: [baseParams.apiKey, baseParams.partnerId, baseParams.linkName, baseParams.linkValue, baseParams.searchPhrase, baseParams.stockId]
  },
  {
    id: "search-with-neuralnetworks",
    summary: "Поиск: нейросети",
    path: "/searchRecommendations/searchWithNeuralNetworks",
    tag: "Search phrase",
    parameters: [baseParams.apiKey, baseParams.partnerId, baseParams.linkName, baseParams.linkValue, baseParams.searchPhrase, baseParams.stockId]
  },
  {
    id: "popular-by-category-path",
    summary: "Популярные в категории (Product API)",
    path: "/categoryRecommendations/popularByCategoryPath",
    tag: "Categories Product API",
    parameters: [baseParams.apiKey, baseParams.partnerId, baseParams.linkName, baseParams.linkValue, baseParams.categoryPaths, baseParams.stockId]
  },
  {
    id: "latest-by-category-path",
    summary: "Новинки в категории",
    path: "/categoryRecommendations/latestByCategoryPath",
    tag: "Categories Product API",
    parameters: [baseParams.apiKey, baseParams.partnerId, baseParams.linkName, baseParams.linkValue, baseParams.categoryPaths, baseParams.stockId]
  },
  {
    id: "category-popular",
    summary: "Популярные в категории (XML)",
    path: "/categoryRecommendations/popular",
    tag: "Categories XML",
    parameters: [baseParams.apiKey, baseParams.partnerId, baseParams.linkName, baseParams.linkValue, baseParams.categoryIds, baseParams.stockId]
  },
  {
    id: "latest",
    summary: "Новинки (XML)",
    path: "/categoryRecommendations/latest",
    tag: "Categories XML",
    parameters: [baseParams.apiKey, baseParams.partnerId, baseParams.linkName, baseParams.linkValue, baseParams.categoryIds, baseParams.stockId]
  }
];
