import sys

content = open('components/home-sections-1.tsx').read()
old_card = """            <div key={prod.id} className="group flex flex-col h-full bg-[#84EF6E] rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="relative aspect-square bg-slate-50 rounded-2xl overflow-hidden mb-6">
                <Image src={prod.image || prod.imageUrl || "https://picsum.photos/seed/placeholder/400/400"} alt={prod.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 left-4 bg-slate-900 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                  {prod.stage || "Nha khoa"}
                </div>
              </div>
              <div className="flex-1 flex flex-col text-center">
                <p className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2">{prod.category}</p>
                <h3 className="text-lg font-bold text-slate-900 mb-3 font-serif group-hover:text-black transition-colors line-clamp-2">{prod.name}</h3>
                <p className="text-sm text-slate-800 mb-0 line-clamp-2 leading-relaxed">{prod.benefit || prod.description}</p>
              </div>
            </div>"""

new_card = """            <div key={prod.id} className="group flex flex-col h-full bg-white rounded-3xl p-5 md:p-6 shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
              <div className="relative aspect-square bg-slate-50 rounded-2xl overflow-hidden mb-6">
                <Image src={prod.image || prod.imageUrl || "https://picsum.photos/seed/placeholder/400/400"} alt={prod.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                
                {(prod.categoryName || prod.category || prod.stage) && (
                  <div className="absolute top-3 left-3 z-10 px-3 py-1.5 rounded-full shadow-sm backdrop-blur-md bg-white/90 border border-[#84EF6E]/50 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-800 transition-all duration-300 group-hover:bg-[#84EF6E] group-hover:text-slate-900 group-hover:shadow-md">
                    {prod.categoryName || prod.category || prod.stage}
                  </div>
                )}
              </div>
              <div className="flex-1 flex flex-col text-center px-2">
                <h3 className="text-lg font-bold text-slate-900 mb-3 font-serif group-hover:text-brand transition-colors line-clamp-2">{prod.name}</h3>
                <p className="text-sm text-slate-600 mb-0 line-clamp-2 leading-relaxed">{prod.benefit || prod.description}</p>
              </div>
            </div>"""

content = content.replace(old_card, new_card)
open('components/home-sections-1.tsx', 'w').write(content)
