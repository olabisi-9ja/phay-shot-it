import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import Featured from "@/components/Featured";
import Collections from "@/components/Collections";
import SpatialGallery from "@/components/SpatialGallery";
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
      <Collections />
      <SpatialGallery />
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
