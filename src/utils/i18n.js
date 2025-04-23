// Import all locale files
import enHeader from '../locales/en/header.json';
import arHeader from '../locales/ar/header.json';
import enHero from '../locales/en/hero.json';
import arHero from '../locales/ar/hero.json';
import enServices from '../locales/en/services.json';
import arServices from '../locales/ar/services.json';
import enPortfolio from '../locales/en/portfolio.json';
import arPortfolio from '../locales/ar/portfolio.json';
import enAbout from '../locales/en/about.json';
import arAbout from '../locales/ar/about.json';
import enContact from '../locales/en/contact.json';
import arContact from '../locales/ar/contact.json';
import enFooter from '../locales/en/footer.json';
import arFooter from '../locales/ar/footer.json';
import enProjectDetail from '../locales/en/projectDetail.json';
import arProjectDetail from '../locales/ar/projectDetail.json';
// Import other sections when you create them
// etc.

// Organize translations by language and section
const translations = {
  en: {
    header: enHeader,
    hero: enHero,
    services: enServices,
    portfolio: enPortfolio,
    about: enAbout,
    contact: enContact,
    footer: enFooter,
    projectDetail: enProjectDetail,
    // Add other sections when you create them
    // etc.
  },
  ar: {
    header: arHeader,
    hero: arHero,
    services: arServices,
    portfolio: arPortfolio,
    about: arAbout,
    contact: arContact,
    footer: arFooter,
    projectDetail: arProjectDetail,
    // Add other sections when you create them
    // etc.
  }
};

/**
 * Get translation for a specific key in the current language
 * @param {string} language - Current language code ('en' or 'ar')
 * @param {string} section - Section name (e.g., 'header', 'hero')
 * @param {string} key - Translation key, can include dots for nested properties (e.g., 'location.title')
 * @returns {string} - Translated text
 */
export const getTranslation = (language, section, key) => {
  try {
    // Handle nested keys (e.g., 'location.title')
    const keys = key.split('.');
    let result = translations[language][section];

    // Navigate through the nested objects
    for (const k of keys) {
      if (result && result[k] !== undefined) {
        result = result[k];
      } else {
        return key; // Key not found
      }
    }

    return result || key;
  } catch (error) {
    console.warn(`Translation missing: ${language}.${section}.${key}`);
    return key;
  }
};

/**
 * A hook to get translations for a specific section
 * @param {string} language - Current language code ('en' or 'ar')
 * @param {string} section - Section name (e.g., 'header', 'hero')
 * @returns {Object} - Object with t function to get translations
 */
export const useTranslation = (language, section) => {
  const t = (key) => getTranslation(language, section, key);
  return { t };
};