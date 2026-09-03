"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, ChevronDown, MessageCircle, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BookingModal } from "./BookingModal";
import { Header } from "./Header";

const stages = [
  ["01", "Консультация", "Знакомимся, обсуждаем ожидания и отвечаем на вопросы."],
  ["02", "Диагностика", "Делаем снимки и оцениваем состояние костной ткани."],
  ["03", "План лечения", "Фиксируем этапы, сроки и точную стоимость."],
  ["04", "Установка импланта", "Проводим процедуру бережно и под надёжным обезболиванием."],
  ["05", "Протезирование", "Устанавливаем коронку естественной формы и оттенка."],
];

const faq = [
  ["Больно ли устанавливать имплант?", "Процедура проходит под современной анестезией. Большинство пациентов ощущают только лёгкое давление, а после лечения врач даёт подробные рекомендации."],
  ["Сколько длится процедура?", "Установка одного импланта обычно занимает 30–60 минут. Точное время зависит от клинической ситуации."],
  ["Сколько служит имплант?", "При правильном уходе и регулярной профилактике имплант может служить десятилетиями."],
  ["Можно ли сразу поставить временный зуб?", "В некоторых случаях — да. Возможность немедленной нагрузки врач определит после диагностики."],
];

export function ImplantationPage() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <>
      <Header onBook={() => setBookingOpen(true)} light />
      <main className="service-page">
        <section className="service-hero">
          <div className="service-hero-copy">
            <Link className="back-link" href="/"><ArrowLeft size={16} /> На главную</Link>
            <motion.p className="eyebrow">Имплантация в Liberty Stom</motion.p>
            <motion.h1 initial={{ y: 18 }} animate={{ y: 0 }}>Новая улыбка.<br />Надёжно и надолго.</motion.h1>
            <p>Восстанавливаем один или несколько зубов с прогнозируемым результатом и заботой на каждом этапе.</p>
            <div className="service-price"><span>Стоимость</span><strong>от 70 000 ₸</strong></div>
            <button className="button button-dark" onClick={() => setBookingOpen(true)}>Получить консультацию <ArrowRight size={18} /></button>
          </div>
          <div className="service-hero-image">
            <Image src="/images/implant-model.png" alt="Модель зубного импланта" fill priority sizes="(max-width: 800px) 100vw, 52vw" className="cover-image" />
          </div>
        </section>

        <section className="service-intro section">
          <p className="eyebrow">О процедуре</p>
          <div><h2>Имплант заменяет корень зуба</h2><p>Это небольшая титановая опора, на которую устанавливается коронка. Она выглядит естественно, помогает комфортно жевать и не требует обтачивания соседних зубов.</p></div>
          <div className="intro-points">
            <span><Check /> Один отсутствующий зуб</span><span><Check /> Несколько зубов</span><span><Check /> Полная потеря зубов</span>
          </div>
        </section>

        <section className="stages-section section">
          <p className="eyebrow">Путь к результату</p><h2>Пять понятных этапов</h2>
          <div className="stages-list">
            {stages.map(([number, title, copy]) => (
              <div key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></div>
            ))}
          </div>
        </section>

        <section className="price-section section">
          <div><p className="eyebrow">Стоимость</p><h2>Понятно до начала лечения</h2><p>Финальная стоимость зависит от клинической ситуации. После диагностики врач составит прозрачный план без скрытых пунктов.</p></div>
          <div className="price-table">
            <div><span>Консультация имплантолога</span><strong>бесплатно</strong></div>
            <div><span>Имплантация</span><strong>от 70 000 ₸</strong></div>
            <div><span>Коронка</span><strong>индивидуально</strong></div>
          </div>
        </section>

        <section className="service-doctor section">
          <div className="service-doctor-image"><Image src="/images/doctor-sadykov.png" alt="Ерлан Садыков" fill sizes="(max-width: 800px) 100vw, 40vw" className="cover-image" /></div>
          <div><p className="eyebrow">Врач направления</p><h2>Ерлан Садыков</h2><p className="doctor-role">Стоматолог-хирург · Имплантолог</p><p>12 лет клинической практики. Работает со сложными случаями и помогает пациенту спокойно пройти весь путь — от диагностики до постоянной коронки.</p><span className="doctor-proof"><ShieldCheck /> Более 2 000 установленных имплантов</span><button className="button button-dark" onClick={() => setBookingOpen(true)}>Записаться к врачу</button></div>
        </section>

        <section className="faq-section section">
          <div><p className="eyebrow">FAQ</p><h2>Частые вопросы</h2><p>Коротко отвечаем на то, что чаще всего волнует пациентов перед имплантацией.</p></div>
          <div className="faq-list">
            {faq.map(([question, answer], index) => (
              <div key={question} className={openFaq === index ? "open" : ""}>
                <button onClick={() => setOpenFaq(openFaq === index ? -1 : index)}><span>{question}</span><ChevronDown /></button>
                <motion.p initial={false} animate={{ height: openFaq === index ? "auto" : 0, opacity: openFaq === index ? 1 : 0 }}>{answer}</motion.p>
              </div>
            ))}
          </div>
        </section>

        <section className="service-final-cta section">
          <div><p className="eyebrow">Сделайте первый шаг</p><h2>Узнайте, какой вариант подойдёт именно вам</h2></div>
          <div><button className="button button-light" onClick={() => setBookingOpen(true)}>Записаться на консультацию</button><a href="https://wa.me/77010010001?text=Здравствуйте!%20Хочу%20узнать%20об%20имплантации." target="_blank" rel="noreferrer"><MessageCircle /> Спросить в WhatsApp</a></div>
        </section>
      </main>

      <footer className="simple-footer"><Link href="/">LIBERTY STOM</Link><span>Семейная стоматология в Астане</span><a href="tel:+77010010001">+7 701 001 00 01</a></footer>
      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} initialService="Имплантация" />
    </>
  );
}
