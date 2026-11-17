/* Desegnator — short disappearing mouse trail. */
(() => {
  'use strict';
  const enabled = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
  if (!document.body || !Element.prototype.animate) return;

  let dots;
  let index = 0;
  let last = null;
  let lastTime = 0;

  document.addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'mouse' || !enabled.matches || document.hidden) return;
    const now = performance.now();
    if (!last) { last = [e.clientX, e.clientY]; return; }
    const dx = e.clientX - last[0];
    const dy = e.clientY - last[1];
    const distance = Math.hypot(dx, dy);
    if (distance < 10 || now - lastTime < 26) return;
    last = [e.clientX, e.clientY];
    lastTime = now;

    dots ??= Array.from({length: 20}, () => {
      const dot = document.createElement('span');
      dot.className = 'cursor-trail-dot';
      dot.setAttribute('aria-hidden', 'true');
      document.body.appendChild(dot);
      return dot;
    });
    const dot = dots[index];
    index = (index + 1) % dots.length;
    dot.getAnimations().forEach((animation) => animation.cancel());
    const size = 7 + (index % 4) * 2;
    const behind = 12;
    const x = e.clientX - dx / distance * behind;
    const y = e.clientY - dy / distance * behind;
    dot.style.width = `${size}px`;
    dot.style.height = `${size}px`;
    dot.style.left = `${x}px`;
    dot.style.top = `${y}px`;
    dot.animate([
      {opacity: 0.75, transform: 'translate(-50%, -50%) scale(1)'},
      {opacity: 0, transform: 'translate(-50%, -50%) scale(.24)'}
    ], {duration: 430, easing: 'ease-out', fill: 'forwards'});
  }, {passive: true});

  function resetPosition() {
    last = null;
    lastTime = 0;
  }

  document.addEventListener('pointerleave', resetPosition, {passive: true});
  window.addEventListener('blur', resetPosition);
  enabled.addEventListener('change', resetPosition);
})();
