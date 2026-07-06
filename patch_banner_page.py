import sys

with open('app/admin/banner/page.tsx', 'r') as f:
    content = f.read()

content = content.replace("title: 'Cấu hình Website | Admin',", "title: 'Cấu hình Banner | Admin',")
content = content.replace("h1 className=\"text-3xl font-bold text-gray-900\">Cấu hình Website</h1>", "h1 className=\"text-3xl font-bold text-gray-900\">Cấu hình Banner</h1>")

with open('app/admin/banner/page.tsx', 'w') as f:
    f.write(content)
