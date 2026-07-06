import sys
content = open('app/san-pham/ProductCatalog.tsx').read()

old_logic = """function CatalogContent({ products, categories }: { products: any[], categories: any[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const categoryParam = searchParams.get("category");
  const activeCategory = categoryParam ? parseInt(categoryParam, 10) : null;

  const setCategory = (id: number | null) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    if (id !== null) {
      newSearchParams.set("category", id.toString());
    } else {
      newSearchParams.delete("category");
    }
    router.push(`/san-pham?${newSearchParams.toString()}`);
  };

  const filteredProducts = activeCategory
    ? products.filter(p => p.categoryId === activeCategory)
    : products;"""

new_logic = """function CatalogContent({ products, categories }: { products: any[], categories: any[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const categoryParam = searchParams.get("category");
  const activeCategory = categoryParam ? parseInt(categoryParam, 10) : null;

  const badgeParam = searchParams.get("badge");
  const activeBadge = badgeParam || null;

  const setCategory = (id: number | null) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    if (id !== null) {
      newSearchParams.set("category", id.toString());
    } else {
      newSearchParams.delete("category");
    }
    router.push(`/san-pham?${newSearchParams.toString()}`);
  };

  const setBadge = (badge: string | null) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    if (badge !== null) {
      newSearchParams.set("badge", badge);
    } else {
      newSearchParams.delete("badge");
    }
    router.push(`/san-pham?${newSearchParams.toString()}`);
  };

  let filteredProducts = activeCategory
    ? products.filter(p => p.categoryId === activeCategory)
    : products;

  if (activeBadge) {
    filteredProducts = filteredProducts.filter(p => p.badge === activeBadge);
  }"""

content = content.replace(old_logic, new_logic)

old_ui = """      {/* Sticky Category Tabs */}
      <div className="sticky top-[95px] md:top-[104px] z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 py-3 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide [&::-webkit-scrollbar]:hidden">
            <button
              onClick={() => setCategory(null)}
              className={cn(
                "whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-colors",
                activeCategory === null
                  ? "bg-navy text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              )}
            >
              Tất cả sản phẩm
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={cn(
                  "whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-colors",
                  activeCategory === cat.id
                    ? "bg-navy text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                )}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>"""

new_ui = """      {/* Sticky Category Tabs */}
      <div className="sticky top-[95px] md:top-[104px] z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 py-3 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide [&::-webkit-scrollbar]:hidden">
              <button
                onClick={() => setCategory(null)}
                className={cn(
                  "whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-colors",
                  activeCategory === null
                    ? "bg-navy text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                )}
              >
                Tất cả sản phẩm
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className={cn(
                    "whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-colors",
                    activeCategory === cat.id
                      ? "bg-navy text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  )}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide [&::-webkit-scrollbar]:hidden shrink-0">
              <button
                onClick={() => setBadge(null)}
                className={cn(
                  "whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-colors border",
                  activeBadge === null
                    ? "bg-slate-800 text-white border-slate-800"
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                )}
              >
                Tất cả
              </button>
              <button
                onClick={() => setBadge('new')}
                className={cn(
                  "whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-colors border",
                  activeBadge === 'new'
                    ? "bg-blue-100 text-blue-700 border-blue-200"
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                )}
              >
                Mới
              </button>
              <button
                onClick={() => setBadge('best-seller')}
                className={cn(
                  "whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-colors border",
                  activeBadge === 'best-seller'
                    ? "bg-red-100 text-red-700 border-red-200"
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                )}
              >
                Bán chạy
              </button>
            </div>
          </div>
        </div>
      </div>"""

content = content.replace(old_ui, new_ui)
open('app/san-pham/ProductCatalog.tsx', 'w').write(content)
