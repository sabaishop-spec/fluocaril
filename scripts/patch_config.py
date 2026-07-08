import sys

with open('next.config.ts', 'r') as f:
    content = f.read()

old = """  experimental: {
    serverActions: {
      bodySizeLimit: '5mb',
    },
  },"""
new_content = """  serverExternalPackages: ['pg'],
  experimental: {
    optimizePackageImports: ['lucide-react'],
    serverActions: {
      bodySizeLimit: '5mb',
    },
  },"""

content = content.replace(old, new_content)

with open('next.config.ts', 'w') as f:
    f.write(content)
