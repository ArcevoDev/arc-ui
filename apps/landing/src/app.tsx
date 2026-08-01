import { ThemeProvider } from "@arcevo/facet-components";
import { LandingLayout } from "@arcevo/facet-layout";
import { Nav } from "./components/Nav.js";
import { HeroSection } from "./components/HeroSection.js";
import { InstallSection } from "./components/InstallSection.js";
import { FeaturesSection } from "./components/FeaturesSection.js";
import { DemoSection } from "./components/DemoSection.js";
import { CTASection } from "./components/CTASection.js";
import { Footer } from "./components/Footer.js";

export default function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <LandingLayout nav={<Nav />} hero={<HeroSection />} footer={<Footer />}>
        <FeaturesSection />
        <DemoSection />
        <InstallSection />
        <CTASection />
      </LandingLayout>
    </ThemeProvider>
  );
}
