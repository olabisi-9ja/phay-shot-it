import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import Featured from "@/components/Featured";
import Stories from "@/components/Stories";
import FieldMap from "@/components/FieldMap";
import About from "@/components/About";
import Pricing from "@/components/Pricing";
import Journal from "@/components/Journal";
import Statement from "@/components/Statement";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <Intro />
      <Featured />
      <Stories />
      <FieldMap />
      <About />
      <Pricing />
      <Journal />
      <Statement />
      <Footer />
    </>
  );
}
