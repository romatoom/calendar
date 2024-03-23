const locales = ["ru", "zh", "en", "de", "fr"];

const getLanguages = () => {
  return locales.map((locale) => ({
    locale,
    title: new Intl.DisplayNames([locale], { type: "language" }).of(locale),
  }));
};

export { getLanguages };
