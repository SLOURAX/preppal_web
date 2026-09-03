import { AppShell } from "@/components/layout";
import { ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Privacy Policy — Preppal",
  description: "Learn how Preppal collects, uses, and protects your personal data.",
};

const SECTIONS = [
  {
    title: "1. Who We Are",
    body: `Preppal ("we", "our", or "us") is an AI-powered exam preparation platform. This Privacy Policy explains how we collect, use, store, and share information about you when you use our website, mobile application, or any of our services (collectively, "the Platform"). Our registered address is in Lagos, Nigeria.`,
  },
  {
    title: "2. Information We Collect",
    body: `We collect the following categories of information:\n\n• Account data: name, email address, and password when you register.\n• Profile data: learning preferences, exam choices, and quiz history.\n• Usage data: pages visited, features used, time spent, and interactions with content.\n• Device data: IP address, browser type, operating system, and device identifiers.\n• Payment data: if you subscribe, billing details are processed securely by our third-party payment provider and are not stored on our servers.\n• Communications: messages you send to our support team.`,
  },
  {
    title: "3. How We Use Your Information",
    body: `We use your information to:\n\n• Provide and personalise your learning experience.\n• Process account registrations, subscriptions, and reward redemptions.\n• Send transactional emails (e.g., account verification, password resets).\n• Send product updates and promotional communications (you may opt out at any time).\n• Analyse usage trends to improve the Platform.\n• Detect and prevent fraud, abuse, or security incidents.\n• Comply with legal obligations.`,
  },
  {
    title: "4. Legal Basis for Processing",
    body: `We process your personal data on the following grounds: (a) performance of a contract — to fulfil your account and subscription; (b) legitimate interests — to improve our services and prevent abuse; (c) consent — for marketing communications; and (d) legal obligation — where required by law.`,
  },
  {
    title: "5. Sharing of Information",
    body: `We do not sell your personal data. We may share information with:\n\n• Service providers who help us operate the Platform (e.g., cloud hosting, analytics, payment processing) under strict data processing agreements.\n• Law enforcement or regulatory bodies when required by applicable law.\n• A successor entity in the event of a merger, acquisition, or sale of assets, subject to equivalent privacy protections.`,
  },
  {
    title: "6. Data Retention",
    body: `We retain your personal data for as long as your account is active or as necessary to provide our services. If you delete your account, we will delete or anonymise your personal data within 90 days, unless we are required to retain it for legal or compliance purposes.`,
  },
  {
    title: "7. Your Rights",
    body: `Depending on your location, you may have rights including: the right to access the personal data we hold about you; the right to correct inaccurate data; the right to request deletion of your data; the right to object to or restrict certain processing; and the right to data portability. To exercise any of these rights, contact us at privacy@preppal.app.`,
  },
  {
    title: "8. International Transfers",
    body: `Your data may be processed in countries outside your country of residence. Where we transfer data internationally, we ensure appropriate safeguards are in place in accordance with applicable data protection laws.`,
  },
  {
    title: "9. Security",
    body: `We implement technical and organisational measures to protect your data against unauthorised access, loss, or disclosure. These include encryption in transit (TLS), encrypted storage, and access controls. However, no system is completely secure, and we cannot guarantee absolute security.`,
  },
  {
    title: "10. Children's Privacy",
    body: `Preppal is not directed to children under 13. We do not knowingly collect personal data from children under 13. If we become aware that we have done so, we will delete such data promptly. Users aged 13–17 should use the Platform only with parental consent.`,
  },
  {
    title: "11. Changes to This Policy",
    body: `We may update this Privacy Policy from time to time. We will notify you of significant changes via email or a prominent notice on the Platform. Your continued use after changes constitutes acceptance of the revised policy.`,
  },
  {
    title: "12. Contact Us",
    body: `For privacy-related enquiries or to exercise your rights, contact us at privacy@preppal.app.`,
  },
];

export default function PrivacyPage() {
  return (
    <AppShell>
      <main className="mx-auto w-full max-w-3xl px-5 py-14 sm:px-6">
        {/* Header */}
        <div className="mb-12">
          <div className="bg-primary/10 mb-5 inline-grid size-12 place-items-center rounded-2xl">
            <ShieldCheck className="text-primary size-6" />
          </div>
          <h1 className="text-foreground text-4xl font-bold tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground mt-3 text-base leading-7">
            Your privacy matters to us. This policy explains exactly what data
            we collect, why we collect it, and how you can control it.
          </p>
          <p className="text-muted-foreground mt-4 text-sm">
            Last updated: <span className="font-medium">1 September 2026</span>
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-10">
          {SECTIONS.map((section) => (
            <section key={section.title}>
              <h2 className="text-foreground mb-3 text-lg font-semibold">
                {section.title}
              </h2>
              <p className="text-muted-foreground whitespace-pre-line text-[.95rem] leading-7">
                {section.body}
              </p>
            </section>
          ))}
        </div>

        <div className="border-border mt-14 border-t pt-8">
          <p className="text-muted-foreground text-sm">
            Privacy enquiries:{" "}
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
