"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Heart,
  MapPin,
  Phone,
  ShieldCheck,
  Timer,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { services } from "@/data/services";
import { safeReveal } from "@/lib/motion";
import { BookingModal } from "./BookingModal";
import { DoctorsSection } from "./DoctorsSection";
import { Header } from "./Header";

const helpOptions = [
  ["Болит зуб", "Терапия и диагностика"],
  ["Отсутствует зуб", "Имплантация / протезирование"],
  ["Хочу ровные зубы", "Ортодонтия"],
  ["Нужен детский врач", "Детская стоматология"],
  ["Боюсь лечения", "Лечение во сне"],
  ["Нужна консультация", "Комплексная диагностика"],
];

const branches = [
  { address: "Кайым Мухамедханов, 11", hours: "Ежедневно 10:00–23:00", lat: 51.139492, lon: 71.39734, id: "70000001090596186" },
  { address: "Сарайшык, 36", hours: "Ежедневно 10:00–22:00", lat: 51.132271, lon: 71.434579, id: "70000001110593613" },
  { address: "Ахмет Байтурсынулы, 53", hours: "Ежедневно 10:00–22:00", lat: 51.116474, lon: 71.523039, id: "70000001095032770" },
].map((branch) => ({
  ...branch,
  routeUrl: `https://2gis.kz/astana/directions/points/%7C${branch.lon},${branch.lat};${branch.id}`,
  mapUrl: `https://widgets.2gis.com/widget?type=firmsonmap&options=${encodeURIComponent(JSON.stringify({
    pos: { lat: branch.lat, lon: branch.lon, zoom: 16 },
    opt: { city: "astana" },
    org: branch.id,
  }))}&lang=ru`,
}));

const instagramPhotos = [
  { src: "/images/clinic-interior.png", alt: "Интерьер клиники Liberty Stom" },
  { src: "/images/doctor-aliya.png", alt: "Врач Liberty Stom" },
  { src: "/images/service-pediatric.png", alt: "Детская стоматология Liberty Stom" },
  { src: "/images/service-braces.png", alt: "Консультация ортодонта Liberty Stom" },
  { src: "/images/service-implantation.png", alt: "Консультация имплантолога Liberty Stom" },
];

const reviews = [
  { name: "Алия М.", service: "Комплексное лечение", text: "Очень внимательный врач: всё объяснили простыми словами и составили понятный план лечения. На каждом этапе я знала, что и зачем мы делаем." },
  { name: "Айжан Н.", service: "Детская стоматология", text: "Лечили ребёнку зубы во сне. Всё прошло спокойно, команда была рядом и подробно отвечала на вопросы. Ребёнок даже не испугался." },
  { name: "Ольга К.", service: "Профилактический приём", text: "Чисто, современно и без очередей. Особенно понравились профессиональный подход врача и отзывчивость администраторов." },
];

const twoGisReviewsUrl = "https://2gis.kz/astana/firm/70000001090596186/tab/reviews";

