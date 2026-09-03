import { AppShell } from "@/components/layout";
import { Scale } from "lucide-react";

export const metadata = {
  title: "Terms of Use — Preppal",
  description: "Read the Terms of Use for Preppal, the AI-powered exam prep platform.",
};

const SECTIONS = [
  {
    title: "1. Acceptance of Terms",
    body: `By accessing or using Preppal ("the Platform"), you agree to be bound by these Terms of Use and all applicable laws and regulations. If you do not agree with any part of these terms, you may not use the Platform. These Terms apply to all users, including visitors, registered learners, and subscribers.`,
  },
  {
    title: "2. Eligibility",
    body: `You must be at least 13 years of age to use Preppal. If you are under 18, you confirm that you have obtained parental or guardian consent. By using the Platform, you represent and warrant that you meet these eligibility requirements.`,
  },
  {
    title: "3. Account Registration",
    body: `To access certain features, you must create an account. You agree to provide accurate, current, and complete information during registration and to keep your account credentials secure. You are responsible for all activity that occurs under your account. Preppal reserves the right to suspend or terminate accounts that violate these Terms.`,
  },
  {
    title: "4. Use of the Platform",
    body: `Preppal grants you a limited, non-exclusive, non-transferable licence to access and use the Platform for personal, non-commercial educational purposes. You agree not to: reproduce, distribute, or create derivative works from Platform content without written permission; use the Platform to transmit spam or malicious content; attempt to gain unauthorised access to any part of the Platform; or engage in any conduct that disrupts or interferes with the Platform's operations.`,
  },
  {
    title: "5. Intellectual Property",
    body: `All content on Preppal — including quiz questions, explanations, illustrations, branding, and software — is owned by or licensed to Preppal and is protected by applicable intellectual property laws. You may not copy, reproduce, or exploit any content without express written permission from Preppal.`,
  },
  {
    title: "6. Coins, Rewards & Subscriptions",
    body: `Preppal coins earned through quizzes and activities have no monetary value outside the Platform and may not be transferred, sold, or exchanged for cash. Preppal reserves the right to modify, suspend, or discontinue the rewards programme at any time. Subscription fees are non-refundable except where required by applicable law.`,
  },
  {
    title: "7. User-Generated Content",
    body: `If you submit any feedback, comments, or other content to Preppal, you grant us a worldwide, royalty-free licence to use, reproduce, and display such content in connection with our services. You represent that your content does not infringe any third-party rights and does not contain unlawful material.`,
  },
  {
    title: "8. Disclaimers",
    body: `Preppal is provided "as is" without warranties of any kind, express or implied. We do not guarantee that the Platform will be error-free, uninterrupted, or that exam questions will reflect exactly what appears on any external examination. Use of Preppal is at your own risk.`,
  },
  {
    title: "9. Limitation of Liability",
    body: `To the fullest extent permitted by law, Preppal and its affiliates shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of, or inability to use, the Platform — including lost profits, data loss, or academic outcomes.`,
  },
  {
    title: "10. Changes to These Terms",
    body: `We may update these Terms from time to time. When we do, we will revise the "Last updated" date below. Continued use of the Platform after changes constitutes acceptance of the revised Terms. We encourage you to review this page periodically.`,
  },
  {
    title: "11. Governing Law",
    body: `These Terms are governed by and construed in accordance with the laws of the Federal Republic of Nigeria. Any disputes shall be subject to the exclusive jurisdiction of the courts of Nigeria.`,
  },
  {
    title: "12. Contact Us",
    body: `If you have questions about these Terms, please contact us at legal@preppal.app.`,
  },
];

export default function TermsPage() {
  return (
    <AppShell>
      <main className="mx-auto w-full max-w-3xl px-5 py-14 sm:px-6">
        {/* Header */}
        <div className="mb-12">
          <div className="bg-primary/10 mb-5 inline-grid size-12 place-items-center rounded-2xl">
            <Scale className="text-primary size-6" />
          </div>
          <h1 className="text-foreground text-4xl font-bold tracking-tight">
            Terms of Use
          </h1>
          <p className="text-muted-foreground mt-3 text-base leading-7">
            Please read these Terms carefully before using Preppal. They govern
            your access to and use of our platform, services, and content.
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
              <p className="text-muted-foreground text-[.95rem] leading-7">
                {section.body}
              </p>
            </section>
          ))}
        </div>

        {/* Divider */}
        <div className="border-border mt-14 border-t pt-8">
          <p className="text-muted-foreground text-sm">
            Questions? Email us at{" "}
            <a
              href="mailto:legal@preppal.app"
              className="text-primary hover:underline"
            >
              legal@preppal.app
            </a>
          </p>
        </div>
      </main>
    </AppShell>
  );
}
