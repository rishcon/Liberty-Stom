import type { MotionProps } from "framer-motion";

const revealKeyframes: Keyframe[] = [
  {
    opacity: 0.2,
    transform: "translate3d(0, 44px, 0) scale(0.992)",
  },
  {
    opacity: 0.78,
    transform: "translate3d(0, 10px, 0) scale(0.998)",
    offset: 0.72,
  },
  {
    opacity: 1,
    transform: "translate3d(0, 0, 0) scale(1)",
  },
];

function playSafeReveal(entry: IntersectionObserverEntry | null) {
  if (!entry) return;
  const element = entry.target as HTMLElement;

  if (element.dataset.revealPlayed === "true") return;
  element.dataset.revealPlayed = "true";

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const requestedDelay = Number(element.dataset.revealDelay ?? 0);
  const delay = Number.isFinite(requestedDelay)
    ? Math.min(Math.max(requestedDelay, 0), 260)
    : 0;

  element.animate(revealKeyframes, {
    duration: 760,
    delay,
    easing: "cubic-bezier(0.22, 1, 0.36, 1)",
    fill: "backwards",
  });
}

/**
 * Progressive scroll reveal: server-rendered content stays visible, while
 * capable browsers add movement only when an element enters the viewport.
 */
export const safeReveal: MotionProps = {
  initial: false,
  viewport: { once: true, amount: 0.14 },
  onViewportEnter: playSafeReveal,
};
