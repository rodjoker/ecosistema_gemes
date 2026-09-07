export const WHATSAPP_NUMBER = "593988594710";

/** Cada CTA de Hub manda un mensaje pre-armado distinto según el contexto donde vive el botón. */
export function waLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
