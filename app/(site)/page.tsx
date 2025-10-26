import { ContactSupport } from '@/components/ContactSupport';
import { EnterpriseSection } from '@/components/EnterpriseSection';
import { FaqSection } from '@/components/FaqSection';
import { FeaturesSection } from '@/components/FeatureSection';
import { HeroSection } from '@/components/HeroSection';
import { StatsSection } from '@/components/StatsSection';
import { TestimonialsSection } from '@/components/TestimonialSection';
import { VoicesSection } from '@/components/VoicesSection';
import ImageGenerationSection from '@/components/ImageGenerationSection';
import VideoScriptSection from '@/components/VideoScriptSection';
import { TutorialVideoSection } from '@/components/TutorialSection';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <TutorialVideoSection />
      <ImageGenerationSection />
      <VideoScriptSection />  
      <StatsSection />
      <VoicesSection />
      <EnterpriseSection />
      <TestimonialsSection />
      <FaqSection />
      <ContactSupport />
      <FeaturesSection />
    </div>
  );
}