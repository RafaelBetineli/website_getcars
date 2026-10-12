const WHATSAPP_NUMBER = "5511997292805";
export const INSTAGRAM_URL = "https://instagram.com/getcars_/";

export function whatsappLink(mensagem?: string) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return mensagem ? `${base}?text=${encodeURIComponent(mensagem)}` : base;
}
