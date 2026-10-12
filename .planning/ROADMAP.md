# ROADMAP — AWS Student Builder + Kodr Purple theme + merged data
| # | Phase | Wave | DependsOn | Files | Success |
|---|-------|------|-----------|-------|---------|
| 1 | Tokens + data merge | 1 | — | src/index.css, src/data/projects.ts, src/components/ProjectsMarquee.tsx (data block only) | tsc clean |
| 2 | Shell + home | 2 | 1 | src/components/Navbar.tsx, src/App.tsx, src/components/SpotlightFooter.tsx, src/components/StickyEventsStack.tsx | build PASS |
| 3 | Inner pages | 3 | 2 | src/components/TeamPage.tsx, TeamCard.tsx, ProjectsPage.tsx, ProjectDetailPage.tsx, EventsPage.tsx, ResourcesPage.tsx, JoinUsPage.tsx, CursorGlow.tsx, ThreeCanvas.tsx, InteractiveTerminal.tsx | build+types PASS, visual UAT |
