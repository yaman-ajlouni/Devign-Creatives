import { useState, useEffect, useRef } from 'react';
import './Testimonials.scss';

const Testimonials = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const sectionRef = useRef(null);

    const testimonials = [
        {
            id: 1,
            name: 'Sarah Johnson',
            position: 'Marketing Director, GlobeTech',
            image: 'https://randomuser.me/api/portraits/women/33.jpg',
            content: 'Working with DevignCreatives was a game-changer for our online presence. They transformed our outdated website into a modern platform that perfectly represents our brand. The team was responsive, professional, and delivered beyond our expectations.',
            rating: 5
        },
        {
            id: 2,
            name: 'Michael Chen',
            position: 'CEO, Innovate Startup',
            image: 'https://randomuser.me/api/portraits/men/54.jpg',
            content: 'The mobile application developed by DevignCreatives streamlined our customer onboarding process and significantly improved user satisfaction. Their attention to detail and commitment to quality is unmatched.',
            rating: 5
        },
        {
            id: 3,
            name: 'Jessica Rivera',
            position: 'Owner, Blooming Boutique',
            image: 'https://randomuser.me/api/portraits/women/85.jpg',
            content: 'Their social media management services helped us increase engagement by 200% and grow our customer base. DevignCreatives understands our brand voice and consistently delivers content that resonates with our audience.',
            rating: 4
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prevIndex) =>
                prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000);

        return () => clearInterval(interval);
    }, [testimonials.length]);

    // Parallax effect for background shapes
    useEffect(() => {
        const handleParallax = () => {
            if (!sectionRef.current) return;

            const scrollPosition = window.scrollY;
            const shapes = sectionRef.current.querySelectorAll('.shape');

            shapes.forEach((shape, index) => {
                const speed = index * 0.1 + 0.2;
                const yPos = scrollPosition * speed;
                shape.style.transform = `translateY(${yPos}px)`;
            });
        };

        window.addEventListener('scroll', handleParallax);
        return () => {
            window.removeEventListener('scroll', handleParallax);
        };
    }, []);

    const handleDotClick = (index) => {
        setActiveIndex(index);
    };

    const goToPrevious = () => {
        setActiveIndex((prevIndex) =>
            prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
        );
    };

    const goToNext = () => {
        setActiveIndex((prevIndex) =>
            prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
        );
    };

    return (
        <section id="testimonials" className="testimonials section" ref={sectionRef}>
            <div className="testimonials-background">
                <div className="shape shape-1"></div>
                <div className="shape shape-2"></div>
                <div className="shape shape-3"></div>
                <div className="shape shape-4"></div>
            </div>

            <div className="container">
                <h2 className="section-title">What Our Clients Say</h2>

                <div className="testimonials-carousel">
                    <div className="testimonials-wrapper" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={testimonial.id}
                                className={`testimonial-item ${index === activeIndex ? 'active' : ''}`}
                            >
                                <div className="testimonial-content">
                                    <div className="quote-icon">
                                        <i className="fas fa-quote-left"></i>
                                    </div>
                                    <p>{testimonial.content}</p>
                                    <div className="testimonial-rating">
                                        {[...Array(5)].map((_, starIndex) => (
                                            <i
                                                key={starIndex}
                                                className={`fas fa-star ${starIndex < testimonial.rating ? 'active' : ''}`}
                                            ></i>
                                        ))}
                                    </div>
                                </div>
                                <div className="testimonial-author">
                                    <div className="author-image">
                                        <img src={testimonial.image} alt={testimonial.name} />
                                    </div>
                                    <div className="author-info">
                                        <h4>{testimonial.name}</h4>
                                        <p>{testimonial.position}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="carousel-controls">
                        <div className="carousel-dots">
                            {testimonials.map((_, index) => (
                                <span
                                    key={index}
                                    className={`dot ${activeIndex === index ? 'active' : ''}`}
                                    onClick={() => handleDotClick(index)}
                                    aria-label={`Testimonial ${index + 1} of ${testimonials.length}`}
                                ></span>
                            ))}
                        </div>

                        <div className="carousel-arrows">
                            <button
                                className="arrow-prev"
                                onClick={goToPrevious}
                                aria-label="Previous testimonial"
                            >
                                <i className="fas fa-chevron-left"></i>
                            </button>
                            <button
                                className="arrow-next"
                                onClick={goToNext}
                                aria-label="Next testimonial"
                            >
                                <i className="fas fa-chevron-right"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;