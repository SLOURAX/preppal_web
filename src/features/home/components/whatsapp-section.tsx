import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa6";
import { SaxArrowRightBulk, SaxPeopleBulk } from "@meysam213/iconsax-react";

export function WhatsAppSection() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-[#e9fbf1] p-6 sm:p-8">
      <div className="pointer-events-none absolute -top-16 -right-14 size-48 rounded-full bg-[#25d366]/15 blur-2xl" />
      <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-[#25d366] text-white shadow-lg shadow-[#25d366]/20">
            <FaWhatsapp className="size-7" aria-hidden="true" />
          </div>
          <div>
            <p className="mb-1 flex items-center gap-1.5 text-xs font-bold tracking-wider text-[#168b46] uppercase">
              <SaxPeopleBulk className="size-4" /> Join the community
            </p>
            <h2 className="text-foreground text-xl font-bold tracking-tight sm:text-2xl">
              Learn together on WhatsApp
            </h2>
            <p className="text-muted-foreground mt-1 max-w-xl text-sm leading-6">
              Get study tips, quiz drops, streak reminders, and friendly support
              from fellow Preppal learners.
            </p>
          </div>
        </div>
        <Link
          href="https://wa.me/2340000000000"
          target="_blank"
          rel="noreferrer"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#168b46] px-5 py-3 text-sm font-bold text-white shadow-sm transition-transform hover:-translate-y-0.5"
        >
          Join WhatsApp <SaxArrowRightBulk className="size-4" />
        </Link>
      </div>
    </section>
  );
}
