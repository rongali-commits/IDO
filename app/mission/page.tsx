import { StudioDocument } from "@/components/studio-document";

export const metadata = { title: "Our mission", description: "Noerong builds useful software that gives independent teams more room to do their best work.", alternates: { canonical: "/mission" } };
export default function MissionPage() {
  return <StudioDocument label="Why Noerong exists" title="Make useful work easier." intro="Independent teams deserve software that understands the work they actually do. Noerong turns everyday operational friction into focused, usable products.">
    <h2>Start with the work</h2><p>A missed follow-up, an unclear approval, or a proposal buried in an inbox can slow an entire business. The starting point is the people, decisions, and handoffs behind the problem. Technology follows that understanding.</p>
    <h2>Build from zero to one</h2><p>Rongali Chaitanya brings product thinking, interface design, full stack development, and deployment together in one independent studio. The aim is a coherent journey from the first useful idea to software people can use and maintain.</p>
    <h2>Keep the product focused</h2><p>Projects such as ClientDesk, Noerong Proposals, and LeadDesk explore specific business workflows. Clear interfaces, sensible boundaries, and careful implementation matter more than a long feature list. AI belongs where it helps someone understand, decide, or complete useful work.</p>
    <h2>Earn trust through the details</h2><p>The commitment is to explain what a product does, be honest about its limits, respect the information it handles, and improve the experience through testing and feedback. Security, accessibility, and performance are ongoing responsibilities.</p>
    <h2>Stay curious</h2><p>The writing at Noerong follows questions about history, philosophy, and the wider world. Building and writing share a habit: looking carefully, questioning assumptions, and making an idea clear enough for someone else to use.</p><p><a href="/projects">Explore the work ↗</a> · <a href="/essays">Read the journal ↗</a></p>
  </StudioDocument>;
}
