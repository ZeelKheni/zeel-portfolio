import React from "react";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Experiences from "./sections/Experiences";
import Testimonial from "./sections/Testimonial";
import Contact from "./sections/Contact";
import Footer from './sections/Footer';
import M3Fab from "./components/M3Fab";
import { ThemeProvider } from "./context/ThemeContext";

const App = () => {
  return (
    <ThemeProvider>
      <div className="relative w-full min-h-screen bg-m3-surface text-m3-on-surface overflow-x-hidden transition-colors duration-300">
        <Navbar />
        <main className="w-full">
          <Hero />
          <About />
          <Projects />
          <Experiences />
        </main>
        <Footer />

        {/* Global Material 3 Extended Floating Action Button */}
        <M3Fab />
      </div>
    </ThemeProvider>
  );
};

export default App;
