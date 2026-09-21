import { Mail } from "lucide-react";
import Link from "next/link";
import type { IconType } from "react-icons";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa6";

interface FooterLink {
  readonly href: string;
  readonly label: string;
}

interface SocialLink {
  readonly href: string;
  readonly label: string;
  readonly icon: IconType;
}

const PRODUCT_LINKS: readonly FooterLink[] = [
  { href: "/quiz", label: "Practice quizzes" },
  { href: "/games", label: "Learning games" },
  { href: "/leaderboard", label: "Leaderboard" },
  { href: "/rewards", label: "Rewards" },
  { href: "/pricing", label: "Pricing" },
];

const ACCOUNT_LINKS: readonly FooterLink[] = [
  { href: "/dashboard", label: "My dashboard" },
  { href: "/wallet", label: "My wallet" },
  { href: "/login", label: "Account login" },
  { href: "/register", label: "Create account" },
];

const COMPANY_LINKS: readonly FooterLink[] = [
  { href: "/terms", label: "Terms of use" },
  { href: "/privacy", label: "Privacy policy" },
  { href: "/cookies", label: "Cookies policy" },
];

const SOCIAL_LINKS: readonly SocialLink[] = [
  {
    href: "https://www.instagram.com/preppal",
    label: "Instagram",
    icon: FaInstagram,
  },
  {
    href: "https://www.linkedin.com/company/preppal",
    label: "LinkedIn",
    icon: FaLinkedinIn,
  },
  {
    href: "https://www.youtube.com/@preppal",
    label: "YouTube",
    icon: FaYoutube,
  },
  {
    href: "https://www.facebook.com/preppal",
    label: "Facebook",
    icon: FaFacebookF,
  },
];

function FooterLinkGroup({
  title,
  links,
}: {
  readonly title: string;
  readonly links: readonly FooterLink[];
}) {
  return (
    <div className="text-left">
      <h2 className="text-foreground text-[.9rem] font-semibold tracking-[-0.025em]">
        {title}
      </h2>
      <ul className="text-muted-foreground mt-3 space-y-3 text-sm tracking-[-0.015em] sm:text-[.85rem]">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              className="hover:text-primary text-[.8rem] font-normal tracking-[-0.01em] transition-colors"
              href={link.href}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

import { AppDownloadButtons } from "@/components/ui/app-download-buttons";

export function Footer() {
  return (
    <footer className="bg-surface/95 mt-auto border-t border-black/[0.06]">
      <div className="mx-auto max-w-5xl px-5 py-12 text-center sm:px-8 sm:py-14">
        <div className="mx-auto flex max-w-xl flex-col items-center">
          <Link className="inline-flex items-center gap-2.5" href="/">
            <span className="bg-primary text-primary-foreground grid size-10 place-items-center rounded-xl text-base font-black shadow-sm">
              pp
            </span>
            <span className="text-foreground text-xl font-bold tracking-[-0.04em]">
              Preppal
            </span>
          </Link>
          <p className="text-muted-foreground mt-4 max-w-md text-sm leading-6 tracking-[-0.01em]">
            Study smarter, practise with confidence, and earn rewards as you
            make progress.
          </p>
          <div className="mt-5">
            <AppDownloadButtons className="justify-center" />
          </div>
          <div className="mt-6 flex items-center justify-center gap-2">
            {SOCIAL_LINKS.map(({ href, label, icon: Icon }) => (
              <a
                aria-label={`Follow Preppal on ${label}`}
                className="bg-surface-subtle text-muted-foreground hover:bg-primary hover:text-primary-foreground grid size-9 place-items-center rounded-full transition-colors"
                href={href}
                key={label}
                rel="noreferrer"
                target="_blank"
                title={label}
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-8 border-y border-black/[0.06] py-9 text-left sm:gap-x-12 lg:grid-cols-4 lg:gap-x-16">
          <FooterLinkGroup links={PRODUCT_LINKS} title="Explore" />
          <FooterLinkGroup links={ACCOUNT_LINKS} title="Account" />
          <FooterLinkGroup links={COMPANY_LINKS} title="Company" />
          <div>
          <h2 className="text-foreground text-[.9rem] font-semibold tracking-[-0.025em]">
            Need help?
          </h2>
          <p className="text-muted-foreground mt-3 text-[.75rem] font-medium leading-4 tracking-[-0.015em]">
            Have a question or need support with your learning journey?
          </p>
          <a
            className="bg-surface-subtle text-foreground hover:text-primary mt-5 inline-flex items-center gap-2 rounded-full px-5 py-3 text-[.8rem] font-medium transition-colors"
            href="mailto:support@preppal.app"
          >
            <Mail className="size-4" /> Contact support
          </a>
          <p className="text-muted-foreground mt-7 text-[.8rem] leading-6 tracking-[-0.01em]">
            © 2026 Preppal. Built for confident learners.
          </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
