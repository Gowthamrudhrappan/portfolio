/* =========================
   DATA
========================= */
const projectsData = [
  {
    title: 'Smart Laundry App',
    description:
      'A comprehensive UI/UX case study for a smart laundry management application with intuitive navigation and seamless booking experience.',
    tech: ['Figma', 'UI/UX Design', 'User Research', 'Wireframing'],
    details:
      'Complete user research, personas, journey mapping, wireframes, and high-fidelity designs focused on accessibility.',
    placeholder: 'UI/UX'
  },
  {
    title: 'JARVIS - Offline AI Voice Assistant',
    description:
      'Offline Python voice assistant supporting Thanglish (Tamil + English) commands.',
    tech: ['Python', 'Speech Recognition', 'NLP', 'AI'],
    details:
      'Performs app control, web search, music, jokes using pyttsx3 and speech_recognition.',
    placeholder: 'AI'
  },
  {
    title: 'PivotPath – AI Career Transition Advisor',
    description:
      'AI-powered career guidance system for role prediction, salary estimation, and skill gap analysis.',
    tech: ['Python', 'Machine Learning', 'Streamlit', 'Scikit-learn'],
    details:
      'Features role recommendation, salary prediction, skill gaps, portfolio scoring, and dashboard.',
    placeholder: 'CAREER'
  },
  {
    title: 'Dr. Youth Clinic App Design',
    description:
      'Professional UI/UX design for healthcare appointment booking.',
    tech: ['Figma', 'Healthcare UX', 'Prototyping'],
    details:
      'Designed flows for registration, booking, records, and teleconsultation.',
    placeholder: 'DESIGN'
  },
  {
    title: 'UI/UX Case Study Collection',
    description:
      'Collection of UI/UX case studies showcasing design thinking.',
    tech: ['Figma', 'Adobe XD', 'User Research'],
    details:
      'End-to-end design process documented and published on Behance.',
    placeholder: 'PORTFOLIO'
  }
];

/* =========================
   GLASS BALLS
========================= */
function createGlassBalls() {
  const container = document.querySelector('.glass-balls-container');
  if (!container) return;

  for (let i = 0; i < 8; i++) {
    const ball = document.createElement('div');
    ball.className = 'glass-ball';

    const size = Math.random() * 150 + 100;
    ball.style.width = `${size}px`;
    ball.style.height = `${size}px`;
    ball.style.left = `${Math.random() * 100}%`;
    ball.style.top = `${Math.random() * 100}%`;
    ball.style.animationDuration = `${Math.random() * 10 + 15}s`;

    container.appendChild(ball);
  }
}

/* =========================
   NAVIGATION (ONLY ONE)
========================= */
function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  const pages = document.querySelectorAll('.page');
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  function showPage(pageId) {
    pages.forEach(p => p.classList.remove('active'));
    navLinks.forEach(l => l.classList.remove('active'));

    const page = document.getElementById(pageId);
    if (page) page.classList.add('active');

    const link = document.querySelector(`.nav-link[data-page="${pageId}"]`);
    if (link) link.classList.add('active');

    navMenu.classList.remove('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const page = link.dataset.page;
      showPage(page);
      history.pushState({ page }, '', `#${page}`);
    });
  });

  document.querySelectorAll('.btn[data-page]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const page = btn.dataset.page;
      showPage(page);
      history.pushState({ page }, '', `#${page}`);
    });
  });

  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });

  window.addEventListener('popstate', e => {
    if (e.state?.page) showPage(e.state.page);
  });

  const hash = location.hash.replace('#', '');
  showPage(hash || 'home');
}

/* =========================
   PROJECT MODAL
========================= */
function initProjectModal() {
  const modal = document.getElementById('projectModal');
  if (!modal) return;

  const closeBtn = modal.querySelector('.modal-close');
  const cards = document.querySelectorAll('.project-card');

  cards.forEach((card, i) => {
    card.addEventListener('click', () => openModal(i));
  });

  function openModal(i) {
    const p = projectsData[i];
    modal.querySelector('.modal-title').textContent = p.title;
    modal.querySelector('.modal-description').textContent = p.description;
    modal.querySelector('.modal-placeholder').textContent = p.placeholder;
    modal.querySelector('.modal-details').textContent = p.details;

    const techBox = modal.querySelector('.modal-tech');
    techBox.innerHTML = '';
    p.tech.forEach(t => {
      const span = document.createElement('span');
      span.className = 'tag';
      span.textContent = t;
      techBox.appendChild(span);
    });

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', e => e.target === modal && closeModal());
  document.addEventListener('keydown', e => e.key === 'Escape' && closeModal());
}

/* =========================
   CONTACT FORM
========================= */
function initContactForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    alert('Thank you! Your message has been sent.');
    form.reset();
  });
}

/* =========================
   RESUME BUTTON
========================= */
function initResumeDownload() {
  const btn = document.querySelector('.resume-card .btn-primary');
  if (!btn) return;

  btn.addEventListener('click', () => {
    alert('Resume download will be added soon.');
  });
}

/* =========================
   SCROLL ANIMATIONS
========================= */
function addScrollAnimations() {
  const items = document.querySelectorAll(
    '.glass-card, .project-card, .timeline-item'
  );

  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  items.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = '0.6s ease';
    observer.observe(el);
  });
}

/* =========================
   INIT
========================= */
document.addEventListener('DOMContentLoaded', () => {
  createGlassBalls();
  initNavigation();
  initProjectModal();
  initContactForm();
  initResumeDownload();
  setTimeout(addScrollAnimations, 400);
});
