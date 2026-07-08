import sys
content = open('components/layout.tsx').read()
content = content.replace('href={`/san-pham`}', 'href={`/san-pham?category=${cat.id}`}')
open('components/layout.tsx', 'w').write(content)
