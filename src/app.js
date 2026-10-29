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
// Enlarge project screenshots without changing their captions or source files.
const screenshots = [...document.querySelectorAll('.contribution-card figure img')];
if (screenshots.length && typeof HTMLDialogElement !== 'undefined') {
  const dialog = document.createElement('dialog');
  dialog.className = 'image-lightbox';
  dialog.setAttribute('aria-label', 'Project screenshot viewer');
  dialog.innerHTML = `<div class="lightbox-toolbar"><button type="button" data-action="previous" aria-label="Previous image">←</button><span class="lightbox-count" aria-live="polite"></span><button type="button" data-action="next" aria-label="Next image">→</button><button type="button" data-action="zoom-out" aria-label="Zoom out">−</button><button type="button" data-action="zoom-in" aria-label="Zoom in">+</button><button type="button" data-action="close" aria-label="Close image viewer">×</button></div><div class="lightbox-stage" tabindex="0" aria-label="Enlarged image; scroll to inspect when zoomed"><img alt=""></div><p class="lightbox-caption"></p>`;
  document.body.append(dialog);
  const stage = dialog.querySelector('.lightbox-stage');
  const enlarged = stage.querySelector('img');
  const caption = dialog.querySelector('.lightbox-caption');
  const control = action => dialog.querySelector(`[data-action="${action}"]`);
  let group = [], index = 0, zoom = 1, opener, scrollPosition, previousOverflow, previousGutter;
  const resizeImage = () => {
    const available = stage.clientWidth - 24;
    const height = stage.clientHeight - 24;
    const ratio = enlarged.naturalWidth / enlarged.naturalHeight;
    if (!ratio) return;
    const fitted = Math.min(available, height * ratio, enlarged.naturalWidth);
    enlarged.style.width = `${fitted * zoom}px`;
    control('zoom-out').disabled = zoom <= 1;
    control('zoom-in').disabled = zoom >= 4;
  };
  const showImage = () => {
    const source = group[index];
    zoom = 1;
    enlarged.src = source.currentSrc || source.src;
    enlarged.alt = source.alt;
    caption.textContent = source.closest('figure').querySelector('figcaption')?.textContent || source.alt;
    dialog.querySelector('.lightbox-count').textContent = `${index + 1} / ${group.length}`;
    control('previous').hidden = control('next').hidden = group.length < 2;
    stage.scrollTo(0, 0);
    resizeImage();
  };
  enlarged.addEventListener('load', resizeImage);
  const move = delta => { index = (index + delta + group.length) % group.length; showImage(); };
  const changeZoom = delta => { zoom = Math.max(1, Math.min(4, zoom + delta)); resizeImage(); };
  screenshots.forEach(source => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'screenshot-open';
    button.setAttribute('aria-label', `Enlarge image: ${source.alt}`);
    button.setAttribute('aria-haspopup', 'dialog');
    button.title = 'Click to enlarge';
    source.replaceWith(button);
    button.append(source);
    button.addEventListener('click', () => {
      opener = button;
      group = screenshots.filter(image => image.closest('figure') === source.closest('figure'));
      index = group.indexOf(source);
      scrollPosition = window.scrollY;
      previousOverflow = document.documentElement.style.overflow;
      previousGutter = document.documentElement.style.scrollbarGutter;
      document.documentElement.style.scrollbarGutter = 'stable';
      document.documentElement.style.overflow = 'hidden';
      dialog.showModal();
      showImage();
      control('close').focus();
    });
  });
  dialog.addEventListener('click', event => {
    const action = event.target.closest('[data-action]')?.dataset.action;
    if (action === 'close' || event.target === dialog || event.target === stage) dialog.close();
    if (action === 'previous') move(-1);
    if (action === 'next') move(1);
    if (action === 'zoom-in') changeZoom(.5);
    if (action === 'zoom-out') changeZoom(-.5);
  });
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' && zoom === 1 && group.length > 1) { event.preventDefault(); move(-1); }
    if (event.key === 'ArrowRight' && zoom === 1 && group.length > 1) { event.preventDefault(); move(1); }
    if (event.key === '+') { event.preventDefault(); changeZoom(.5); }
    if (event.key === '-') { event.preventDefault(); changeZoom(-.5); }
    if (event.key === 'Tab') {
      const stops = [...dialog.querySelectorAll('button:not([hidden]):not(:disabled),[tabindex="0"]')];
      const first = stops[0], last = stops[stops.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });
  dialog.addEventListener('close', () => {
    document.documentElement.style.overflow = previousOverflow;
    document.documentElement.style.scrollbarGutter = previousGutter;
    opener?.focus({ preventScroll: true });
    window.scrollTo(0, scrollPosition);
  });
  window.addEventListener('resize', () => { if (dialog.open) resizeImage(); });
}
