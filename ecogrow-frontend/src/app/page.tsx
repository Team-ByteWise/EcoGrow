import CallToAction from "@/components/CallToAction";
import Feature from "@/components/Feature";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/Howitworks";
import ImpactStats from "@/components/ImpactStats";
import KeyFeatures from "@/components/KeyFeatures";

export default function Home() {
  return (
    <div>
      <Hero />
      <HowItWorks />
      <Feature />
      <KeyFeatures />
      <ImpactStats />
      <CallToAction />
      <Footer />
    </div>
  );
}
