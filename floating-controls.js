(function(){
  if(document.getElementById('backToTop')||document.getElementById('contactWidget')){return;}

  var english=document.documentElement.lang.toLowerCase().indexOf('en')===0;
  var labels=english
    ?{back:'Back to top',open:'Open contacts',close:'Close contacts'}
    :{back:'Наверх',open:'Открыть контакты',close:'Закрыть контакты'};

  var style=document.createElement('style');
  style.id='floating-controls-styles';
  style.textContent=[
    '.floating-control{width:48px;height:48px;padding:0;border:1px solid rgba(255,255,255,.08);border-radius:4px;background:rgba(26,26,26,.96);color:#C8FF00;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:background .18s cubic-bezier(.16,1,.3,1),border-color .18s cubic-bezier(.16,1,.3,1),transform .18s cubic-bezier(.16,1,.3,1),opacity .18s cubic-bezier(.16,1,.3,1)}',
    '.floating-control:hover{background:#2A2A2A;border-color:rgba(200,255,0,.42);transform:translateY(-1px)}',
    '.floating-control:active{transform:translateY(0)}',
    '.floating-control svg{width:22px;height:22px;display:block}',
    '.floating-control:focus-visible,.contact-widget .contact-link:focus-visible{outline:2px solid #C8FF00;outline-offset:3px}',
    '.back-to-top{position:fixed;left:20px;bottom:20px;z-index:70;opacity:0;visibility:hidden;pointer-events:none;transform:translateY(8px)}',
    '.back-to-top.is-visible{opacity:1;visibility:visible;pointer-events:auto;transform:translateY(0)}',
    '.contact-widget{position:fixed;right:20px;bottom:20px;z-index:70}',
    '.contact-widget .contact-menu{position:absolute;right:0;bottom:56px;display:flex;flex-direction:column;align-items:flex-end;gap:8px;opacity:0;visibility:hidden;pointer-events:none;transform:translateY(8px);transition:opacity .18s cubic-bezier(.16,1,.3,1),transform .18s cubic-bezier(.16,1,.3,1),visibility .14s cubic-bezier(.7,0,.84,0)}',
    '.contact-widget.is-open .contact-menu{opacity:1;visibility:visible;pointer-events:auto;transform:translateY(0)}',
    '.contact-widget .contact-link{box-sizing:border-box;width:auto;min-width:144px;min-height:44px;padding:10px 14px;display:flex;align-items:center;justify-content:flex-start;gap:10px;border:1px solid rgba(255,255,255,.08);border-radius:4px;background:rgba(26,26,26,.98);color:#F5F2EC;font-family:\'Onest\',sans-serif;font-size:13px;font-weight:500;letter-spacing:normal;text-decoration:none;white-space:nowrap;transition:color .18s cubic-bezier(.16,1,.3,1),border-color .18s cubic-bezier(.16,1,.3,1),transform .12s cubic-bezier(.16,1,.3,1)}',
    '.contact-widget .contact-link:hover{color:#C8FF00;border-color:rgba(200,255,0,.42);background:rgba(26,26,26,.98);transform:translateX(-2px)}',
    '.contact-widget .contact-link:active{transform:none}',
    '.contact-widget .contact-link svg{width:18px;height:18px;flex:0 0 auto;color:#C8FF00}',
    '@media(max-width:768px){.back-to-top{left:16px;bottom:calc(16px + env(safe-area-inset-bottom))}.contact-widget{right:16px;bottom:calc(16px + env(safe-area-inset-bottom))}}',
    '@media(prefers-reduced-motion:reduce){.floating-control,.contact-widget .contact-menu,.contact-widget .contact-link{transition-duration:.01ms!important}}'
  ].join('');
  document.head.appendChild(style);

  document.body.insertAdjacentHTML('beforeend',
    '<button class="floating-control back-to-top" id="backToTop" type="button" aria-label="'+labels.back+'" tabindex="-1">'+
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M6.5 10.5 12 5l5.5 5.5"/></svg>'+
    '</button>'+
    '<div class="contact-widget" id="contactWidget">'+
      '<div class="contact-menu" id="contactMenu" aria-hidden="true">'+
        '<a class="contact-link" href="https://t.me/sawhite" target="_blank" rel="noopener noreferrer">'+
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m21 3-7.2 18-4.1-7-6.7-3.1L21 3Z"/><path d="m9.7 14 4.2-4.2"/></svg><span>Telegram</span>'+
        '</a>'+
        '<a class="contact-link" href="https://wa.me/905362751360" target="_blank" rel="noopener noreferrer">'+
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.5 11.6a8.5 8.5 0 0 1-12.6 7.5L3 20.5l1.4-4.7a8.5 8.5 0 1 1 16.1-4.2Z"/><path d="M8.4 8.1c.4 3.2 2.3 5.1 5.5 5.5l1.2-1.2 2 .9-.4 2c-.2.8-1 1.2-1.8 1.1-4.6-.6-7.7-3.7-8.3-8.3-.1-.8.3-1.6 1.1-1.8l2-.4.9 2-1.2 1.2"/></svg><span>WhatsApp</span>'+
        '</a>'+
        '<a class="contact-link" href="mailto:desegnator@gmail.com">'+
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 5h18v14H3z"/><path d="m3 6 9 7 9-7"/></svg><span>Email</span>'+
        '</a>'+
      '</div>'+
      '<button class="floating-control contact-toggle" id="contactToggle" type="button" aria-label="'+labels.open+'" aria-expanded="false" aria-controls="contactMenu">'+
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 5h16v11H8l-4 3V5Z"/><path d="M8 9h8M8 12h5"/></svg>'+
      '</button>'+
    '</div>'
  );

  var backToTop=document.getElementById('backToTop');
  var widget=document.getElementById('contactWidget');
  var contactToggle=document.getElementById('contactToggle');
  var contactMenu=document.getElementById('contactMenu');

  function updateBackToTop(){
    var visible=window.scrollY>350;
    backToTop.classList.toggle('is-visible',visible);
    backToTop.tabIndex=visible?0:-1;
  }
  function setContact(open){
    widget.classList.toggle('is-open',open);
    contactToggle.setAttribute('aria-expanded',open?'true':'false');
    contactToggle.setAttribute('aria-label',open?labels.close:labels.open);
    contactMenu.setAttribute('aria-hidden',open?'false':'true');
  }

  window.addEventListener('scroll',updateBackToTop,{passive:true});
  updateBackToTop();
  backToTop.addEventListener('click',function(){window.scrollTo({top:0,behavior:'smooth'})});
  contactToggle.addEventListener('click',function(){setContact(contactToggle.getAttribute('aria-expanded')!=='true')});
  document.addEventListener('click',function(event){if(!widget.contains(event.target)){setContact(false)}});
  document.addEventListener('keydown',function(event){
    if(event.key==='Escape'&&contactToggle.getAttribute('aria-expanded')==='true'){
      setContact(false);
      contactToggle.focus();
    }
  });

  var cursor=document.getElementById('cursor');
  if(cursor){
    [backToTop,contactToggle].concat(Array.prototype.slice.call(contactMenu.querySelectorAll('a'))).forEach(function(element){
      element.addEventListener('mouseenter',function(){cursor.classList.add('hover')});
      element.addEventListener('mouseleave',function(){cursor.classList.remove('hover')});
    });
  }
})();
