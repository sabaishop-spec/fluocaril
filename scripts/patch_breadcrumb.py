import sys

content = open('app/san-pham/ProductCatalog.tsx').read()

# 1. Add ChevronRight to imports
content = content.replace('import { Search, ChevronDown } from "lucide-react";', 'import { Search, ChevronDown, ChevronRight } from "lucide-react";')

# 2. Add Breadcrumb before Sticky Category Tabs
old_code = """  return (
    <div className="w-full">
      {/* Sticky Category Tabs */}"""

new_code = """  return (
    <div className="w-full">
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
        <nav className="flex text-sm text-slate-500" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-2">
            <li className="inline-flex items-center">
              <Link href="/" className="hover:text-slate-900 transition-colors">
                Trang chủ
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <ChevronRight className="w-4 h-4 text-slate-400 mx-1" />
                <Link 
                  href="/san-pham" 
                  onClick={(e) => {
                    if (activeCategory) {
                      e.preventDefault();
                      setCategory(null);
                    }
                  }}
                  className={cn("hover:text-slate-900 transition-colors", !activeCategory && "text-slate-900 font-medium")}
                >
                  Sản phẩm
                </Link>
              </div>
            </li>
            {activeCategory && (
              <li>
                <div className="flex items-center">
                  <ChevronRight className="w-4 h-4 text-slate-400 mx-1" />
                  <span className="text-slate-900 font-medium line-clamp-1">
                    {categories.find(c => c.id === activeCategory)?.name || ""}
                  </span>
                </div>
              </li>
            )}
          </ol>
        </nav>
      </div>

      {/* Sticky Category Tabs */}"""

content = content.replace(old_code, new_code)

open('app/san-pham/ProductCatalog.tsx', 'w').write(content)
