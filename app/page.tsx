import "./globals.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import { Projects } from "./components/Project";
import { Skills } from "./components/Skills";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { AboutMe } from "./components/About";

export default function Page (){
  return(

   <>
    <Navbar/>
    <Hero/>
    <Projects/>
    <Skills/>
    <AboutMe/>
    <Contact/>
    <Footer/>
   </>
  )
}
