// @ts-ignore: CSS side-effect import has no type declarations
import "./globals.css";

import Hero from "./components/Hero";

import { Skills } from "./components/Skills";

import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { AboutMe } from "./components/About";
import Navbar from "./components/Navbar";
import Projects from "./components/Project";
import Loader from "./components/loader"



export default function Page (){
  return(

   <>
          <Loader />
    
    <Navbar/>
    <Hero/>
    <AboutMe/>
    <Skills/>
    <Projects/>
    
    <Contact/>
    <Footer/>
   </>
  )
}
