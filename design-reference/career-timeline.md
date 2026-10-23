# Education and experience timeline

Baseline restored from the live HTML and styles at https://portfolio-v2-silk-beta.vercel.app/ on 19 October 2026. The charcoal/gold sidebar layout, portrait, projects, skills, certifications, contact area, and Microsoft résumé link are preserved.

The user-supplied 21st / Hyperiux React example was interpreted as a visual reference: alternating milestones on a horizontal rail, scroll-linked movement, and a gold progress line. The implementation uses the existing HTML/CSS/JavaScript stack with local GSAP and ScrollTrigger, without adding React or replacing the site architecture.

Milestones come from the existing résumé content:
- B.Tech CSE, Anjuman College of Engineering and Technology, 2024–2028.
- Web Development Intern at ByteUprise, April–May 2025, remote.
- Systems Department Intern at MOIL Limited, June 2026–present, Nagpur.
- Expected graduation in 2028, explicitly presented as future rather than completed.

The recording’s flow is implemented with a portrait/title lead-in, a pinned sideways track, alternating milestones, and scroll-linked stem, dot, and text reveals. Reverse scrolling reverses the reveals, and the last milestone releases into normal page scrolling.

The full original descriptions remain available through a native details element below the timeline. Larger viewports use measured horizontal travel and keyboard-accessible previous/next controls. Smaller viewports and reduced-motion preferences use a chronological vertical list with no pinning or hidden content.

Verified locally after the recording update: forward and reverse scrolling, final milestone reveal and pin release; native details disclosure; desktop next control reaches 2 / 4 and moves the track; mobile width 375px has no overflow; reduced-motion removes horizontal transforms; browser console has no errors; all new assets and the résumé return HTTP 200. Other main content sections were compared against live HTML and are unchanged. Natural article heights override an inherited 100% minimum height from the original single-card template to prevent blank scrolling gaps.

Deployed to production on 19 October 2026: https://portfolio-v2-silk-beta.vercel.app/ (deployment dpl_HUq2FULHLU2E45vSfiFvJadyqdbM). Live assets, résumé, and APK return HTTP 200; browser console clean.
