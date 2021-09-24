import { MotionValue, useSpring } from "framer-motion";
import { createContext, Dispatch, SetStateAction, useState } from "react";
import CommonSection from "../components/CommonSection";
import HeroSection from "../components/HeroSection";
import Layout from "../components/Layout";

interface LayoutStateInterface {
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
  sidebarWidth: number;
  setSidebarWidth: Dispatch<SetStateAction<number>>;
  sidebarTranslationX: MotionValue<number>;
}

export const LayoutState = createContext<LayoutStateInterface>({
  isMenuOpen: false,
  setIsMenuOpen: () => {},
  sidebarWidth: 0,
  setSidebarWidth: () => {},
  sidebarTranslationX: new MotionValue(0),
});

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [sidebarWidth, setSidebarWidth] = useState<number>(0);
  const sidebarTranslationX = useSpring(0, {
    stiffness: 150,
    damping: 5,
    mass: 0.15,
  });
  const layoutState = {
    isMenuOpen,
    setIsMenuOpen,
    sidebarWidth,
    setSidebarWidth,
    sidebarTranslationX,
  };

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
    <LayoutState.Provider value={layoutState}>
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
    </LayoutState.Provider>
  );
}
