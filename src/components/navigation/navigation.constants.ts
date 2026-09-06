import {
  BrainCircuit,
  Crown,
  Gamepad2,
  Gift,
  Home,
  LayoutDashboard,
  Newspaper,
  ReceiptText,
  type LucideIcon,
} from "lucide-react";

export interface NavigationItem {
  readonly href: string;
  readonly label: string;
  readonly icon: LucideIcon;
}

export const NAVIGATION: readonly NavigationItem[] = [
  { href: "/", label: "Home", icon: Home },
  { href: "/news", label: "News", icon: Newspaper },
  { href: "/leaderboard", label: "Leaderboard", icon: Crown },
  { href: "/quiz", label: "Quiz", icon: BrainCircuit },
  { href: "/games", label: "Games", icon: Gamepad2 },
  { href: "/rewards", label: "Rewards", icon: Gift },
  { href: "/pricing", label: "Pricing", icon: ReceiptText },
];

/** Mobile drawer navigation prioritises the signed-in dashboard over Home. */
export const MOBILE_NAVIGATION: readonly NavigationItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  ...NAVIGATION.filter((item) => item.href !== "/"),
];
