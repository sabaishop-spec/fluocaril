import sys

with open('app/admin/layout.tsx', 'r') as f:
    content = f.read()

import_old = "import { LayoutDashboard, Package, FileText, Users, Tags } from 'lucide-react';"
import_new = "import { LayoutDashboard, Package, FileText, Users, Tags, Settings } from 'lucide-react';"
content = content.replace(import_old, import_new)

menu_old = """          <Link href="/admin/contacts" className="flex items-center px-6 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors">
            <Users className="w-5 h-5 mr-3" />
            <span className="font-medium">Khách hàng liên hệ</span>
          </Link>
        </nav>"""
menu_new = """          <Link href="/admin/contacts" className="flex items-center px-6 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors">
            <Users className="w-5 h-5 mr-3" />
            <span className="font-medium">Khách hàng liên hệ</span>
          </Link>
          <Link href="/admin/settings" className="flex items-center px-6 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors">
            <Settings className="w-5 h-5 mr-3" />
            <span className="font-medium">Cấu hình Website</span>
          </Link>
        </nav>"""
content = content.replace(menu_old, menu_new)

with open('app/admin/layout.tsx', 'w') as f:
    f.write(content)
