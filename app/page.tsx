import { ContactSupport } from '@/components/ContactSupport';
import { EnterpriseSection } from '@/components/EnterpriseSection';
import { FaqSection } from '@/components/FaqSection';
import { FeaturesSection } from '@/components/FeatureSection';
import { HeroSection } from '@/components/HeroSection';
import { StatsSection } from '@/components/StatsSection';
import { TestimonialsSection } from '@/components/TestimonialSection';
import { VoicesSection } from '@/components/VoicesSection';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <VoicesSection />
      <EnterpriseSection />
      <TestimonialsSection />
      <FaqSection />
      <ContactSupport />
    </div>
  );
}