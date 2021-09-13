import CommonSection from "../components/CommonSection";
import HeroSection from "../components/HeroSection";
import Layout from "../components/Layout";

export default function Home() {
  const heroSection = {
    intro: "Hey there!, I'm-",
    name: "José Marín.",
    description:
      "Software engineer who loves new challenges and specializes in building exceptional digital experiences.",
  };

  const pageContent = [
    { title: "About", component: <div></div> },
    { title: "Experience", component: <div></div> },
    { title: "Projects", component: <div></div> },
  ];

  const sidebarOptions = pageContent.map((section) => ({
    label: section.title,
  }));

  const email = { email: "jose.marin1997@gmail.com" };

  const social = {
    linkedin: "https://www.linkedin.com/in/joseenriquemarin97/",
    github: "https://github.com/josema03",
  };

  return (
    <>
      <Layout options={sidebarOptions} social={social} email={email}>
        <HeroSection {...heroSection} />
      </Layout>
      {pageContent.map((section, index) => (
        <CommonSection
          index={index + 1}
          title={section.title}
          key={`${section.title}-${index}`}
        >
          {section.component}
        </CommonSection>
      ))}
    </>
  );
}
