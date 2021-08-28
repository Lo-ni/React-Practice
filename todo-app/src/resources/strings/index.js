import LocalizedStrings from 'react-localization';
import stringsDe from './strings-de';
import stringsEn from './strings-en';

const strings = new LocalizedStrings({
    en: stringsEn,
    de: stringsDe
})

export default strings