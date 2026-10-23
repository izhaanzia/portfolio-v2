# Hanging profile + FluxLines — 23 October 2026

Adapted the user-supplied Lanyard and FluxLines sources for the static portfolio.

- Profile front/back/band textures: `assets/images/lanyard/`. Existing photo embedded without changing it. Name, role, skills, education and contact details come from existing portfolio content.
- Desktop: sticky hanging profile below the header; click/drag physics, Flip and Reset buttons. Physics stops when settled and when the tab is hidden.
- Phones/tablets: profile starts in the normal flow, then docks at the upper right when scrolled out of view. Expand/Collapse and expanded Flip controls remain accessible. Touch scrolling on the main card stays available.
- Reduced motion or unavailable WebGL: static front/back card with working Flip and Reset. FluxLines becomes a static background.
- FluxLines: charcoal/orange/gold, fixed behind content, capped at 24 fps and reduced rendering resolution; pauses offscreen or while hidden.
- Editable lanyard adapter: `design-reference/profile-lanyard-source.js`. Runtime bundle includes Three.js 0.180.0; notices are in `assets/js/vendor/`.

Verified desktop rendering, drag hit testing, flip/reset, sticky position, phone docking/expansion, reduced-motion cleanup, and original project dialogs.
