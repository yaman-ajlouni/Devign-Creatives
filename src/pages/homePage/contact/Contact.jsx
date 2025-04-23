import { useState, useRef, useEffect } from 'react';
import './Contact.scss';
import emailjs from '@emailjs/browser';
import { useLanguage } from '../../../context/LanguageContext';
import { useTranslation } from '../../../utils/i18n';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 576);
    const sectionRef = useRef(null);
    const { language } = useLanguage();
    const { t } = useTranslation(language, 'contact');

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when field is edited
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = t('form.nameError');
        }

        if (!formData.email.trim()) {
            newErrors.email = t('form.emailError');
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = t('form.emailInvalidError');
        }

        if (!formData.service) {
            newErrors.service = t('form.serviceError');
        }

        if (!formData.message.trim()) {
            newErrors.message = t('form.messageError');
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            setIsSubmitting(true);

            emailjs.send(
                'service-devigncreatives',
                'devignCreatives',
                formData,               // it uses { name, email, phone, service, message }
                'XBG3Oc89Yw1FIgzMe'
            )
                .then(() => {
                    setIsSubmitting(false);
                    setSubmitSuccess(true);
                    setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        service: '',
                        message: ''
                    });

                    setTimeout(() => {
                        setSubmitSuccess(false);
                    }, 5000);
                })
                .catch((error) => {
                    console.error('EmailJS error:', error);
                    setIsSubmitting(false);
                    alert("Something went wrong. Please try again later.");
                });
        }
    };

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
        <section id="contact" className={`contact section ${language === 'ar' ? 'rtl' : ''}`} ref={sectionRef}>
            <div className="contact-background">
                <div className="shape shape-1"></div>
                <div className="shape shape-2"></div>
                <div className="shape shape-3"></div>
                <div className="shape shape-4"></div>
                <div className="shape shape-5"></div>
            </div>

            <div className="container">
                <h2 className="section-title">{t('sectionTitle')}</h2>
                <p className="section-subtitle">{t('sectionSubtitle')}</p>

                <div className="contact-container">
                    <div className="contact-info">
                        <div className="info-item">
                            <i className="fas fa-map-marker-alt"></i>
                            <div>
                                <h3>{t('location.title')}</h3>
                                <p>{t('location.value')}</p>
                            </div>
                        </div>

                        <div className="info-item">
                            <i className="fas fa-envelope"></i>
                            <div>
                                <h3>{t('email.title')}</h3>
                                <p>{t('email.value')}</p>
                            </div>
                        </div>

                        <div className="info-item">
                            <i className="fas fa-phone-alt"></i>
                            <div>
                                <h3>{t('phone.title')}</h3>
                                <p>{t('phone.value')}</p>
                            </div>
                        </div>

                        <div className="social-links">
                            <h3>{t('social.title')}</h3>
                            <div className="links">
                                <a href="#" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                                    <i className="fab fa-facebook-f"></i>
                                </a>
                                <a href="#" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
                                    <i className="fab fa-twitter"></i>
                                </a>
                                <a href="#" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                                    <i className="fab fa-instagram"></i>
                                </a>
                                <a href="#" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                                    <i className="fab fa-linkedin-in"></i>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="contact-form">
                        {submitSuccess ? (
                            <div className="success-message">
                                <i className="fas fa-check-circle"></i>
                                <h3>{t('success.title')}</h3>
                                <p>{t('success.message')}</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="name">{t('form.nameLabel')}</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className={errors.name ? 'error' : ''}
                                        placeholder={t('form.namePlaceholder')}
                                    />
                                    {errors.name && <span className="error-message">{errors.name}</span>}
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="email">{t('form.emailLabel')}</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className={errors.email ? 'error' : ''}
                                            placeholder={t('form.emailPlaceholder')}
                                        />
                                        {errors.email && <span className="error-message">{errors.email}</span>}
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="phone">{t('form.phoneLabel')}</label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder={t('form.phonePlaceholder')}
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="service">{t('form.serviceLabel')}</label>
                                    <select
                                        id="service"
                                        name="service"
                                        value={formData.service}
                                        onChange={handleChange}
                                        className={errors.service ? 'error' : ''}
                                    >
                                        <option value="">{t('form.servicePlaceholder')}</option>
                                        <option value="website">{t('services.website')}</option>
                                        <option value="application">{t('services.application')}</option>
                                        <option value="social">{t('services.social')}</option>
                                        <option value="other">{t('services.other')}</option>
                                    </select>
                                    {errors.service && <span className="error-message">{errors.service}</span>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="message">{t('form.messageLabel')}</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows="5"
                                        value={formData.message}
                                        onChange={handleChange}
                                        className={errors.message ? 'error' : ''}
                                        placeholder={t('form.messagePlaceholder')}
                                    ></textarea>
                                    {errors.message && <span className="error-message">{errors.message}</span>}
                                </div>

                                <button type="submit" className="btn-primary" disabled={isSubmitting}>
                                    {isSubmitting ? t('form.submittingButton') : t('form.submitButton')}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;