import HeroSection from "../components/HeroSection";
import Layout from "../components/Layout";

export default function Home() {
  const sidebarOptions = [
    { label: "Lorem Ipsum Option" },
    { label: "Lorem Ipsum Option" },
    { label: "Lorem Ipsum Option" },
    { label: "Lorem Ipsum Option" },
    { label: "Lorem Ipsum Option" },
    { label: "Lorem Ipsum Option" },
  ];
  return <Layout options={sidebarOptions}><HeroSection /></Layout>;
}
