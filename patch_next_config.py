import sys

with open('next.config.ts', 'r') as f:
    content = f.read()

new_config = """  transpilePackages: ['motion'],
  experimental: {
    serverActions: {
      bodySizeLimit: '5mb',
    },
  },
  webpack:"""

content = content.replace("  transpilePackages: ['motion'],\n  webpack:", new_config)

with open('next.config.ts', 'w') as f:
    f.write(content)
