import sys

with open('components/home-sections-1.tsx', 'r') as f:
    content = f.read()

import_old = """import Image from "next/image";
import { Button } from "./ui/button";"""

import_new = """import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";"""

content = content.replace(import_old, import_new)


comp_old = """        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {(items || products).map((prod, i) => (
            <div key={prod.id} className="group flex flex-col h-full bg-white rounded-3xl p-5 md:p-6 shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
              <div className="relative aspect-square bg-slate-50 rounded-2xl overflow-hidden mb-6">
                <Image src={prod.image || prod.imageUrl || "https://picsum.photos/seed/placeholder/400/400"} alt={prod.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                
                {prod.badge && (
                  <div className={cn(
                    "absolute top-3 left-3 z-10 px-3 py-1.5 rounded-full shadow-sm backdrop-blur-md border text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-300",
                    prod.badge === 'new' ? 'bg-blue-100 text-blue-700 border-blue-200 group-hover:bg-blue-200' : 
                    prod.badge === 'best-seller' ? 'bg-red-100 text-red-700 border-red-200 group-hover:bg-red-200' : 'bg-white/90 text-slate-800 border-[#84EF6E]/50 group-hover:bg-[#84EF6E] group-hover:text-slate-900'
                  )}>
                    {prod.badge === 'new' ? 'MỚI' :
                      prod.badge === 'best-seller' ? 'BÁN CHẠY' : prod.badge}
                  </div>
                )}
              </div>
              <div className="flex-1 flex flex-col text-center px-2">
                <h3 className="text-lg font-bold text-slate-900 mb-3 font-serif group-hover:text-brand transition-colors line-clamp-2">{prod.name}</h3>
                <p className="text-sm text-slate-600 mb-0 line-clamp-2 leading-relaxed">{prod.benefit || prod.description}</p>
              </div>
            </div>
          ))}
        </div>"""

comp_new = """        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {(items || products).map((prod, i) => (
            <Link href={`/san-pham/${prod.slug}`} key={prod.id} className="group block cursor-pointer">
              <div className="flex flex-col h-full bg-white rounded-3xl p-5 md:p-6 shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                <div className="relative aspect-square bg-slate-50 rounded-2xl overflow-hidden mb-6">
                  <Image src={prod.image || prod.imageUrl || "https://picsum.photos/seed/placeholder/400/400"} alt={prod.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  
                  {prod.badge && (
                    <div className={cn(
                      "absolute top-3 left-3 z-10 px-3 py-1.5 rounded-full shadow-sm backdrop-blur-md border text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-300",
                      prod.badge === 'new' ? 'bg-blue-100 text-blue-700 border-blue-200 group-hover:bg-blue-200' : 
                      prod.badge === 'best-seller' ? 'bg-red-100 text-red-700 border-red-200 group-hover:bg-red-200' : 'bg-white/90 text-slate-800 border-[#84EF6E]/50 group-hover:bg-[#84EF6E] group-hover:text-slate-900'
                    )}>
                      {prod.badge === 'new' ? 'MỚI' :
                        prod.badge === 'best-seller' ? 'BÁN CHẠY' : prod.badge}
                    </div>
                  )}
                </div>
                <div className="flex-1 flex flex-col text-center px-2">
                  <h3 className="text-lg font-bold text-slate-900 mb-3 font-serif group-hover:text-brand transition-colors line-clamp-2">{prod.name}</h3>
                  <p className="text-sm text-slate-600 mb-0 line-clamp-2 leading-relaxed">{prod.benefit || prod.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>"""

content = content.replace(comp_old, comp_new)

with open('components/home-sections-1.tsx', 'w') as f:
    f.write(content)
