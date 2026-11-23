import { useEffect } from "react";
import Lenis from "lenis";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import StatsBand from "../components/StatsBand";
import Marquee from "../components/Marquee";
import About from "../components/About";
import Services from "../components/Services";
import CaseStudies from "../components/CaseStudies";
import Clients from "../components/Clients";
import Experience from "../components/Experience";
import Tools from "../components/Tools";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import WhatsAppFloat from "../components/WhatsAppFloat";

export default function Portfolio() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    window.__lenis = lenis;
    let raf = 0;
    const loop = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-clip">
      <Navbar />
      <main>
        <Hero />
        <StatsBand />
        <Marquee />
        <About />
        <Services />
        <CaseStudies />
        <Clients />
        <Experience />
        <Tools />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
