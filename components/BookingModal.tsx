"use client";

import { AnimatePresence, motion, PanInfo, useDragControls, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, X } from "lucide-react";
import Image from "next/image";
import { FormEvent, useEffect, useRef, useState } from "react";

type BookingModalProps = {
  open: boolean;
  onClose: () => void;
  initialService?: string;
};

const services = [
  "Имплантация",
  "Брекеты",
  "Детская стоматология",
  "Лечение зубов",
  "Удаление",
  "Лечение во сне",
  "Протезирование",
  "Хирургия",
  "Не знаю",
];

const branches = ["Кайым Мухамедханов, 11", "Сарайшык, 36", "Ахмет Байтурсынулы, 53"];

export function BookingModal({ open, onClose, initialService }: BookingModalProps) {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [service, setService] = useState(initialService ?? "");
  const [branch, setBranch] = useState("");
  const [sent, setSent] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();
  const reduceMotion = useReducedMotion();

  const spring = reduceMotion
    ? { duration: 0.16 }
    : { type: "spring" as const, stiffness: 430, damping: 39, mass: 0.8 };

  const goTo = (nextStep: number) => {
    setDirection(nextStep > step ? 1 : -1);
    setStep(nextStep);
  };

  useEffect(() => {
    if (open) {
      const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      setStep(initialService ? 2 : 1);
      setDirection(1);
      setService(initialService ?? "");
      setBranch("");
      setSent(false);
      document.body.style.overflow = "hidden";

      const focusFrame = requestAnimationFrame(() => dialogRef.current?.focus());
      const onKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          onClose();
          return;
        }

        if (event.key === "Tab" && dialogRef.current) {
          const focusable = Array.from(
            dialogRef.current.querySelectorAll<HTMLElement>(
              'button:not([disabled]), a[href], input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
            ),
          );
          if (!focusable.length) return;
          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
          }
        }
      };
      window.addEventListener("keydown", onKeyDown);

      return () => {
        cancelAnimationFrame(focusFrame);
        window.removeEventListener("keydown", onKeyDown);
        document.body.style.overflow = "";
        previousFocus?.focus();
      };
    }
  }, [open, initialService, onClose]);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 760px)");
    const update = () => setIsMobile(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!open) return;
    dialogRef.current?.scrollTo({ top: 0, behavior: "auto" });
  }, [open, step, sent]);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => event.target === event.currentTarget && onClose()}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="Запись на консультацию"
            className="booking-modal"
            tabIndex={-1}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: isMobile ? 54 : 24, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: isMobile ? 54 : 24, scale: 0.985 }}
            transition={spring}
            drag={isMobile && !reduceMotion ? "y" : false}
            dragControls={dragControls}
            dragListener={false}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.32 }}
            onDragEnd={(_, info: PanInfo) => {
              if (info.offset.y > 110 || info.velocity.y > 650) onClose();
            }}
          >
            <span
              className="sheet-handle"
              aria-hidden="true"
              onPointerDown={(event) => dragControls.start(event)}
            />
            <button className="modal-close" onClick={onClose} aria-label="Закрыть">
              <X size={20} />
            </button>

            {sent ? (
              <motion.div className="modal-success" initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={spring} aria-live="polite">
                <motion.span className="success-icon" initial={reduceMotion ? false : { scale: 0.75 }} animate={{ scale: 1 }} transition={spring}><Check size={28} /></motion.span>
                <p className="eyebrow">Заявка отправлена</p>
                <h2>Спасибо! Мы скоро свяжемся с вами.</h2>
                <p>Администратор Liberty Stom уточнит детали и подберёт удобное время.</p>
                <a
                  className="button button-dark"
                  href="https://wa.me/77010010001?text=Здравствуйте!%20Хочу%20записаться%20на%20консультацию."
                  target="_blank"
                  rel="noreferrer"
                >
                  <Image className="wa-icon" src="/wa.png" alt="" width={22} height={22} /> Написать в WhatsApp
                </a>
              </motion.div>
            ) : (
              <>
                <div className="modal-progress" aria-label={`Шаг ${step} из 3`} aria-live="polite">
                  {[1, 2, 3].map((item) => (
                    <span key={item} className={item <= step ? "active" : ""}>
                      {item < step && <span className="sr-only">Шаг {item} завершён</span>}
                    </span>
                  ))}
                </div>
                <p className="eyebrow">Шаг {step} из 3</p>

                <AnimatePresence initial={false} custom={direction} mode="wait">
                {step === 1 && (
                  <motion.div
                    key="booking-step-1"
                    className="modal-step"
                    initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: direction * 18 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: direction * -12 }}
                    transition={spring}
                  >
                    <h2>Что вас интересует?</h2>
                    <p className="modal-lead">Выберите направление — это займёт пару секунд.</p>
                    <div className="choice-list">
                      {services.map((item) => (
                        <button
                          key={item}
                          className={service === item ? "selected" : ""}
                          onClick={() => setService(item)}
                        >
                          {item}<span>{service === item && <Check size={17} />}</span>
                        </button>
                      ))}
                    </div>
                    <button className="button button-dark modal-next" disabled={!service} onClick={() => goTo(2)}>
                      Продолжить <ArrowRight size={18} />
                    </button>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="booking-step-2"
                    className="modal-step"
                    initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: direction * 18 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: direction * -12 }}
                    transition={spring}
                  >
                    <h2>Выберите филиал</h2>
                    <p className="modal-lead">Можно изменить выбор вместе с администратором.</p>
                    <div className="choice-list branch-choices">
                      {branches.map((item, index) => (
                        <button
                          key={item}
                          className={branch === item ? "selected" : ""}
                          onClick={() => setBranch(item)}
                        >
                          <span><small>Филиал №{index + 1}</small>{item}</span>
                          <span>{branch === item && <Check size={17} />}</span>
                        </button>
                      ))}
                    </div>
                    <div className="modal-actions">
                      <button className="button button-quiet" onClick={() => goTo(1)}><ArrowLeft size={18} /> Назад</button>
                      <button className="button button-dark" disabled={!branch} onClick={() => goTo(3)}>Продолжить <ArrowRight size={18} /></button>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.form
                    key="booking-step-3"
                    className="modal-step"
                    initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: direction * 18 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: direction * -12 }}
                    transition={spring}
                    onSubmit={submit}
                  >
                    <h2>Как с вами связаться?</h2>
                    <p className="modal-lead">Оставьте контакты — перезвоним и ответим на вопросы.</p>
                    <label className="field-label">
                      Ваше имя
                      <input required name="name" placeholder="Айдана" autoComplete="name" />
                    </label>
                    <label className="field-label">
                      Телефон
                      <input required name="phone" type="tel" placeholder="+7 701 116 1800" autoComplete="tel" />
                    </label>
                    <label className="field-label">
                      Комментарий <span>необязательно</span>
                      <textarea name="comment" rows={3} placeholder="Расскажите, что вас беспокоит" />
                    </label>
                    <div className="booking-summary">
                      <span>{service}</span><span>{branch}</span>
                    </div>
                    <div className="modal-actions">
                      <button type="button" className="button button-quiet" onClick={() => goTo(2)}><ArrowLeft size={18} /> Назад</button>
                      <button type="submit" className="button button-dark">Отправить заявку</button>
                    </div>
                    <p className="privacy">Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности.</p>
                  </motion.form>
                )}
                </AnimatePresence>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
