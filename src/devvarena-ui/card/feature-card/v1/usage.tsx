import FeatureCard from "./component";
import { FiCloud } from "react-icons/fi";

export default function FeatureCardExample() {
  return (
    <div className="grid grid-cols-2 gap-2 h-screen w-full place-items-center">
      <FeatureCard />
      <FeatureCard
        title="Cloud Storage"
        description="Access your files securely from anywhere with our encrypted cloud infrastructure."
        icon={FiCloud}
        color="#3b82f6" // Tailwind blue-500
        buttonText="Get Started"
      />
    </div>
  );
}
