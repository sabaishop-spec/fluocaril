import { db } from '@/src/db';
import { siteSettings } from '@/src/db/schema';
import { eq } from 'drizzle-orm';
import HeroBannerForm from './HeroBannerForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cấu hình Banner | Admin',
};

export const dynamic = 'force-dynamic';

export default async function SettingsPage() {
  const heroSetting = await db.select().from(siteSettings).where(eq(siteSettings.key, 'home_hero_banner')).limit(1);
  const currentHeroData = heroSetting[0]?.value || null;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Cấu hình Banner</h1>
      </div>
      
      <div className="grid grid-cols-1 gap-8">
        <HeroBannerForm currentData={currentHeroData} />
      </div>
    </div>
  );
}
