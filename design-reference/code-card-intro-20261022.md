# Code-card entrance — 22 October 2026

Removed glass.css from the portfolio and résumé, restoring the solid charcoal/white design and opaque navigation. The new first-entry sequence adapts the supplied Uiverse CSS by chase2k25, with scoped classes and real Izhaan Zia details in an editor card. No new framework or dependency.

On a home-page entry, the code card appears for about 1.6 seconds, then spins one full turn while moving and scaling into the measured profile-card rectangle over 1.05 seconds. A 450ms crossfade reveals the white profile/photo card; navigation and other content then fade in. Transform/opacity animations avoid layout changes during flight. The intro plays on fresh loads and refreshes, including direct section links; it restores the requested section after the reveal. Internal page returns, reduced-motion settings, and short landscape viewports bypass it. Skip, Escape, keyboard focus handling, resize cancellation, and a 6.5-second fail-open guard prevent blocking the page. JavaScript-disabled content remains visible.

Verified: desktop phases opening → docking → revealing → complete with no browser errors. At 375px, the landed tile and profile both measure x20/y116, 335×703.5px. No horizontal overflow. Skip immediately reveals content. Reduced motion renders content with no intro overlay. Profile content and navigation remain usable afterward. Glass stylesheet is absent from both page sources.

Published to production: https://portfolio-v2-silk-beta.vercel.app/ — deployment dpl_4jLbuS8dTsnHuffZwZFmb4DgE1FF. Live first entry presents the introduction, completes the reveal, leaves the site visible, loads no glass stylesheet, and reports no browser errors. Both pages and intro assets return HTTP 200.

Journey-refresh fix: removed the home-only intro restriction. Deferred initial section scrolling until the intro completes (or Skip is used), keeping the code tile’s landing target at the visible profile location. Verified #resume refresh reaches opening → docking → revealing → complete, then returns to heading top 120px with milestone 1/4. Skip also restores #resume.
