const nav = document.querySelector('.nav');
const toggle = document.querySelector('.menu-toggle');
const body = document.body;

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('open');
    body.classList.toggle('nav-open', !expanded);
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('open');
      body.classList.remove('nav-open');
    });
  });
}

const revealItems = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.18,
  }
);

revealItems.forEach((item) => revealObserver.observe(item));

const typedElement = document.querySelector('[data-typed]');

if (typedElement) {
  const message = typedElement.dataset.typed || typedElement.textContent;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!reducedMotion) {
    typedElement.textContent = '';
    let index = 0;

    const typeNext = () => {
      if (index <= message.length) {
        typedElement.textContent = message.slice(0, index);
        index += 1;
        setTimeout(typeNext, index < 40 ? 42 : 28);
      }
    };

    typeNext();
  }
}
