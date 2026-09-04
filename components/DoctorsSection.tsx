"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { doctorDirections, doctors, type DoctorDirection } from "@/data/doctors";

type DoctorsSectionProps = {
  onBook: (service?: string) => void;
};

type DirectionFilter = DoctorDirection | "all";

export function DoctorsSection({ onBook }: DoctorsSectionProps) {
  const [direction, setDirection] = useState<DirectionFilter>("all");
  const [showAll, setShowAll] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const visibleDoctors = useMemo(
    () => direction === "all" ? doctors : doctors.filter((doctor) => doctor.directions.includes(direction)),
    [direction],
  );

  useEffect(() => {
    trackRef.current?.scrollTo({ left: 0, behavior: "auto" });
  }, [direction, showAll]);

  const chooseDirection = (nextDirection: DirectionFilter) => {
    setDirection(nextDirection);
    setShowAll(false);
  };

  const scrollDoctors = (directionValue: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({
      left: directionValue * track.clientWidth * 0.78,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  const toggleAllDoctors = () => {
    if (!showAll) setDirection("all");
    setShowAll((value) => !value);
  };

  return (
    <section className="section doctors-showcase" id="doctors">
      <div className="doctors-showcase-heading">
        <div>
          <p className="eyebrow">Наша команда</p>
          <h2>Врачи, которым<br />можно доверять</h2>
        </div>
        <p>Выберите направление и познакомьтесь со специалистами, которые будут рядом на каждом этапе лечения.</p>
      </div>

      <div className="doctor-filters" role="tablist" aria-label="Направления врачей">
        {doctorDirections.map((item) => (
          <button
            key={item.value}
            role="tab"
            aria-selected={direction === item.value}
            className={direction === item.value ? "active" : ""}
            onClick={() => chooseDirection(item.value)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="doctors-toolbar">
        <span>{direction === "all" ? `${doctors.length} специалистов` : `${visibleDoctors.length} специалиста по направлению`}</span>
        <div>
          {!showAll && (
            <>
              <button className="doctor-nav" onClick={() => scrollDoctors(-1)} aria-label="Предыдущие врачи"><ArrowLeft /></button>
              <button className="doctor-nav" onClick={() => scrollDoctors(1)} aria-label="Следующие врачи"><ArrowRight /></button>
            </>
          )}
          <button className="show-all-doctors" onClick={toggleAllDoctors}>
            {showAll ? <Minus size={16} /> : <Plus size={16} />}
            {showAll ? "Свернуть" : "Показать всех"}
          </button>
        </div>
      </div>

      <motion.div
        ref={trackRef}
        className={showAll ? "doctors-track doctors-grid-view" : "doctors-track"}
        layout={!reduceMotion}
      >
        <AnimatePresence initial={false} mode="popLayout">
          {visibleDoctors.map((doctor, index) => (
            <motion.article
              className="doctor-card"
              key={doctor.name}
              layout={!reduceMotion}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
              transition={{ duration: reduceMotion ? 0.12 : 0.28, delay: index * 0.025 }}
            >
              <div className="doctor-portrait">
                <Image src={doctor.image} alt={doctor.imageAlt} fill sizes="(max-width: 760px) 82vw, 30vw" className="cover-image" />
                <span>{doctor.experience}</span>
              </div>
              <div className="doctor-card-copy">
                <p>{doctor.role}</p>
                <h3>{doctor.name}</h3>
                <div className="doctor-services">{doctor.services.map((service) => <span key={service}>{service}</span>)}</div>
                <button onClick={() => onBook(doctor.services[0])}>Записаться <ArrowRight size={16} /></button>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
