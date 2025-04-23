import { useEffect, useRef } from 'react';
import './Hero.scss';
import { useLanguage } from '../../../context/LanguageContext';
import { useTranslation } from '../../../utils/i18n';

const Hero = () => {
    const titleRef = useRef(null);
    const descRef = useRef(null);
    const ctaRef = useRef(null);
    const { language } = useLanguage();
    const { t } = useTranslation(language, 'hero');

    useEffect(() => {
        const title = titleRef.current;
        const desc = descRef.current;
        const cta = ctaRef.current;

        title.classList.add('animate');

        setTimeout(() => {
            desc.classList.add('animate');
        }, 300);

        setTimeout(() => {
            cta.classList.add('animate');
        }, 600);
    }, []);

    return (
        <section id='home' className={`hero ${language === 'ar' ? 'rtl' : ''}`}>
            <div className="overlay"></div>
            <div className="container">
                <div className="hero-content">
                    <h1 ref={titleRef} className="hero-title">
                        {t('title')} <span>{t('titleHighlight')}</span>
                    </h1>
                    <p ref={descRef} className="hero-description">
                        {t('description')}
                    </p>
                    <div ref={ctaRef} className="hero-cta">
                        <a href="#contact" className="btn-primary">{t('ctaPrimary')}</a>
                        <a href="#services" className="btn-secondary">{t('ctaSecondary')}</a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;