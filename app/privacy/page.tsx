import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy", description: "How Noerong handles analytics and subscriber information.", alternates: { canonical: "/privacy" } };

export default function PrivacyPage() {
  return <main className="page-main shell-narrow policy-page"><header className="page-header"><p className="eyebrow">Plain language</p><h1>Privacy</h1><p>What is measured, what is stored, and why.</p></header><h2>Website measurement</h2><p>Noerong may use Google Analytics and Microsoft Clarity to understand aggregate traffic, reading progress, device types, referrals, and usability. These tools may use cookies or similar browser storage.</p><h2>Newsletter</h2><p>If you subscribe, your email address is sent to the newsletter provider only so Noerong can deliver the newsletter and manage your subscription. It is not sold.</p><h2>Your choice</h2><p>You can block analytics with browser privacy controls and unsubscribe from any newsletter email. Questions can be sent to hello@noerong.com.</p><p className="policy-updated">Last updated: June 2026</p></main>;
}
