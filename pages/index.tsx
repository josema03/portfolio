import { MotionValue, useSpring, useTransform } from "framer-motion";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import CommonSection, {
  CommonSectionContext,
} from "../components/CommonSection";
import HeroSection from "../components/HeroSection";
import Layout from "../components/Layout";

interface LayoutStateContext {
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
  sidebarWidth: number;
  setSidebarWidth: Dispatch<SetStateAction<number>>;
  elementToScrollTo: string;
  setElementToScrollTo: React.Dispatch<React.SetStateAction<string>>;
  sidebarTranslationX: MotionValue<number>;
  contentTranslationX: MotionValue<number>;
}

export const LayoutState = createContext<LayoutStateContext>({
  isMenuOpen: false,
  setIsMenuOpen: () => {},
  sidebarWidth: 0,
  setSidebarWidth: () => {},
  elementToScrollTo: "",
  setElementToScrollTo: () => {},
  sidebarTranslationX: new MotionValue(0),
  contentTranslationX: new MotionValue(0),
});

const Example = () => {
  const { parentId, progress } = useContext(CommonSectionContext);

  useEffect(() => {
    const subs = progress.onChange((value) => console.log(parentId, value));
    return subs;
  });

  return <div>QLQ</div>;
};

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [sidebarWidth, setSidebarWidth] = useState<number>(0);
  const [elementToScrollTo, setElementToScrollTo] = useState<string>("");
  const sidebarTranslationX = useSpring(0, {
    stiffness: 150,
    damping: 5,
    mass: 0.15,
  });
  const contentTranslationX = useTransform(
    sidebarTranslationX,
    (sidebarTranslationX: number) => sidebarTranslationX * 1.1
  );
  const layoutState = {
    isMenuOpen,
    setIsMenuOpen,
    sidebarWidth,
    setSidebarWidth,
    elementToScrollTo,
    setElementToScrollTo,
    sidebarTranslationX,
    contentTranslationX,
  };

  const heroSection = {
    intro: "Hey there!, I'm-",
    name: "José Marín.",
    description:
      "Software engineer who loves new challenges and specializes in building exceptional digital experiences.",
  };

  const pageContent = [
    { title: "About", component: <Example /> },
    { title: "Experience", component: <Example /> },
    { title: "Projects", component: <Example /> },
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
