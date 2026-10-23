# Journey animation — 21 October 2026

The supplied 17-second recording shows a pinned horizontal timeline: lead-in, alternating milestones, drawn stems and progress rail, and reversible text reveals. The new section adapts that flow to the Sawad-inspired portfolio using Poppins, charcoal, white and orange. The existing sticky identity card provides the portrait alongside the timeline.

Chronological content: B.Tech CSE 2024–2028, ByteUprise April–May 2025, MOIL June 2026–present, expected graduation 2028. Local GSAP and ScrollTrigger assets animate measured track travel. Previous/next buttons provide an alternative to scrolling. Viewports below 700px, short viewports below 740px, reduced motion, and JavaScript-free rendering use the readable vertical timeline.

Verified locally: desktop milestone navigation, forward and reverse progress, all four milestones and pin release into the tools section, no horizontal page overflow, 375px mobile content, and live reduced-motion changes (no pin spacer, transforms, or hidden text). JavaScript syntax check passes, browser console clean. Not deployed.

Heading pin correction: the entire journey title and timeline now pin together before horizontal travel starts. The top inset adapts to available height (20–80px), with a compact title keeping the counter visible. Verified at the user preview size 821×859: heading remains at 80px while progressing to 2/4; the section releases normally into the tools area after the last milestone.
