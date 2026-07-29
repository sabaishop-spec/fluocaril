export const dynamic = 'force-dynamic';
import { LandingPageForm } from './LandingPageForm';
import { getSetting } from '@/src/db/settings';

export default async function AdminLandingPage() {
  const steps = await getSetting('landing_page_steps') as any;
  return <LandingPageForm initialSteps={steps} />;
}
