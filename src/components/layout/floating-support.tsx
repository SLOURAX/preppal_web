"use client";

import { useEffect, useRef, useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import {
  SaxCloseCircleBulk,
  SaxMessageQuestionBulk,
} from "@meysam213/iconsax-react";

export function FloatingSupport() {
  const [open, setOpen] = useState<boolean>(false);
  const [offset, setOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const dragStart = useRef<{
    pointerX: number;
    pointerY: number;
    x: number;
    y: number;
  } | null>(null);

  useEffect(() => {
    const handleMove = (event: PointerEvent): void => {
      if (!dragStart.current) return;
      setOffset({
        x: dragStart.current.x + event.clientX - dragStart.current.pointerX,
        y: dragStart.current.y + event.clientY - dragStart.current.pointerY,
      });
    };
    const handleUp = (): void => {
      dragStart.current = null;
    };
    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);
    };
  }, []);

  return (
    <div
      className="fixed right-4 bottom-4 z-50 sm:right-6 sm:bottom-6"
      style={{ transform: `translate3d(${offset.x}px, ${offset.y}px, 0)` }}
    >
      {open ? (
        <div className="bg-surface border-border mb-3 w-[min(18rem,calc(100vw-2rem))] rounded-2xl border p-4 shadow-xl">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-foreground text-sm font-bold">Need a hand?</p>
              <p className="text-muted-foreground mt-1 text-xs leading-5">
                Ask us about quizzes, rewards, or your account.
              </p>
            </div>
            <button
              aria-label="Close support"
              onClick={() => setOpen(false)}
              type="button"
              className="text-muted-foreground hover:text-foreground"
            >
              <SaxCloseCircleBulk className="size-5" />
            </button>
          </div>
          <a
            href="mailto:support@preppal.app"
            className="bg-primary/10 text-primary mt-3 flex items-center gap-2 rounded-xl px-3 py-2.5 text-xs font-semibold"
          >
            <SaxMessageQuestionBulk className="size-4" /> Message support
          </a>
          <a
            href="https://wa.me/2340000000000"
            target="_blank"
            rel="noreferrer"
            className="mt-2 flex items-center gap-2 rounded-xl bg-[#25d366]/10 px-3 py-2.5 text-xs font-semibold text-[#168b46]"
          >
            <FaWhatsapp className="size-4" /> Join WhatsApp channel
          </a>
        </div>
      ) : null}
      <button
        aria-label={open ? "Close support" : "Open support"}
        onPointerDown={(event) => {
          dragStart.current = {
            pointerX: event.clientX,
            pointerY: event.clientY,
            x: offset.x,
            y: offset.y,
          };
        }}
        onClick={() => setOpen((value) => !value)}
        type="button"
        className="bg-primary text-primary-foreground shadow-primary/25 flex cursor-grab touch-none items-center gap-2 rounded-full px-3 py-3 text-sm font-bold shadow-lg transition-transform hover:-translate-y-0.5 active:cursor-grabbing"
      >
        <SaxMessageQuestionBulk className="size-6" />
      </button>
    </div>
  );
}
