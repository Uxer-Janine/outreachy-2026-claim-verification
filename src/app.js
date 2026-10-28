// Content and navigation work without JavaScript.
const links = [...document.querySelectorAll('#main-nav a')];
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    const current = entries.find(entry => entry.isIntersecting)?.target.id;
    if (!current) return;
    links.forEach(link => {
      if (link.getAttribute('href') === `#${current}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }, {rootMargin: '-15% 0px -60% 0px'});
  links.forEach(link => observer.observe(document.querySelector(link.getAttribute('href'))));
}