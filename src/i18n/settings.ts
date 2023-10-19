export const fallbackLng = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ? 'vi' : 'en'
export const languages = ['en', 'vi']
export const defaultNS = 'translation'

export function getOptions (lng = fallbackLng, ns = defaultNS) {
  return {
    // debug: true,
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns
  }
}
