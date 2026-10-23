# Persistent navigation and page transitions — 22 October 2026

Resume is neutral on the portfolio and orange only at /resume/ (aria-current=page). The main section indicator initializes at load and follows scroll. Fixed navigation keeps all six labelled menus available; phone layouts stack icons and labels. The profile flip button and inner wrapper have transparent backgrounds, eliminating the orange rectangle during rotation.

Internal page navigation fades content out over 260ms and in over 650ms, preserving the shared navigation. Section links scroll smoothly. Modified clicks, downloads, external URLs, and reduced-motion preferences retain normal behavior. History restoration resets transition state. The pinned journey starts below the menu; short windows use the readable vertical timeline.

Verified locally: Home is the only current item at home; Resume has a transparent background, while /resume/ highlights it orange. After scrolling 4,973px the menu remains at 16px. All labels fit within 375px with zero horizontal overflow. During an actual page change, exit opacity measured 0.26 before navigation; destination and return links work. Reduced motion navigates with full opacity. Profile card flips cleanly to the dark about face. Journey heading at 96px clears menu bottom 78px; counter fits within viewport. JavaScript checks and browser console clean.

Published to https://portfolio-v2-silk-beta.vercel.app/ — production deployment dpl_GgzxSJ4QzLNXZUdpSmicZwR5ECVd. Live Home is the only current item on /, Resume background transparent, navigation fixed, portrait background transparent, console clean. Page, résumé, and new assets return HTTP 200.
