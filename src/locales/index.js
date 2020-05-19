//------------------------------------------------------------------------------
// <auto-generated>
// This code was generated by d2-i18n-generate.
//
// Changes to this file may cause incorrect behavior and will be lost if
// the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------
import i18n from '@dhis2/d2-i18n';
import moment from 'moment';
import 'moment/locale/es';
import 'moment/locale/fr';

import enTranslations from './en/translations.json';
import esTranslations from './es/translations.json';
import frTranslations from './fr/translations.json';

const namespace = 'bulk-load';
moment.locale('en');

i18n.addResources('en', namespace, enTranslations);
i18n.addResources('es', namespace, esTranslations);
i18n.addResources('fr', namespace, frTranslations);

i18n.setDefaultNamespace(namespace);
i18n.changeLanguage('en');

export default i18n;
