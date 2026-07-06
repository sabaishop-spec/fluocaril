import sys

with open('app/admin/products/actions.ts', 'r') as f:
    content = f.read()

# For createProduct
old_create = """    const categoryId = categoryIdStr ? parseInt(categoryIdStr, 10) : null;
    const status = formData.get('status') as string;
    let badge = formData.get('badge') as string | null;
    if (!badge) badge = null;"""

new_create = """    const categoryId = categoryIdStr ? parseInt(categoryIdStr, 10) : null;
    const status = formData.get('status') as string;
    let badge = formData.get('badge') as string | null;
    if (!badge) badge = null;
    
    let shopeeUrl = formData.get('shopeeUrl') as string | null;
    if (!shopeeUrl) shopeeUrl = null;"""

content = content.replace(old_create, new_create)

old_create_values = """      badge,
      status: status || 'Active',
    });"""

new_create_values = """      badge,
      shopeeUrl,
      status: status || 'Active',
    });"""

content = content.replace(old_create_values, new_create_values)

# For updateProduct
old_update = """    const categoryId = categoryIdStr ? parseInt(categoryIdStr, 10) : null;
    const status = formData.get('status') as string;
    let badge = formData.get('badge') as string | null;
    if (!badge) badge = null;"""

new_update = """    const categoryId = categoryIdStr ? parseInt(categoryIdStr, 10) : null;
    const status = formData.get('status') as string;
    let badge = formData.get('badge') as string | null;
    if (!badge) badge = null;
    
    let shopeeUrl = formData.get('shopeeUrl') as string | null;
    if (!shopeeUrl) shopeeUrl = null;"""

content = content.replace(old_update, new_update)

old_update_values = """      badge,
      status: status || 'Active',
    }).where(eq(products.id, id));"""

new_update_values = """      badge,
      shopeeUrl,
      status: status || 'Active',
    }).where(eq(products.id, id));"""

content = content.replace(old_update_values, new_update_values)

with open('app/admin/products/actions.ts', 'w') as f:
    f.write(content)
