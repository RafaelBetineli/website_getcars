import { z } from "zod";

export const inquirySchema = z.object({
  vehicle: z
    .string()
    .trim()
    .min(2, "Informe a marca e o modelo do veículo.")
    .max(120, "Use até 120 caracteres."),
  year: z
    .string()
    .trim()
    .regex(/^\d{4}$/, "Informe um ano com quatro dígitos.")
    .refine(
      (value) => Number(value) >= 1900 && Number(value) <= new Date().getFullYear() + 1,
      "Informe um ano válido para o veículo.",
    ),
  km: z
    .string()
    .trim()
    .regex(
      /^(?:\d+|\d{1,3}(?:\.\d{3})+)(?:\s*km)?$/i,
      "Informe a quilometragem, como 12.000 ou 0 para zero km.",
    ),
  goal: z.enum(["Vender", "Trocar", "Intermediar"], {
    errorMap: () => ({ message: "Escolha o que deseja fazer com seu veículo." }),
  }),
  name: z.string().trim().min(2, "Informe seu nome.").max(100, "Use até 100 caracteres."),
});

export type VehicleInquiry = z.infer<typeof inquirySchema>;

export function inquiryMessage(data: VehicleInquiry) {
  const km = data.km.replace(/\s*km$/i, "");
  return `Olá, GETCARS! Gostaria de avaliar meu veículo.\nVeículo: ${data.vehicle}\nAno: ${data.year}\nQuilometragem: ${km} km\nObjetivo: ${data.goal}\nNome: ${data.name}`;
}
