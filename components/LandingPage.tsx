"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Baby,
  CalendarDays,
  ChevronRight,
  CircleDot,
  Heart,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  SunMedium,
  Syringe,
  Timer,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BookingModal } from "./BookingModal";
import { Header } from "./Header";

const services = [
  { title: "Имплантация", price: "от 70 000 ₸", icon: CircleDot, href: "/services/implantation" },
  { title: "Брекеты", price: "от 89 990 ₸", icon: Sparkles, href: "#booking" },
  { title: "Лечение во сне", price: "от 15 000 ₸", icon: SunMedium, href: "#booking" },
  { title: "Детская стоматология", price: "Забота без страха", icon: Baby, href: "#booking" },
  { title: "Протезирование", price: "Точно и естественно", icon: ShieldCheck, href: "#booking" },
  { title: "Хирургия", price: "Бережный подход", icon: Syringe, href: "#booking" },
];

const helpOptions = [
  ["Болит зуб", "Терапия и диагностика"],
  ["Отсутствует зуб", "Имплантация / протезирование"],
  ["Хочу ровные зубы", "Ортодонтия"],
  ["Нужен детский врач", "Детская стоматология"],
  ["Боюсь лечения", "Лечение во сне"],
  ["Нужна консультация", "Комплексная диагностика"],
];

const branches = [
  ["Мухамеджанова, 11", "Пн–Вс 08:00–21:00"],
  ["Байтурсынова, 53", "Пн–Вс 08:00–21:00"],
  ["Сарайшык, 36", "Пн–Вс 08:00–21:00"],
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.55 },
};

