import i18n from 'i18next';
import fi from '../locales/fi_FI';
import en from '../locales/en_US';
import localStorage from 'localStorage';

i18n.init({
  lng: localStorage.getItem('currentLang') || "en",
  fallbackLng: "fi",
  ns: ['common'],
  defaultNS: 'common'
})

for (const ns in fi) {
  if (fi.hasOwnProperty(ns))
    i18n.addResourceBundle("fi", ns, fi[ns], true)
}

for (const ns in en) {
  if (fi.hasOwnProperty(ns))
    i18n.addResourceBundle("en", ns, en[ns], true)
}

export default i18n