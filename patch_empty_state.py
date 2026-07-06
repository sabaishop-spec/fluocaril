import sys

content = open('app/san-pham/ProductCatalog.tsx').read()

old_code = """        {filteredProducts.length === 0 && (
          <div className="text-center py-20 text-slate-500 bg-[#f8f8f8] rounded-xl">
            Không tìm thấy sản phẩm nào trong hệ sinh thái này.
          </div>
        )}"""

new_code = """        {filteredProducts.length === 0 && (
          <div className="text-center py-20 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm border border-slate-100">
              <Search className="h-8 w-8 text-slate-300" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Không tìm thấy sản phẩm</h3>
            <p className="text-slate-500 mb-6 max-w-md">Rất tiếc, chúng tôi không tìm thấy sản phẩm nào phù hợp với bộ lọc và từ khóa tìm kiếm của bạn.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setCategory(null);
                setBadge(null);
              }}
              className="px-6 py-2 bg-navy text-white rounded-full font-medium hover:bg-navy/90 transition-colors shadow-sm"
            >
              Xóa bộ lọc
            </button>
          </div>
        )}"""

content = content.replace(old_code, new_code)

open('app/san-pham/ProductCatalog.tsx', 'w').write(content)