export function LandingPage() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [initialService, setInitialService] = useState<string>();
  const [selectedHelp, setSelectedHelp] = useState(1);

  const openBooking = (service?: string) => {
    setInitialService(service);
    setBookingOpen(true);
  };

  return (
    <>
      <Header onBook={() => openBooking()} />
      <main>
        <section className="hero">
          <Image src="/images/hero-clinic.png" alt="Консультация в клинике Liberty Stom" fill priority sizes="100vw" className="hero-image" />
          <div className="hero-overlay" />
          <motion.div className="hero-content" initial={{ y: 20 }} animate={{ y: 0 }} transition={{ duration: 0.7 }}>
            <p className="eyebrow">Семейная стоматология в Астане</p>
            <h1>Стоматология,<br />которой доверяет<br />вся семья</h1>
            <p className="hero-copy">Современное лечение взрослых и детей — спокойно, понятно и без лишнего стресса.</p>
            <div className="hero-actions">
              <button className="button button-dark" onClick={() => openBooking()}>Записаться на консультацию</button>
              <a className="text-link" href="#services">Наши услуги <ArrowRight size={17} /></a>
            </div>
            <div className="hero-stats">
              <div><strong>4.9</strong><span>средний рейтинг</span></div>
              <div><strong>326</strong><span>отзывов</span></div>
              <div><strong>3</strong><span>филиала в Астане</span></div>
            </div>
          </motion.div>
        </section>

        <section className="section services-section" id="services">
          <motion.div className="section-heading split-heading" {...fadeUp}>
            <div><p className="eyebrow">Услуги</p><h2>Популярные<br />направления</h2></div>
            <p>Помогаем сохранить здоровье зубов и вернуть уверенность в улыбке — для взрослых и детей.</p>
          </motion.div>
          <div className="service-grid">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div key={service.title} className="service-item" {...fadeUp} transition={{ duration: 0.45, delay: index * 0.04 }}>
                  <div className="service-visual"><Icon strokeWidth={1.25} /></div>
                  <h3>{service.title}</h3>
                  <p>{service.price}</p>
                  {service.href.startsWith("/") ? (
                    <Link href={service.href} aria-label={`Подробнее: ${service.title}`}><ArrowRight size={18} /></Link>
                  ) : (
                    <button aria-label={`Записаться: ${service.title}`} onClick={() => openBooking(service.title)}><ArrowRight size={18} /></button>
                  )}
                </motion.div>
              );
            })}
          </div>
        </section>

        <section className="section help-section">
          <motion.div className="section-heading" {...fadeUp}>
            <p className="eyebrow">Подбор лечения</p>
            <h2>Что вас беспокоит?</h2>
            <p>Выберите ситуацию — подскажем подходящее направление.</p>
          </motion.div>
          <div className="help-layout">
            <div className="help-options">
              {helpOptions.map(([label], index) => (
                <button key={label} className={selectedHelp === index ? "active" : ""} onClick={() => setSelectedHelp(index)}>
                  <span>{String(index + 1).padStart(2, "0")}</span>{label}<ChevronRight size={17} />
                </button>
              ))}
            </div>
            <motion.div className="help-answer" key={selectedHelp} initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }}>
              <Stethoscope size={28} strokeWidth={1.5} />
              <p>Рекомендуемое направление</p>
              <h3>{helpOptions[selectedHelp][1]}</h3>
              <p>Врач проведёт диагностику и составит понятный план лечения с точной стоимостью.</p>
              <button className="button button-light" onClick={() => openBooking(helpOptions[selectedHelp][1])}>Записаться <ArrowRight size={18} /></button>
            </motion.div>
          </div>
        </section>

        <section className="section doctor-section" id="doctors">
          <motion.div className="doctor-image-wrap" {...fadeUp}>
            <Image src="/images/doctor-sadykov.png" alt="Ерлан Садыков, стоматолог-хирург" fill sizes="(max-width: 800px) 100vw, 42vw" className="cover-image" />
            <span className="doctor-badge">12 лет практики</span>
          </motion.div>
          <motion.div className="doctor-copy" {...fadeUp}>
            <p className="eyebrow">Наша команда</p>
            <h2>Врачи, которым<br />можно доверять</h2>
            <p>Сильная команда специалистов работает по единым протоколам и объясняет каждый этап лечения простым языком.</p>
            <div className="doctor-name">
              <div><strong>Ерлан Садыков</strong><span>Стоматолог-хирург · Имплантолог</span></div>
              <ArrowRight size={20} />
            </div>
            <div className="doctor-specialties">
              <span>Ортодонтия</span><span>Терапия</span><span>Детская стоматология</span><span>Ортопедия</span>
            </div>
            <button className="button button-dark" onClick={() => openBooking()}>Записаться к врачу</button>
          </motion.div>
        </section>

        <section className="section implant-section" id="implantation">
          <motion.div className="implant-copy" {...fadeUp}>
            <p className="eyebrow">Имплантация</p>
            <h2>Верните улыбке<br />целостность</h2>
            <p>Персональный план лечения, цифровая диагностика и сопровождение на каждом этапе.</p>
            <strong className="large-price">от 70 000 ₸</strong>
            <div className="inline-actions">
              <Link className="button button-dark" href="/services/implantation">Об имплантации</Link>
              <button className="text-link" onClick={() => openBooking("Имплантация")}>Получить консультацию <ArrowRight size={17} /></button>
            </div>
          </motion.div>
          <motion.div className="implant-image" {...fadeUp}>
            <Image src="/images/implant-model.png" alt="Модель зубного импланта" fill sizes="(max-width: 800px) 100vw, 55vw" className="cover-image" />
          </motion.div>
        </section>

        <section className="section clinic-section" id="about">
          <motion.div className="clinic-image" {...fadeUp}>
            <Image src="/images/clinic-interior.png" alt="Интерьер Liberty Stom" fill sizes="(max-width: 800px) 100vw, 58vw" className="cover-image" />
          </motion.div>
          <motion.div className="clinic-copy" {...fadeUp}>
            <p className="eyebrow">О клинике</p>
            <h2>Комфорт начинается<br />ещё до лечения</h2>
            <p>Современное оборудование, внимательная команда и спокойная атмосфера в каждом филиале.</p>
            <ul>
              <li><ShieldCheck /> Современные протоколы</li>
              <li><Heart /> Забота и внимание</li>
              <li><Timer /> Приём без спешки</li>
            </ul>
          </motion.div>
        </section>

        <section className="section trust-section">
          <p className="eyebrow">Доверие, проверенное временем</p>
          <div className="trust-grid">
            <div><strong>12+</strong><span>лет опыта</span></div>
            <div><strong>20 000+</strong><span>пациентов</span></div>
            <div><strong>4.9</strong><span>средний рейтинг</span></div>
            <div><strong>3</strong><span>филиала в Астане</span></div>
          </div>
        </section>

        <section className="section reviews-section">
          <div className="section-heading split-heading"><div><p className="eyebrow">Отзывы</p><h2>Пациенты о нас</h2></div><a className="text-link" href="#">Все отзывы на 2GIS <ArrowRight size={17} /></a></div>
          <div className="reviews-grid">
            {[
              ["Алия М.", "Очень внимательный врач, всё объяснили и составили понятный план лечения."],
              ["Айжан Н.", "Лечили ребёнку зубы во сне. Всё прошло спокойно, ребёнок даже не испугался."],
              ["Ольга К.", "Чисто, современно, без очередей. Профессиональный подход и отзывчивый сервис."],
            ].map(([name, text]) => (
              <motion.blockquote key={name} {...fadeUp}>
                <span className="stars">★★★★★</span><p>{text}</p><footer><strong>{name}</strong><span>2GIS</span></footer>
              </motion.blockquote>
            ))}
          </div>
        </section>

        <section className="section branches-section" id="branches">
          <div className="branches-copy">
            <p className="eyebrow">Филиалы</p><h2>Три филиала<br />в Астане</h2>
            <div className="branch-list">
              {branches.map(([address, hours], index) => (
                <div key={address}><MapPin size={20} /><span><strong>{address}</strong><small>{hours}</small></span><a href="#">Маршрут <ArrowRight size={15} /></a></div>
              ))}
            </div>
          </div>
          <div className="map-art" aria-label="Схема расположения филиалов">
            <span className="river" />
            {["pin-one", "pin-two", "pin-three"].map((className) => <span key={className} className={`map-pin ${className}`}><MapPin size={22} fill="currentColor" /></span>)}
          </div>
        </section>

        <section className="section consultation" id="booking">
          <div><p className="eyebrow">Первый шаг</p><h2>Начните с<br />консультации</h2><p>Оставьте номер — администратор поможет выбрать врача и удобное время.</p></div>
          <div className="consultation-actions">
            <button className="button button-light" onClick={() => openBooking()}>Записаться <CalendarDays size={18} /></button>
            <span>или</span>
            <a className="whatsapp-link" href="https://wa.me/77010010001?text=Здравствуйте!%20Хочу%20записаться%20на%20консультацию." target="_blank" rel="noreferrer"><MessageCircle /> Написать<br />в WhatsApp</a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-brand"><strong>LIBERTY STOM</strong><p>Семейная стоматология<br />в Астане</p></div>
        <div><span>Навигация</span><a href="#services">Услуги</a><a href="#doctors">Врачи</a><a href="#branches">Филиалы</a></div>
        <div><span>Контакты</span><a href="tel:+77010010001">+7 701 001 00 01</a><a href="mailto:info@libertystom.kz">info@libertystom.kz</a></div>
        <p className="copyright">© Liberty Stom 2026</p>
      </footer>

      <div className="mobile-sticky">
        <a href="tel:+77010010001"><Phone size={18} />Позвонить</a>
        <a href="https://wa.me/77010010001" target="_blank" rel="noreferrer"><MessageCircle size={18} />WhatsApp</a>
        <button onClick={() => openBooking()}><CalendarDays size={18} />Записаться</button>
      </div>

      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} initialService={initialService} />
    </>
  );
}
