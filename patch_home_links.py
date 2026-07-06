import sys

with open('components/home-sections-1.tsx', 'r') as f:
    content = f.read()

import_old = """import Image from "next/image";
import { Button } from "./ui/button";"""
import_new = """import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";"""
if import_old in content:
    content = content.replace(import_old, import_new)

old_start = """          {(items || products).map((prod, i) => (
            <div
              key={prod.id}
              className="group flex flex-col h-full bg-white rounded-3xl p-5 md:p-6 shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
            >"""
new_start = """          {(items || products).map((prod, i) => (
            <Link href={`/san-pham/${prod.slug}`} key={prod.id} className="group block cursor-pointer">
            <div
              className="flex flex-col h-full bg-white rounded-3xl p-5 md:p-6 shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
            >"""
content = content.replace(old_start, new_start)

old_end = """                </p>
              </div>
            </div>
          ))}"""
new_end = """                </p>
              </div>
            </div>
            </Link>
          ))}"""
content = content.replace(old_end, new_end)

with open('components/home-sections-1.tsx', 'w') as f:
    f.write(content)

