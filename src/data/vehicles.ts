import car1 from "@/assets/car-1.jpg";
import car2 from "@/assets/car-2.jpg";
import car3 from "@/assets/car-3.jpg";
import car4 from "@/assets/car-4.jpg";
import repasseMercedes from "@/assets/repasse-exemplo-mercedes-c180.png";
import repasseJeep from "@/assets/repasse-exemplo-jeep-compass.png";

export type VehicleStatusType = "armored" | "factory" | "custom";

export interface Vehicle {
  id: string;
  nome: string;
  categoria: string;
  tipo: "esportivo" | "suv" | "sedan";
  ano: string;
  km: string;
  /** Modalidade comercial independente da categoria e da blindagem. */
  repasse?: boolean;
  /** Anúncio demonstrativo, sem representar um veículo real em estoque. */
  ficticio?: boolean;
  /** Marcar quando a imagem do anúncio for gerada por IA. */
  imagemGeradaPorIA?: boolean;
  statusType: VehicleStatusType;
  statusLabel: string;
  armorLevel?: string;
  img: string;
  descricao: string;
  destaque: boolean;
  whatsappMensagem: string;
}

export const vehicles: Vehicle[] = [
  {
    id: "porsche-911-carrera-t",
    nome: "Porsche 911 Carrera T",
    categoria: "Esportivo · Coleção",
    tipo: "esportivo",
    ano: "2024",
    km: "7.800 km",
    statusType: "factory",
    statusLabel: "Original de fábrica",
    img: car1,
    descricao: "Esportivo icônico, baixa quilometragem e procedência impecável.",
    destaque: true,
    whatsappMensagem:
      "Olá, GETCARS! Tenho interesse no Porsche 911 Carrera T e gostaria de receber mais informações.",
  },
  {
    id: "suburban-high-country",
    nome: "Suburban High Country",
    categoria: "SUV de Luxo",
    tipo: "suv",
    ano: "2026",
    km: "ZERO km",
    statusType: "factory",
    statusLabel: "Original de fábrica",
    img: car2,
    descricao: "SUV full-size de topo de linha, zero km, pronto para entrega.",
    destaque: false,
    whatsappMensagem:
      "Olá, GETCARS! Tenho interesse no Suburban High Country e gostaria de receber mais informações.",
  },
  {
    id: "bmw-330e",
    nome: "BMW 330e",
    categoria: "Alta performance",
    tipo: "sedan",
    ano: "2025",
    km: "19.000 km",
    statusType: "factory",
    statusLabel: "Original de fábrica",
    img: car3,
    descricao: "Sedan híbrido plug-in com performance e sofisticação alemã.",
    destaque: false,
    whatsappMensagem:
      "Olá, GETCARS! Tenho interesse no BMW 330e e gostaria de receber mais informações.",
  },
  {
    id: "nivus-gts-blindado",
    nome: "Nivus GTS",
    categoria: "Esportividade urbana",
    tipo: "suv",
    ano: "2026",
    km: "6.000 km",
    statusType: "armored",
    statusLabel: "Blindado nível III-A",
    armorLevel: "III-A",
    img: car4,
    descricao: "SUV coupé esportivo com blindagem nível III-A discreta.",
    destaque: false,
    whatsappMensagem:
      "Olá, GETCARS! Tenho interesse no Nivus GTS blindado e gostaria de receber mais informações.",
  },
  {
    id: "exemplo-repasse-mercedes-c180",
    nome: "Mercedes-Benz C 180 Avantgarde",
    categoria: "Sedan premium",
    tipo: "sedan",
    ano: "2018",
    km: "86.000 km",
    repasse: true,
    ficticio: true,
    imagemGeradaPorIA: true,
    statusType: "factory",
    statusLabel: "Exemplo fictício",
    img: repasseMercedes,
    descricao:
      "Exemplo fictício de sedan para avaliação do catálogo. Ano e quilometragem demonstrativos; não representa um veículo real em estoque.",
    destaque: false,
    whatsappMensagem:
      "Olá, GETCARS! Estou avaliando o exemplo fictício de repasse Mercedes-Benz C 180 Avantgarde e gostaria de entender como funciona a consulta de veículos.",
  },
  {
    id: "exemplo-repasse-jeep-compass",
    nome: "Jeep Compass Limited",
    categoria: "SUV",
    tipo: "suv",
    ano: "2019",
    km: "72.000 km",
    repasse: true,
    ficticio: true,
    imagemGeradaPorIA: true,
    statusType: "factory",
    statusLabel: "Exemplo fictício",
    img: repasseJeep,
    descricao:
      "Exemplo fictício de SUV para avaliação do catálogo. Ano e quilometragem demonstrativos; não representa um veículo real em estoque.",
    destaque: false,
    whatsappMensagem:
      "Olá, GETCARS! Estou avaliando o exemplo fictício de repasse Jeep Compass Limited e gostaria de entender como funciona a consulta de veículos.",
  },
];
