import sys
content = open('app/san-pham/ProductCatalog.tsx').read()

old_logic = """function CatalogContent({ products, categories }: { products: any[], categories: any[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();"""

new_logic = """import { useState } from "react";
import { Search } from "lucide-react";

function CatalogContent({ products, categories }: { products: any[], categories: any[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [searchQuery, setSearchQuery] = useState("");"""

content = content.replace(old_logic, new_logic)

old_logic_2 = """  if (activeBadge) {
    filteredProducts = filteredProducts.filter(p => p.badge === activeBadge);
  }"""

new_logic_2 = """  if (activeBadge) {
    filteredProducts = filteredProducts.filter(p => p.badge === activeBadge);
  }

  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    filteredProducts = filteredProducts.filter(p => p.name?.toLowerCase().includes(query));
  }"""

content = content.replace(old_logic_2, new_logic_2)

old_ui = """            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide [&::-webkit-scrollbar]:hidden shrink-0">
              <button"""

new_ui = """            <div className="flex-1 w-full md:w-auto md:max-w-xs relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-full leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-navy focus:border-navy sm:text-sm transition-colors"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide [&::-webkit-scrollbar]:hidden shrink-0">
              <button"""

content = content.replace(old_ui, new_ui)

open('app/san-pham/ProductCatalog.tsx', 'w').write(content)
