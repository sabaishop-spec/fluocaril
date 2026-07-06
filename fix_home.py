import sys
content = open('components/home-sections-1.tsx').read()
content = content.replace("import { cn } from '@/lib/utils';\n\"use client\";", "\"use client\";\nimport { cn } from '@/lib/utils';")
open('components/home-sections-1.tsx', 'w').write(content)
