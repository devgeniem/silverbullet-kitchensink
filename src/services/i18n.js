import i18n from 'i18next';
import fi from '../locales/fi_FI';
import en from '../locales/en_US';

function getI18n(lang) {
  i18n.init({
    lng: lang,
    fallbackLng: 'fi',
    ns: ['common'],
    defaultNS: 'common',
  });

  Object.keys(fi).forEach((ns) => {
    if (Object.prototype.hasOwnProperty.call(fi, ns)) { i18n.addResourceBundle('fi', ns, fi[ns], true); }
  });

  Object.keys(en).forEach((ns) => {
    if (Object.prototype.hasOwnProperty.call(en, ns)) { i18n.addResourceBundle('en', ns, en[ns], true); }
  });

  return i18n;
}

export default getI18n;
