import CommonSection from "../components/CommonSection";
import HeroSection from "../components/HeroSection";
import Layout from "../components/Layout";

export default function Home() {
  const sidebarOptions = [
    { label: "About" },
    { label: "Experience" },
    { label: "Projects" },
  ];

  const email = { email: "jose.marin1997@gmail.com" };

  const social = {
    linkedin: "https://www.linkedin.com/in/joseenriquemarin97/",
    github: "https://github.com/josema03",
  };

  const heroSection = {
    intro: "Hey there!, I'm-",
    name: "José Marín.",
    description:
      "Software engineer who loves new challenges and specializes in building exceptional digital experiences.",
  };

  return (
    <Layout options={sidebarOptions} social={social} email={email}>
      <HeroSection {...heroSection} />
      <CommonSection index={1} title="About"></CommonSection>
      <CommonSection index={2} title="Experience"></CommonSection>
      <CommonSection index={3} title="Projects"></CommonSection>
    </Layout>
  );
}
