import { useEffect } from 'react';
import About from './about/About';
import Contact from './contact/Contact';
import Hero from './hero/Hero';
import Portfolio from './portfolio/Portfolio';
import Services from './services/Services';
import Testimonials from './testimonials/Testimonials';
import './HomePage.scss';

const HomePage = () => {
    useEffect(() => {
        // Scroll to top when component mounts
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Hero />
            <Services />
            <Portfolio />
            <About />
            {/* <Testimonials /> */}
            <Contact />
        </>
    );
};

export default HomePage;