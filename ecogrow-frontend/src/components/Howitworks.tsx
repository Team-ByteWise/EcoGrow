import { PlayCircle, Leaf, BarChart3 } from "lucide-react";

const steps = [
  {
    icon: PlayCircle,
    title: "Watch Ads",
    description: "Earn tokens effortlessly",
  },
  {
    icon: Leaf,
    title: "Plant Trees",
    description: "Use tokens to fund real-world tree planting",
  },
  {
    icon: BarChart3,
    title: "Track Progress",
    description:
      "See your impact through the global map and CO₂ offset tracker",
  },
];

export default function HowItWorks() {
  return (
    <section id="work" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          How EcoGrow Works
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <step.icon className="w-16 h-16 mx-auto mb-4 text-green-500" />
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
