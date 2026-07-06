import sys

content = open('app/san-pham/ProductCatalog.tsx').read()

# 1. Update import
content = content.replace('import { Search } from "lucide-react";', 'import { Search, ChevronDown } from "lucide-react";')

# 2. Update the container and replace buttons with select
old_tabs = """          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
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
            </div>"""

new_dropdown = """          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
              {/* Category Dropdown */}
              <div className="relative w-full md:w-64 shrink-0">
                <select
                  value={activeCategory === null ? 'all' : activeCategory}
                  onChange={(e) => setCategory(e.target.value === 'all' ? null : parseInt(e.target.value, 10))}
                  className="w-full px-4 py-2.5 pr-10 bg-white border border-slate-200 rounded-lg text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-transparent appearance-none cursor-pointer transition-all"
                >
                  <option value="all">Tất cả hệ sinh thái</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <ChevronDown className="h-4 w-4 text-slate-400" />
                </div>
              </div>"""

content = content.replace(old_tabs, new_dropdown)

# We also need to close the extra div for the first part
# Find:
old_search = """            <div className="flex-1 w-full md:w-auto md:max-w-xs relative">
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
            </div>"""

new_search = """              {/* Search Bar */}
              <div className="relative flex-1 w-full md:w-auto md:min-w-[240px] md:max-w-xs">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  type="text"
                  placeholder="Tìm kiếm sản phẩm..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-lg leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-transparent sm:text-sm transition-all"
                />
              </div>
            </div>"""

content = content.replace(old_search, new_search)

open('app/san-pham/ProductCatalog.tsx', 'w').write(content)

