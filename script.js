const btn = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');

btn?.addEventListener('click', () => {
  const open = nav?.classList.toggle('open');
  btn.setAttribute('aria-expanded', String(Boolean(open)));
});

document.querySelectorAll('.site-nav a').forEach((a) => {
  a.addEventListener('click', () => nav?.classList.remove('open'));
});

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

const lightbox = document.getElementById('lightbox');
const lightboxImage = lightbox?.querySelector('img');
const lightboxCaption = lightbox?.querySelector('p');
const lightboxClose = lightbox?.querySelector('.lightbox-close');

document.querySelectorAll('.project-card img').forEach((image) => {
  image.closest('.project-card')?.addEventListener('click', () => {
    if (!lightbox || !lightboxImage || !lightboxCaption) return;

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;

    const title =
      image.closest('.project-card')?.querySelector('h3')?.textContent ||
      image.alt;

    lightboxCaption.textContent = title;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  });
});

function closeLightbox() {
  if (!lightbox) return;

  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

lightboxClose?.addEventListener('click', closeLightbox);

lightbox?.addEventListener('click', (event) => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeLightbox();
});

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document
    .querySelectorAll('.reveal')
    .forEach((element) => revealObserver.observe(element));
} else {
  document
    .querySelectorAll('.reveal')
    .forEach((element) => element.classList.add('visible'));
}
