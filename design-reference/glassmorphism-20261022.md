# Glassmorphism — 22 October 2026

Added assets/css/glass.css to both pages. Kept the existing layout, orange/lime accents, current-menu behavior and profile flip. Added static warm ambient gradients, translucent surfaces, inset edge reflections, subtle shadows and frosted navigation/profile/résumé/dialog panels. Repeated list cards use reflection gradients without individual blur filters to limit scrolling cost. The pinned journey ancestor is not filtered, preserving fixed pin behavior.

Includes opaque fallbacks for unsupported blur and reduced-transparency preferences. Print keeps a white background, dark content, and no effects. Large secondary headings have stronger contrast. The portrait base stays transparent.

Verified browser behavior: navigation blur 18px, résumé blur 12px, project dialog opens and closes with Escape, portrait base transparent, 375px résumé and all tool cards have no horizontal overflow, menu stays within the viewport, console clean. Also guarded initial journey anchor restoration so it cannot override a navigation click made before fonts finish loading.

Published to https://portfolio-v2-silk-beta.vercel.app/ — deployment dpl_5yNFCxcmbzq8yaQr1vENPku9eHof. Both pages load glass.css and return HTTP 200.
