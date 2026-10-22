// URLs de la app GEMES Eat en las tiendas. Se configuran como variables de
// entorno (en Vercel: tipo "Config", no "Secret", porque NEXT_PUBLIC_* viaja al
// navegador). Mientras estén vacías, la página muestra "Próximamente" en vez de
// un botón roto.
export const STORE_LINKS = {
  ios: process.env.NEXT_PUBLIC_EAT_IOS_URL ?? "",
  android: process.env.NEXT_PUBLIC_EAT_ANDROID_URL ?? "",
};
