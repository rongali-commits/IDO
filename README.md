# Noerong

[![Checks](https://github.com/rongali-commits/IDO/actions/workflows/checks.yml/badge.svg)](https://github.com/rongali-commits/IDO/actions/workflows/checks.yml)

[Live studio](https://noerong.com) · [Project archive](https://noerong.com/projects) · [Contact](https://noerong.com/contact)

Noerong is a product studio focused on practical SaaS products for small teams, agencies, and growing businesses.

This repository contains portfolio source, product case studies and the preserved Noerong essay archive. The [published studio](https://noerong.com) is the current reference for available products, services and demonstrations.

## Selected product workflows

- [FrameProof](https://noerong.com/projects/frameproof): image revisions, pinned feedback and exact-version decisions.
- [Seatloom](https://noerong.com/projects/seatloom): creative workshop discovery, reservations, waitlists and organizer operations.
- [SignalRoom](https://noerong.com/projects/signalroom): customer evidence, research themes and cited AI analysis.
- [LeadDesk AI](https://noerong.com/projects/leaddesk-ai): approved FAQ answers and structured lead capture.
- [FollowDesk](https://noerong.com/projects/followdesk): lead stages, follow-up sequences and booking handoff.
- [ClientDesk](https://noerong.com/projects/clientdesk): project progress, deliverables and client decisions.

Case studies explain the workflow, architecture and deployment boundaries. Public demos use fictional records. The [personal writing archive](https://noerong.com/essays) is separate from the studio's product work.

## Stack

- React, TypeScript and Next.js-compatible routing through Vinext
- Cloudflare Workers and OpenAI Sites hosting
- Content checks and regression tests for public-page behavior

## Local development

```bash
npm ci
npm run dev
```

Run validation before publishing:

```bash
npm run lint
npm test
npm run build
```

## Deployment

Production is deployed through OpenAI Sites using its managed source and publication workflow. A GitHub commit alone does not update the live website. Domain DNS and email routing are managed separately through Hostinger.

The writing archive remains available under `/essays`.
