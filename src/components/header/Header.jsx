import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Header.scss';
import { useLanguage } from '../../context/LanguageContext';
import { useTranslation } from '../../utils/i18n';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const { language, toggleLanguage } = useLanguage();
    const { t } = useTranslation(language, 'header');
    const mobileMenuRef = useRef(null);
    const mobileToggleRef = useRef(null);
    const location = useLocation();
    const navigate = useNavigate();
    
    // Check if we're on a project detail page
    const isProjectPage = location.pathname.includes('/project/');

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);

            // Only track sections if we're on the home page
            if (!isProjectPage) {
                // Handle active section based on scroll position
                const sections = ['home', 'services', 'portfolio', 'about', 'contact'];
                const scrollPosition = window.scrollY + 100; // Adding offset for header height

                // Check which section is currently visible
                for (let i = sections.length - 1; i >= 0; i--) {
                    const section = document.getElementById(sections[i]);
                    if (section) {
                        const sectionTop = section.offsetTop;
                        if (scrollPosition >= sectionTop) {
                            setActiveSection(sections[i]);
                            break;
                        }
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isProjectPage]);

    useEffect(() => {
        // Handle clicks outside mobile menu
        const handleOutsideClick = (event) => {
            if (
                isMobileMenuOpen &&
                mobileMenuRef.current &&
                !mobileMenuRef.current.contains(event.target) &&
                mobileToggleRef.current &&
                !mobileToggleRef.current.contains(event.target)
            ) {
                setIsMobileMenuOpen(false);
            }
        };

        // Add event listener for outside clicks
        document.addEventListener('mousedown', handleOutsideClick);

        // Lock body scroll when mobile menu is open
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
            document.body.style.overflow = 'auto';
        };
    }, [isMobileMenuOpen]);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };
    
    // Handle navigation
    const handleNavigation = (sectionId, e) => {
        e.preventDefault();
        if (isProjectPage) {
            // If we're on a project page, navigate back to home first
            navigate('/');
        } else {
            // If we're already on the home page, just navigate to the section
            document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
            setActiveSection(sectionId);
        }
        closeMobileMenu();
    };

    return (
        <header className={`header ${isScrolled ? 'scrolled' : ''} ${language === 'ar' ? 'rtl' : ''}`}>
            <div className="container">
                <div className="header-content">
                    <Link to="/" className="logo" onClick={() => setActiveSection('home')}>
                        <span className="logo-text">Devign</span>
                        <span className="logo-accent">Creatives</span>
                    </Link>
                    <div
                        className={`mobile-menu-toggle ${isMobileMenuOpen ? 'active' : ''}`}
                        onClick={toggleMobileMenu}
                        ref={mobileToggleRef}
                    >
                        <i className={isMobileMenuOpen ? "fas fa-times" : "fas fa-bars"}></i>
                    </div>

                    <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'active' : ''}`} onClick={closeMobileMenu}></div>

                    <nav className={`nav ${isMobileMenuOpen ? 'open' : ''}`} ref={mobileMenuRef}>
                        <div className="mobile-menu-header">
                            <Link to="/" className="mobile-logo" onClick={() => { setActiveSection('home'); closeMobileMenu(); }}>
                                <span className="logo-text">Devign</span>
                                <span className="logo-accent">Creatives</span>
                            </Link>
                            <button className="mobile-menu-close" onClick={closeMobileMenu}>
                                <i className="fas fa-times"></i>
                            </button>
                        </div>

                        <ul className="nav-list">
                            <li className="nav-item">
                                <a
                                    href="#home"
                                    className={activeSection === 'home' ? 'active' : ''}
                                    onClick={(e) => handleNavigation('home', e)}
                                >
                                    {t('home')}
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    href="#services"
                                    className={activeSection === 'services' ? 'active' : ''}
                                    onClick={(e) => handleNavigation('services', e)}
                                >
                                    {t('services')}
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    href="#portfolio"
                                    className={activeSection === 'portfolio' ? 'active' : ''}
                                    onClick={(e) => handleNavigation('portfolio', e)}
                                >
                                    {t('portfolio')}
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    href="#about"
                                    className={activeSection === 'about' ? 'active' : ''}
                                    onClick={(e) => handleNavigation('about', e)}
                                >
                                    {t('about')}
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    href="#contact"
                                    className={activeSection === 'contact' ? 'active' : ''}
                                    onClick={(e) => handleNavigation('contact', e)}
                                >
                                    {t('contact')}
                                </a>
                            </li>
                            <div className="desktop-language-toggle">
                                <button
                                    onClick={toggleLanguage}
                                    className="language-button"
                                >
                                    <i className="fas fa-globe"></i>
                                    {language === 'en' ? 'العربية' : 'English'}
                                </button>
                            </div>
                        </ul>

                        <div className="mobile-menu-footer">
                            <button
                                onClick={() => { toggleLanguage(); closeMobileMenu(); }}
                                className="language-button"
                            >
                                <i className="fas fa-globe"></i>
                                {language === 'en' ? 'العربية' : 'English'}
                            </button>
                            <div className="mobile-social">
                                <a href="#" target="_blank" rel="noopener noreferrer">
                                    <i className="fab fa-facebook-f"></i>
                                </a>
                                <a href="#" target="_blank" rel="noopener noreferrer">
                                    <i className="fab fa-twitter"></i>
                                </a>
                                <a href="#" target="_blank" rel="noopener noreferrer">
                                    <i className="fab fa-instagram"></i>
                                </a>
                                <a href="#" target="_blank" rel="noopener noreferrer">
                                    <i className="fab fa-linkedin-in"></i>
                                </a>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;