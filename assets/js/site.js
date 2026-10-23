/* ============================================================
   Izhaan Zia — portfolio interactions
   Header state · mobile menu · scroll reveal · project dialog
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Header on scroll ---------- */
  const header = document.getElementById('site-header');
  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 24);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Mobile menu ---------- */
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  const setMenu = (open) => {
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    mobileMenu.hidden = !open;
    mobileMenu.classList.toggle('is-open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  };

  menuToggle.addEventListener('click', () => {
    setMenu(menuToggle.getAttribute('aria-expanded') !== 'true');
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => setMenu(false));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      menuToggle.focus();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 900 && menuToggle.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
    }
  });

  /* ---------- Reveal on scroll ---------- */
  const revealTargets = document.querySelectorAll('[data-reveal]');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    revealTargets.forEach(el => revealObserver.observe(el));
  } else {
    revealTargets.forEach(el => el.classList.add('is-visible'));
  }

  /* ---------- Active nav ---------- */
  const navLinks = document.querySelectorAll('.primary-nav a');
  const sections = [...navLinks]
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const id = `#${entry.target.id}`;
        navLinks.forEach(link => {
          link.classList.toggle('is-current', link.getAttribute('href') === id);
        });
      });
    }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

    sections.forEach(section => navObserver.observe(section));
  }

  /* ---------- Project data ---------- */
  const projects = {
    zapex: {
      title: 'Zapex-med',
      subtitle: 'Study library and protected reader for medical students',
      type: 'Web application — 2025',
      cover: './assets/images/projects/zapex-live.jpg',
      alt: 'Zapex-med study library interface',
      body: [
        'Zapex-med organises study material for medical students into a searchable library of subjects and topics. Visitors can read free material without an account; signing in unlocks the topics assigned to them.',
        'The part that took the most care was the reader. Documents are served through a protected surface that discourages copying and downloading while keeping the reading experience fast, and publishers get a dashboard for uploading material, structuring courses, and setting access rules per subject.'
      ],
      stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Prisma', 'Cloudflare R2'],
      links: [{ label: 'Visit the live site', url: 'https://zapex-med.vercel.app' }]
    },

    replora: {
      title: 'Replora CRM',
      subtitle: 'A WhatsApp agent and follow-up pipeline for a sales team',
      type: 'Automation — 2025',
      cover: './assets/images/projects/replora.svg',
      alt: 'Replora CRM and WhatsApp agent interface',
      body: [
        'Replora puts a conversational agent in front of incoming leads. The agent answers questions, qualifies the enquiry, and books a consultation, with each step dispatched to an n8n workflow through webhooks.',
        'Behind the conversation sits a CRM: a kanban pipeline for leads, appointment scheduling synced to Google Calendar, and automated follow-up reminders so nothing goes quiet for a week. The app also includes a chat simulator for testing workflows without a live phone number.'
      ],
      stack: ['JavaScript', 'HTML5', 'CSS3', 'n8n', 'WhatsApp Webhook API', 'Google Calendar API'],
      links: []
    },

    wedding: {
      title: 'Nehal & Ariba',
      subtitle: 'A wedding invitation built to work on a phone in a hall',
      type: 'Client site — 2026',
      cover: './assets/images/projects/wedding-live.jpg',
      alt: 'Nehal and Ariba wedding invitation site',
      body: [
        'A digital invitation for a two-day celebration: an opening sequence, the couple’s story, live countdowns to each ceremony, a gallery, and directions to the venue.',
        'The RSVP was the practical constraint. Instead of a form that sends email nobody checks, the reply is validated in the browser and pre-formatted into a WhatsApp message to the family, which is how guests actually respond.'
      ],
      stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Responsive design'],
      links: [{ label: 'Visit the wedding site', url: 'https://nehal-ariba-wedding.vercel.app' }]
    },

    moil: {
      title: 'MOIL Laptop Portal',
      subtitle: 'A reimbursement policy converted into a working application',
      type: 'Internal tool — 2026',
      cover: './assets/images/projects/moil-live.jpg',
      alt: 'MOIL employee laptop portal sign-in screen',
      body: [
        'Employees at MOIL can claim a laptop reimbursement, but the policy lived across documents and handoffs. This portal turns it into one flow: an employee signs in, prepares their request and required documents in one place, and follows the application as it moves through review.',
        'Much of the work was requirements rather than interface — mapping each rule in the policy to a visible state, checking that no combination of inputs can produce an invalid claim, and testing the result against the cases the systems department already sees.'
      ],
      stack: ['Requirements analysis', 'Application workflow', 'Role-based access', 'Testing'],
      links: []
    },

    quickwa: {
      title: 'QuickWA',
      subtitle: 'Start a WhatsApp chat without saving a number',
      type: 'Android application — 2025',
      cover: './assets/images/projects/quickwa-live.jpg',
      alt: 'QuickWA Android app screen',
      body: [
        'QuickWA is a small Flutter utility for the case where you need to message someone once and would rather not add them to your contacts. Type or paste a number, add an optional message, and it opens the chat directly.',
        'It handles international dialling codes, detects numbers from the clipboard, remembers recent templates, and follows the system theme. The whole app is intentionally narrow in scope.'
      ],
      stack: ['Flutter', 'Dart', 'WhatsApp deep linking', 'Android SDK'],
      links: [
        { label: 'Download the APK', url: './assets/downloads/QuickWA-1.0.0.apk', download: true },
        { label: 'View on GitHub', url: 'https://github.com/izhaanzia' }
      ]
    },

    'lane-detection': {
      title: 'Road Lane Detection',
      subtitle: 'A computer vision pipeline for driving footage',
      type: 'Computer vision — 2025',
      cover: './assets/images/projects/lane-detection-v2.jpg',
      alt: 'Road footage with lane boundaries detected',
      body: [
        'An applied experiment in classical computer vision: detect road lane boundaries in video and overlay them on each frame.',
        'The pipeline runs greyscale conversion, Gaussian smoothing, Canny edge detection, a trapezoidal region of interest, and a probabilistic Hough transform, then extrapolates the detected segments into continuous lane lines. The interesting work was tuning thresholds that hold up on a foggy highway at different distances rather than on a single clean frame.'
      ],
      stack: ['Python', 'OpenCV', 'NumPy', 'Image processing'],
      links: []
    },

    portfolio: {
      title: 'This portfolio',
      subtitle: 'An editorial page instead of an app shell',
      type: 'Personal site — 2026',
      cover: './assets/images/projects/portfolio-live.jpg',
      alt: 'Previous version of the portfolio',
      body: [
        'This site replaces an earlier version that wrapped the content in a fake macOS window and sidebar. It looked tidy in a screenshot and was worse to use: every section became the same rounded card, and the window chrome took space from the work itself.',
        'The rebuild is a single editorial page — hand-written CSS with design tokens, two typefaces, a portrait that is part of the layout rather than an avatar, and no framework behind it.'
      ],
      stack: ['HTML5', 'Modern CSS', 'JavaScript', 'Native dialog'],
      links: [{ label: 'Repository', url: 'https://github.com/izhaanzia/portfolio-v2' }]
    }
  };

  /* ---------- Project dialog ---------- */
  const dialog = document.getElementById('project-dialog');
  const closeBtn = document.getElementById('dialog-close');
  const dImage = document.getElementById('dialog-image');
  const dType = document.getElementById('dialog-type');
  const dTitle = document.getElementById('dialog-title');
  const dSubtitle = document.getElementById('dialog-subtitle');
  const dText = document.getElementById('dialog-text');
  const dStack = document.getElementById('dialog-stack');
  const dLinks = document.getElementById('dialog-links');

  const arrowIcon = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4"/></svg>';

  const openProject = (key) => {
    const data = projects[key];
    if (!data) return;

    dImage.src = data.cover;
    dImage.alt = data.alt || data.title;
    dType.textContent = data.type;
    dTitle.textContent = data.title;
    dSubtitle.textContent = data.subtitle;

    dText.replaceChildren();
    data.body.forEach(paragraph => {
      const p = document.createElement('p');
      p.textContent = paragraph;
      dText.appendChild(p);
    });

    dStack.replaceChildren();
    data.stack.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      dStack.appendChild(li);
    });

    dLinks.replaceChildren();
    data.links.forEach(link => {
      const a = document.createElement('a');
      a.className = 'button button-small ' + (link.download ? 'button-quiet' : 'button-solid');
      a.href = link.url;
      if (link.download) {
        a.setAttribute('download', '');
      } else {
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
      }
      a.innerHTML = `<span></span>${arrowIcon}`;
      a.firstChild.textContent = link.label;
      dLinks.appendChild(a);
    });

    if (typeof dialog.showModal === 'function') {
      dialog.showModal();
    } else {
      dialog.setAttribute('open', '');
    }
    const shell = dialog.querySelector('.dialog-shell');
    if (shell) shell.scrollTop = 0;
    if (dialog.showModal) dialog.scrollTop = 0;
    document.body.style.overflow = 'hidden';
  };

  document.querySelectorAll('[data-project]').forEach(trigger => {
    trigger.addEventListener('click', () => openProject(trigger.dataset.project));
  });

  const closeDialog = () => {
    if (typeof dialog.close === 'function') dialog.close();
    else dialog.removeAttribute('open');
    document.body.style.overflow = '';
  };

  closeBtn.addEventListener('click', closeDialog);

  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) closeDialog();
  });

  dialog.addEventListener('close', () => {
    document.body.style.overflow = '';
    dImage.removeAttribute('src');
  });

  /* ---------- Contact form ---------- */
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!form.reportValidity()) return;

      const name = form.fullname.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();

      const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
      const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);

      window.location.href = `mailto:izhaanzia@gmail.com?subject=${subject}&body=${body}`;

      status.textContent = 'Opening a draft in your mail app. If nothing happens, write to izhaanzia@gmail.com directly.';
    });
  }
});
