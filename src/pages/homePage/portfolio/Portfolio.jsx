import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Portfolio.scss';
import gym from '../../../assets/images/power-gym.jpg'
import crispyImg from '../../../assets/images/crispy-crunch.jpg';
import damascusImg from '../../../assets/images/damascus.jpg';
import { useLanguage } from '../../../context/LanguageContext';
import { useTranslation } from '../../../utils/i18n';

const Portfolio = () => {
    const [activeCategory, setActiveCategory] = useState('all');
    const [isAnimating, setIsAnimating] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 576);
    const sectionRef = useRef(null);
    const { language } = useLanguage();
    const { t } = useTranslation(language, 'portfolio');

    // Get translated categories and projects from the JSON file
    const categories = t('categories');
    const projects = t('projects');

    // Map image paths to projects
    const projectImages = {
        'crispy-crunch': crispyImg,
        'gym-website': gym,
        'syrian-hotels': damascusImg
    };

    // Detect small screen sizes
    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 576);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        setIsAnimating(true);
        const timer = setTimeout(() => {
            setIsAnimating(false);
        }, 600);

        return () => clearTimeout(timer);
    }, [activeCategory]);

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

    const filteredProjects = activeCategory === 'all'
        ? projects
        : projects.filter(project => project.category === activeCategory);

    // Helper function to get the icon for a category
    const getCategoryIcon = (categoryId) => {
        const category = categories.find(cat => cat.id === categoryId);
        return category ? category.icon : 'fa-folder';
    };

    // Helper function to get the category name
    const getCategoryName = (categoryId) => {
        const category = categories.find(cat => cat.id === categoryId);
        return category ? category.name : t('noProjectsTitle');
    };

    return (
        <section id="portfolio" className={`portfolio section ${language === 'ar' ? 'rtl' : ''}`} ref={sectionRef}>
            <div className="portfolio-background">
                <div className="shape shape-1"></div>
                <div className="shape shape-2"></div>
                <div className="shape shape-3"></div>
                <div className="shape shape-4"></div>
                <div className="shape shape-5"></div>
                <div className="shape shape-6"></div>
                <div className="shape shape-7"></div>
            </div>

            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">{t('sectionTitle')}</h2>
                    <p className="section-subtitle">{t('sectionSubtitle')}</p>
                </div>

                <div className="portfolio-selectors">
                    {categories.map((category) => (
                        <div
                            key={category.id}
                            className={`portfolio-selector ${activeCategory === category.id ? 'active' : ''}`}
                            onClick={() => setActiveCategory(category.id)}
                        >
                            <div className="selector-icon">
                                <i className={`fas ${category.icon}`}></i>
                            </div>
                            <h3>{category.name}</h3>
                        </div>
                    ))}
                </div>

                <div className="portfolio-grid-container">
                    {filteredProjects.length > 0 ? (
                        <div className={`portfolio-grid ${isAnimating ? 'animating' : ''}`}>
                            {filteredProjects.map((project, index) => (
                                <div
                                    key={project.id}
                                    className="portfolio-item"
                                    style={{
                                        animationDelay: `${index * 0.1}s`,
                                    }}
                                >
                                    <div className="portfolio-img">
                                        <img src={projectImages[project.id]} alt={project.title} />
                                    </div>
                                    <div className="portfolio-content">
                                        <div className="category-badge">
                                            <i className={`fas ${getCategoryIcon(project.category)}`}></i>
                                            {getCategoryName(project.category)}
                                        </div>

                                        <h3 className="project-title">{project.title}</h3>
                                        <p className="project-description">{project.description}</p>

                                        <div className="project-features">
                                            {project.features.map((feature, index) => (
                                                <div key={index} className="feature-tag">
                                                    <i className="fas fa-check"></i>
                                                    <span>{feature}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="actions-container">
                                            <Link to={`/project/${project.id}`} className="btn-primary">
                                                <span>{t('viewDetailsButton')}</span>
                                                <i className={`fas ${language === 'ar' ? 'fa-arrow-left' : 'fa-arrow-right'}`}></i>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="no-projects">
                            <div className="no-projects-icon">
                                <i className="fas fa-folder-open"></i>
                            </div>
                            <h3>{t('noProjectsTitle')}</h3>
                            <p>{t('noProjectsDescription')}</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Portfolio;