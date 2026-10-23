# Digital résumé and reversible fades — 21 October 2026

Added /resume/ following the layout at https://aaftab.is-a.dev/resume: breadcrumb, title/download row, rounded document panel, contact/photo header, structured résumé sections and download footer. Uses the portfolio’s Poppins, charcoal and orange theme. Content comes from Izhaan’s existing Microsoft résumé and portfolio project details. Existing PDF is retained; the new page also supports printing/save-as-PDF with a light print layout.

Journey and profile résumé links open the new document page. The animated journey remains at /#resume.

Replaced one-time reveals with repeatable IntersectionObserver-driven fades: 1.4-second entry and 1-second exit, in both scroll directions. A 22px content offset accompanies fading; pinned journey headings never translate. Journey scrub smoothing is increased to 0.9 seconds. Keyboard focus reveals controls and reduced-motion preferences remove the effects. Print always shows all content.

Verified: upward re-entry opacity 0 → 0.16 → 1, downward exit 1 → 0.91 → 0, computed durations 1.4s/1s, reduced-motion has zero hidden elements, 375px résumé width with no overflow or overflowing headings, all seven projects, print styles display all sections and hide navigation, browser console clean. Not deployed.

Navigation correction: added a visible orange Resume button alongside the portfolio’s top menus on both pages, a labelled profile button, and a button below the journey. Verified all three links in the browser reach /resume/. The résumé now uses the portfolio’s own icon navigation, two-tone MY RÉSUMÉ heading, orange document rule, squared buttons, and original page copy. Removed the reference-style brand/nav header and “digital resume” heading. Tested at desktop and 375px widths with no horizontal overflow; browser console clean. Local preview restarted as a detached process.

Deployed to production on 21 October 2026: https://portfolio-v2-silk-beta.vercel.app/ — deployment dpl_Fz1QkoJGHhzMe8RLgFaMMGfy61kc. Latest working tree over base commit c60281e. Production Resume menu verified in-browser, /resume/ renders correctly, console clean, main styles/scripts, résumé PDF, and QuickWA APK all return HTTP 200.
