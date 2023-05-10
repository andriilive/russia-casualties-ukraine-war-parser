export enum LocaleEnum {
	uk,
	ru,
	en,
	cs,
}

export type CasualtiesType = Required<Record<keyof typeof LocaleEnum, number>>;

export const locales = ['uk', 'en', 'cs', 'ru'];

// const Locales= Object.fromEntries(LANGUAGES_PROVIDED.map(translation => ['LOCALE_' + translation.toUpperCase(), require(`./i18n/${translation}.json`)]));
