import { Localization } from '@mui/material/locale';
import enLang from './entries/en-US';
import zhLang from './entries/zh-Hans-CN';
import arLang from './entries/ar_SA';
import itLang from './entries/it_IT';
import esLang from './entries/es_ES';
import frLang from './entries/fr_FR';

interface AppLocalization {
  en: { messages: Record<string, unknown>; muiLocale: Localization; locale: string };
  zh: { messages: Record<string, unknown>; muiLocale: Localization; locale: string };
  ar: { messages: Record<string, unknown>; muiLocale: Localization; locale: string };
  it: { messages: Record<string, unknown>; muiLocale: Localization; locale: string };
  es: { messages: Record<string, unknown>; muiLocale: Localization; locale: string };
  fr: { messages: Record<string, unknown>; muiLocale: Localization; locale: string };
}

const AppLocale: AppLocalization = {
  en: enLang,
  zh: zhLang,
  ar: arLang,
  it: itLang,
  es: esLang,
  fr: frLang,
};

export default AppLocale;
