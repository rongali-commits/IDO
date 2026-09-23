export type DesignStudy = { premise: string; decisions: { title: string; detail: string }[] };
export const designStudies: Record<string, DesignStudy> = {
  dayrate: {
    premise: "A creator's working tools should feel connected to their creative identity. Dayrate balances expressive art direction with the quiet clarity of a useful operational workspace.",
    decisions: [
      { title: "Warmth with working clarity", detail: "Neutral surfaces and original campaign imagery create character. Consistent spacing, restrained category colors, and clear actions keep the dense partnership views readable." },
      { title: "One record, several useful views", detail: "The pipeline, calendar, and earnings summary share campaign data. Each view emphasizes a different decision without asking the creator to re-enter the same information." },
      { title: "A kit ready to leave the workspace", detail: "The editable profile becomes an editorial media kit. Its print layout removes navigation and private campaign information, producing a focused one-page introduction." },
    ],
  },
  seatloom: {
    premise: "A workshop is an experience before it is a reservation. The visual direction makes space for that feeling, while keeping the practical booking decisions close at hand.",
    decisions: [
      { title: "Warmth before administration", detail: "Editorial type and creative photography introduce the studio as a place to make something. The public catalogue feels distinct from the denser organizer workspace." },
      { title: "Details at the decision point", detail: "Session time, availability, and workshop information share the same view. Visitors can understand what they are reserving before committing to a session." },
      { title: "A state for every step", detail: "Reservation, waitlist, and confirmation screens use explicit language. The visual hierarchy changes with the task, keeping the next useful action clear." },
    ],
  },
  frameproof: {
    premise: "The work under review should remain the visual centre of gravity. Everything around it is designed to help a team make a clear decision about a specific version.",
    decisions: [
      { title: "The artwork leads", detail: "A quiet interface surrounds a generous image canvas. Navigation and discussion stay at the edges, allowing the composition to be seen without cropping." },
      { title: "Feedback has a location", detail: "Pins connect comments to visible details. Revision context stays nearby so a reviewer can distinguish the artwork being discussed from an older version." },
      { title: "Comparison keeps context", detail: "A before-and-after slider puts two revisions in the same frame. This makes the effect of a change easier to judge than switching between disconnected screens." },
    ],
  },
  "margin-and-matter": {
    premise: "An independent publication needs an identity readers can feel and a reading experience they can settle into. Rhythm comes from typography, photography, and deliberate space.",
    decisions: [
      { title: "An editorial rhythm", detail: "Story scale and image placement create a sequence of entry points. The publication has room for both a leading feature and quieter discoveries." },
      { title: "The reading comes first", detail: "Article layouts use a focused measure, clear heading levels, and full-composition photography. The interface gives the writing room to hold attention." },
      { title: "A system beyond one page", detail: "Collections, articles, and archive views share a visual language. The separate native WordPress edition carries that direction into reusable publishing templates." },
    ],
  },
  signalroom: {
    premise: "Research tools become difficult when evidence, interpretation, and priorities blur together. The interface makes those layers visible without overwhelming the person doing the work.",
    decisions: [
      { title: "Density with hierarchy", detail: "The overview groups evidence, themes, and opportunities into distinct regions. A restrained colour system and consistent spacing make a busy workspace easier to scan." },
      { title: "Keep the source in sight", detail: "Quotes, segments, and review status stay attached to evidence records. Reports retain supporting sources so an attractive summary does not obscure its basis." },
      { title: "Make judgment legible", detail: "Opportunity scoring exposes reach, urgency, confidence, and commercial relevance. The interface shows what contributes to a priority rather than presenting an unexplained ranking." },
    ],
  },
};
