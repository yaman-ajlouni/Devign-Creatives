import { Link } from 'react-router-dom';
import './Footer.scss';
import { useLanguage } from '../../context/LanguageContext';
import { useTranslation } from '../../utils/i18n';
import logo from '../../assets/images/Logo-white-noBG.png'

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const { language } = useLanguage();
    const { t } = useTranslation(language, 'footer');

    return (
        <footer className={`footer ${language === 'ar' ? 'rtl' : ''}`}>
            <div className="container">
                <div className="footer-content">
                    <div className="footer-logo">
                        <Link to="/" className="logo">
                            <img src={logo} alt="company-logo" />
                        </Link>
                        <p>
                            {t('tagline')}
                        </p>
                        <div className="footer-social">
                            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                <i className="fab fa-instagram"></i>
                            </a>
                            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                                <i className="fab fa-linkedin-in"></i>
                            </a>
                        </div>
                    </div>

                    <div className="footer-links">
                        <div className="footer-col">
                            <h3>{t('services.title')}</h3>
                            <ul>
                                <li><a href="#services">{t('services.items.website')}</a></li>
                                <li><a href="#services">{t('services.items.application')}</a></li>
                                <li><a href="#services">{t('services.items.social')}</a></li>
                                <li><a href="#services">{t('services.items.uiux')}</a></li>
                            </ul>
                        </div>

                        <div className="footer-col">
                            <h3>{t('company.title')}</h3>
                            <ul>
                                <li><a href="#about">{t('company.items.about')}</a></li>
                                <li><a href="#portfolio">{t('company.items.portfolio')}</a></li>
                                <li><a href="#contact">{t('company.items.contact')}</a></li>
                            </ul>
                        </div>

                        <div className="footer-col">
                            <h3>{t('support.title')}</h3>
                            <ul>
                                <li><a href="#">{t('support.items.faq')}</a></li>
                                <li><a href="#">{t('support.items.privacy')}</a></li>
                                <li><a href="#">{t('support.items.terms')}</a></li>
                                <li><a href="#">{t('support.items.sitemap')}</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="footer-newsletter">
                        <h3>{t('newsletter.title')}</h3>
                        <p>{t('newsletter.subtitle')}</p>
                        <form className="newsletter-form">
                            <div className="form-group">
                                <input
                                    type="email"
                                    placeholder={t('newsletter.placeholder')}
                                    required
                                />
                                <button type="submit" aria-label={t('newsletter.button')}>
                                    <i className="fas fa-paper-plane"></i>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {currentYear} Devign Creatives. {t('copyright')}</p>
                    <p>{t('designed')} <i className="fas fa-heart"></i> {t('by')}</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;