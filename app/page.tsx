import "./globals.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import { Projects } from "./components/Project";
import { Skills } from "./components/Skills";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

export default function (){
  return(

   <>
    <Navbar/>
    <Hero/>
    <Projects/>
    <Skills/>
    <Contact/>
    <Footer/>
   </>
  )
}
