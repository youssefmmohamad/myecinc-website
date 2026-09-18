const btn = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');

btn?.addEventListener('click', () => {
  const open = nav?.classList.toggle('open');
  btn.setAttribute('aria-expanded', String(Boolean(open)));
});

document.querySelectorAll('.site-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    nav?.classList.remove('open');
    btn?.setAttribute('aria-expanded', 'false');
  });
});

document.addEventListener('click', (event) => {
  if (!nav?.classList.contains('open')) return;
  if (nav.contains(event.target) || btn?.contains(event.target)) return;
  nav.classList.remove('open');
  btn?.setAttribute('aria-expanded', 'false');
});

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));
} else {
  document.querySelectorAll('.reveal').forEach((element) => element.classList.add('visible'));
}

const lightbox = document.getElementById('lightbox');
const lightboxImage = lightbox?.querySelector('img');
const lightboxCaption = lightbox?.querySelector('.lightbox-caption');
const lightboxCount = lightbox?.querySelector('.lightbox-count');
const closeButton = lightbox?.querySelector('.lightbox-close');
const prevButton = lightbox?.querySelector('.lightbox-prev');
const nextButton = lightbox?.querySelector('.lightbox-next');
const galleryImages = Array.from(document.querySelectorAll('.project-card img, .project-tile img'));
let activeIndex = 0;
let touchStartX = 0;

function showImage(index) {
  if (!lightbox || !lightboxImage || galleryImages.length === 0) return;
  activeIndex = (index + galleryImages.length) % galleryImages.length;
  const image = galleryImages[activeIndex];
  lightboxImage.src = image.src;
  lightboxImage.alt = image.alt;

  const card = image.closest('.project-card, .project-tile');
  const title = card?.querySelector('h3')?.textContent || image.alt;
  if (lightboxCaption) lightboxCaption.textContent = title;
  if (lightboxCount) lightboxCount.textContent = `${activeIndex + 1} / ${galleryImages.length}`;

  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

galleryImages.forEach((image, index) => {
  image.closest('.project-card, .project-tile')?.addEventListener('click', () => showImage(index));
});

closeButton?.addEventListener('click', closeLightbox);
prevButton?.addEventListener('click', (event) => {
  event.stopPropagation();
  showImage(activeIndex - 1);
});
nextButton?.addEventListener('click', (event) => {
  event.stopPropagation();
  showImage(activeIndex + 1);
});

lightbox?.addEventListener('click', (event) => {
  if (event.target === lightbox) closeLightbox();
});

lightbox?.addEventListener('touchstart', (event) => {
  touchStartX = event.changedTouches[0]?.screenX || 0;
}, { passive: true });

lightbox?.addEventListener('touchend', (event) => {
  const endX = event.changedTouches[0]?.screenX || 0;
  const delta = endX - touchStartX;
  if (Math.abs(delta) < 50) return;
  showImage(activeIndex + (delta < 0 ? 1 : -1));
}, { passive: true });

document.addEventListener('keydown', (event) => {
  if (!lightbox?.classList.contains('open')) return;
  if (event.key === 'Escape') closeLightbox();
  if (event.key === 'ArrowLeft') showImage(activeIndex - 1);
  if (event.key === 'ArrowRight') showImage(activeIndex + 1);
});
