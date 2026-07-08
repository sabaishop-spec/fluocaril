import sys
content = open('components/home-sections-1.tsx').read()
old_badge = """                {(prod.categoryName || prod.category || prod.stage) && (
                  <div className="absolute top-3 left-3 z-10 px-3 py-1.5 rounded-full shadow-sm backdrop-blur-md bg-white/90 border border-[#84EF6E]/50 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-800 transition-all duration-300 group-hover:bg-[#84EF6E] group-hover:text-slate-900 group-hover:shadow-md">
                    {prod.categoryName || prod.category || prod.stage}
                  </div>
                )}"""
new_badge = """                {prod.badge && (
                  <div className={cn(
                    "absolute top-3 left-3 z-10 px-3 py-1.5 rounded-full shadow-sm backdrop-blur-md border text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-300",
                    prod.badge === 'new' ? 'bg-blue-100 text-blue-700 border-blue-200 group-hover:bg-blue-200' : 
                    prod.badge === 'best-seller' ? 'bg-red-100 text-red-700 border-red-200 group-hover:bg-red-200' : 'bg-white/90 text-slate-800 border-[#84EF6E]/50 group-hover:bg-[#84EF6E] group-hover:text-slate-900'
                  )}>
                    {prod.badge === 'new' ? 'MỚI' : 
                     prod.badge === 'best-seller' ? 'BÁN CHẠY' : prod.badge}
                  </div>
                )}"""
content = content.replace(old_badge, new_badge)
if "import { cn } from" not in content:
    content = "import { cn } from '@/lib/utils';\n" + content
open('components/home-sections-1.tsx', 'w').write(content)
