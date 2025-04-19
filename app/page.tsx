import Image from "next/image";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
   <div>
     <Header />
     <Hero />
     <About />
     <Projects />
     <Contact />
     <Footer />
   </div>
  );
}
