import sys

with open('components/home-sections-1.tsx', 'r') as f:
    content = f.read()

old_title = """            {data.title && (
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-4 drop-shadow-md text-center px-4">
                {data.title}
              </h1>
            )}"""

new_title = """            {data.title && (
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-4 drop-shadow-md text-center px-4">
                {data.title}
              </h1>
            )}
            {data.subtitle && (
              <p className="text-lg md:text-2xl text-white drop-shadow-md text-center max-w-3xl px-4 mt-2">
                {data.subtitle}
              </p>
            )}"""

content = content.replace(old_title, new_title)

with open('components/home-sections-1.tsx', 'w') as f:
    f.write(content)
