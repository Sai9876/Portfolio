// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Typewriter effect
const roles = ["Software Developer", "Python Full-Stack", "AI Enthusiast", "Problem Solver"];
const twEl = document.getElementById('typewriter');
let ri = 0, li = 0, deleting = false;
function typeLoop(){
  const word = roles[ri % roles.length];
  twEl.textContent = word.slice(0, li);
  if(!deleting && li <= word.length) li++;
  else if(deleting && li >= 0) li--;
  if(li === word.length + 10) deleting = true;
  if(li === 0){ deleting = false; ri++; }
  setTimeout(typeLoop, deleting ? 35 : 90);
}
typeLoop();

// Theme toggle
const toggle = document.getElementById('themeToggle');
let light = false;
toggle.addEventListener('click', () => {
  light = !light;
  document.documentElement.style.setProperty('--bg', light ? '#f7f8fb' : '#0b0d10');
  document.documentElement.style.setProperty('--bg-alt', light ? '#ffffff' : '#0f1216');
  document.documentElement.style.setProperty('--text', light ? '#0b0d10' : '#e8ecf1');
  document.documentElement.style.setProperty('--muted', light ? '#4b5563' : '#a8b0bb');
  toggle.textContent = light ? '☀️' : '🌙';
});

// Reveal on scroll
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
  });
},{threshold:0.15});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

// Skill bars animate on reveal
const skillBars = document.querySelectorAll('.skill-bar span');
const skillIO = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      const target = entry.target.querySelector('span');
      const width = target.dataset.level || "90%";
      target.style.width = width;
      skillIO.unobserve(entry.target);
    }
  });
},{threshold:0.4});
document.querySelectorAll('.skill-bar').forEach(el=>skillIO.observe(el));

// Confetti (on projects reveal)
const confettiContainer = document.getElementById('confetti');
let confettiFired = false;
function fireConfetti(duration = 1200, count = 80){
  const colors = ["#6ee7ff","#9b8cff","#ffffff","#a7f3d0","#fde68a"];
  for(let i=0;i<count;i++){
    const p = document.createElement('div');
    p.style.position='absolute';
    p.style.width = (6+Math.random()*6) + 'px';
    p.style.height = (8+Math.random()*10) + 'px';
    p.style.background = colors[(Math.random()*colors.length)|0];
    p.style.left = (Math.random()*100) + 'vw';
    p.style.top = '-10px';
    p.style.opacity = '0.9';
    p.style.transform = `rotate(${Math.random()*360}deg)`;
    p.style.borderRadius = '2px';
    p.style.transition = `transform ${duration}ms cubic-bezier(.2,.6,.2,1), top ${duration}ms cubic-bezier(.2,.6,.2,1), opacity 300ms ease`;
    confettiContainer.appendChild(p);
    requestAnimationFrame(()=>{
      p.style.top = '110vh';
      p.style.transform = `translateX(${(-100+Math.random()*200)}px) rotate(${720+Math.random()*720}deg)`;
      setTimeout(()=>p.style.opacity='0', duration-250);
      setTimeout(()=>p.remove(), duration+300);
    });
  }
}
const proj = document.getElementById('projects');
if(proj){
  const confIO = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting && !confettiFired){
        confettiFired = true;
        fireConfetti();
        confIO.unobserve(e.target);
      }
    });
  },{threshold:0.4});
  confIO.observe(proj);
}

// Cursor glow trail
document.addEventListener('mousemove', (e)=>{
  const orb = document.createElement('div');
  orb.className = 'cursor-glow';
  orb.style.left = e.pageX + 'px';
  orb.style.top = e.pageY + 'px';
  document.body.appendChild(orb);
  setTimeout(()=>orb.remove(), 500);
});

// Floating glow orbs (ambient background)
for(let i=0;i<10;i++){
  const orb = document.createElement('div');
  orb.className = 'glow-orb';
  orb.style.left = `${Math.random()*100}%`;
  orb.style.top = `${Math.random()*100}%`;
  orb.style.width = `${8 + Math.random()*12}px`;
  orb.style.height = orb.style.width;
  document.body.appendChild(orb);
  animateOrb(orb);
}
function animateOrb(orb){
  const x = Math.random()*100;
  const y = Math.random()*100;
  const s = 0.8 + Math.random()*1.2;
  orb.animate([
    {transform:`translate(${x}vw, ${y}vh) scale(${s})`},
    {transform:`translate(${x+Math.random()*20-10}vw, ${y+Math.random()*20-10}vh) scale(${s*1.1})`}
  ],{
    duration: 12000 + Math.random()*8000,
    iterations: Infinity,
    direction: 'alternate',
    easing: 'ease-in-out'
  });
}

// Contact form (Getform)
const form = document.getElementById('contact-form');
const statusEl = document.getElementById('form-status');
if(form){
  form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    statusEl.textContent = "Sending...";
    const data = new FormData(form);
    if(!data.get('name') || !data.get('email') || !data.get('message')){
      statusEl.textContent = "Please fill all fields.";
      return;
    }
    try{
      const res = await fetch("https://getform.io/f/bnllmolb", {
        method: "POST",
        body: data,
        headers: { "Accept": "application/json" }
      });
      if(res.ok){
        statusEl.textContent = "Thanks! I'll get back to you soon.";
        form.reset();
      }else{
        statusEl.textContent = "Something went wrong.";
      }
    }catch{
      statusEl.textContent = "Network error.";
    }
  });
}
