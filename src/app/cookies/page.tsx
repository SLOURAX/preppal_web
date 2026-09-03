import { AppShell } from "@/components/layout";
import { Cookie } from "lucide-react";

export const metadata = {
  title: "Cookies Policy — Preppal",
  description:
    "Understand how Preppal uses cookies and similar tracking technologies.",
};

const COOKIE_TYPES = [
  {
    name: "Strictly Necessary",
    description:
      "These cookies are essential for the Platform to function correctly. They enable core features such as authentication, session management, and security. You cannot opt out of these cookies.",
    examples: ["Session token", "CSRF protection", "Load balancer affinity"],
    canOptOut: false,
  },
  {
    name: "Functional",
    description:
      "These cookies remember your preferences and personalisation choices, such as your selected theme, language, and notification settings, to provide a more tailored experience.",
    examples: ["Theme preference (light/dark/system)", "Notification settings"],
    canOptOut: true,
  },
  {
    name: "Analytics",
    description:
      "These cookies help us understand how visitors interact with Preppal, which pages are most popular, and where users encounter difficulties. The data is aggregated and anonymised.",
    examples: ["Page view counts", "Session duration", "Feature usage events"],
    canOptOut: true,
  },
  {
    name: "Performance",
    description:
      "These cookies help us monitor platform performance and detect errors so we can improve reliability and speed for all users.",
    examples: ["Error tracking", "Response time monitoring"],
    canOptOut: true,
  },
];

const SECTIONS = [
  {
    title: "1. What Are Cookies?",
    body: `Cookies are small text files placed on your device by websites you visit. They are widely used to make websites work more efficiently and to provide information to the site owners. Similar technologies include web beacons, pixels, local storage, and session storage — this policy covers all such technologies collectively referred to as "cookies".`,
  },
  {
    title: "2. How We Use Cookies",
    body: `Preppal uses cookies to keep you signed in, remember your preferences, understand how you use the Platform, and improve our services. We do not use cookies to serve third-party advertising or to track you across unrelated websites.`,
  },
  {
    title: "3. Third-Party Cookies",
    body: `Some features of Preppal use services provided by trusted third parties (e.g., payment processing, error monitoring). These providers may set their own cookies on your device. We require all third parties to respect the security of your data and treat it in accordance with the law.`,
  },
  {
    title: "4. Managing Your Cookie Preferences",
    body: `You can control cookies through your browser settings. Most browsers allow you to block or delete cookies. Blocking strictly necessary cookies will prevent certain features from working correctly. You can also use browser extensions or privacy-focused browsers to limit tracking. Note that preferences are stored per device and per browser.`,
  },
  {
    title: "5. Changes to This Policy",
    body: `We may update this Cookies Policy from time to time to reflect changes in technology, regulation, or our services. We will update the "Last updated" date at the top of this page when we do so.`,
  },
  {
    title: "6. Contact Us",
    body: `If you have questions about our use of cookies, please contact us at privacy@preppal.app.`,
  },
];

export default function CookiesPage() {
  return (
    <AppShell>
      <main className="mx-auto w-full max-w-3xl px-5 py-14 sm:px-6">
        {/* Header */}
        <div className="mb-12">
          <div className="bg-primary/10 mb-5 inline-grid size-12 place-items-center rounded-2xl">
            <Cookie className="text-primary size-6" />
          </div>
          <h1 className="text-foreground text-4xl font-bold tracking-tight">
            Cookies Policy
          </h1>
          <p className="text-muted-foreground mt-3 text-base leading-7">
            We use cookies and similar technologies to keep Preppal working
            smoothly and to understand how you use it. Here's a clear breakdown
            of what we use and why.
          </p>
          <p className="text-muted-foreground mt-4 text-sm">
            Last updated: <span className="font-medium">1 September 2026</span>
          </p>
        </div>

        {/* Cookie type cards */}
        <div className="mb-12 grid gap-4 sm:grid-cols-2">
          {COOKIE_TYPES.map((type) => (
            <div key={type.name} className="surface-card p-5">
              <div className="mb-3 flex items-center justify-between gap-2">
                <h3 className="text-foreground font-semibold">{type.name}</h3>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                    type.canOptOut
                      ? "bg-amber-500/10 text-amber-600"
                      : "bg-primary/10 text-primary"
                  }`}
                >
                  {type.canOptOut ? "Optional" : "Required"}
                </span>
              </div>
              <p className="text-muted-foreground mb-3 text-xs leading-5">
                {type.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {type.examples.map((ex) => (
                  <span
                    key={ex}
                    className="bg-surface-subtle text-muted-foreground rounded-full px-2.5 py-0.5 text-[10px] font-medium"
                  >
                    {ex}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Policy sections */}
        <div className="space-y-10">
          {SECTIONS.map((section) => (
            <section key={section.title}>
              <h2 className="text-foreground mb-3 text-lg font-semibold">
                {section.title}
              </h2>
              <p className="text-muted-foreground text-[.95rem] leading-7">
                {section.body}
              </p>
            </section>
          ))}
        </div>

        <div className="border-border mt-14 border-t pt-8">
          <p className="text-muted-foreground text-sm">
            Questions about cookies?{" "}
            <a
              href="mailto:privacy@preppal.app"
              className="text-primary hover:underline"
            >
              privacy@preppal.app
            </a>
          </p>
        </div>
      </main>
    </AppShell>
  );
}
