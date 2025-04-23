import { useRef, useEffect, useState } from 'react';
import './About.scss';
import Yaman from '../../../assets/images/Yaman.jpg'
import Omar from '../../../assets/images/Omar.jpg'
import { useLanguage } from '../../../context/LanguageContext';
import { useTranslation } from '../../../utils/i18n';

const About = () => {
    const sectionRef = useRef(null);
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 576);
    const { language } = useLanguage();
    const { t } = useTranslation(language, 'about');

    // Map team member images
    const teamImages = {
        'Yaman': Yaman,
        'Omar': Omar,
        'يمان': Yaman,
        'عمر': Omar
    };

    // Get translated values and team from JSON
    const values = t('values');
    const team = t('team');

    // Social media links for team members
    const socialLinks = {
        'Yaman': {
            linkedin: 'https://www.linkedin.com/in/yaman-ajlouni-876b17221/',
            twitter: '#',
            github: 'https://github.com/YamanAjlouni'
        },
        'Omar': {
            linkedin: 'https://www.linkedin.com/in/omarsharbak/',
            twitter: '#',
            github: '#'
        },
        'يمان': {
            linkedin: 'https://www.linkedin.com/in/yaman-ajlouni-876b17221/',
            twitter: '#',
            github: 'https://github.com/YamanAjlouni'
        },
        'عمر': {
            linkedin: 'https://www.linkedin.com/in/omarsharbak/',
            twitter: '#',
            github: '#'
        }
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

    return (
        <section id="about" className={`about section ${language === 'ar' ? 'rtl' : ''}`} ref={sectionRef}>
            <div className="about-background">
                <div className="shape shape-1"></div>
                <div className="shape shape-2"></div>
                <div className="shape shape-3"></div>
                <div className="shape shape-4"></div>
                <div className="shape shape-5"></div>
                <div className="shape shape-6"></div>
                <div className="shape shape-7"></div>
            </div>

            <div className="container">
                <h2 className="section-title">{t('sectionTitle')}</h2>

                <div className="about-content">
                    <div className="about-mission">
                        <h3>{t('missionTitle')}</h3>
                        <p>{t('missionText')}</p>

                        <h3>{t('valuesTitle')}</h3>
                        <ul className="values-list">
                            {values.map((value, index) => (
                                <li key={index}>
                                    <i className={`fas ${value.icon}`}></i>
                                    <div>
                                        <h4>{value.title}</h4>
                                        <p>{value.description}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="team-section">
                        <h3>{t('teamTitle')}</h3>
                        <div className="team-grid">
                            {team.map((member, index) => (
                                <div key={index} className="team-member" style={{ animationDelay: `${index * 0.2}s` }}>
                                    <div className="member-image">
                                        <img src={teamImages[member.name]} alt={member.name} />
                                        <div className="member-social">
                                            <a href={socialLinks[member.name].linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                                                <i className="fab fa-linkedin-in"></i>
                                            </a>
                                            <a href={socialLinks[member.name].twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                                                <i className="fab fa-twitter"></i>
                                            </a>
                                            <a href={socialLinks[member.name].github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                                                <i className="fab fa-github"></i>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="member-info">
                                        <h4>{member.name}</h4>
                                        <p className="member-bio">{member.bio}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;