"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, MessageCircle, X } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";

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
  "Не знаю",
];

const branches = ["Мухамеджанова, 11", "Байтурсынова, 53", "Сарайшык, 36"];

export function BookingModal({ open, onClose, initialService }: BookingModalProps) {
  const [step, setStep] = useState(1);
  const [service, setService] = useState(initialService ?? "");
  const [branch, setBranch] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (open) {
      setStep(initialService ? 2 : 1);
      setService(initialService ?? "");
      setBranch("");
      setSent(false);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, initialService]);

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
            role="dialog"
            aria-modal="true"
            aria-label="Запись на консультацию"
            className="booking-modal"
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.25 }}
          >
            <button className="modal-close" onClick={onClose} aria-label="Закрыть">
              <X size={20} />
            </button>

            {sent ? (
              <div className="modal-success">
                <span className="success-icon"><Check size={28} /></span>
                <p className="eyebrow">Заявка отправлена</p>
                <h2>Спасибо! Мы скоро свяжемся с вами.</h2>
                <p>Администратор Liberty Stom уточнит детали и подберёт удобное время.</p>
                <a
                  className="button button-dark"
                  href="https://wa.me/77010010001?text=Здравствуйте!%20Хочу%20записаться%20на%20консультацию."
                  target="_blank"
                  rel="noreferrer"
                >
                  <MessageCircle size={18} /> Написать в WhatsApp
                </a>
              </div>
            ) : (
              <>
                <div className="modal-progress" aria-label={`Шаг ${step} из 3`}>
                  {[1, 2, 3].map((item) => (
                    <span key={item} className={item <= step ? "active" : ""} />
                  ))}
                </div>
                <p className="eyebrow">Шаг {step} из 3</p>

                {step === 1 && (
                  <div>
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
                    <button className="button button-dark modal-next" disabled={!service} onClick={() => setStep(2)}>
                      Продолжить <ArrowRight size={18} />
                    </button>
                  </div>
                )}

                {step === 2 && (
                  <div>
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
                      <button className="button button-quiet" onClick={() => setStep(1)}><ArrowLeft size={18} /> Назад</button>
                      <button className="button button-dark" disabled={!branch} onClick={() => setStep(3)}>Продолжить <ArrowRight size={18} /></button>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <form onSubmit={submit}>
                    <h2>Как с вами связаться?</h2>
                    <p className="modal-lead">Оставьте контакты — перезвоним и ответим на вопросы.</p>
                    <label className="field-label">
                      Ваше имя
                      <input required name="name" placeholder="Айдана" autoComplete="name" />
                    </label>
                    <label className="field-label">
                      Телефон
                      <input required name="phone" type="tel" placeholder="+7 700 000 00 00" autoComplete="tel" />
                    </label>
                    <label className="field-label">
                      Комментарий <span>необязательно</span>
                      <textarea name="comment" rows={3} placeholder="Расскажите, что вас беспокоит" />
                    </label>
                    <div className="booking-summary">
                      <span>{service}</span><span>{branch}</span>
                    </div>
                    <div className="modal-actions">
                      <button type="button" className="button button-quiet" onClick={() => setStep(2)}><ArrowLeft size={18} /> Назад</button>
                      <button type="submit" className="button button-dark">Отправить заявку</button>
                    </div>
                    <p className="privacy">Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности.</p>
                  </form>
                )}
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
