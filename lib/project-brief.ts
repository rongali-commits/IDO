export type ProjectBrief = { name: string; business: string; workflow: string; tools: string; budget: string; timeline: string };

export function formatProjectBrief(brief: ProjectBrief) {
  const text = (value: string) => value.trim() || "Not specified";
  return [
    "Hi Rongali,", "", "I'd like to discuss a project with Noerong.", "",
    `Name: ${text(brief.name)}`, `Business or website: ${text(brief.business)}`, "",
    "The workflow and desired outcome:", text(brief.workflow), "",
    `Current tools: ${text(brief.tools)}`, `Budget range: ${text(brief.budget)}`,
    `Preferred timeline: ${text(brief.timeline)}`, "",
    "Please let me know the next step and any questions needed to define the scope.",
  ].join("\n");
}
