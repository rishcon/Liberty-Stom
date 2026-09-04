"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, ChevronDown, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Service } from "@/data/services";
import { BookingModal } from "./BookingModal";
import { Header } from "./Header";

type ServiceDetailPageProps = {
  service: Service;
};

export function ServiceDetailPage({ service }: ServiceDetailPageProps) {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const reduceMotion = useReducedMotion();
  const faqSpring = reduceMotion
    ? { duration: 0.15 }
    : { type: "spring" as const, stiffness: 420, damping: 42, mass: 0.8 };
  const whatsappUrl = `https://wa.me/77010010001?text=${encodeURIComponent(service.whatsappText)}`;

  return (
    <>
      <Header onBook={() => setBookingOpen(true)} light />
      <main className="service-page">
        <section className="service-hero">
          <div className="service-hero-copy">
            <Link className="back-link" href="/#services"><ArrowLeft size={16} /> Все услуги</Link>
            <motion.p className="eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{service.eyebrow}</motion.p>
            <motion.h1
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={reduceMotion ? { duration: 0.16 } : { type: "spring", stiffness: 180, damping: 24 }}
            >
              {service.heroTitle.map((line, index) => <span key={line}>{line}{index < service.heroTitle.length - 1 && <br />}</span>)}
            </motion.h1>
            <p>{service.heroLead}</p>
            <div className="service-price"><span>Стоимость</span><strong>{service.price}</strong></div>
            <button className="button button-dark" onClick={() => setBookingOpen(true)}>Получить консультацию <ArrowRight size={18} /></button>
          </div>
          <motion.div
            className="service-hero-image"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.025 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: reduceMotion ? 0.16 : 0.7 }}
          >
            <Image src={service.image} alt={service.imageAlt} fill priority sizes="(max-width: 800px) 100vw, 52vw" className="cover-image" />
          </motion.div>
        </section>

        <section className="service-intro section">
          <p className="eyebrow">О направлении</p>
          <div><h2>{service.introTitle}</h2><p>{service.introCopy}</p></div>
          <div className="intro-points">
            {service.indications.map((item) => <span key={item}><Check /> {item}</span>)}
          </div>
        </section>

        <section className="stages-section section" id="stages">
          <p className="eyebrow">Путь к результату</p><h2>Пять понятных этапов</h2>
          <div className="stages-list">
            {service.stages.map((stage, index) => (
              <div key={stage.title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{stage.title}</h3><p>{stage.copy}</p></div>
            ))}
          </div>
        </section>

        <section className="price-section section">
          <div><p className="eyebrow">Стоимость</p><h2>Понятно до начала лечения</h2><p>Финальная стоимость зависит от клинической ситуации. После диагностики врач составит прозрачный план без скрытых пунктов.</p></div>
          <div className="price-table">
            {service.prices.map((item) => <div key={item.label}><span>{item.label}</span><strong>{item.value}</strong></div>)}
          </div>
        </section>

        <section className="service-doctor section service-approach">
          <div className="service-doctor-image"><Image src="/images/clinic-interior.png" alt="Современный кабинет Liberty Stom" fill sizes="(max-width: 800px) 100vw, 40vw" className="cover-image" /></div>
          <div><p className="eyebrow">Подход Liberty Stom</p><h2>{service.approachTitle}</h2><p>{service.approachCopy}</p><span className="doctor-proof"><ShieldCheck /> {service.approachProof}</span><button className="button button-dark" onClick={() => setBookingOpen(true)}>Записаться к специалисту</button></div>
        </section>

        <section className="faq-section section">
          <div><p className="eyebrow">FAQ</p><h2>Частые вопросы</h2><p>{service.faqIntro}</p></div>
          <div className="faq-list">
            {service.faq.map((item, index) => (
              <motion.div key={item.question} className={openFaq === index ? "open" : ""} layout={!reduceMotion}>
                <button
                  id={`${service.slug}-faq-trigger-${index}`}
                  aria-expanded={openFaq === index}
                  aria-controls={`${service.slug}-faq-panel-${index}`}
                  onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                >
                  <span>{item.question}</span><ChevronDown />
                </button>
                <motion.p
                  id={`${service.slug}-faq-panel-${index}`}
                  role="region"
                  aria-labelledby={`${service.slug}-faq-trigger-${index}`}
                  initial={false}
                  animate={{ height: openFaq === index ? "auto" : 0, opacity: openFaq === index ? 1 : 0 }}
                  transition={faqSpring}
                >
                  {item.answer}
                </motion.p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="service-final-cta section">
          <div><p className="eyebrow">Сделайте первый шаг</p><h2>Узнайте, какой вариант подойдёт именно вам</h2></div>
          <div><button className="button button-light" onClick={() => setBookingOpen(true)}>Записаться на консультацию</button><a href={whatsappUrl} target="_blank" rel="noreferrer"><Image className="wa-icon" src="/wa.png" alt="" width={28} height={28} /> Спросить в WhatsApp</a></div>
        </section>
      </main>

      <footer className="simple-footer"><Link className="simple-footer-logo" href="/"><Image src="/logo.png" alt="Liberty Stom" width={44} height={44} /><span>LIBERTY STOM</span></Link><span>Семейная стоматология в Астане</span><a href="tel:+77010010001">+7 701 001 00 01</a></footer>
      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} initialService={service.title} />
    </>
  );
}
