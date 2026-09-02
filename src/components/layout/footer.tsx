import { ArrowUpRight, Mail } from "lucide-react";
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
];

const ACCOUNT_LINKS: readonly FooterLink[] = [
  { href: "/profile", label: "My profile" },
  { href: "/wallet", label: "My wallet" },
  { href: "/login", label: "Account login" },
  { href: "/register", label: "Create account" },
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
    <div>
      <h2 className="text-foreground text-sm font-semibold">{title}</h2>
      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              className="text-muted-foreground hover:text-primary text-[.78rem] transition-colors"
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

export function Footer() {
  return (
    <footer className="bg-surface/80 mt-auto shadow-[0_-12px_45px_rgb(58_34_140/0.05)] backdrop-blur-xl">
      <div className="mx-auto grid max-w-350 gap-10 px-5 py-10 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr_1.1fr] lg:px-8">
        <div className="max-w-sm">
          <Link className="inline-flex items-center gap-2.5" href="/">
            <span className="bg-primary text-primary-foreground grid size-10 place-items-center rounded-xl text-base font-black shadow-sm">
              pp
            </span>
            <span className="text-foreground text-xl font-bold tracking-[-0.03em]">
              Preppal
            </span>
          </Link>
          <p className="text-muted-foreground mt-4 text-sm leading-6">
            Study smarter, practise with confidence, and earn rewards as you
            make progress.
          </p>
          <Link
            className="text-primary mt-5 inline-flex items-center gap-1.5 text-xs font-semibold transition-all hover:gap-2.5"
            href="/quiz"
          >
            Start practising <ArrowUpRight className="size-4" />
          </Link>
          <div className="mt-5 flex items-center gap-2">
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

        <FooterLinkGroup links={PRODUCT_LINKS} title="Explore" />
        <FooterLinkGroup links={ACCOUNT_LINKS} title="Account" />

        <div>
          <h2 className="text-foreground text-sm font-semibold">Need help?</h2>
          <p className="text-muted-foreground mt-4 text-sm leading-6">
            Have a question or need support with your learning journey?
          </p>
          <a
            className="bg-surface-subtle text-foreground hover:text-primary mt-4 inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-medium transition-colors"
            href="mailto:support@preppal.app"
          >
            <Mail className="size-4" /> Contact support
          </a>
          <p className="text-muted-foreground mt-4 text-xs">
            © 2026 Preppal. Built for confident learners.
          </p>
        </div>
      </div>
    </footer>
  );
}
