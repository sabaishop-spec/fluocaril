import sys

with open('app/admin/banner/page.tsx', 'r') as f:
    content = f.read()

old_logic = """  const heroSetting = await db.select().from(siteSettings).where(eq(siteSettings.key, 'home_hero_banner')).limit(1);
  const currentHeroData = heroSetting[0]?.value || null;"""

new_logic = """  let currentHeroData = null;
  try {
    const heroSetting = await db.select().from(siteSettings).where(eq(siteSettings.key, 'home_hero_banner')).limit(1);
    currentHeroData = heroSetting[0]?.value || null;
  } catch (error) {
    console.error("Database error in SettingsPage:", error);
  }"""

content = content.replace(old_logic, new_logic)

with open('app/admin/banner/page.tsx', 'w') as f:
    f.write(content)
