export const dynamic = 'force-dynamic';
import { FooterForm } from './FooterForm';
import { getSetting } from '@/src/db/settings';

export default async function AdminFooterPage() {
  const footerData = await getSetting('footer_settings') as any;
  return <FooterForm initialData={footerData} />;
}
