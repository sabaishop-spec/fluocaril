import sys

with open('app/san-pham/ProductCatalog.tsx', 'r') as f:
    content = f.read()

# Fix the main product link
content = content.replace(
    '<Link href={`/san-pham`} key={prod.id} className="group block cursor-pointer">',
    '<Link href={`/san-pham/${prod.slug}`} key={prod.id} className="group block cursor-pointer">'
)

# Fix the "Chi tiết" button in the hover state
old_button = """                  <div className="flex-1 bg-navy text-white text-sm font-semibold py-2.5 rounded-lg flex items-center justify-center hover:bg-navy/90 transition-colors shadow-lg">
                    Chi tiết
                  </div>"""
new_button = """                  <div className="flex-1 bg-navy text-white text-sm font-semibold py-2.5 rounded-lg flex items-center justify-center hover:bg-navy/90 transition-colors shadow-lg">
                    Chi tiết
                  </div>""" # It's wrapped in the Link anyway so we can just leave it as is, or we can make sure clicking it works. The whole card is a Link, so clicking anywhere on the card, including "Chi tiết", will navigate. But clicking "Xem nhanh" should prevent default.

# The "Xem nhanh" button already has `e.preventDefault();` so it won't navigate!

with open('app/san-pham/ProductCatalog.tsx', 'w') as f:
    f.write(content)

