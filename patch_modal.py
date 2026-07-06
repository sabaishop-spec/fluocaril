import sys

with open('app/san-pham/QuickViewModal.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    'href={`/san-pham`}',
    'href={`/san-pham/${product.slug}`}'
)

with open('app/san-pham/QuickViewModal.tsx', 'w') as f:
    f.write(content)
