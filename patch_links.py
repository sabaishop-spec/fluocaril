import sys

# 1. Update ProductCatalog.tsx
with open('app/san-pham/ProductCatalog.tsx', 'r') as f:
    content = f.read()

content = content.replace('href={`/san-pham`}', 'href={`/san-pham/${prod.slug}`}')
content = content.replace('href={`/san-pham`} key={prod.id}', 'href={`/san-pham/${prod.slug}`} key={prod.id}')

with open('app/san-pham/ProductCatalog.tsx', 'w') as f:
    f.write(content)

# 2. Update QuickViewModal.tsx
with open('app/san-pham/QuickViewModal.tsx', 'r') as f:
    content = f.read()

content = content.replace('href={`/san-pham`}', 'href={`/san-pham/${product.slug}`}')

with open('app/san-pham/QuickViewModal.tsx', 'w') as f:
    f.write(content)

