import CommonSection from "../components/CommonSection";
import HeroSection from "../components/HeroSection";
import Layout from "../components/Layout";

export default function Home() {
  const sidebarOptions = [
    { label: "Home" },
    { label: "About" },
    { label: "Experience" },
    { label: "Projects" },
  ];

  const heroSection = {
    intro: "Hey there!, I'm-",
    name: "José Marín.",
    description:
      "Software engineer who loves new challenges and specializes in building exceptional digital experiences.",
  };

  return (
    <Layout options={sidebarOptions}>
      <HeroSection {...heroSection} />
      <CommonSection index={1} title="About me"></CommonSection>
      <CommonSection index={2} title="Experience"></CommonSection>
      <CommonSection index={3} title="Projects"></CommonSection>
    </Layout>
  );
}
