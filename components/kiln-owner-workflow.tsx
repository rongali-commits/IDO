import { CaseScreenshot } from "@/components/case-screenshot";

const steps = [
  {
    title: "A private entrance for the owner.",
    body: "The public booking journey stays open to visitors. Studio operations sit behind a one-time email sign-in link, with access limited to the verified owner account. The workbench link is included here so reviewers can see the access boundary; the screenshots document the screens beyond it.",
    benefit: "Customers can book without an account. The owner's operational controls remain private.",
    image: "owner-sign-in-hd.png", width: 3840, height: 1000,
    alt: "Kiln Atlas owner sign-in screen with an empty email field and a one-time sign-in link button",
  },
  {
    title: "Start with the next decision.",
    body: "The bench groups sample reservations by day and time. New, inspected and attention counts give the owner a quick overview. Filters separate upcoming work, records awaiting review, items needing attention, accepted samples, past samples and cancellations. Search brings a name, reference or clay detail back into view.",
    benefit: "Replaces sorting through message threads with one queue the owner can work through.",
    image: "owner-queue-hd.png", width: 2640, height: 1360,
    alt: "Owner reservation queue with status counts, search, filters and dated sample bookings",
  },
  {
    title: "The booking arrives with its context.",
    body: "Open a reservation and the sample contact, dimensions, clay body, rated cone, dryness answer and customer notes sit together. The reference KA-ZDCA-BR4S matches the booking in the narrated walkthrough: one mug, Thursday 1 October at noon. Review, reschedule, cancel and history controls stay beside that record.",
    benefit: "The owner does not need to retype the intake or ask for details already supplied in the booking flow.",
    image: "owner-reservation-hd.png", width: 2640, height: 1760,
    alt: "Expanded sample reservation KA-ZDCA-BR4S showing material details and owner action controls",
  },
  {
    title: "Record the judgment, keep the explanation.",
    body: "The review form offers three outcomes: accepted, needs clarification or declined in simulation. A private studio note is separate from the optional note shown on the customer's private sample page. This distinguishes an administrative reservation from the material review that still belongs to a person.",
    benefit: "Keeps the decision and its explanation with the piece, instead of scattering them across private notes and customer messages.",
    image: "owner-review-hd.png", width: 2640, height: 2160,
    alt: "Material review controls with three outcomes, a private studio note and a separate customer-facing note",
  },
  {
    title: "Set the hours once. Protect exceptions.",
    body: "The owner selects working days, the first slot and the end of the intake day. Sample windows are 20 minutes, with one record per window, offered 21 days ahead. Whole-day and single-slot blocks accommodate exceptions. These settings feed the public availability journey; changing hours does not silently move or cancel existing reservations.",
    benefit: "Reduces repeated availability negotiations while preserving control over the studio's limited intake time.",
    image: "owner-schedule-hd.png", width: 2640, height: 1480,
    alt: "Working days, first and last slot settings, and whole-day or single-slot blocking controls",
  },
  {
    title: "Carry accepted work into the kiln board.",
    body: "The board separates cone 04 bisque from cone 6 glaze. Accepted samples wait in their matching lane, and the batch form collects a name and an optional load or capacity note. The interface describes planned, firing, cooling and complete stages. This capture shows the empty planning state, before any batch has been created.",
    benefit: "Gives the owner a shared place for the next stage of work, with firing types kept distinct.",
    image: "owner-batch-planning-hd.png", width: 2640, height: 1600,
    alt: "Two-lane kiln board with the cone 04 batch planning form open and no batches created",
  },
  {
    title: "Answer the recurring questions once.",
    body: "Ember's answer editor lets the owner maintain questions, answers, destination links, link labels, display order and publication status. Preparation guidance and the route to booking can be kept consistent. These published notes and sample hours support the companion's responses; material acceptance remains an owner decision.",
    benefit: "Turns repeated explanations into maintained guidance visitors can find before contacting the owner.",
    image: "owner-ember-answers-hd.png", width: 2640, height: 2144,
    alt: "Ember answer management with question, answer, destination, display order and publication controls",
  },
];

export function KilnOwnerWorkflow() {
  return (
    <section className="kiln-owner-workflow" id="owner-workbench" aria-labelledby="owner-workbench-title">
      <div className="kiln-owner-heading">
        <div><p className="section-kicker">Behind the booking</p><h2 id="owner-workbench-title">Less chasing.<br /><em>More time at the bench.</em></h2></div>
        <div className="case-story"><p>The owner experience is half the product. For a solo ceramics studio, the work begins when a reservation arrives: finding the right details, checking the material, protecting intake time and keeping the next step visible.</p><p>The live workbench requires owner access. This visual tour opens up that workflow for reviewers, using fictional sample records captured from the running product.</p><a className="text-link" href="https://kiln-atlas-booking-flow.lovable.app/studio" target="_blank" rel="noreferrer">Open owner workbench <span aria-hidden="true">↗</span></a><p className="case-evidence-note">Owner sign-in required. No public credentials are shared. You can review every screen below without an account.</p></div>
      </div>
      <div className="kiln-effort-grid">
        <article><span>Before</span><h3>Collect, chase, repeat.</h3><p>Ask for missing clay details, negotiate a drop-off time, find the original message and explain the next stage again.</p></article>
        <article><span>With the product</span><h3>Read, decide, record.</h3><p>Receive a structured reservation, review it in one place and carry the decision forward with the material details attached.</p></article>
        <article><span>Still the owner's responsibility</span><h3>Material judgment.</h3><p>Inspect physical work and decide what can safely proceed. The concept organizes that decision; it does not make it.</p></article>
      </div>
      <div className="kiln-owner-steps">
        {steps.map((step, index) => <article className="kiln-owner-step" key={step.image}>
          <div className="kiln-owner-copy"><p className="section-kicker">Owner workflow / {String(index + 1).padStart(2, "0")}</p><h3>{step.title}</h3><p>{step.body}</p><p className="kiln-owner-benefit"><strong>Owner effort reduced</strong>{step.benefit}</p></div>
          <CaseScreenshot src={`/products/kiln-atlas/${step.image}`} alt={step.alt} title={step.title} width={step.width} height={step.height} />
        </article>)}
      </div>
      <p className="case-evidence-note">These screens show a functioning portfolio concept with fictional records. Effort reduction describes the intended workflow benefit, not measured customer results. Booking confirmations and progress are shown in the product; transactional booking emails, automated reminders, payments and physical firing are outside this build.</p>
    </section>
  );
}
