import CallToAction from "@/components/CallToAction";
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
      <KeyFeatures />
      <ImpactStats />
      <CallToAction />
      <Footer />
    </div>
  );
}
