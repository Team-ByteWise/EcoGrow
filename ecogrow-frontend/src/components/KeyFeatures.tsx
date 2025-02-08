import {
  Globe,
  BarChart,
  Award,
  BookOpen,
  FileText,
  Handshake,
} from "lucide-react";

const features = [
  {
    icon: Globe,
    title: "Real-time Global Map",
    description: "Track tree planting locations worldwide",
  },
  {
    icon: BarChart,
    title: "CO₂ Offset Meter",
    description: "Measure your environmental impact",
  },
  {
    icon: Award,
    title: "Achievement Badges",
    description: "Earn rewards for your contributions",
  },
  {
    icon: BookOpen,
    title: "Eco-Tips & Education",
    description: "Learn about sustainable practices",
  },
  {
    icon: FileText,
    title: "Digital Tree Certificates",
    description: "Receive proof of your planted trees",
  },
  {
    icon: Handshake,
    title: "Corporate Sponsorships",
    description: "Partner with eco-conscious companies",
  },
];

export default function KeyFeatures() {
  return (
    <section className="py-16 bg-green-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose EcoGrow?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white hover:bg-slate-200/70 p-6 rounded-lg shadow-md"
            >
              <feature.icon className="w-12 h-12 text-green-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
