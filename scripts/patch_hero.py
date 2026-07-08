import sys

with open('components/home-sections-1.tsx', 'r') as f:
    content = f.read()

old_hero = """export function Hero() {
  const images = ["""
new_hero = """export function Hero({ data }: { data?: any }) {
  const images = ["""
content = content.replace(old_hero, new_hero)

old_logic = """  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return ("""

new_logic = """  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  if (data) {
    return (
      <section className="relative w-full h-[500px] md:h-[600px] overflow-hidden bg-slate-100 group">
        <Link href={data.linkUrl || "#"} className="absolute inset-0 block cursor-pointer">
          <Image
            src={data.imageUrl}
            alt={data.title || "Hero banner"}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/20 flex flex-col items-center justify-center">
            {data.title && (
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-4 drop-shadow-md text-center px-4">
                {data.title}
              </h1>
            )}
          </div>
        </Link>
      </section>
    );
  }

  return ("""
content = content.replace(old_logic, new_logic)

with open('components/home-sections-1.tsx', 'w') as f:
    f.write(content)
