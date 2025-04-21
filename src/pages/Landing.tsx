import Features from "../components/Landing/Features";
import Footer from "../components/Landing/Footer";
import Hero from "../components/Landing/Hero";
import Navbar from "../components/Navbar";
import Pricing from "../components/Landing/Pricing";
import Testimonials from "../components/Landing/Testimonials";

function Landing() {
    return( 
    
    // <div>Landing Page.. </div>
    <>
    <Navbar></Navbar>
    <Hero></Hero>
    <Features></Features>
    <Testimonials></Testimonials>
    <Pricing></Pricing>
    <Footer></Footer>
    </>
    

    
    )
  }
  
  export default Landing;
