import sys

with open('app/san-pham/[slug]/page.tsx', 'r') as f:
    content = f.read()

# Imports
import_old = """import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import { ChevronRight, Check } from "lucide-react";
import Link from "next/link";
import type { Metadata } from 'next';
import Script from "next/script";"""

import_new = """import { eq, and, ne } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import { ChevronRight, Check } from "lucide-react";
import Link from "next/link";
import type { Metadata } from 'next';
import Script from "next/script";
import { RelatedProducts } from "./RelatedProducts";"""

content = content.replace(import_old, import_new)

# Logic
logic_old = """  const categoryList = product.categoryId 
    ? await db.select().from(categoriesTable).where(eq(categoriesTable.id, product.categoryId)).limit(1) 
    : [];
  const category = categoryList[0];"""

logic_new = """  const categoryList = product.categoryId 
    ? await db.select().from(categoriesTable).where(eq(categoriesTable.id, product.categoryId)).limit(1) 
    : [];
  const category = categoryList[0];

  const relatedProductsList = product.categoryId 
    ? await db.select().from(products)
        .where(
          and(
            eq(products.categoryId, product.categoryId),
            ne(products.id, product.id)
          )
        )
        .limit(4)
    : [];"""

content = content.replace(logic_old, logic_new)

# Component
comp_old = """        </div>
      </div>
    </div>
  );
}"""

comp_new = """        </div>
        <RelatedProducts products={relatedProductsList} />
      </div>
    </div>
  );
}"""

content = content.replace(comp_old, comp_new)

with open('app/san-pham/[slug]/page.tsx', 'w') as f:
    f.write(content)

