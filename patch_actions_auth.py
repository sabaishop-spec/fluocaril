import os
import glob

def add_require_admin(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Check if we already have requireAdmin
    if 'requireAdmin' in content:
        return

    # Add import at the top
    # find the last import
    lines = content.split('\n')
    last_import_idx = -1
    for i, line in enumerate(lines):
        if line.startswith('import '):
            last_import_idx = i
            
    if last_import_idx != -1:
        lines.insert(last_import_idx + 1, "import { requireAdmin } from '@/lib/auth';")
    else:
        # maybe right after 'use server'
        for i, line in enumerate(lines):
            if 'use server' in line:
                lines.insert(i + 1, "import { requireAdmin } from '@/lib/auth';")
                break
                
    content = '\n'.join(lines)
    
    # Add await requireAdmin(); at the start of every exported async function
    import re
    
    # regex to find export async function name(...) {
    pattern = re.compile(r'(export\s+async\s+function\s+\w+\s*\([^)]*\)\s*\{)')
    
    def replacer(match):
        return match.group(1) + '\n  await requireAdmin();'
        
    content = pattern.sub(replacer, content)
    
    with open(filepath, 'w') as f:
        f.write(content)

action_files = glob.glob('app/admin/**/actions.ts', recursive=True) + \
               glob.glob('app/admin/**/*-actions.ts', recursive=True) + \
               glob.glob('app/admin/actions/*.ts', recursive=True)

for file in action_files:
    print('Patching', file)
    add_require_admin(file)
