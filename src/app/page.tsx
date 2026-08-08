import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import Services from "@/components/Services";
import Featured from "@/components/Featured";
import Collections from "@/components/Collections";
import SpatialGallery from "@/components/SpatialGallery";
import Stories from "@/components/Stories";
import FieldMap from "@/components/FieldMap";
import About from "@/components/About";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Artist from "@/components/Artist";
import Statement from "@/components/Statement";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <Intro />
      <Services />
      <Featured />
      <Collections />
      <SpatialGallery />
      <Stories />
      <FieldMap />
      <About />
      <Pricing />
      <Testimonials />
      <FAQ />
      <Artist />
      <Statement />
      <Footer />
    </>
  );
}
