import sys

with open('app/admin/products/actions.ts', 'r') as f:
    content = f.read()

content = content.replace(
    "    let shopeeUrl = formData.get('shopeeUrl') as string | null;\n    if (!shopeeUrl) shopeeUrl = null;\n    \n    let shopeeUrl = formData.get('shopeeUrl') as string | null;\n    if (!shopeeUrl) shopeeUrl = null;",
    "    let shopeeUrl = formData.get('shopeeUrl') as string | null;\n    if (!shopeeUrl) shopeeUrl = null;"
)

with open('app/admin/products/actions.ts', 'w') as f:
    f.write(content)
