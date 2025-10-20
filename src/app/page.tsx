// @ts-ignore: CSS side-effect import has no type declarations
import "./globals.css";

import Hero from "./components/Hero";

import { Skills } from "./components/Skills";

import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { AboutMe } from "./components/About";
import Navbar from "./components/Navbar";
import Projects from "./components/Project";
// import { Experience } from "./components/exp";



export default function Page (){
  return(

   <>
          
    
    <Navbar/>
    <Hero/>
    <AboutMe/>
    <Skills/>
    {/* <Experience/> */}
    <Projects/>
    
    <Contact/>
    <Footer/>
   </>
  )
}
