import { permanentRedirect } from "next/navigation";
import { siteConfig } from "@/lib/site";

export default function AboutRedirect() {
  permanentRedirect(siteConfig.authorPath);
}
