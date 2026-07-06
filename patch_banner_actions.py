import sys

with open('app/admin/banner/actions.ts', 'r') as f:
    content = f.read()

old_fields = """    const title = formData.get('title') as string;
    const linkUrl = formData.get('linkUrl') as string;"""

new_fields = """    const title = formData.get('title') as string;
    const subtitle = formData.get('subtitle') as string;
    const linkUrl = formData.get('linkUrl') as string;"""
content = content.replace(old_fields, new_fields)

old_value = "const value = { title, linkUrl, imageUrl };"
new_value = "const value = { title, subtitle, linkUrl, imageUrl };"
content = content.replace(old_value, new_value)

old_revalidate = "revalidatePath('/admin/settings');"
new_revalidate = "revalidatePath('/admin/banner');"
content = content.replace(old_revalidate, new_revalidate)

with open('app/admin/banner/actions.ts', 'w') as f:
    f.write(content)