export function LandingPage() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [initialService, setInitialService] = useState<string>();
  const [selectedHelp, setSelectedHelp] = useState(1);
  const [selectedBranch, setSelectedBranch] = useState(0);
  const [selectedReview, setSelectedReview] = useState(0);

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
          <motion.div className="section-heading split-heading" {...safeReveal}>
            <div><p className="eyebrow">Услуги</p><h2>Популярные<br />направления</h2></div>
            <p>Помогаем сохранить здоровье зубов и вернуть уверенность в улыбке — для взрослых и детей.</p>
          </motion.div>
          <div className="service-grid">
            {services.map((service, index) => (
              <motion.article key={service.slug} className="service-item" data-reveal-delay={index * 45} {...safeReveal}>
                <Link className="service-visual" href={`/services/${service.slug}`} aria-label={`Подробнее: ${service.title}`}>
                  <Image src={service.image} alt={service.imageAlt} fill sizes="(max-width: 760px) 50vw, 17vw" className="service-card-image" />
                </Link>
                <h3><Link href={`/services/${service.slug}`}>{service.title}</Link></h3>
                <p>{service.cardText}</p>
                <Link className="service-arrow" href={`/services/${service.slug}`} aria-label={`Открыть страницу: ${service.title}`}><ArrowRight size={18} /></Link>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="section help-section" id="help">
          <div className="help-shell">
            <motion.div className="section-heading" {...safeReveal}>
              <p className="eyebrow">Подбор лечения</p>
              <h2>Что вас беспокоит?</h2>
              <p>Выберите ситуацию — мы подскажем, с какого специалиста начать.</p>
            </motion.div>
            <motion.div className="help-layout" data-reveal-delay="80" {...safeReveal}>
              <div className="help-options" aria-label="Выбор ситуации">
                {helpOptions.map(([label], index) => (
                  <button key={label} className={selectedHelp === index ? "active" : ""} onClick={() => setSelectedHelp(index)}>
                    <span>{String(index + 1).padStart(2, "0")}</span>{label}
                  </button>
                ))}
              </div>
              <AnimatePresence mode="wait" initial={false}>
                <motion.aside
                  className="help-answer"
                  key={selectedHelp}
                  initial={{ opacity: 0, scale: .97, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: .98, y: -8 }}
                  transition={{ duration: .24 }}
                >
                  <span className="help-answer-number">{String(selectedHelp + 1).padStart(2, "0")}</span>
                  <p>Рекомендуемое направление</p>
                  <h3>{helpOptions[selectedHelp][1]}</h3>
                  <p>Начните с консультации: врач проведёт диагностику и составит понятный план лечения.</p>
                  <button className="button help-answer-cta" onClick={() => openBooking(helpOptions[selectedHelp][1])}>Записаться <ArrowRight size={18} /></button>
                </motion.aside>
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        <DoctorsSection onBook={openBooking} />

        <section className="section implant-section" id="implantation">
          <motion.div className="implant-copy" {...safeReveal}>
            <p className="eyebrow">Имплантация</p>
            <h2>Верните улыбке<br />целостность</h2>
            <p>Персональный план лечения, цифровая диагностика и сопровождение на каждом этапе.</p>
            <strong className="large-price">от 70 000 ₸</strong>
            <div className="inline-actions">
              <Link className="button button-dark" href="/services/implantation">Об имплантации</Link>
              <button className="text-link" onClick={() => openBooking("Имплантация")}>Получить консультацию <ArrowRight size={17} /></button>
            </div>
          </motion.div>
          <motion.div className="implant-image" data-reveal-delay="90" {...safeReveal}>
            <Image src="/images/service-implantation.png" alt="Имплантолог объясняет пациентке план лечения" fill sizes="(max-width: 800px) 100vw, 55vw" className="cover-image" />
          </motion.div>
        </section>

        <section className="section clinic-section" id="about">
          <motion.div className="clinic-image" {...safeReveal}>
            <Image src="/images/clinic-interior.png" alt="Интерьер Liberty Stom" fill sizes="(max-width: 800px) 100vw, 58vw" className="cover-image" />
          </motion.div>
          <motion.div className="clinic-copy" data-reveal-delay="90" {...safeReveal}>
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
          <motion.div className="trust-grid" {...safeReveal}>
            <div><strong>12+</strong><span>лет опыта</span></div>
            <div><strong>20 000+</strong><span>пациентов</span></div>
            <div><strong>4.9</strong><span>средний рейтинг</span></div>
            <div><strong>3</strong><span>филиала в Астане</span></div>
          </motion.div>
        </section>

        <section className="reviews-section" id="reviews">
          <div className="reviews-shell">
            <motion.aside className="reviews-rating" {...safeReveal}>
              <p className="eyebrow">Нас рекомендуют</p>
              <strong>4.9</strong>
              <div className="reviews-rating-stars" aria-label="Рейтинг 4,9 из 5">★★★★★</div>
              <span>рейтинг клиники в 2ГИС</span>
              <a className="reviews-2gis-link" href={twoGisReviewsUrl} target="_blank" rel="noreferrer">
                <Image src="/2gis.png" alt="2ГИС" width={34} height={34} />
                <span>Все отзывы на 2GIS</span>
                <ArrowRight size={17} />
              </a>
            </motion.aside>

            <motion.div className="review-stage" data-reveal-delay="90" {...safeReveal}>
              <div className="review-stage-heading">
                <div><p className="eyebrow">Отзывы</p><h2>Пациенты о нас</h2></div>
                <span>{String(selectedReview + 1).padStart(2, "0")} / {String(reviews.length).padStart(2, "0")}</span>
              </div>
              <AnimatePresence mode="wait" initial={false}>
                <motion.blockquote
                  key={reviews[selectedReview].name}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: .24 }}
                >
                  <span className="review-quote-mark" aria-hidden="true">“</span>
                  <p>{reviews[selectedReview].text}</p>
                  <footer>
                    <span className="review-avatar">{reviews[selectedReview].name.charAt(0)}</span>
                    <span><strong>{reviews[selectedReview].name}</strong><small>{reviews[selectedReview].service}</small></span>
                    <a href={twoGisReviewsUrl} target="_blank" rel="noreferrer"><Image src="/2gis.png" alt="2ГИС" width={26} height={26} /> 2ГИС</a>
                  </footer>
                </motion.blockquote>
              </AnimatePresence>
              <div className="review-controls">
                <div className="review-dots" aria-label="Выбрать отзыв">
                  {reviews.map((review, index) => <button key={review.name} className={selectedReview === index ? "active" : ""} onClick={() => setSelectedReview(index)} aria-label={`Отзыв ${index + 1}`} aria-pressed={selectedReview === index} />)}
                </div>
                <div>
                  <button onClick={() => setSelectedReview((selectedReview - 1 + reviews.length) % reviews.length)} aria-label="Предыдущий отзыв"><ArrowLeft /></button>
                  <button onClick={() => setSelectedReview((selectedReview + 1) % reviews.length)} aria-label="Следующий отзыв"><ArrowRight /></button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="section instagram-section" id="instagram">
          <motion.div className="instagram-heading" {...safeReveal}>
            <div className="instagram-profile">
              <Image src="/instagram.png" alt="" width={56} height={56} />
              <div><p className="eyebrow">Instagram</p><h2>@liberty_stom</h2></div>
            </div>
            <div className="instagram-intro">
              <p>Знакомим с врачами, показываем клинику и понятно рассказываем о здоровье улыбки.</p>
              <a className="instagram-follow" href="https://www.instagram.com/liberty_stom/" target="_blank" rel="noreferrer">Открыть профиль <ArrowRight size={17} /></a>
            </div>
          </motion.div>
          <div className="instagram-grid">
            {instagramPhotos.map((photo, index) => (
              <motion.a
                key={photo.src}
                className={`instagram-photo instagram-photo-${index + 1}`}
                href="https://www.instagram.com/liberty_stom/"
                target="_blank"
                rel="noreferrer"
                aria-label={`Открыть Instagram Liberty Stom: ${photo.alt}`}
                data-reveal-delay={index * 45}
                {...safeReveal}
              >
                <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 760px) 72vw, 32vw" className="cover-image" />
                <span><Image src="/instagram.png" alt="" width={25} height={25} /> Смотреть в Instagram</span>
              </motion.a>
            ))}
          </div>
        </section>

        <section className="section branches-section" id="branches">
          <motion.div className="branches-copy" {...safeReveal}>
            <p className="eyebrow">Филиалы</p><h2>Три филиала<br />в Астане</h2>
            <div className="branch-list">
              {branches.map((branch, index) => (
                <div key={branch.id} className={selectedBranch === index ? "active" : ""}>
                  <button type="button" className="branch-select" onClick={() => setSelectedBranch(index)} aria-pressed={selectedBranch === index}>
                    <MapPin size={20} />
                    <span><strong>{branch.address}</strong><small>{branch.hours}</small></span>
                  </button>
                  <a className="branch-route" href={branch.routeUrl} target="_blank" rel="noreferrer" aria-label={`Построить маршрут в 2ГИС: ${branch.address}`}>
                    <Image src="/2gis.png" alt="" width={24} height={24} />
                    <span>Маршрут</span>
                  </a>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div className="map-art" data-reveal-delay="90" {...safeReveal}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={branches[selectedBranch].id}
                className="branch-map-frame"
                initial={{ opacity: 0, scale: .992 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.008 }}
                transition={{ duration: .22 }}
              >
                <iframe
                  src={branches[selectedBranch].mapUrl}
                  title={`Карта 2ГИС — ${branches[selectedBranch].address}`}
                  loading="lazy"
                  allowFullScreen
                />
              </motion.div>
            </AnimatePresence>
            <div className="map-caption">
              <span>На карте: {branches[selectedBranch].address}</span>
              <a href={branches[selectedBranch].routeUrl} target="_blank" rel="noreferrer">
                <Image src="/2gis.png" alt="2ГИС" width={24} height={24} />
                Построить маршрут
              </a>
            </div>
          </motion.div>
        </section>

        <motion.section className="section consultation" id="booking" {...safeReveal}>
          <div><p className="eyebrow">Первый шаг</p><h2>Начните с<br />консультации</h2><p>Оставьте номер — администратор поможет выбрать врача и удобное время.</p></div>
          <div className="consultation-actions">
            <button className="button button-light" onClick={() => openBooking()}>Записаться <CalendarDays size={18} /></button>
            <span>или</span>
            <a className="whatsapp-link" href="https://wa.me/77011161800?text=Здравствуйте!%20Хочу%20записаться%20на%20консультацию." target="_blank" rel="noreferrer"><Image className="wa-icon" src="/wa.png" alt="" width={34} height={34} /> Написать<br />в WhatsApp</a>
          </div>
        </motion.section>
      </main>

      <footer className="site-footer">
        <div className="footer-brand"><Link className="footer-logo" href="/"><Image src="/logo.png" alt="Liberty Stom" width={54} height={54} /><strong>LIBERTY STOM</strong></Link><p>Семейная стоматология<br />в Астане</p></div>
        <div><span>Навигация</span><a href="#services">Услуги</a><a href="#doctors">Врачи</a><a href="#branches">Филиалы</a></div>
        <div><span>Контакты</span><a href="tel:+7 701 116 1800">+7 701 116 1800</a><a href="mailto:info@libertystom.kz">info@libertystom.kz</a><a className="footer-instagram" href="https://www.instagram.com/liberty_stom/" target="_blank" rel="noreferrer"><Image src="/instagram.png" alt="" width={22} height={22} /> @liberty_stom</a></div>
        <p className="copyright">© Liberty Stom 2026</p>
      </footer>

      <div className="mobile-sticky">
        <a href="tel:+7 701 116 1800"><Phone size={18} />Позвонить</a>
        <a href="https://wa.me/77071161800" target="_blank" rel="noreferrer"><Image className="wa-icon" src="/wa.png" alt="" width={21} height={21} />WhatsApp</a>
        <button onClick={() => openBooking()}><CalendarDays size={18} />Записаться</button>
      </div>

      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} initialService={initialService} />
    </>
  );
}
