import sys

with open('app/san-pham/ProductCatalog.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    'import { motion } from "motion/react";',
    'import { motion, AnimatePresence } from "motion/react";'
)

old_drawer = """      {/* Mobile Filter Drawer */}
      {isMobileFilterOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex flex-col justify-end">"""

new_drawer = """      {/* Mobile Filter Drawer */}
      <AnimatePresence>
      {isMobileFilterOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex flex-col justify-end">"""

content = content.replace(old_drawer, new_drawer)

old_drawer_end = """          </motion.div>
        </div>
      )}"""

new_drawer_end = """          </motion.div>
        </div>
      )}
      </AnimatePresence>"""

content = content.replace(old_drawer_end, new_drawer_end)

with open('app/san-pham/ProductCatalog.tsx', 'w') as f:
    f.write(content)
