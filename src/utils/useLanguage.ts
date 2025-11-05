type Language<ITexts> = {
  english: ITexts
  portuguese: ITexts
}
export function useLanguage<ITexts>(Texts: Language<ITexts>): ITexts {
  const storageLang = localStorage.getItem("language")
  return Texts[storageLang || "pt"]
}