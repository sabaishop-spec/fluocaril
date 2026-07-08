import sys

content = open('app/san-pham/ProductCatalog.tsx').read()

old_button = """              onClick={() => {
                setSearchQuery("");
                setCategory(null);
                setBadge(null);
              }}"""

new_button = """              onClick={() => {
                setSearchQuery("");
                router.push("/san-pham");
              }}"""

content = content.replace(old_button, new_button)

open('app/san-pham/ProductCatalog.tsx', 'w').write(content)
