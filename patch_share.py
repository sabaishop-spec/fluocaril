import sys

with open('app/san-pham/[slug]/page.tsx', 'r') as f:
    content = f.read()

import_old = """import Script from "next/script";
import { RelatedProducts } from "./RelatedProducts";"""

import_new = """import Script from "next/script";
import { RelatedProducts } from "./RelatedProducts";
import { ShareButton } from "./ShareButton";"""

content = content.replace(import_old, import_new)


button_old = """            <div className="flex gap-4">
              <button className="flex-1 bg-navy text-white text-base font-semibold py-4 rounded-xl shadow-lg shadow-navy/20 hover:bg-navy/90 hover:-translate-y-0.5 transition-all">
                Tìm nhà thuốc gần nhất
              </button>
            </div>"""

button_new = """            <div className="flex gap-4">
              <button className="flex-1 bg-navy text-white text-base font-semibold py-4 rounded-xl shadow-lg shadow-navy/20 hover:bg-navy/90 hover:-translate-y-0.5 transition-all">
                Tìm nhà thuốc gần nhất
              </button>
              <ShareButton 
                title={product.name} 
                text={product.description || `Sản phẩm ${product.name} từ Fluocaril`}
                url={`https://fluocaril.com.vn/san-pham/${product.slug}`} 
              />
            </div>"""

content = content.replace(button_old, button_new)

with open('app/san-pham/[slug]/page.tsx', 'w') as f:
    f.write(content)

