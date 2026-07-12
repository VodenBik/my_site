(function(){
  var cursor=document.getElementById('cursor');
  if(cursor){document.addEventListener('mousemove',function(e){cursor.style.left=e.clientX+'px';cursor.style.top=e.clientY+'px'});document.querySelectorAll('a,button').forEach(function(el){el.addEventListener('mouseenter',function(){cursor.classList.add('hover')});el.addEventListener('mouseleave',function(){cursor.classList.remove('hover')})})}
  var toggle=document.querySelector('.nav-toggle');var nav=document.querySelector('nav');
  function closeMenu(){if(!nav||!toggle)return;nav.classList.remove('menu-open');toggle.classList.remove('is-open');toggle.setAttribute('aria-expanded','false')}
  if(toggle&&nav){toggle.addEventListener('click',function(){var open=!nav.classList.contains('menu-open');nav.classList.toggle('menu-open',open);toggle.classList.toggle('is-open',open);toggle.setAttribute('aria-expanded',open?'true':'false')});nav.querySelectorAll('.nav-links a').forEach(function(a){a.addEventListener('click',closeMenu)})}
  var reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduced||!('IntersectionObserver' in window)){document.querySelectorAll('.fade-up').forEach(function(el){el.classList.add('visible')})}else{var observer=new IntersectionObserver(function(entries){entries.forEach(function(entry){if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}})},{threshold:.08});document.querySelectorAll('.fade-up').forEach(function(el){observer.observe(el)})}
  var lightbox=document.getElementById('lightbox');var lightboxImage=document.getElementById('lightboxImage');var caption=document.getElementById('lightboxCaption');var lastTrigger;
  function closeLightbox(){if(!lightbox)return;lightbox.classList.remove('open');lightbox.setAttribute('aria-hidden','true');document.body.style.overflow='';if(lastTrigger)lastTrigger.focus()}
  document.querySelectorAll('[data-lightbox]').forEach(function(button){button.addEventListener('click',function(){lastTrigger=button;lightboxImage.src=button.dataset.lightbox;lightboxImage.alt=button.dataset.alt||'';caption.textContent=button.dataset.alt||'';lightbox.classList.add('open');lightbox.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';document.querySelector('.lightbox-close').focus()})});
  if(lightbox){lightbox.addEventListener('click',function(e){if(e.target===lightbox)closeLightbox()});document.querySelector('.lightbox-close').addEventListener('click',closeLightbox)}
  document.addEventListener('keydown',function(e){if(e.key==='Escape'){closeMenu();closeLightbox()}})
})();
