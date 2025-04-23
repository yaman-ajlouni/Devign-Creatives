import { useState } from 'react';
import './Services.scss';
import { useTranslation } from '../../../utils/i18n';
import { useLanguage } from '../../../context/LanguageContext';

const Services = () => {
    const [activeService, setActiveService] = useState(0);
    const { language } = useLanguage();
    const { t } = useTranslation(language, 'services');

    // Get translated services from the JSON file
    const services = t('services');

    return (
        <section id="services" className={`services section ${language === 'ar' ? 'rtl' : ''}`}>
            <div className="services-background">
                <div className="shape shape-1"></div>
                <div className="shape shape-2"></div>
                <div className="shape shape-3"></div>
            </div>

            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">{t('sectionTitle')}</h2>
                    <p className="section-subtitle">{t('sectionSubtitle')}</p>
                </div>

                <div className="services-carousel">
                    <div className="service-selectors">
                        {services.map((service) => (
                            <div
                                key={service.id}
                                className={`service-selector ${activeService === service.id ? 'active' : ''}`}
                                onClick={() => setActiveService(service.id)}
                            >
                                <div className="selector-icon">
                                    <i className={`fas ${service.icon}`}></i>
                                </div>
                                <h3>{service.title}</h3>
                            </div>
                        ))}
                    </div>

                    <div className="service-details-container">
                        <div className="service-details-wrapper" style={{ transform: `translateX(-${activeService * 100}%)` }}>
                            {services.map((service) => (
                                <div key={service.id} className="service-details">
                                    <div className="service-header">
                                        <div className="service-icon">
                                            <i className={`fas ${service.icon}`}></i>
                                        </div>
                                        <h3>{service.title}</h3>
                                    </div>

                                    <p className="service-description">{service.description}</p>

                                    <div className="service-features-grid">
                                        {service.features.map((feature, index) => (
                                            <div key={index} className="feature-card">
                                                <div className="feature-icon">
                                                    <i className="fas fa-check-circle"></i>
                                                </div>
                                                <p>{feature}</p>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="service-cta">
                                        <a href="#contact" className="btn-primary">{t('ctaContactButton')}</a>
                                        <a href="#portfolio" className="btn-secondary">{t('ctaPortfolioButton')}</a>
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

export default Services;