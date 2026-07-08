import sys

content = open('app/san-pham/ProductCatalog.tsx').read()

imports_old = 'import { useState, useEffect, useRef } from "react";\nimport { Search, ChevronDown, ChevronRight, Clock, X } from "lucide-react";'
imports_new = 'import { useState, useEffect, useRef } from "react";\nimport { Search, ChevronDown, ChevronRight, Clock, X, Eye } from "lucide-react";\nimport { QuickViewModal } from "./QuickViewModal";'
content = content.replace(imports_old, imports_new)

# State additions
state_old = """  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);"""
state_new = """  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<any | null>(null);"""
content = content.replace(state_old, state_new)

# Card additions
card_old = """                {/* Quick Action Button (Xem chi tiết only, no cart icon) */}
                <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-20">
                  <div className="w-full bg-navy text-white text-sm font-semibold py-2.5 rounded-lg flex items-center justify-center hover:bg-navy/90 transition-colors shadow-lg">
                    Xem chi tiết
                  </div>
                </div>"""

card_new = """                {/* Quick Action Button */}
                <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-20 flex gap-2">
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      setQuickViewProduct(prod);
                    }}
                    className="flex-1 bg-white text-navy border border-white hover:border-slate-200 text-sm font-semibold py-2.5 rounded-lg flex items-center justify-center transition-colors shadow-lg"
                  >
                    <Eye className="w-4 h-4 mr-1.5" />
                    Xem nhanh
                  </button>
                  <div className="flex-1 bg-navy text-white text-sm font-semibold py-2.5 rounded-lg flex items-center justify-center hover:bg-navy/90 transition-colors shadow-lg">
                    Chi tiết
                  </div>
                </div>"""

content = content.replace(card_old, card_new)

# Modal at the bottom
modal_old = """      </div>
    </div>
  );
}"""

modal_new = """      </div>
      
      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal 
          product={quickViewProduct} 
          onClose={() => setQuickViewProduct(null)} 
        />
      )}
    </div>
  );
}"""

content = content.replace(modal_old, modal_new)

open('app/san-pham/ProductCatalog.tsx', 'w').write(content)
