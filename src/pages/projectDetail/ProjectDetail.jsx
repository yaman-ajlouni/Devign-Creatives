import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './ProjectDetail.scss';
import gymImg from '../../assets/images/power-gym.jpg';
import crispyImg from '../../assets/images/crispy-crunch.jpg';
import damascusImg from '../../assets/images/damascus.jpg';
import { useLanguage } from '../../context/LanguageContext';
import { useTranslation } from '../../utils/i18n';

const ProjectDetail = () => {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const { language } = useLanguage();
    const { t } = useTranslation(language, 'projectDetail');
    const { t: tPortfolio } = useTranslation(language, 'portfolio');

    // Bilingual project data
    const projectsData = {
        'crispy-crunch': {
            en: {
                title: 'Crispy Crunch',
                category: 'Website Development',
                client: 'Crispy Crunch Restaurant',
                completionDate: 'September 2024',
                websiteUrl: 'https://crispy-crunch.netlify.app/',
                image: crispyImg,
                description: 'A modern, responsive website for a popular restaurant chain that specializes in fried chicken and comfort food.',
                challenge: 'The client needed a website that would showcase their menu items attractively while providing easy online ordering functionality. The site needed to handle high traffic volumes during peak hours and provide a seamless experience across all devices.',
                solution: 'We designed a custom WordPress website with an integrated online ordering system. The site features high-quality food photography, an interactive menu with filtering options, and a streamlined checkout process. We implemented caching and optimization techniques to ensure fast loading times even during peak traffic periods.',
                technologies: ['HTML5', 'CSS3', 'JavaScript', 'WordPress', 'WooCommerce', 'PHP', 'MySQL'],
                features: [
                    'Responsive design optimized for mobile users',
                    'Interactive menu with search and filter options',
                    'Online ordering system with real-time updates',
                    'Integrated payment processing',
                    'Customer account management',
                    'Admin dashboard for menu and order management'
                ],
                results: 'The new website led to a 45% increase in online orders within the first month of launch. Customer feedback highlighted the improved user experience and ease of ordering. The site is performance metrics showed an average load time of under 2 seconds, contributing to a low bounce rate of 25%.'
            },
            ar: {
                title: 'Crispy Crunch',
                category: 'تطوير المواقع الإلكترونية',
                client: 'مطعم كرسبي كرانش',
                completionDate: 'سبتمبر 2024',
                websiteUrl: 'https://crispy-crunch.netlify.app/',
                image: crispyImg,
                description: 'موقع إلكتروني عصري ومتجاوب لسلسلة مطاعم شهيرة متخصصة في الدجاج المقلي والأطعمة المريحة.',
                challenge: 'احتاج العميل إلى موقع إلكتروني يعرض عناصر قائمة الطعام بشكل جذاب مع توفير وظيفة طلب الطعام عبر الإنترنت بسهولة. كان يجب أن يتعامل الموقع مع أحجام مرور عالية خلال ساعات الذروة وتوفير تجربة سلسة عبر جميع الأجهزة.',
                solution: 'قمنا بتصميم موقع WordPress مخصص مع نظام طلب عبر الإنترنت متكامل. يتميز الموقع بصور طعام عالية الجودة، وقائمة تفاعلية مع خيارات التصفية، وعملية دفع مبسطة. نفذنا تقنيات التخزين المؤقت والتحسين لضمان سرعة تحميل حتى خلال فترات ذروة حركة المرور.',
                technologies: ['HTML5', 'CSS3', 'جافا سكريبت', 'WordPress', 'WooCommerce', 'PHP', 'MySQL'],
                features: [
                    'تصميم متجاوب مُحسّن لمستخدمي الجوال',
                    'قائمة تفاعلية مع خيارات البحث والتصفية',
                    'نظام طلب عبر الإنترنت مع تحديثات في الوقت الفعلي',
                    'معالجة الدفع المتكاملة',
                    'إدارة حسابات العملاء',
                    'لوحة تحكم المسؤول لإدارة القائمة والطلبات'
                ],
                results: 'أدى الموقع الجديد إلى زيادة بنسبة 45٪ في الطلبات عبر الإنترنت خلال الشهر الأول من الإطلاق. سلطت تعليقات العملاء الضوء على تحسين تجربة المستخدم وسهولة الطلب. أظهرت مقاييس أداء الموقع متوسط وقت تحميل أقل من ثانيتين، مما ساهم في انخفاض معدل الارتداد إلى 25٪.'
            }
        },
        'gym-website': {
            en: {
                title: 'Power Gym',
                category: 'Website Development',
                client: 'PowerFit Gym',
                completionDate: 'December 2024',
                websiteUrl: 'https://planet-gym.netlify.app/',
                image: gymImg,
                description: 'A dynamic website for a fitness center featuring class schedules, membership options, and a client portal.',
                challenge: 'PowerFit Gym needed a comprehensive digital solution to streamline their membership management, class bookings, and provide valuable resources to their members. Their existing website was outdated and lacked these essential features.',
                solution: 'We developed a custom website with an integrated membership management system. The site includes a member portal where users can book classes, track their fitness progress, and access workout resources. An admin dashboard allows gym staff to manage memberships, class schedules, and communicate with members.',
                technologies: ['React.js', 'Node.js', 'Express', 'MongoDB', 'Stripe API', 'JWT Authentication', 'SCSS'],
                features: [
                    'User authentication system',
                    'Class booking system with calendar integration',
                    'Membership management and billing',
                    'Fitness tracking tools',
                    'Responsive design for mobile users',
                    'Blog section for fitness tips and news',
                    'Newsletter subscription system'
                ],
                results: 'The new website helped PowerFit Gym increase their membership by 30% within three months. Class attendance improved by 25%, and administrative time spent on managing bookings decreased by 70%. Client retention also improved thanks to the enhanced user experience and additional resources available through the member portal.'
            },
            ar: {
                title: 'Power Gym',
                category: 'تطوير المواقع الإلكترونية',
                client: 'صالة باور فيت',
                completionDate: 'ديسمبر 2024',
                websiteUrl: 'https://planet-gym.netlify.app/',
                image: gymImg,
                description: 'موقع ديناميكي لمركز لياقة بدنية يعرض جداول الحصص وخيارات العضوية وبوابة العملاء.',
                challenge: 'احتاجت صالة باور فيت إلى حل رقمي شامل لتبسيط إدارة العضوية وحجوزات الفصول وتوفير موارد قيمة لأعضائها. كان موقعهم الإلكتروني الحالي قديمًا ويفتقر إلى هذه الميزات الأساسية.',
                solution: 'قمنا بتطوير موقع مخصص مع نظام إدارة عضوية متكامل. يتضمن الموقع بوابة للأعضاء حيث يمكن للمستخدمين حجز الفصول وتتبع تقدم لياقتهم والوصول إلى موارد التمارين. تتيح لوحة تحكم المسؤول لموظفي الصالة إدارة العضويات وجداول الفصول والتواصل مع الأعضاء.',
                technologies: ['React.js', 'Node.js', 'Express', 'MongoDB', 'Stripe API', 'JWT Authentication', 'SCSS'],
                features: [
                    'نظام مصادقة المستخدم',
                    'نظام حجز الفصول مع تكامل التقويم',
                    'إدارة العضوية والفواتير',
                    'أدوات تتبع اللياقة البدنية',
                    'تصميم متجاوب لمستخدمي الجوال',
                    'قسم المدونة لنصائح وأخبار اللياقة البدنية',
                    'نظام الاشتراك في النشرة الإخبارية'
                ],
                results: 'ساعد الموقع الجديد صالة باور فيت على زيادة عضويتها بنسبة 30٪ خلال ثلاثة أشهر. تحسن حضور الفصول بنسبة 25٪، وانخفض الوقت الإداري المستغرق في إدارة الحجوزات بنسبة 70٪. تحسن الاحتفاظ بالعملاء أيضًا بفضل تحسين تجربة المستخدم والموارد الإضافية المتاحة من خلال بوابة الأعضاء.'
            }
        },
        'syrian-hotels': {
            en: {
                title: 'Syrian Hotels',
                category: 'Application Development',
                client: 'Syrian Hotels Association',
                completionDate: 'February 2025',
                websiteUrl: 'https://syrianhotels.netlify.app/',
                image: damascusImg,
                description: 'A comprehensive hotel booking application with user accounts and payment integration for properties across Syria.',
                challenge: 'The Syrian Hotels Association needed a centralized booking platform for hotels across the country. They required a solution that would showcase properties, handle reservations, and provide analytics for hotel managers while being accessible to international travelers.',
                solution: 'We developed a full-stack application with both web and mobile interfaces. The platform includes detailed hotel listings with high-quality images, room availability management, secure payment processing, and a review system. For hotel managers, we created a dashboard with booking management tools and performance analytics.',
                technologies: ['React Native', 'React.js', 'Redux', 'Node.js', 'Express', 'PostgreSQL', 'AWS', 'Google Maps API', 'Stripe API'],
                features: [
                    'Multi-language support (Arabic, English, French)',
                    'Advanced search with filters for location, price, amenities',
                    'Interactive maps showing hotel locations',
                    'Secure payment processing',
                    'Booking management system',
                    'Review and rating system',
                    'Analytics dashboard for hotel managers',
                    'Responsive design for web and dedicated mobile apps'
                ],
                results: 'The application has facilitated over 5,000 bookings in its first quarter of operation, generating substantial revenue for member hotels. User engagement metrics show an average session duration of 6.5 minutes, with a conversion rate of 7.8%. Hotel partners reported a 40% increase in direct bookings compared to previous systems, reducing their dependency on international booking platforms.'
            },
            ar: {
                title: 'Syrian Hotels',
                category: 'تطوير التطبيقات',
                client: 'جمعية الفنادق السورية',
                completionDate: 'فبراير 2025',
                websiteUrl: 'https://syrianhotels.netlify.app/',
                image: damascusImg,
                description: 'تطبيق شامل لحجز الفنادق مع حسابات المستخدمين وتكامل الدفع للعقارات في جميع أنحاء سوريا.',
                challenge: 'احتاجت جمعية الفنادق السورية إلى منصة حجز مركزية للفنادق في جميع أنحاء البلاد. كانوا بحاجة إلى حل من شأنه عرض العقارات، وإدارة الحجوزات، وتوفير التحليلات لمديري الفنادق مع إمكانية الوصول إليها للمسافرين الدوليين.',
                solution: 'قمنا بتطوير تطبيق متكامل مع واجهات ويب وجوال. تتضمن المنصة قوائم فنادق مفصلة مع صور عالية الجودة، وإدارة توفر الغرف، ومعالجة الدفع الآمن، ونظام المراجعة. بالنسبة لمديري الفنادق، أنشأنا لوحة تحكم مع أدوات إدارة الحجز وتحليلات الأداء.',
                technologies: ['React Native', 'React.js', 'Redux', 'Node.js', 'Express', 'PostgreSQL', 'AWS', 'Google Maps API', 'Stripe API'],
                features: [
                    'دعم متعدد اللغات (العربية، الإنجليزية، الفرنسية)',
                    'بحث متقدم مع مرشحات للموقع والسعر والمرافق',
                    'خرائط تفاعلية تعرض مواقع الفنادق',
                    'معالجة الدفع الآمن',
                    'نظام إدارة الحجز',
                    'نظام المراجعة والتقييم',
                    'لوحة تحليلات لمديري الفنادق',
                    'تصميم متجاوب للويب وتطبيقات جوال مخصصة'
                ],
                results: 'سهل التطبيق أكثر من 5,000 حجز في الربع الأول من التشغيل، مما أدى إلى تحقيق إيرادات كبيرة للفنادق الأعضاء. تظهر مقاييس مشاركة المستخدم متوسط مدة جلسة تبلغ 6.5 دقائق، مع معدل تحويل 7.8٪. أفاد شركاء الفنادق عن زيادة بنسبة 40٪ في الحجوزات المباشرة مقارنة بالأنظمة السابقة، مما يقلل من اعتمادهم على منصات الحجز الدولية.'
            }
        }
    };

    useEffect(() => {
        // Simulate API fetch
        setTimeout(() => {
            if (projectsData[id]) {
                setProject(projectsData[id][language] || projectsData[id]['en']);
            }
            setLoading(false);
        }, 500);

        // Scroll to top when the component mounts
        window.scrollTo(0, 0);
    }, [id, language]);

    if (loading) {
        return (
            <div className="project-detail loading">
                <div className="container">
                    <div className="loader"></div>
                </div>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="project-detail not-found">
                <div className="container">
                    <h2>{t('projectNotFound')}</h2>
                    <p>{t('projectNotFoundMessage')}</p>
                    <Link to="/#portfolio" className="btn-primary">{t('backToPortfolio')}</Link>
                </div>
            </div>
        );
    }

    return (
        <div className={`project-detail ${language === 'ar' ? 'rtl' : ''}`}>
            <div className="project-hero" style={{ backgroundImage: `url(${project.image})` }}>
                <div className="overlay"></div>
                <div className="container">
                    <h1>{project.title}</h1>
                    <p>{project.description}</p>
                </div>
            </div>

            <div className="container">
                <div className="project-content">
                    <div className="project-info">
                        <div className="info-item">
                            <h3>{t('client')}</h3>
                            <p>{project.client}</p>
                        </div>
                        <div className="info-item">
                            <h3>{t('category')}</h3>
                            <p>{project.category}</p>
                        </div>
                        <div className="info-item">
                            <h3>{t('completed')}</h3>
                            <p>{project.completionDate}</p>
                        </div>
                        <div className="info-item">
                            <h3>{t('website')}</h3>
                            <p>
                                <a href={project.websiteUrl} target="_blank" rel="noopener noreferrer">
                                    {t('visitWebsite')} <i className="fas fa-external-link-alt"></i>
                                </a>
                            </p>
                        </div>
                    </div>

                    <div className="project-details">
                        <div className="details-section">
                            <h2>{t('challenge')}</h2>
                            <p>{project.challenge}</p>
                        </div>

                        <div className="details-section">
                            <h2>{t('solution')}</h2>
                            <p>{project.solution}</p>
                        </div>

                        <div className="details-section">
                            <h2>{t('technologiesUsed')}</h2>
                            <div className="tech-tags">
                                {project.technologies.map((tech, index) => (
                                    <span key={index} className="tech-tag">{tech}</span>
                                ))}
                            </div>
                        </div>

                        <div className="details-section">
                            <h2>{t('keyFeatures')}</h2>
                            <ul className="features-list">
                                {project.features.map((feature, index) => (
                                    <li key={index}>
                                        <i className="fas fa-check-circle"></i>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="details-section">
                            <h2>{t('results')}</h2>
                            <p>{project.results}</p>
                        </div>
                    </div>
                </div>

                <div className="project-navigation">
                    <Link to="/#portfolio" className="btn-primary">
                        <i className={`fas ${language === 'ar' ? 'fa-arrow-right' : 'fa-arrow-left'}`}></i> {t('backToPortfolio')}
                    </Link>
                    <a href={project.websiteUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                        {t('visitLiveWebsite')} <i className="fas fa-external-link-alt"></i>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetail;