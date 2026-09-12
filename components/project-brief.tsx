"use client";

import { useState, type FormEvent } from "react";
import { formatProjectBrief } from "@/lib/project-brief";

export function ProjectBrief() {
  const [brief, setBrief] = useState("");
  const [status, setStatus] = useState("");

  function prepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const value = (key: string) => String(data.get(key) ?? "");
    setBrief(formatProjectBrief({ name: value("name"), business: value("business"), workflow: value("workflow"), tools: value("tools"), budget: value("budget"), timeline: value("timeline") }));
    setStatus("Your brief is ready below. It has not been sent.");
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(brief);
      setStatus("Brief copied. Paste it into an email to hello@noerong.com or your Contra message.");
    } catch {
      setStatus("Copy was unavailable. Select and copy the brief below, then email hello@noerong.com.");
    }
  }

  return <section id="project-brief" className="project-brief" aria-labelledby="brief-title">
    <div className="brief-intro"><p className="section-kicker">A clearer first message</p><h2 id="brief-title">Start with the workflow.</h2><p>A short brief is enough. No polished specification or meeting is needed to make an initial enquiry.</p><p className="brief-privacy">This builder runs in your browser. Nothing is sent or stored by this form. You review the brief, then send it through your own email or Contra. Please leave out passwords and confidential customer data.</p></div>
    <form className="brief-form" onSubmit={prepare} onChange={() => { setBrief(""); setStatus(""); }}>
      <div className="brief-fields">
        <label htmlFor="brief-name">Your name <span>(required)</span><input id="brief-name" name="name" required autoComplete="name" maxLength={100} /></label>
        <label htmlFor="brief-business">Business or website <span>(optional)</span><input id="brief-business" name="business" maxLength={200} /></label>
        <label className="brief-wide" htmlFor="brief-workflow">What should work better? <span>(required)</span><textarea id="brief-workflow" name="workflow" required rows={4} minLength={15} maxLength={1200} placeholder="For example: enquiries arrive by email, and we lose track of the next follow-up. We need one place to see who needs a reply." /></label>
        <label className="brief-wide" htmlFor="brief-tools">What tools do you use today? <span>(optional)</span><input id="brief-tools" name="tools" maxLength={200} placeholder="Your website, CRM, spreadsheet, or current process" /></label>
        <label htmlFor="brief-budget">Budget range <span>(optional)</span><select id="brief-budget" name="budget" defaultValue=""><option value="">Not sure yet</option>{["Source kit only", "$249 workflow clarity sprint", "$250 to $1,000", "$1,000 to $3,000", "$3,000+"].map(value => <option key={value}>{value}</option>)}</select></label>
        <label htmlFor="brief-timeline">Preferred timeline <span>(optional)</span><select id="brief-timeline" name="timeline" defaultValue=""><option value="">Flexible</option>{["Within 2 weeks", "Within a month", "Within 3 months", "Exploring for now"].map(value => <option key={value}>{value}</option>)}</select></label>
      </div>
      <button className="button button-dark" type="submit">Prepare my brief <span aria-hidden="true">↗</span></button>
      <p className="brief-help">You will review it before sending. Preparing a brief does not book work or create a payment obligation.</p>
    </form>
    <p className="brief-status" role="status" aria-live="polite">{status}</p>
    {brief && <div className="brief-preview"><h3>Review your project brief</h3><textarea aria-label="Prepared project brief" value={brief} readOnly rows={13} /><div className="brief-send-actions"><a className="button button-dark" href={`mailto:hello@noerong.com?subject=${encodeURIComponent("Noerong project brief")}&body=${encodeURIComponent(brief)}`}>Open email draft <span aria-hidden="true">↗</span></a><button className="button button-outline" type="button" onClick={() => void copy()}>Copy brief</button><a className="text-link" href="https://contra.com/rongalichaitanya" target="_blank" rel="noreferrer">Message on Contra <span aria-hidden="true">↗</span></a></div><p>If an email app does not open, copy the brief and send it to <a href="mailto:hello@noerong.com">hello@noerong.com</a>. You can edit the message in your email app before sending.</p></div>}
  </section>;
}
