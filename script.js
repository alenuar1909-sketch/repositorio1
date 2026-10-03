(function(){
  var header=document.querySelector('.site-header');
  var burger=document.querySelector('.burger');
  var menu=document.getElementById('menu');

  function onScroll(){header.classList.toggle('scrolled',window.scrollY>8)}
  onScroll();window.addEventListener('scroll',onScroll,{passive:true});

  function setMenu(open){
    menu.classList.toggle('open',open);
    burger.setAttribute('aria-expanded',open);
    burger.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú');
  }
  burger.addEventListener('click',function(){setMenu(!menu.classList.contains('open'))});
  menu.addEventListener('click',function(e){if(e.target.closest('a'))setMenu(false)});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')setMenu(false)});
  window.addEventListener('resize',function(){if(window.innerWidth>860)setMenu(false)});

  // Reveal suave al hacer scroll
  var items=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12});
    items.forEach(function(el){io.observe(el)});
  }else{items.forEach(function(el){el.classList.add('in')})}

  // Enlace activo en la navegación
  var links=document.querySelectorAll('.menu a[href^="#"]:not(.btn)');
  var map={};links.forEach(function(a){map[a.getAttribute('href').slice(1)]=a});
  if('IntersectionObserver' in window){
    var so=new IntersectionObserver(function(es){es.forEach(function(e){
      if(e.isIntersecting&&map[e.target.id]){links.forEach(function(a){a.removeAttribute('aria-current')});map[e.target.id].setAttribute('aria-current','true')}
    })},{rootMargin:'-45% 0px -50% 0px'});
    Object.keys(map).forEach(function(id){var s=document.getElementById(id);if(s)so.observe(s)});
  }

  // Formulario: abre WhatsApp con el mensaje preparado
  var form=document.getElementById('cita');
  if(form){form.addEventListener('submit',function(e){
    e.preventDefault();
    var d=new FormData(form);
    var msg='Hola, soy '+d.get('nombre')+'. Me gustaría agendar una consulta con el Dr. Martínez.\nMotivo: '+d.get('motivo')+
      '\nTeléfono: '+d.get('tel')+(d.get('nota')?'\nComentarios: '+d.get('nota'):'');
    window.open('https://wa.me/524425550148?text='+encodeURIComponent(msg),'_blank','noopener');
  })}
})();
