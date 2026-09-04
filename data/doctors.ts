export const doctorDirections = [
  { value: "all", label: "Все" },
  { value: "implantation", label: "Имплантация" },
  { value: "braces", label: "Брекеты" },
  { value: "sedation", label: "Лечение во сне" },
  { value: "pediatric-dentistry", label: "Детская" },
  { value: "prosthetics", label: "Протезирование" },
  { value: "surgery", label: "Хирургия" },
] as const;

export type DoctorDirection = Exclude<(typeof doctorDirections)[number]["value"], "all">;

export type Doctor = {
  name: string;
  role: string;
  experience: string;
  image: string;
  imageAlt: string;
  directions: DoctorDirection[];
  services: string[];
};

export const doctors: Doctor[] = [
  {
    name: "Ерлан Садыков",
    role: "Стоматолог-хирург · Имплантолог",
    experience: "12 лет практики",
    image: "/images/doctor-erlan-v2.png",
    imageAlt: "Стоматолог-хирург Ерлан Садыков",
    directions: ["implantation", "surgery"],
    services: ["Имплантация", "Хирургия"],
  },
  {
    name: "Алия Касымова",
    role: "Ортодонт · Стоматолог-ортопед",
    experience: "9 лет практики",
    image: "/images/doctor-aliya.png",
    imageAlt: "Ортодонт Алия Касымова",
    directions: ["braces", "prosthetics"],
    services: ["Брекеты", "Протезирование"],
  },
  {
    name: "Дана Нуржанова",
    role: "Детский стоматолог",
    experience: "8 лет практики",
    image: "/images/doctor-dana.png",
    imageAlt: "Детский стоматолог Дана Нуржанова",
    directions: ["pediatric-dentistry", "sedation"],
    services: ["Детская стоматология", "Лечение во сне"],
  },
  {
    name: "Марат Жунусов",
    role: "Стоматолог-хирург · Ортопед",
    experience: "11 лет практики",
    image: "/images/doctor-marat.png",
    imageAlt: "Стоматолог-хирург Марат Жунусов",
    directions: ["implantation", "surgery", "prosthetics"],
    services: ["Имплантация", "Хирургия", "Протезирование"],
  },
  {
    name: "Сауле Ахметова",
    role: "Стоматолог · Детский специалист",
    experience: "10 лет практики",
    image: "/images/doctor-saule.png",
    imageAlt: "Стоматолог Сауле Ахметова",
    directions: ["sedation", "pediatric-dentistry"],
    services: ["Лечение во сне", "Детская стоматология"],
  },
  {
    name: "Тимур Абдрахманов",
    role: "Ортодонт · Стоматолог-ортопед",
    experience: "7 лет практики",
    image: "/images/doctor-timur.png",
    imageAlt: "Ортодонт Тимур Абдрахманов",
    directions: ["braces", "prosthetics"],
    services: ["Брекеты", "Протезирование"],
  },
];
