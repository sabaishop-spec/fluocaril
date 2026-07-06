import sys

with open('app/san-pham/[slug]/page.tsx', 'r') as f:
    content = f.read()

old_button = """          <div className="flex gap-4 mt-auto">
            <button className="flex-1 bg-navy text-white text-base font-semibold py-4 rounded-xl shadow-lg shadow-navy/20 hover:bg-navy/90 hover:-translate-y-0.5 transition-all">
              Tìm nhà thuốc gần nhất
            </button>
            <ShareButton """

new_button = """          <div className="flex flex-col sm:flex-row gap-4 mt-auto">
            {product.shopeeUrl ? (
              <a
                href={product.shopeeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-[#ee4d2d] hover:bg-[#d74326] text-white text-base font-bold py-4 rounded-xl shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
              >
                Mua ngay trên Shopee
              </a>
            ) : (
              <button className="flex-1 bg-navy text-white text-base font-semibold py-4 rounded-xl shadow-lg shadow-navy/20 hover:bg-navy/90 hover:-translate-y-0.5 transition-all">
                Liên hệ tư vấn
              </button>
            )}
            <ShareButton """

content = content.replace(old_button, new_button)

with open('app/san-pham/[slug]/page.tsx', 'w') as f:
    f.write(content)
